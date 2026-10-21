// Local OMP integration, 2026-10-15. No upstream engine, hooks, subprocesses or network.
import { lstat, readdir, readFile, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const ignored = new Set(['.git', '.omp', '.agents', '.impeccable', 'node_modules', 'vendor', 'dist', 'build', '.next', 'coverage']);
const meta = /^(?:PRODUCT\.md|DESIGN\.md|README(?:\.[\w-]+)?|LICENSE(?:\.[\w-]+)?|NOTICE|\.gitignore|\.gitattributes)$/i;
const placeholder = /\b(?:TODO|TBD|FIXME|lorem ipsum|fill (?:this|in)|your (?:project|product) (?:name|here))\b|\[(?:Primary users|What the product|Project Title|Describe |Greenfield only:)/i;

// Check every component before reading; never follow project symlinks/junctions.
async function localFile(root, relative, maxBytes = 524288) {
  if (typeof relative !== 'string' || !relative || relative.includes('\\') || relative.includes(':') || relative.includes('\0') || path.posix.isAbsolute(relative)) throw new Error('invalid project-relative path');
  const parts = relative.split('/');
  if (parts.some(part => !part || part === '.' || part === '..')) throw new Error('invalid path component');
  let filename = root;
  for (let i = 0; i < parts.length; i++) {
    filename = path.join(filename, parts[i]);
    const info = await lstat(filename);
    if (info.isSymbolicLink()) throw new Error('symlink or junction refused');
    if (i < parts.length - 1 && !info.isDirectory()) throw new Error('parent is not a directory');
    if (i === parts.length - 1 && (!info.isFile() || info.size > maxBytes)) throw new Error('not a regular bounded file');
  }
  const canonical = await realpath(filename);
  const within = path.relative(root, canonical);
  if (within.startsWith('..') || path.isAbsolute(within)) throw new Error('outside project refused');
  const bytes = await readFile(filename);
  if (bytes.length > maxBytes) throw new Error('file grew beyond limit');
  return { bytes, sha256: digest(bytes) };
}

function sections(text) {
  const result = new Map();
  let current;
  let fenced = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const heading = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) { current = heading[1].toLowerCase(); result.set(current, ''); }
    else if (current) result.set(current, result.get(current) + '\n' + line);
  }
  return result;
}

async function document(root, name, required) {
  try {
    const file = await localFile(root, name);
    const text = file.bytes.toString('utf8');
    const headings = sections(text);
    const issues = required.filter(key => (headings.get(key) || '').replace(/<!--[^]*?-->/g, '').replace(/[^\p{L}\p{N}]/gu, '').length < 20).map(key => `missing or thin section: ${key}`);
    if (placeholder.test(text)) issues.push('unresolved template marker');
    return { status: issues.length ? 'partial' : 'complete', sha256: file.sha256, issues };
  } catch (error) {
    return { status: error.code === 'ENOENT' ? 'missing' : 'partial', issues: [error.code === 'ENOENT' ? 'document absent' : 'document unreadable or unsafe'] };
  }
}

async function projectInventory(root) {
  let count = 0;
  let incomplete = false;
  const evidence = [];
  async function walk(dir, prefix = '', depth = 0) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (++count > 5000) { incomplete = true; return; }
      if (ignored.has(entry.name)) continue;
      const relative = prefix + entry.name;
      const info = await lstat(path.join(dir, entry.name));
      if (info.isSymbolicLink()) { incomplete = true; continue; }
      if (entry.name.startsWith('.')) continue;
      if (info.isDirectory()) {
        if (depth >= 6) incomplete = true;
        else await walk(path.join(dir, entry.name), relative + '/', depth + 1);
      } else if (info.isFile() && !meta.test(entry.name) && evidence.length < 20) evidence.push(relative);
    }
  }
  await walk(root);
  return { kind: evidence.length ? 'existing' : incomplete ? 'uncertain' : 'new', evidence, incomplete };
}

