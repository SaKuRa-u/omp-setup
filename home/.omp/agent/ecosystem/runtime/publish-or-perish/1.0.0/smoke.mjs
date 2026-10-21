import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { resolve } from 'node:path';
import { root, childEnvironment } from './pop.mjs';

const client = new Client({ name: 'omp-pop-acceptance', version: '1.0.0' });
const transport = new StdioClientTransport({ command: process.execPath,
  args: [resolve(root, 'server.mjs')], cwd: root, env: childEnvironment(), stderr: 'pipe' });
const report = { status: 'failed', steps: [], first_pass_failures: [], retries: 0 };
async function call(name, args, expectError = false) {
  const result = await client.callTool({ name, arguments: args }, undefined, { timeout: 100_000 });
  assert.equal(Boolean(result.isError), expectError, JSON.stringify(result));
  if (result.structuredContent) return result.structuredContent;
  const text = result.content.find(item => item.type === 'text').text;
  if (expectError) {
    try { return JSON.parse(text); } catch { return { message: text }; }
  }
  return JSON.parse(text);
}
try {
  await client.connect(transport);
  const tools = (await client.listTools()).tools;
  assert.deepEqual(tools.map(tool => tool.name).sort(), ['pop_export', 'pop_search']);
  report.steps.push({ name: 'mcp-initialize-and-discovery', status: 'passed', tools: tools.map(tool => tool.name) });
  const invalid = await call('pop_search', { source: 'scopus', title: 'CRISPR' }, true);
  report.steps.push({ name: 'paid-source-rejected', status: 'passed', result: invalid });
  const query = { source: 'crossref', title: 'A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity',
    author: 'Jinek', year_from: 2012, year_to: 2012, max_results: 5 };
  const found = await call('pop_search', query);
  const paper = found.records.find(record => record.doi?.toLowerCase() === '10.1126/science.1225829');
  assert.ok(paper, 'Known Science DOI absent from actual Crossref search');
  assert.match(paper.title, /programmable dual.RNA.guided/i);
  assert.equal(paper.year, 2012);
  report.steps.push({ name: 'crossref-live-known-paper', status: 'passed', returned: found.returned,
    doi: paper.doi, title: paper.title, source: paper.source, authors: paper.authors, query: found.query });
  for (const format of ['json', 'bibtex', 'ris', 'csv']) {
    const exported = await call('pop_export', { search_id: found.search_id, format });
    assert.equal(exported.returned, found.returned);
    assert.match(exported.text, /programmable dual.RNA.guided/i);
    assert.match(exported.text, /10\.1126\/science\.1225829/i);
    report.steps.push({ name: `offline-export-${format}`, status: 'passed', bytes: Buffer.byteLength(exported.text) });
  }
  const pubmed = await call('pop_search', { source: 'pubmed', title: 'programmable endonuclease', author: 'Jinek M', year_from: 2012, year_to: 2012, max_results: 5 });
  assert.ok(pubmed.records.some(record => record.doi?.toLowerCase() === '10.1126/science.1225829'), 'Known DOI absent from actual PubMed search');
  report.steps.push({ name: 'pubmed-live-known-paper', status: 'passed', returned: pubmed.returned });
  const empty = await call('pop_search', { source: 'pubmed', title: 'ompnonexistentpaper7f14607b82e54acf', max_results: 1 });
  assert.deepEqual(empty.records, []);
  const emptyExport = await call('pop_export', { search_id: empty.search_id, format: 'ris' });
  assert.equal(emptyExport.text, '');
  report.steps.push({ name: 'no-matches-and-empty-export', status: 'passed', returned: empty.returned });
  const expired = await call('pop_export', { search_id: '0'.repeat(32), format: 'bibtex' }, true);
  assert.equal(expired.error, 'search-expired');
  report.steps.push({ name: 'unknown-export-id', status: 'passed' });
  report.status = 'passed';
} catch (error) {
  report.first_pass_failures.push({ message: error.message });
  process.exitCode = 1;
} finally {
  await client.close();
  console.log(JSON.stringify(report, null, 2));
}
