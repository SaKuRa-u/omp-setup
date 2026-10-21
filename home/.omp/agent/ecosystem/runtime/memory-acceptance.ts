import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { MemoryService, safeFailure } from './memory.ts';
import { loadScope } from './lib/memory-policy.ts';

const HELP = `Live Supermemory acceptance (requires user-provided DPAPI key).
  bun <runtime>/memory-acceptance.ts --state NEW_FILE
  bun <runtime>/memory-acceptance.ts --state FILE [--approval HUMAN_RECEIPT]
State is resumable. Uses ONLY omp_selftest writes and generic synthetic facts.
Dynamic dreaming can stay pending; rerun same state (exit 2), never use instant.
Stops at forget preview; after human approval applies ONLY its exact IDs, then
stops at a separate source-document deletion preview. Resume with that manifest's
chat-approval attestation or human-file receipt to delete. No --yes, auto approval,
invented chat references, or automatic cleanup. Assistant may write the receipt only
after explicit human approval of the exact digest, scope and IDs.
Recall phases launch a new subprocess with fresh DPAPI auth, no inherited API key,
and persist capture/recall PIDs as evidence of the process boundary.
Do not run this runner before the user authorizes live API use.
Offline secret-filter/network-failure smoke belongs to main's isolated adapter,
not a fabricated cloud acceptance here. Missing key is a clean nonzero failure.
`;
interface State {
  version: 1; namespace: 'omp_selftest'; id: string;
  stage: 'capture' | 'wait-capture' | 'recall' | 'update' | 'wait-update' | 'corrected-recall' | 'preview' | 'forget-approval' | 'delete-preview' | 'delete-approval' | 'done';
  manifest?: string; capturePid?: number; recallPids?: number[];
}
async function run(): Promise<number> {
  const args = process.argv.slice(2);
  if (!args.length || (args.length === 1 && args[0] === '--help')) { console.log(HELP); return 0; }
  const flags = new Map<string, string>();
  for (let index = 0; index < args.length; index += 2) {
    if (!['--state', '--approval', '--recall-child'].includes(args[index]) || !args[index + 1] || args[index + 1].startsWith('--') || flags.has(args[index])) throw new Error('Invalid acceptance flags.');
    flags.set(args[index], args[index + 1]);
  }
  const stateFlag = flags.get('--state');
  if (!stateFlag) throw new Error('State file required.');
  const statePath = resolve(stateFlag);
  let state: State;
  try { state = JSON.parse(await readFile(statePath, 'utf8')); }
  catch (error) {
    if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) throw error;
    if (flags.has('--approval') || flags.has('--recall-child')) throw new Error('Cannot approve or recall an unreviewed run.');
    state = { version: 1, namespace: 'omp_selftest', id: `acceptance_${randomUUID()}`, stage: 'capture' };
    await writeFile(statePath, JSON.stringify(state, null, 2), { flag: 'wx', mode: 0o600 });
  }
  if (state.version !== 1 || state.namespace !== 'omp_selftest' || !/^acceptance_[a-f0-9-]{36}$/.test(state.id) || !['capture', 'wait-capture', 'recall', 'update', 'wait-update', 'corrected-recall', 'preview', 'forget-approval', 'delete-preview', 'delete-approval', 'done'].includes(state.stage)) throw new Error('Invalid acceptance state.');
  if (flags.has('--recall-child')) {
    if (flags.get('--recall-child') !== 'true' || !['recall', 'corrected-recall'].includes(state.stage)) throw new Error('Invalid child recall phase.');
    const memory = new MemoryService(await loadScope({ selftest: true }));
    const result = await memory.recall(`What is the label of public synthetic sample ${state.id}?`, 2000);
    const desired = state.stage === 'recall' ? 'blue' : 'green';
    if (!result.untrustedMemoryData.some(item => item.text.includes(state.id) && item.text.toLowerCase().includes(desired))) throw new Error('Live recall assertion failed.');
    if (state.stage === 'corrected-recall' && result.untrustedMemoryData.some(item => item.text.includes(state.id) && /\bblue\b/i.test(item.text))) throw new Error('Stale correction recalled.');
    const global = new MemoryService(await loadScope({ global: true }));
    const isolated = await global.recall(`Public synthetic sample ${state.id}`, 2000);
    if (isolated.untrustedMemoryData.some(item => item.text.includes(state.id))) throw new Error('Namespace isolation assertion failed.');
    console.log(JSON.stringify({ state: 'recall-passed', pid: process.pid }));
    return 0;
  }
  const save = async () => { await writeFile(statePath, JSON.stringify(state, null, 2), { mode: 0o600 }); };
  const memory = new MemoryService(await loadScope({ selftest: true }));
  const fact = (color: string) => ({ fact: `The public synthetic sample ${state.id} has the label ${color}.` });
  while (true) {
    switch (state.stage) {
      case 'capture':
        await memory.capture(state.id, fact('blue'));
        state.capturePid = process.pid;
        state.stage = 'wait-capture'; await save(); break;
      case 'wait-capture':
      case 'wait-update': {
        const result = await memory.status(state.id, 300);
        if (result.state === 'pending') { console.log(JSON.stringify({ state: 'pending', stage: state.stage, namespace: state.namespace, id: state.id })); return 2; }
        state.stage = state.stage === 'wait-capture' ? 'recall' : 'corrected-recall'; await save(); break;
      }
      case 'recall':
      case 'corrected-recall': {
        const deferred = Promise.withResolvers<{ state: string; pid: number }>();
        const environment = Object.fromEntries(Object.entries(process.env).filter(([name]) => !/KEY|TOKEN|SECRET|PASSWORD/i.test(name)));
        execFile(process.execPath, [fileURLToPath(import.meta.url), '--state', statePath, '--recall-child', 'true'],
          { timeout: 150_000, maxBuffer: 16_384, windowsHide: true, env: environment }, (error, stdout) => {
            if (error) { deferred.reject(new Error('Fresh-process recall failed; remote details suppressed.')); return; }
            try { deferred.resolve(JSON.parse(stdout)); }
            catch { deferred.reject(new Error('Invalid child recall result.')); }
          });
        const child = await deferred.promise;
        if (child.state !== 'recall-passed' || !Number.isInteger(child.pid) || child.pid === process.pid || child.pid === state.capturePid) throw new Error('Fresh-process boundary assertion failed.');
        state.recallPids = [...(state.recallPids ?? []), child.pid];
        console.log(JSON.stringify({ state: 'fresh-process-recall-passed', parentPid: process.pid, capturePid: state.capturePid, recallPid: child.pid, phase: state.stage }));
        state.stage = state.stage === 'recall' ? 'update' : 'preview'; await save(); break;
      }
      case 'update':
        await memory.update(state.id, fact('green'));
        state.stage = 'wait-update'; await save(); break;
      case 'preview': {
        state.manifest = `${statePath}.forget-${randomUUID()}.json`;
        const manifest = await memory.preview(`Only memories about public synthetic sample ${state.id}`, state.manifest);
        if (!manifest.ids.length) throw new Error('Preview matched no memories.');
        state.stage = 'forget-approval'; await save();
        console.log(JSON.stringify({ state: 'human-approval-required', action: 'forget', namespace: state.namespace, manifest: state.manifest, digest: manifest.digest, ids: manifest.ids, untrustedReviewCandidates: manifest.untrustedReviewCandidates }));
        return 2;
      }
      case 'forget-approval':
      case 'delete-approval': {
        if (!state.manifest) throw new Error('Missing review manifest.');
        if (!flags.has('--approval')) {
          console.log(JSON.stringify({ state: 'human-approval-required', manifest: state.manifest, instruction: 'Review candidate meanings and exact digest/scope/IDs. Explicit human chat approval may be recorded by assistant as a referenced attestation; resume with --approval.' })); return 2;
        }
        const action = state.stage === 'forget-approval' ? 'forget' : 'delete-doc';
        await memory.apply(action, state.manifest, flags.get('--approval'));
        flags.delete('--approval');
        if (action === 'forget') {
          const response = await memory.recall(`Public synthetic sample ${state.id}`, 2000);
          if (response.untrustedMemoryData.some(item => item.text.includes(state.id))) throw new Error('Forgotten memory still recalled.');
          state.stage = 'delete-preview';
        } else state.stage = 'done';
        await save(); break;
      }
      case 'delete-preview': {
        state.manifest = `${statePath}.delete-${randomUUID()}.json`;
        const manifest = await memory.manifest('delete-doc', [state.id], state.manifest);
        state.stage = 'delete-approval'; await save();
        console.log(JSON.stringify({ state: 'human-approval-required', action: 'delete-doc', manifest: state.manifest, digest: manifest.digest, ids: manifest.ids }));
        return 2;
      }
      case 'done':
        // Verify absence through the same status path; accept only actual HTTP 404.
        try { await memory.status(state.id); }
        catch (error) {
          if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
            console.log(JSON.stringify({ state: 'passed', namespace: state.namespace, id: state.id, capturePid: state.capturePid, recallPids: state.recallPids, checks: ['capture', 'dynamic-wait', 'fresh-process-recall', 'PATCH-correction', 'global-isolation', 'approved-exact-forget', 'approved-document-delete'] })); return 0;
          }
          throw error;
        }
        throw new Error('Deleted source still exists.');
    }
  }
}
try { process.exitCode = await run(); }
catch (error) { console.error(JSON.stringify(safeFailure(error))); process.exitCode = 1; }
