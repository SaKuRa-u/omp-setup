import { readFile, realpath } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { homedir } from 'node:os';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read the explicitly supplied current-session user message in-process. The key
// never appears in argv, environment, output, a new plaintext file or a tool call.
const [provider, sessionPath, messageId] = process.argv.slice(2);
if (!['supermemory', 'context7'].includes(provider) || !sessionPath) {
  console.error('Usage: node import-chat-key.mjs supermemory|context7 CURRENT_SESSION_JSONL [USER_MESSAGE_ID]');
  process.exit(2);
}
try {
  const root = await realpath(resolve(homedir(), '.omp/agent/sessions'));
  const actual = await realpath(sessionPath);
  const rel = relative(root, actual);
  if (rel === '..' || rel.startsWith('..\\') || rel.startsWith('../') || isAbsolute(rel) || !actual.endsWith('.jsonl')) throw Error();
  let latest;
  for (const line of (await readFile(actual, 'utf8')).split('\n')) {
    if (!line.trim()) continue;
    const entry = JSON.parse(line);
    if (entry.type === 'message' && entry.message?.role === 'user' && (!messageId || entry.id === messageId)) {
      latest = entry.message.content;
      if (messageId) break;
    }
  }
  const text = typeof latest === 'string' ? latest : Array.isArray(latest)
    ? latest.filter(x => x.type === 'text').map(x => x.text).join('\n') : '';
  const name = provider === 'supermemory' ? 'SUPERMEMORY_API_KEY' : 'CONTEXT7_API_KEY';
  const lines = text.split(/\r?\n/).map(x => x.trim());
  const matches = lines.filter(x => x.startsWith(name + '='));
  if (matches.length !== 1) throw Error();
  let key = matches[0].slice(name.length + 1).trim();
  if (key.length < 12 || /\s/.test(key) || key.length > 8192) throw Error();
  const { promise, resolve: finish, reject } = Promise.withResolvers();
  const child = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-File', fileURLToPath(new URL('./credentials.ps1', import.meta.url)), '-Action', 'set', '-Provider', provider], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
  let output = '';
  let diagnostic = '';
  child.stdout.on('data', chunk => { output += chunk.toString(); });
  child.stderr.on('data', chunk => { if (diagnostic.length < 4096) diagnostic += chunk.toString(); });
  child.once('error', reject);
  child.stdin.once('error', reject);
  const timer = setTimeout(() => { child.kill(); reject(Error()); }, 15000);
  child.once('close', code => {
    clearTimeout(timer);
    if (code === 0 && output === 'stored') { finish(); return; }
    let stage = 'intake';
    let category = 'Unknown';
    try {
      const parsed = JSON.parse(diagnostic);
      if (['initialize','exists','stdin','encrypt','directory','acl','write','read','decrypt'].includes(parsed.stage)) stage = parsed.stage;
      if (/^[A-Za-z][A-Za-z0-9]{0,79}$/.test(parsed.category)) category = parsed.category;
    } catch {}
    reject(Object.assign(new Error(stage), { category }));
  });
  child.stdin.end(key);
  key = '';
  await promise;
  console.log(JSON.stringify({ provider, status: 'stored', protection: 'DPAPI CurrentUser', plaintextFilesCreated: 0 }));
} catch (error) {
  const stage = ['initialize','exists','stdin','encrypt','directory','acl','write','read','decrypt'].includes(error?.message) ? error.message : 'intake';
  const category = /^[A-Za-z][A-Za-z0-9]{0,79}$/.test(error?.category) ? error.category : 'Unknown';
  console.error(JSON.stringify({error:'key-intake-failed',stage,category,message:'No key was displayed or overwritten.'}));
  process.exitCode = 1;
}
