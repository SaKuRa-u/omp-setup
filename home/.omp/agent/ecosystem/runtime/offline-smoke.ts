import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { assertNoSecrets } from './lib/secret-filter.ts';
import { loadScope, validateNamespace } from './lib/memory-policy.ts';
import { MemoryService, validateFact, validateManifest, safeFailure, type Manifest } from './memory.ts';
import { readSecret, CredentialError } from './lib/secrets.ts';
import { validateRequest, sanitizeValue, Context7Error } from './context7.ts';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

let checks = 0;
for (const text of ['password=synthetic-only','token: synthetic-only','Bearer synthetic-only','-----BEGIN PRIVATE KEY-----', 'sk_synthetic_test_not_real_12345']) {
  assert.throws(()=>assertNoSecrets(text)); checks++;
}
assert.throws(()=>assertNoSecrets({nested:{api_key:'synthetic-only'}})); checks++;
assertNoSecrets('Verified preference: use PostgreSQL for this public sample.'); checks++;
for (const ns of ['omp_a/b','project','omp_' + 'a'.repeat(100),'omp_Test']) { assert.throws(()=>validateNamespace(ns)); checks++; }
assert.equal(validateNamespace('omp_public_sample'),'omp_public_sample'); checks++;
assert.throws(()=>validateFact({fact:'one',extra:'unreviewed metadata'})); checks++;
assert.throws(()=>validateFact({fact:'first\nraw transcript'})); checks++;
assert.throws(()=>validateFact({fact:'password=synthetic-only'})); checks++;
assert.equal(validateFact({fact:'One verified durable preference.'}),'One verified durable preference.'); checks++;
const global = await loadScope({global:true});
assert.throws(()=>global.canWrite('capture')); checks++;
const scope = await loadScope({selftest:true});
assert.equal(scope.namespace,'omp_selftest'); checks++;
assert.deepEqual(scope.recallNamespaces,['omp_selftest']); checks++;
const body = {version:1 as const,action:'forget' as const,namespace:'omp_selftest',ids:['synthetic_id'],createdAt:new Date().toISOString(),nonce:'synthetic_nonce'};
const manifest: Manifest = {...body,digest:createHash('sha256').update(JSON.stringify(body)).digest('hex')};
validateManifest(manifest,scope,'forget'); checks++;
assert.throws(()=>validateManifest({...manifest,ids:['different_target']},scope,'forget')); checks++;
assert.throws(()=>validateManifest(manifest,{...scope,namespace:'omp_other'},'forget')); checks++;
assert.throws(()=>validateManifest(manifest,scope,'delete-doc')); checks++;
const disconnected = new MemoryService(scope, async()=>{await fetch('http://127.0.0.1:1');throw new Error('Unexpected reachable test port');});
await assert.rejects(()=>disconnected.recall('public synthetic query')); checks++;
const clean = safeFailure(new Error('REMOTE_SECRET_SHOULD_NOT_APPEAR'));
assert.ok(!JSON.stringify(clean).includes('REMOTE_SECRET_SHOULD_NOT_APPEAR')); checks++;
await assert.rejects(()=>readSecret('invalid' as never),CredentialError); checks++;
validateRequest({operation:'query',library:'/nodejs/node',query:'Node.js readFile UTF-8 encoding'}); checks++;
validateRequest({operation:'query',library:'/nodejs/node',query:'Node.js fs/promises readFile; use "utf-8" and AbortSignal options together?'}); checks++;
assert.throws(()=>validateRequest({operation:'query',library:'/nodejs/node',query:'Node.js readFile\nwith a second line'}),Context7Error); checks++;
assert.throws(()=>validateRequest({operation:'query',library:'/nodejs/node/../../private',query:'Node.js readFile UTF-8 encoding'}),Context7Error); checks++;
assert.throws(()=>validateRequest({operation:'resolve',library:'Node.js',query:'password=synthetic-only'})); checks++;
const publicAuthExample = 'Example: password=YOUR_PASSWORD and token=YOUR_TOKEN.';
assert.equal(sanitizeValue(publicAuthExample,'synthetic_exact_value'),publicAuthExample); checks++;
assert.deepEqual(sanitizeValue({text:'contains synthetic_exact_value'},'synthetic_exact_value'),{text:'contains [REDACTED]'}); checks++;
const fixtureDir = await mkdtemp(fileURLToPath(new URL('.approval-smoke-',import.meta.url)));
try {
  const manifestPath = join(fixtureDir,'manifest.json');
  await writeFile(manifestPath,JSON.stringify(manifest));
  await assert.rejects(()=>new MemoryService(scope).apply('forget',manifestPath),/Human receipt or real interactive TTY required/); checks++;
  const receiptPath = join(fixtureDir,'receipt.json');
  await writeFile(receiptPath,JSON.stringify({approved:true,digest:manifest.digest,action:'forget',namespace:'omp_other',ids:manifest.ids,approvedBy:'synthetic test',approvedAt:new Date().toISOString(),source:'chat',approvalReference:'synthetic-negative-test-only'}));
  await assert.rejects(()=>new MemoryService(scope).apply('forget',manifestPath,receiptPath),/Scoped human approval reference required/); checks++;
} finally { await rm(fixtureDir,{recursive:true,force:true}); }
const ps = "Add-Type -AssemblyName System.Security; $p=[Text.Encoding]::UTF8.GetBytes('omp-synthetic-no-secret'); $c=[Security.Cryptography.ProtectedData]::Protect($p,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); $r=[Security.Cryptography.ProtectedData]::Unprotect($c,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); if([Text.Encoding]::UTF8.GetString($r) -ne 'omp-synthetic-no-secret'){exit 1}; [Array]::Clear($p,0,$p.Length); [Array]::Clear($r,0,$r.Length); [Console]::Out.Write('roundtrip-ok')";
assert.equal(execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',ps],{encoding:'utf8',windowsHide:true,timeout:15000}),'roundtrip-ok'); checks++;
console.log(JSON.stringify({status:'passed',checks,scope:'offline safeguards only',dpapi:'in-memory round trip; no credential file created',network:'real loopback connection failure, not authenticated vendor outage',cloudAcceptance:'not measured by this offline script; use separate live acceptance evidence'}));
