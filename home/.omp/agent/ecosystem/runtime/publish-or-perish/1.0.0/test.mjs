import assert from 'node:assert/strict';
import { test } from 'node:test';
import { childEnvironment, exportSearch, recordsSchema, searchSchema, exportSchema } from './pop.mjs';

test('paid sources, arbitrary paths, raw CLI flags and credentials are rejected', () => {
  for (const source of ['scopus', 'wos', 'lens', 'openalex', 'semscholar', 'crossref --scopus']) {
    assert.equal(searchSchema.safeParse({ source, title: 'CRISPR' }).success, false);
  }
  for (const extra of [{ outfile: 'C:/Windows/test' }, { raw: '--scopus' }, { api_key: 'dummy-secret' }]) {
    assert.equal(searchSchema.safeParse({ title: 'CRISPR', ...extra }).success, false);
  }
  assert.equal(exportSchema.safeParse({ search_id: '../settings.json', format: 'json' }).success, false);
});

test('a search requires useful bounded text and an ordered year range', () => {
  for (const query of [{}, { title: ' ' }, { title: 'a\nb' }, { title: 'a'.repeat(501) },
    { title: 'CRISPR', year_from: 2025, year_to: 2020 }, { title: 'CRISPR', max_results: 10000 }]) {
    assert.equal(searchSchema.safeParse(query).success, false);
  }
  assert.equal(searchSchema.safeParse({ title: 'β-catenin AND "DNA repair"', year_from: 2020, year_to: 2025 }).success, true);
});

test('publication output cannot silently become a partial or malformed list', () => {
  assert.equal(recordsSchema.safeParse([{ title: 'Valid', authors: ['A. Author'], doi: '10.1234/example' }]).success, true);
  for (const records of [{ error: 'source failed' }, [{ doi: '10.1234/missing-title' }], [{ title: 'Valid', authors: 'not-an-array' }]]) {
    assert.equal(recordsSchema.safeParse(records).success, false);
  }
});

test('PubMed structured author affiliations remain available for citation verification', () => {
  const publications = recordsSchema.parse([{ title: 'A PubMed publication', authors: [
    { name: 'Martin Jinek', affiliation: 'University of California, Berkeley' }, 'Krzysztof Chylinski',
  ] }]);
  assert.equal(publications[0].authors[0].name, 'Martin Jinek');
  assert.equal(publications[0].authors[0].affiliation, 'University of California, Berkeley');
  assert.equal(publications[0].authors[1], 'Krzysztof Chylinski');
  assert.equal(recordsSchema.safeParse([{ title: 'Invalid', authors: [{ affiliation: 'Missing author name' }] }]).success, false);
});

test('expired export IDs fail instead of searching online or fabricating references', async () => {
  await assert.rejects(exportSearch({ search_id: 'f'.repeat(32), format: 'bibtex' }), error => error.code === 'search-expired');
});

test('CLI environment has no inherited API key, proxy, Node hook or GUI home', () => {
  const environment = childEnvironment();
  for (const key of ['OPENALEX_API_KEY', 'NCBI_API_KEY', 'NODE_OPTIONS', 'HTTP_PROXY', 'HTTPS_PROXY', 'ANTHROPIC_API_KEY']) {
    assert.equal(key in environment, false);
  }
  assert.notEqual(environment.USERPROFILE, process.env.USERPROFILE);
  assert.equal(environment.APPDATA, environment.USERPROFILE);
});
