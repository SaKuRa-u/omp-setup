// Reject rather than redact: removing a token could change a fact or destructive target.
const credential = /(?:\b(?:api[ _-]?key|access[ _-]?token|refresh[ _-]?token|auth[ _-]?token|token|password|passwd|secret|private[ _-]?key)\b\s*[=:]\s*\S+|\bbearer\s+\S+|-----BEGIN (?:[A-Z ]*PRIVATE KEY|OPENSSH PRIVATE KEY)-----|\bctx7sk-[A-Za-z0-9_-]+|\b(?:sk|sm|ghp|github_pat)[_-][A-Za-z0-9_-]{12,}|\bAKIA[A-Z0-9]{16}\b)/i;
export function assertNoSecrets(value: unknown): void {
  if (typeof value === 'string') {
    if (credential.test(value)) throw new Error('Secret-like input blocked; no request was sent.');
  } else if (Array.isArray(value)) {
    for (const entry of value) assertNoSecrets(entry);
  } else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      assertNoSecrets(key);
      if (/^(?:api[ _-]?key|token|password|passwd|secret|private[ _-]?key)$/i.test(key)) {
        throw new Error('Credential field blocked; no request was sent.');
      }
      assertNoSecrets(entry);
    }
  }
}
