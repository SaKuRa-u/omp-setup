import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Read-only installation smoke: no network, subprocess, vendor import, model, or config loading.
const evidence = JSON.parse(await readFile(new URL('./domain-adoption.json', import.meta.url), 'utf8'));
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
for (const item of evidence.copy_manifest) {
  assert.equal(digest(await readFile(item.path)), item.sha256, `Installed bytes differ: ${item.path}`);
  assert.equal(digest(await readFile(item.source_path)), item.sha256, `Pinned source differs: ${item.source_path}`);
}
for (const skill of evidence.installed_skills) {
  const text = await readFile(path.join(skill.path, 'SKILL.md'), 'utf8');
  assert.equal(/^name:\s*(.+)$/m.exec(text)?.[1].trim(), skill.skill, `Unexpected skill name: ${skill.path}`);
}
const installed = new Map(evidence.installed_skills.map(skill => [skill.skill, skill.path]));
for (const [name, relative] of [
  ['choreograph', 'RECIPES.md'],
  ['theme-factory', 'theme-showcase.pdf'],
  ['train-sentence-transformers', 'references/evaluators_sentence_transformer.md'],
  ['train-sentence-transformers', 'scripts/train_sentence_transformer_with_lora_example.py'],
  ['huggingface-local-models', 'references/quantization.md'],
  ['seo-schema', '../seo/references/schema-types.md'],
  ['seo-schema', 'schema/templates.json'],
  ['seo-hreflang', 'references/locale-formats.md'],
  ['gsap-frameworks', 'examples/vue/app.vue'],
  ['gsap-frameworks', 'examples/nuxt/app/composables/useGSAP.ts'],
]) {
  assert.ok((await stat(path.join(installed.get(name), relative))).isFile(), `Missing original reference: ${name}/${relative}`);
}
const seoParent = evidence.parent_config_merge['skills.customDirectories_add'][0];
const entrypoints = [];
for (const child of await readdir(seoParent, { withFileTypes: true })) {
  if (!child.isDirectory()) continue;
  try {
    if ((await stat(path.join(seoParent, child.name, 'SKILL.md'))).isFile()) entrypoints.push(child.name);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
assert.deepEqual(entrypoints.sort(), ['seo-hreflang', 'seo-schema']);
console.log(JSON.stringify({ copiedFilesVerified: evidence.copy_manifest.length, selectedSkills: evidence.installed_skills.length, seoEntrypoints: entrypoints, network: false, vendorExecution: false, runtimeReadiness: 'not-tested', discovery: 'parent-OMP-RPC-required' }));
