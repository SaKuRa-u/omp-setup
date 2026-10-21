import { execFile, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { z } from 'zod';
import { readSecret } from './lib/secrets.ts';
import {
  childEnvironment, cleanError, Context7Error, MAX_BYTES, nodeExecutable,
  pinnedBin, REQUEST_TIMEOUT_MS, runCli, runtimeDir,
} from './context7.ts';

const QUESTION = 'Node.js 24 fs promises readFile with UTF-8 encoding';
const MISSING = 'omp-nonexistent-library-7f14607b82e54acf';
const rpcSchema = z.object({
  jsonrpc: z.literal('2.0'), id: z.union([z.number(), z.string()]).optional(),
  result: z.record(z.string(), z.unknown()).optional(), error: z.unknown().optional(),
}).passthrough();
const contentSchema = z.object({ content: z.array(z.object({ type: z.string(), text: z.string().optional() })), isError: z.boolean().optional() });
const librarySchema = z.array(z.object({ id: z.string(), title: z.string(), versions: z.array(z.string()).optional() }).passthrough());
const toolsSchema = z.object({ tools: z.array(z.object({ name: z.string(), inputSchema: z.record(z.string(), z.unknown()) }).passthrough()) });
type RpcResponse = z.infer<typeof rpcSchema>;
type Step = { name: string; ok: boolean; durationMs: number; requestBytes?: number; responseBytes: number; detail: unknown };
type RouteReport = { route: string; status: 'passed' | 'failed'; steps: Step[]; error?: { error: string; message: string } };

function textResult(value: unknown): string {
  const parsed = contentSchema.parse(value);
  if (parsed.isError) throw new Context7Error('tool-error');
  return parsed.content.filter((item) => item.type === 'text').map((item) => item.text ?? '').join('\n');
}

function libraryCandidates(text: string) {
  const candidates: { id: string; title: string; versions?: string[] }[] = [];
  for (const block of text.split('\n----------\n')) {
    const title = /- Title:\s*([^\r\n]+)/.exec(block)?.[1]?.trim();
    const id = /- Context7-compatible library ID:\s*(\/[A-Za-z0-9_./+-]+)/.exec(block)?.[1];
    const versions = /- Versions:\s*([^\r\n]+)/.exec(block)?.[1]?.split(',').map((item) => item.trim());
    if (title && id) candidates.push({ title, id, versions });
  }
  return candidates;
}

function selectNodeLibrary(candidates: { id: string; title: string; versions?: string[] }[]) {
  // Choose only an actual returned Node documentation entry, never a fabricated ID.
  const versionedWebsite = candidates.find((item) => /node\.?js/i.test(item.title) && /^\/websites\/nodejs.*v24(?:[_.-]|$)/.test(item.id));
  const selected = versionedWebsite ?? candidates.find((item) => item.id === '/nodejs/node') ?? candidates.find((item) =>
    /node\.?js/i.test(item.title) && /^\/(?:websites|nodejs)\//.test(item.id));
  if (!selected) throw new Context7Error('node-library-not-resolved');
  const version = selected.versions?.find((item) => /^v?24(?:[._-]|$)/.test(item));
  return { id: version ? `${selected.id}/${version}` : selected.id, title: selected.title, version: version ?? (versionedWebsite ? '24.x' : null),
    versionNote: version ? 'Version 24 was advertised by the actual resolver.' : versionedWebsite ? 'Returned official website ID explicitly targets the Node.js v24 documentation.' : 'No indexed v24 was advertised; unversioned ID used and explicitly not asserted to be v24.' };
}

async function cliAcceptance(timeoutMs: number): Promise<RouteReport> {
  const report: RouteReport = { route: 'cli', status: 'failed', steps: [] };
  try {
    const bin = await pinnedBin('cli');
    const started = performance.now();
    const deferred = Promise.withResolvers<string>();
    execFile(nodeExecutable, [bin, '--help'], {
      env: childEnvironment(), cwd: runtimeDir, timeout: timeoutMs,
      maxBuffer: MAX_BYTES, encoding: 'utf8', windowsHide: true,
    }, (error, stdout) => {
      if (error) deferred.reject(new Context7Error('cli-discovery-failed'));
      else deferred.resolve(stdout);
    });
    const help = await deferred.promise;
    report.steps.push({ name: 'actual-command-discovery', ok: /library/.test(help) && /docs/.test(help),
      durationMs: Math.round(performance.now() - started), responseBytes: Buffer.byteLength(help),
      detail: { help, sha256: createHash('sha256').update(help).digest('hex') } });
    if (!report.steps[0].ok) throw new Context7Error('cli-commands-missing');
    const resolved = await runCli({ operation: 'resolve', library: 'Node.js', query: QUESTION }, timeoutMs);
    const candidates = librarySchema.parse(resolved.data);
    const selected = selectNodeLibrary(candidates);
    report.steps.push({ name: 'resolve-node', ok: true, durationMs: resolved.metrics.durationMs,
      responseBytes: resolved.metrics.stdoutBytes, detail: { selected, result: resolved.data } });
    const queried = await runCli({ operation: 'query', library: selected.id, query: QUESTION, language: 'JavaScript' }, timeoutMs);
    const docs = z.object({ codeSnippets: z.array(z.unknown()).optional(), infoSnippets: z.array(z.unknown()).optional() }).parse(queried.data);
    const relevant = /readFile/i.test(JSON.stringify(docs)) && /utf.?8/i.test(JSON.stringify(docs));
    report.steps.push({ name: 'query-node', ok: relevant, durationMs: queried.metrics.durationMs,
      responseBytes: queried.metrics.stdoutBytes, detail: queried.data });
    if (!relevant) throw new Context7Error('node-api-and-encoding-not-confirmed');
    const missing = await runCli({ operation: 'resolve', library: MISSING, query: 'Find public documentation for this nonexistent library' }, timeoutMs);
    const suggestions = librarySchema.parse(missing.data);
    const exactMatch = suggestions.some(item => item.title.toLowerCase() === MISSING || item.id.split('/').at(-1)?.toLowerCase() === MISSING);
    report.steps.push({ name: 'nonexistent-library', ok: !exactMatch, durationMs: missing.metrics.durationMs,
      responseBytes: missing.metrics.stdoutBytes, detail: { state: exactMatch ? 'unexpected-exact-match' : 'no-exact-library-match', rejectedSuggestionIds: suggestions.map(item => item.id), documentationRequestedForSuggestions: false } });
    if (exactMatch) throw new Context7Error('synthetic-missing-library-unexpectedly-exists');
    report.status = 'passed';
  } catch (error) { report.error = cleanError(error); }
  return report;
}

async function mcpAcceptance(timeoutMs: number): Promise<RouteReport> {
  const report: RouteReport = { route: 'mcp', status: 'failed', steps: [] };
  const child = spawn(nodeExecutable, [resolve(runtimeDir, 'context7-mcp.ts')], {
    cwd: runtimeDir, env: { ...childEnvironment(), USERPROFILE: process.env.USERPROFILE }, stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true,
  });
  let nextId = 0;
  let buffer = '';
  let stderrBytes = 0;
  let closed = false;
  let stdoutJsonRpcOnly = true;
  const finished = Promise.withResolvers<void>();
  type Pending = { resolve: (response: RpcResponse) => void; reject: (error: unknown) => void; timer: NodeJS.Timeout };
  const pending = new Map<number, Pending>();
  const rejectPending = () => {
    for (const item of pending.values()) { clearTimeout(item.timer); item.reject(new Context7Error('mcp-transport-failed')); }
    pending.clear();
  };
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    buffer += chunk;
    if (Buffer.byteLength(buffer) > MAX_BYTES) { stdoutJsonRpcOnly = false; rejectPending(); child.stdin.end(); return; }
    let end: number;
    while ((end = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 1);
      if (!line.trim()) continue;
      try {
        const message = rpcSchema.parse(JSON.parse(line));
        const item = typeof message.id === 'number' ? pending.get(message.id) : undefined;
        if (item) { clearTimeout(item.timer); pending.delete(Number(message.id)); item.resolve(message); }
      } catch { stdoutJsonRpcOnly = false; rejectPending(); child.stdin.end(); }
    }
  });
  child.stderr.on('data', (chunk: Buffer) => { stderrBytes += chunk.length; });
  child.stdin.on('error', rejectPending);
  child.once('error', () => { closed = true; rejectPending(); finished.resolve(); });
  child.once('close', () => { closed = true; rejectPending(); finished.resolve(); });
  const request = async (name: string, method: string, params: Record<string, unknown> = {}) => {
    if (closed) throw new Context7Error('mcp-transport-failed');
    const id = ++nextId;
    const wire = JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n';
    const deferred = Promise.withResolvers<RpcResponse>();
    const timer = setTimeout(() => { pending.delete(id); deferred.reject(new Context7Error('acceptance-timeout')); child.stdin.end(); }, timeoutMs);
    pending.set(id, { resolve: deferred.resolve, reject: deferred.reject, timer });
    const start = performance.now();
    child.stdin.write(wire);
    const message = await deferred.promise;
    if (message.error || !message.result) throw new Context7Error('mcp-protocol-error');
    report.steps.push({ name, ok: true, durationMs: Math.round(performance.now() - start),
      requestBytes: Buffer.byteLength(wire), responseBytes: Buffer.byteLength(JSON.stringify(message) + '\n'), detail: message.result });
    return message.result;
  };
  try {
    await request('initialize', 'initialize', { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'omp-context7-acceptance', version: '1.0.0' } });
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
    const discovery = await request('tools/list', 'tools/list');
    const tools = toolsSchema.parse(discovery).tools;
    if (tools.length !== 2 || !tools.some((item) => item.name === 'resolve-library-id') || !tools.some((item) => item.name === 'query-docs')) throw new Context7Error('unexpected-mcp-tool-surface');
    const descriptorJson = JSON.stringify(tools);
    report.steps[report.steps.length - 1].detail = { result: discovery,
      descriptorBytes: Buffer.byteLength(descriptorJson), descriptorSha256: createHash('sha256').update(descriptorJson).digest('hex'), descriptorJson };
    const resolved = await request('resolve-node', 'tools/call', { name: 'resolve-library-id', arguments: { libraryName: 'Node.js', query: QUESTION } });
    const resolutionText = textResult(resolved);
    const candidates = libraryCandidates(resolutionText);
    const selected = selectNodeLibrary(candidates);
    const docs = await request('query-node', 'tools/call', { name: 'query-docs', arguments: { libraryId: selected.id, query: QUESTION, language: 'JavaScript' } });
    const documentation = textResult(docs);
    if (!/readFile/i.test(documentation) || !/utf.?8/i.test(documentation)) throw new Context7Error('node-api-and-encoding-not-confirmed');
    report.steps[report.steps.length - 1].detail = { selected, result: docs };
    const missing = await request('nonexistent-library', 'tools/call', { name: 'resolve-library-id', arguments: { libraryName: MISSING, query: 'Find public documentation for this nonexistent library' } });
    const suggestions = libraryCandidates(textResult(missing));
    if (suggestions.some(item => item.title.toLowerCase() === MISSING || item.id.split('/').at(-1)?.toLowerCase() === MISSING)) throw new Context7Error('synthetic-missing-library-unexpectedly-exists');
    report.steps[report.steps.length - 1].detail = { state: 'no-exact-library-match', rejectedSuggestionIds: suggestions.map(item => item.id), documentationRequestedForSuggestions: false };
    report.status = 'passed';
  } catch (error) {
    report.error = cleanError(error);
    if (report.steps.length) report.steps[report.steps.length - 1].ok = false;
  }
  finally {
    for (const item of pending.values()) clearTimeout(item.timer);
    pending.clear();
    child.stdin.end();
    // Give the launcher EOF so it terminates its vendor child, then bound teardown.
    const hardStop = setTimeout(() => { child.kill(); }, 2_000);
    await finished.promise;
    clearTimeout(hardStop);
    report.steps.push({ name: 'transport-metering', ok: stdoutJsonRpcOnly, durationMs: 0, responseBytes: stderrBytes,
      detail: { stderrBytes, stderrSuppressed: true, timeoutMs, stdoutJsonRpcOnly } });
  }
  return report;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0 || (args.length === 1 && args[0] === '--help')) {
    console.log('Usage: node context7-acceptance.ts --live [--route both|cli|mcp] [--timeout-ms 70000]\nUses real Context7 network requests after DPAPI intake. Does not activate either OMP route.');
    return;
  }
  if (args[0] !== '--live') throw new Context7Error('acceptance-requires-live-flag');
  let route = 'both';
  let timeoutMs = REQUEST_TIMEOUT_MS;
  for (let index = 1; index < args.length; index += 2) {
    if (args[index] === '--route' && ['both', 'cli', 'mcp'].includes(args[index + 1])) route = args[index + 1];
    else if (args[index] === '--timeout-ms' && /^\d+$/.test(args[index + 1] ?? '')) timeoutMs = Number(args[index + 1]);
    else throw new Context7Error('invalid-acceptance-arguments');
  }
  if (timeoutMs < 1 || timeoutMs > REQUEST_TIMEOUT_MS) throw new Context7Error('invalid-timeout');
  // Fail closed before discovery/network when the approved credential is missing.
  await readSecret('context7');
  const routes: RouteReport[] = [];
  if (route === 'both' || route === 'cli') routes.push(await cliAcceptance(timeoutMs));
  if (route === 'both' || route === 'mcp') routes.push(await mcpAcceptance(timeoutMs));
  console.log(JSON.stringify({
    live: true, selectedRoute: null, activation: 'Neither route activated; Main must choose one only after reviewing live results.',
    target: { runtime: 'Node.js', version: 24, source: 'Available runtime, not an inferred project dependency stack.' },
    metering: { bytes: 'UTF-8 bytes, not tokens; MCP response bytes are normalized JSON-RPC, CLI stdout bytes are vendor bytes.',
      tokens: 'Not estimated. Feed descriptorJson, help, and detail JSON into the chosen model tokenizer OFFLINE; record tokenizer/model/version and special-token policy. Compare identical generic questions. Never call an LLM for metering.',
      deadlines: `Each vendor/acceptance request is bounded by ${timeoutMs} ms; credential bridge separately bounded at 10000 ms.` },
    routes,
  }, null, 2));
  if (routes.some((item) => item.status !== 'passed')) process.exitCode = 1;
}

try { await main(); }
catch (error) { console.error(JSON.stringify(cleanError(error))); process.exitCode = 1; }