export async function inspectProject(project) {
  const requested = path.resolve(project);
  if ((await lstat(requested)).isSymbolicLink()) throw new Error('project root symlink or junction refused');
  const root = await realpath(requested);
  if (!(await lstat(root)).isDirectory()) throw new Error('project must be a directory');
  const inventory = await projectInventory(root);
  const product = await document(root, 'PRODUCT.md', ['users', 'product purpose', 'capabilities and constraints']);
  const design = await document(root, 'DESIGN.md', ['overview', 'colors', 'typography', 'layout', 'components']);
  const issues = [];
  if (inventory.incomplete) issues.push('inventory incomplete: inspect manually before initialization');
  let approval = { status: 'missing', issues: ['no recorded user-approved context review'] };
  try {
    const file = await localFile(root, '.impeccable/omp-gate.json');
    const record = JSON.parse(file.bytes.toString('utf8'));
    const findings = [];
    if (record.schemaVersion !== 1 || record.decision !== 'approved-for-design') findings.push('unsupported or unapproved review');
    if (record.projectKind !== inventory.kind) findings.push('project kind changed or mismatched');
    if (!record.approval || record.approval.by !== 'user' || typeof record.approval.statement !== 'string' || record.approval.statement.trim().length < 12) findings.push('explicit user approval record missing');
    for (const [name, doc] of [['PRODUCT.md', product], ['DESIGN.md', design]]) {
      if (!doc.sha256 || record.documents?.[name] !== doc.sha256) findings.push(`${name}: review hash absent or stale`);
    }
    if (!Array.isArray(record.sources) || (inventory.kind === 'existing' && record.sources.length === 0)) findings.push('existing-project source evidence missing');
    else for (const source of record.sources) {
      try {
        // An explicit source allowlist still cannot read hidden/credential files.
        if (typeof source.path !== 'string' || source.path.split('/').some(part => part.startsWith('.') || /^(?:secrets?|credentials?|auth|tokens?)$/i.test(part)) || /\.(?:pem|key|pfx|p12)$/i.test(source.path)) throw new Error('sensitive path refused');
        const found = await localFile(root, source.path, 4194304);
        if (found.sha256 !== source.sha256) findings.push('source evidence changed');
      } catch { findings.push('source evidence missing or unsafe'); }
    }
    if (!Array.isArray(record.references) || record.references.some(ref => !ref || !['user', 'repository'].includes(ref.origin) || typeof ref.value !== 'string' || !ref.value.trim())) findings.push('references must be explicitly attributed, or an empty list');
    if (typeof record.scope !== 'string' || record.scope.trim().length < 12) findings.push('review scope missing');
    approval = { status: findings.length ? 'partial' : 'recorded', issues: findings, authenticity: 'user approval is a record, not independently authenticated' };
  } catch (error) {
    if (error.code !== 'ENOENT') approval = { status: 'partial', issues: ['review record malformed, unreadable or unsafe'] };
  }
  const ready = product.status === 'complete' && design.status === 'complete' && approval.status === 'recorded' && !inventory.incomplete;
  const status = ready ? 'ready' : product.status === 'missing' && design.status === 'missing' && approval.status === 'missing' ? 'missing' : 'partial';
  const documentsStatus = product.status === 'missing' && design.status === 'missing'
    ? 'missing' : product.status === 'complete' && design.status === 'complete' ? 'present' : 'partial';
  return {
    schemaVersion: 1, project: root, projectKind: inventory.kind, status,
    projectState: inventory.kind === 'new' ? 'empty' : inventory.kind,
    documentsStatus,
    meaning: 'Context readiness only; not a design-quality, security, accessibility or visual pass.',
    inventory, documents: { 'PRODUCT.md': product, 'DESIGN.md': design }, approval, issues,
    visualVerification: 'not-performed',
    limits: ['Heuristic section checks do not establish factual correctness.', 'Only explicitly cited source files are fingerprinted; uncited implementation drift requires human review.', 'References are recorded, never fetched or invented.', 'No ancestor context discovery, installs, hooks, writes, subprocesses or network.'],
    nextAction: ready ? 'Read the reviewed context and inspect the requested surface before UI changes.' : inventory.kind === 'existing' ? 'Read incumbent code and visual evidence; offer user-authorized context init or scoped refinement without replacing identity.' : 'Offer user-authorized product init and an explicit visual-direction decision; do not manufacture missing facts.'
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--project') {
    console.error('Usage: node design-gate.mjs --project <project-root>');
    process.exitCode = 2;
  } else {
    try {
      const result = await inspectProject(args[1]);
      console.log(JSON.stringify(result, null, 2));
      process.exitCode = result.status === 'ready' ? 0 : 1;
    } catch {
      console.error(JSON.stringify({ status: 'error', reason: 'Project root unavailable, unsafe or unreadable.' }));
      process.exitCode = 2;
    }
  }
}
