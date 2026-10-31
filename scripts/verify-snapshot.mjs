import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const excludedDirectories = new Set([
  '.git', 'secrets', 'credentials', 'sessions', 'history', 'blobs',
  'browser-profiles', 'state', 'backups', 'node_modules', 'venv', '.venv', '__pycache__',
]);
const excludedFile = /^(?:\.env(?:\..*)?|auth\.json|credentials\.json)$|\.(?:dpapi|key|pem|pfx|p12|db(?:-.*)?|sqlite.*|log|exe|dll|whl|zip|tgz|tar\.gz)$/i;

function checkPath(path) {
  assert.equal(typeof path, 'string', 'Path manifest harus string');
  const parts = path.split('/');
  assert(parts.length >= 2 && parts[0] === 'home', `Path harus berada di home/: ${path}`);
  for (const part of parts) {
    assert(part && part !== '.' && part !== '..', `Komponen path tidak aman: ${path}`);
    assert(!/[\\<>:"|?*\x00-\x1f\x7f]/.test(part) && !/[. ]$/.test(part), `Path tidak portable: ${path}`);
    assert(!/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part), `Nama perangkat Windows: ${path}`);
  }
  assert(!parts.slice(1, -1).some(part => excludedDirectories.has(part.toLowerCase())), `Direktori terlarang: ${path}`);
  assert(!excludedFile.test(parts.at(-1)), `Berkas terlarang: ${path}`);
  return path.toLowerCase();
}

function manifestEntries(manifest) {
  assert(Array.isArray(manifest?.files) && manifest.files.length > 0, 'Manifest harus berisi files yang tidak kosong');
  const entries = new Map();
  const foldedPaths = new Set();
  for (const entry of manifest.files) {
    assert(entry && typeof entry === 'object', 'Entri manifest harus object');
    const folded = checkPath(entry.path);
    assert(!foldedPaths.has(folded), `Path duplikat/case collision: ${entry.path}`);
    foldedPaths.add(folded);
    assert(Number.isSafeInteger(entry.bytes) && entry.bytes >= 0, `Ukuran tidak valid: ${entry.path}`);
    assert(typeof entry.sha256 === 'string' && /^[a-f0-9]{64}$/i.test(entry.sha256), `SHA-256 tidak valid: ${entry.path}`);
    entries.set(entry.path, entry);
  }
  return entries;
}

function measure(bytes) {
  return { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}

function compare(entries, actual) {
  for (const [path, expected] of entries) {
    const found = actual.get(path);
    assert(found, `Berkas hilang: ${path}`);
    assert.equal(found.bytes, expected.bytes, `Ukuran berbeda: ${path}`);
    assert.equal(found.sha256, expected.sha256.toLowerCase(), `SHA-256 berbeda: ${path}`);
  }
  for (const path of actual.keys()) {
    assert(entries.has(path), `Berkas tidak terdaftar: ${path}`);
  }
}

async function inventory() {
  const actual = new Map();
  const foldedPaths = new Set();
  async function visit(relative) {
    const absolute = join(root, ...relative.split('/'));
    const stat = await lstat(absolute);
    assert(!stat.isSymbolicLink(), `Symlink/junction tidak didukung: ${relative}`);
    if (relative !== 'home') checkPath(relative);
    if (stat.isDirectory()) {
      assert(!excludedDirectories.has(relative.split('/').at(-1).toLowerCase()), `Direktori terlarang: ${relative}`);
      for (const name of await readdir(absolute)) await visit(`${relative}/${name}`);
    } else {
      assert(stat.isFile(), `Bukan berkas reguler: ${relative}`);
      const folded = checkPath(relative);
      assert(!foldedPaths.has(folded), `Path case collision: ${relative}`);
      foldedPaths.add(folded);
      actual.set(relative, measure(await readFile(absolute)));
    }
  }
  await visit('home');
  return actual;
}

function selfTest() {
  const path = 'home/.omp/agent/fixture.txt';
  const bytes = Buffer.from('snapshot\n');
  const entry = { path, ...measure(bytes) };
  const entries = manifestEntries({ files: [entry] });
  compare(entries, new Map([[path, measure(bytes)]]));
  assert.throws(() => compare(entries, new Map([[path, measure(Buffer.from('Snapshot\n'))]])), /SHA-256 berbeda/);
  assert.throws(() => compare(entries, new Map([[path, measure(Buffer.from('short'))]])), /Ukuran berbeda/);
  assert.throws(() => compare(entries, new Map()), /Berkas hilang/);
  assert.throws(() => compare(entries, new Map([[path, measure(bytes)], ['home/extra.txt', measure(bytes)]])), /tidak terdaftar/);
  assert.throws(() => manifestEntries({ files: [entry, entry] }), /duplikat/);
  assert.throws(() => manifestEntries({ files: [entry, { ...entry, path: path.toUpperCase().replace('HOME/', 'home/') }] }), /collision/);
  for (const unsafe of [
    '../outside.txt', '/home/file.txt', 'home/../outside.txt', 'home/./file.txt',
    'home//file.txt', 'home/C:/file.txt', 'home/file:stream', 'home/dir\\file.txt',
    'home/file.txt.', 'home/CON.txt', 'home/.env', 'home/state/settings.yml',
    'home/secrets/key.txt', 'home/tool.exe',
  ]) {
    assert.throws(() => manifestEntries({ files: [{ ...entry, path: unsafe }] }), undefined, unsafe);
  }
  assert.throws(() => manifestEntries({ files: [{ ...entry, bytes: -1 }] }), /Ukuran tidak valid/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, sha256: 'invalid' }] }), /SHA-256 tidak valid/);
  assert.throws(() => manifestEntries({ files: [] }), /tidak kosong/);
  console.log('Self-check lulus: integritas byte/hash, missing/unlisted, duplikat, traversal dan kebijakan path.');
}

try {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === '--help') {
    console.log('Verifikasi snapshot lokal, tanpa network, subprocess atau penulisan berkas.\nnode scripts/verify-snapshot.mjs             Periksa manifest dan seluruh berkas home/\nnode scripts/verify-snapshot.mjs --self-test Uji batas verifier dengan fixture in-memory');
  } else if (args.length === 1 && args[0] === '--self-test') {
    selfTest();
  } else {
    assert.equal(args.length, 0, 'Argumen tidak dikenal; gunakan --help');
    const manifestPath = join(root, 'snapshot-manifest.json');
    const stat = await lstat(manifestPath);
    assert(stat.isFile() && !stat.isSymbolicLink(), 'Manifest harus berkas reguler, bukan symlink');
    const manifest = JSON.parse((await readFile(manifestPath, 'utf8')).replace(/^\uFEFF/, ''));
    const entries = manifestEntries(manifest);
    compare(entries, await inventory());
    console.log(`Snapshot cocok: ${entries.size} berkas; ukuran dan SHA-256 sesuai manifest.`);
  }
} catch (error) {
  console.error(`Verifikasi gagal: ${error.message}\nPeriksa snapshot/manifest terhadap sumber tepercaya; verifier tidak memperbaiki atau menyalin berkas.`);
  process.exitCode = 1;
}
