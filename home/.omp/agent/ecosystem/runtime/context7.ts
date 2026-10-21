import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { readSecret, CredentialError } from './lib/secrets.ts';
import { assertNoSecrets } from './lib/secret-filter.ts';

export const runtimeDir = dirname(fileURLToPath(import.meta.url));
export const MAX_BYTES = 2 * 1024 * 1024;
export const REQUEST_TIMEOUT_MS = 70_000;
export const nodeExecutable = process.versions.bun ? 'node' : process.execPath;
export type DocsRequest = { operation: 'resolve' | 'query'; library: string; query: string; language?: string };

export class Context7Error extends Error {
  readonly code: string;
  constructor(code: string) { super(`Context7 request failed (${code}).`); this.code = code; }
}

// A lexical guard is not a confidentiality classifier. Callers must first rewrite
// their question to public library/API terms; no project text or source is accepted.
export function validateRequest(request: DocsRequest): void {
  assertNoSecrets(request);
  if (request.operation !== 'resolve' && request.operation !== 'query') throw new Context7Error('invalid-command');
  if (typeof request.query !== 'string' || request.query.length < 8 || request.query.length > 500 ||
      /[\x00-\x1f\x7f]/.test(request.query) ||
      /(?:https?:|www\.|[A-Z]:[\\/]|\/Users\/|\/home\/|\b(?:proprietary|confidential|internal|customer|client data|my company|our company)\b)/i.test(request.query)) {
    throw new Context7Error('public-docs-query-required');
  }
  const pattern = request.operation === 'resolve'
    ? /^[A-Za-z0-9@][A-Za-z0-9@/_. +:-]{0,99}$/
    : /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.+-]+)?$/;
  if (typeof request.library !== 'string' || !pattern.test(request.library)) throw new Context7Error('invalid-library');
  if (request.language !== undefined && (request.operation !== 'query' || !/^[A-Za-z0-9#+ .-]{1,40}$/.test(request.language))) {
    throw new Context7Error('invalid-language');
  }
}

export function childEnvironment(key?: string, home?: string): NodeJS.ProcessEnv {
  const environment: NodeJS.ProcessEnv = {};
  // No inherited cloud keys, NODE_OPTIONS, package-manager hooks, or proxy credentials.
  for (const name of ['SystemRoot', 'WINDIR', 'PATH', 'Path', 'PATHEXT', 'TEMP', 'TMP', 'NODE_EXTRA_CA_CERTS']) {
    if (process.env[name]) environment[name] = process.env[name];
  }
  if (home) {
    environment.HOME = home;
    environment.USERPROFILE = home;
    environment.XDG_CONFIG_HOME = home;
    environment.XDG_CACHE_HOME = home;
    environment.APPDATA = home;
    environment.LOCALAPPDATA = home;
  }
  environment.CTX7_TELEMETRY_DISABLED = '1';
  environment.OTEL_SDK_DISABLED = 'true';
  environment.OTEL_METRICS_EXPORTER = 'none';
  environment.NO_COLOR = '1';
  environment.FORCE_COLOR = '0';
  if (key) environment.CONTEXT7_API_KEY = key;
  return environment;
}

export async function pinnedBin(route: 'cli' | 'mcp'): Promise<string> {
  const name = route === 'cli' ? 'ctx7' : '@upstash/context7-mcp';
  const expectedVersion = route === 'cli' ? '0.6.1' : '4.4.4';
  const packageRoot = route === 'cli' ? runtimeDir : resolve(runtimeDir, 'context7', expectedVersion);
  try {
    const metadata = z.object({ name: z.string(), version: z.string(), bin: z.record(z.string(), z.string()) })
      .parse(JSON.parse(await readFile(resolve(packageRoot, 'node_modules', name, 'package.json'), 'utf8')));
    if (metadata.name !== name || metadata.version !== expectedVersion ||
        metadata.bin?.[route === 'cli' ? 'ctx7' : 'context7-mcp'] !== (route === 'cli' ? './dist/index.js' : 'dist/index.js')) {
      throw new Error();
    }
    return resolve(packageRoot, 'node_modules', name, 'dist/index.js');
  } catch { throw new Context7Error('pinned-package-unavailable'); }
}

export function sanitizeValue<T>(value: T, key: string): T {
  // Walk decoded values so escaped credentials cannot evade exact-key removal.
  const visit = (item: unknown): unknown => {
    if (typeof item === 'string') return item.split(key).join('[REDACTED]');
    if (Array.isArray(item)) return item.map(visit);
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).map(([name, entry]) => [name.split(key).join('[REDACTED]'), visit(entry)]));
    return item;
  };
  // Public auth docs legitimately contain placeholder password/token assignments.
  // Apply the lexical filter to outbound inputs, not untrusted reference examples;
  // the response boundary only removes the actual injected credential.
  return visit(value) as T;
}

