import { readFile, realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assertNoSecrets } from './secret-filter.ts';

export type WriteAction = 'capture' | 'update' | 'forget' | 'delete-doc';
interface Policy {
  version: number;
  projects: { root: string; slug: string; allowCapture: boolean }[];
  globalWriteActions: WriteAction[];
}
export interface Scope { namespace: string; recallNamespaces: string[]; canWrite(action: WriteAction): void }
export function validateNamespace(namespace: string): string {
  // OpenAPI: maxLength 100, ^[a-zA-Z0-9_:-]+$; local names intentionally narrower.
  if (namespace.length > 100 || !/^omp_[a-z0-9_-]+$/.test(namespace)) throw new Error('Invalid memory namespace.');
  assertNoSecrets(namespace);
  return namespace;
}
async function canonical(path: string): Promise<string> {
  const actual = await realpath(resolve(path));
  return process.platform === 'win32' ? actual.replaceAll('\\', '/').toLowerCase() : actual;
}
export async function loadScope(options: { selftest?: boolean; global?: boolean } = {}): Promise<Scope> {
  if (options.selftest && options.global) throw new Error('Choose exactly one scope.');
  if (options.selftest) return { namespace: 'omp_selftest', recallNamespaces: ['omp_selftest'], canWrite() {} };
  const policy: Policy = JSON.parse(await readFile(new URL('../memory-policy.json', import.meta.url), 'utf8'));
  if (policy.version !== 1 || !Array.isArray(policy.projects) || !Array.isArray(policy.globalWriteActions)) throw new Error('Invalid memory policy.');
  if (options.global) return {
    namespace: 'omp_global', recallNamespaces: ['omp_global'],
    canWrite(action) { if (!policy.globalWriteActions.includes(action)) throw new Error('Global action is not allowlisted in memory-policy.json.'); },
  };
  const cwd = await canonical(process.cwd());
  const matches: { root: string; slug: string; allowCapture: boolean }[] = [];
  const slugs = new Set<string>();
  for (const project of policy.projects) {
    if (typeof project.root !== 'string' || !/^[a-z0-9][a-z0-9_-]*$/.test(project.slug) || ['global', 'selftest'].includes(project.slug) || typeof project.allowCapture !== 'boolean') throw new Error('Invalid project policy.');
    if (slugs.has(project.slug)) throw new Error('Distinct project mappings must have distinct namespaces.');
    slugs.add(project.slug);
    validateNamespace(`omp_${project.slug}`);
    const root = await canonical(project.root);
    if (cwd === root || cwd.startsWith(root + '/')) matches.push({ ...project, root });
  }
  matches.sort((a, b) => b.root.length - a.root.length);
  if (!matches.length || (matches[1] && matches[0].root === matches[1].root)) throw new Error('Current directory has no unique canonical project mapping. Configure memory-policy.json first.');
  const project = matches[0];
  const namespace = validateNamespace(`omp_${project.slug}`);
  return {
    namespace, recallNamespaces: [namespace, 'omp_global'],
    canWrite() { if (!project.allowCapture) throw new Error('Project writes are disabled by policy (default NONE).'); },
  };
}
