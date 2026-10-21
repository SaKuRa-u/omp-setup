import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export type SecretProvider = 'supermemory' | 'context7';
const script = fileURLToPath(new URL('../credentials.ps1', import.meta.url));

export class CredentialError extends Error {
  constructor() { super('Credential unavailable. Store the key with the approved DPAPI intake first.'); }
}

export function readSecret(provider: SecretProvider): Promise<string> {
  if (provider !== 'supermemory' && provider !== 'context7') return Promise.reject(new CredentialError());
  const { promise, resolve, reject } = Promise.withResolvers<string>();
  execFile('powershell.exe', ['-NoProfile', '-NonInteractive', '-File', script, '-Action', 'get', '-Provider', provider],
    { timeout: 10_000, maxBuffer: 16_384, windowsHide: true }, (error, stdout) => {
      if (error || !stdout.trim()) { reject(new CredentialError()); return; }
      resolve(stdout.trim());
    });
  return promise;
}