export function cleanError(error: unknown): { error: string; message: string } {
  if (error instanceof CredentialError) return { error: 'credential-unavailable', message: 'Context7 credential unavailable. Use approved DPAPI intake first.' };
  if (error instanceof Context7Error) return { error: error.code, message: error.message };
  return { error: 'request-failed', message: 'Context7 request failed. No vendor diagnostic or credential was emitted.' };
}

export async function runCli(request: DocsRequest, timeoutMs = REQUEST_TIMEOUT_MS) {
  validateRequest(request);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > REQUEST_TIMEOUT_MS) throw new Context7Error('invalid-timeout');
  const bin = await pinnedBin('cli');
  const key = await readSecret('context7');
  const home = await mkdtemp(resolve(runtimeDir, '.context7-child-'));
  const args = [bin, request.operation === 'resolve' ? 'library' : 'docs', request.library, request.query, '--json'];
  if (request.language) args.push('--language', request.language);
  const start = performance.now();
  try {
    const deferred = Promise.withResolvers<{ stdout: string; stderrBytes: number }>();
    execFile(nodeExecutable, args, {
      cwd: home, env: childEnvironment(key, home), timeout: timeoutMs,
      maxBuffer: MAX_BYTES, windowsHide: true, encoding: 'utf8',
    }, (error, stdout, stderr) => {
      if (error) { deferred.reject(new Context7Error(error.killed ? 'timeout-or-output-limit' : 'vendor-command-failed')); return; }
      deferred.resolve({ stdout, stderrBytes: Buffer.byteLength(stderr) });
    });
    const { stdout, stderrBytes } = await deferred.promise;
    let data: unknown;
    try { data = JSON.parse(stdout); }
    catch {
      // ctx7 emits a warning rather than JSON for an empty successful result.
      if (request.operation === 'resolve' && stdout.includes('No libraries found matching')) data = [];
      else if (request.operation === 'query' && stdout.includes('No documentation found for:')) data = { codeSnippets: [], infoSnippets: [] };
      else throw new Context7Error('invalid-vendor-response');
    }
    data = sanitizeValue(data, key);
    return {
      route: 'cli', operation: request.operation, data,
      metrics: { durationMs: Math.round(performance.now() - start), stdoutBytes: Buffer.byteLength(stdout), stderrBytes },
    };
  } finally { await rm(home, { recursive: true, force: true }); }
}

function parseArguments(args: string[]): DocsRequest {
  const [operation, library, query, ...options] = args;
  if ((operation !== 'resolve' && operation !== 'query') || !library || !query ||
      (options.length !== 0 && !(operation === 'query' && options.length === 2 && options[0] === '--language'))) {
    throw new Context7Error('usage-resolve-or-query');
  }
  return { operation, library, query, ...(options.length ? { language: options[1] } : {}) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await runCli(parseArguments(process.argv.slice(2))))); }
  catch (error) { console.error(JSON.stringify(cleanError(error))); process.exitCode = 1; }
}
