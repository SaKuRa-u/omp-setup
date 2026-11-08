import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
const cwd = process.argv[2];
assert.ok(cwd, 'Expected explicit cwd');
const executable = 'C:/Users/Indrimeilla-PC/.bun/bin/omp.exe';
const result = spawnSync(executable, ['skill','list','--json'], {cwd, encoding:'utf8', windowsHide:true, timeout:60000, maxBuffer:16*1024*1024});
assert.equal(result.status,0,'Native skill inventory failed');
const inventory = JSON.parse(result.stdout);
const skills = inventory.skills;
assert.ok(Array.isArray(skills), 'Native inventory missing skills');
const names = skills.map(skill=>skill.name);
assert.equal(new Set(names).size,names.length,'Duplicate skill names');
const selection = JSON.parse(await readFile(new URL('./selection.json',import.meta.url),'utf8'));
const checks = [];
for (const expected of selection.skills) {
  const found = skills.find(skill=>skill.name===expected.name);
  assert.ok(found, 'Selected candidate missing: '+expected.name);
  assert.equal(Boolean(found.hide), expected.manual, 'Manual boundary mismatch: '+expected.name);
  const uri = spawnSync(executable,['read','skill://'+expected.name], {cwd,encoding:'utf8',windowsHide:true,timeout:30000,maxBuffer:4*1024*1024});
  assert.equal(uri.status,0,'Skill URI failed: '+expected.name);
  assert.ok(uri.stdout.includes('[Skill file:'),'No local skill provenance: '+expected.name);
  checks.push({name:expected.name,manual:expected.manual,source:found.filePath??found.path??null,uriResolved:true});
}
const baseline = JSON.parse(await readFile(new URL('../global-optimization-20261107/rpc-management-hub.json',import.meta.url),'utf8')).skills.map(name=>name.replace(/^skill:/,''));
assert.deepEqual(baseline.filter(name=>!names.includes(name)),[],'Previously global skill lost');
const evidence = {cwd,skills:names.length,selected:checks,baselineGlobalPreserved:true,discoveryWarnings:inventory.warnings??null,inferenceRequested:false,scope:'Native inventory, manual flag and URI; not workload-quality proof'};
await writeFile(new URL('./discovery-'+cwd.split(/[\\/]/).at(-1)+'.json',import.meta.url),JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence));
