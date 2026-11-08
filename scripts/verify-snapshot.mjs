import assert from 'node:assert/strict';
import { isUtf8 } from 'node:buffer';
import { createHash } from 'node:crypto';
import { lstat, readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const excludedDirectories = new Set([
  '.git', 'secrets', 'credentials', 'sessions', 'history', 'blobs',
  'browser-profiles', 'state', 'backups', 'node_modules', 'venv', '.venv', '__pycache__',
  'scratch', 'tmp', 'temp', '.cache', 'cache', '.pytest_cache', '.mypy_cache', '.ruff_cache',
  '.tox', '.nox', '.ssh', '.aws', '.gnupg', '.kube', 'user data',
  '.mozilla', '.chromium', '.google-chrome',
]);
const excludedFile = /^(?:\.env(?:\..*)?|\.npmrc|_?netrc|\.netrc|\.pypirc|\.git-credentials|auth(?:\.(?:json|ya?ml|toml))?|credentials(?:\.(?:json|ya?ml|toml))?|oauth-tokens\.json|access-token\.json|cookies(?:\.(?:json|txt))?|storageState\.json|id_(?:rsa|dsa|ecdsa|ed25519)|kubeconfig|service-account\.json|application_default_credentials\.json|pyvenv\.cfg)$|\.(?:dpapi|key|pem|pfx|p12|jks|keystore|db(?:-.*)?|sqlite.*|tfstate(?:\..*)?|log|py[co]|exe|dll|com|msi|so(?:\.\d+)*|dylib|o|obj|a|lib|class|jar|wasm|bin|dat|whl|zip|tgz|tar|gz|bz2|xz|zst|7z|rar|iso|dmg|cab|deb|rpm|woff2?|ttf|otf|eot|png|jpe?g|gif|webp|avif|ico|bmp|tiff?|heic|pdf|docx?|xlsx?|pptx?|od[tps]|mp[34]|mov|avi|webm|wav|ogg|flac)$/i;
const binaryHeaders = [
  'MZ', '\x7fELF', '%PDF-', 'PK\x03\x04', 'PK\x05\x06', 'PK\x07\x08',
  'GIF87a', 'GIF89a', 'wOFF', 'wOF2', 'OTTO', '7z\xbc\xaf\x27\x1c', 'Rar!\x1a\x07',
].map(header => Buffer.from(header, 'latin1'));

function checkPath(path, isDirectory = false) {
  assert.equal(typeof path, 'string', 'Path manifest harus string');
  const parts = path.split('/');
  assert(parts.length >= 2 && parts[0] === 'home', `Path harus berada di home/: ${path}`);
  for (const part of parts) {
    assert(part && part !== '.' && part !== '..', `Komponen path tidak aman: ${path}`);
    assert(!/[\\<>:"|?*\x00-\x1f\x7f]/.test(part) && !/[. ]$/.test(part), `Path tidak portable: ${path}`);
    assert(!/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part), `Nama perangkat Windows: ${path}`);
  }
  const directories = isDirectory ? parts : parts.slice(0, -1);
  for (const [index, part] of directories.entries()) {
    // Distribusi plugin adalah sumber; cache lain, termasuk turunannya, tetap terlarang.
    const pluginSource = index === 3 && parts.slice(0, 4).join('/').toLowerCase() === 'home/.omp/plugins/cache';
    assert(!(excludedDirectories.has(part.toLowerCase()) && !pluginSource)
      && !/^puppeteer_dev_chrome_profile-/i.test(part), `Direktori terlarang: ${path}`);
  }
  if (!isDirectory) assert(!excludedFile.test(parts.at(-1)), `Berkas terlarang: ${path}`);
  return path.toLowerCase();
}

function manifestEntries(manifest) {
  assert(Array.isArray(manifest?.files) && manifest.files.length > 0, 'Manifest harus berisi files yang tidak kosong');
  const entries = new Map();
  const foldedPaths = new Set();
  for (const entry of manifest.files) {
    assert(entry && typeof entry === 'object' && !Array.isArray(entry), 'Entri manifest harus object');
    const folded = checkPath(entry.path);
    assert(!foldedPaths.has(folded), `Path duplikat/case collision: ${entry.path}`);
    foldedPaths.add(folded);
    assert(Number.isSafeInteger(entry.bytes) && entry.bytes >= 0, `Ukuran tidak valid: ${entry.path}`);
    assert(typeof entry.sha256 === 'string' && /^[a-f0-9]{64}$/i.test(entry.sha256), `SHA-256 tidak valid: ${entry.path}`);
    assert(typeof entry.sourceSha256 === 'string' && /^[a-f0-9]{64}$/i.test(entry.sourceSha256), `sourceSha256 tidak valid: ${entry.path}`);
    entries.set(entry.path, entry);
  }
  return entries;
}

function measure(bytes) {
  return { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}

function checkText(bytes, path) {
  assert(!bytes.includes(0), `Berkas mengandung NUL: ${path}`);
  assert(isUtf8(bytes), `Berkas bukan UTF-8 valid: ${path}`);
  assert(!binaryHeaders.some(header => bytes.indexOf(header) === 0), `Header biner terlarang: ${path}`);
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
    if (relative !== 'home') checkPath(relative, stat.isDirectory());
    if (stat.isDirectory()) {
      for (const name of await readdir(absolute)) await visit(`${relative}/${name}`);
    } else {
      assert(stat.isFile(), `Bukan berkas reguler: ${relative}`);
      const folded = checkPath(relative);
      assert(!foldedPaths.has(folded), `Path case collision: ${relative}`);
      foldedPaths.add(folded);
      const bytes = await readFile(absolute);
      checkText(bytes, relative);
      actual.set(relative, measure(bytes));
    }
  }
  await visit('home');
  return actual;
}

function selfTest() {
  const path = 'home/.omp/agent/fixture.txt';
  const bytes = Buffer.from('snapshot\n');
  const entry = { path, ...measure(bytes), sourceSha256: 'a'.repeat(64) };
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
    'home/secrets/key.txt', 'home/tool.exe', 'home/.npmrc', 'home/_netrc', 'home/.netrc',
    'home/.pypirc', 'home/.git-credentials', 'home/auth', 'home/auth.yaml', 'home/oauth-tokens.json',
    'home/cookies.txt', 'home/id_ed25519', 'home/application_default_credentials.json',
    'home/scratch/file.txt', 'home/User Data/profile.txt', 'home/.cache/file.txt', 'home/cache/file.txt',
    'home/.ssh/config', 'home/.aws/config', 'home/tmp/file.txt', 'home/.venv/pyvenv.cfg',
    'home/node_modules/module/index.js', 'home/__pycache__/module.pyc', 'home/font.woff2',
    'home/photo.PNG', 'home/manual.pdf', 'home/report.docx', 'home/lib.so', 'home/archive.7z',
    'home/.omp/plugins/cache/plugins/vendor/cache/session.txt',
    'home/puppeteer_dev_chrome_profile-abc/Preferences',
  ]) {
    assert.throws(() => manifestEntries({ files: [{ ...entry, path: unsafe }] }), undefined, unsafe);
  }
  for (const allowed of [
    'home/.omp/plugins/cache/plugins/vendor/skills/example/SKILL.md',
    'home/.omp/plugins/cache/marketplaces/vendor/marketplace.json',
    'home/vendor/tests/fixtures/example.jsonl', 'home/vendor/src/auth.py',
    'home/vendor/assets/logo.svg', 'home/.omp/agent/ecosystem/runtime/credentials.ps1',
    'home/vendor/browser/index.js', 'home/vendor/tests/fixtures/tokens.json',
    'home/vendor/src/auth/index.ts',
  ]) {
    assert.doesNotThrow(() => manifestEntries({ files: [{ ...entry, path: allowed }] }), allowed);
  }
  assert.throws(() => checkPath('home/scratch', true), /Direktori terlarang/);
  assert.doesNotThrow(() => checkPath('home/.omp/plugins/cache', true));
  assert.doesNotThrow(() => checkText(Buffer.from('teks UTF-8: é 日本語\n'), path));
  assert.doesNotThrow(() => checkText(Buffer.alloc(0), path));
  assert.throws(() => checkText(Buffer.from('text\x00hidden'), path), /NUL/);
  assert.throws(() => checkText(Buffer.from([0xc3, 0x28]), path), /UTF-8/);
  assert.throws(() => checkText(Buffer.from('%PDF-1.7\n'), path), /biner/);
  assert.throws(() => checkText(Buffer.from([0x50, 0x4b, 3, 4, 1]), path), /biner/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, sourceSha256: undefined }] }), /sourceSha256/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, sourceSha256: 'invalid' }] }), /sourceSha256/);
  assert.throws(() => manifestEntries({ files: [null] }), /harus object/);
  assert.throws(() => manifestEntries({ files: [[], entry] }), /harus object/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, path: null }] }), /harus string/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, bytes: Number.MAX_SAFE_INTEGER + 1 }] }), /Ukuran tidak valid/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, bytes: 0.5 }] }), /Ukuran tidak valid/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, bytes: -1 }] }), /Ukuran tidak valid/);
  assert.throws(() => manifestEntries({ files: [{ ...entry, sha256: 'invalid' }] }), /SHA-256 tidak valid/);
  assert.throws(() => manifestEntries({ files: [] }), /tidak kosong/);
  console.log('Self-check lulus: integritas byte/hash, metadata sumber, missing/unlisted, duplikat, traversal, path terlarang dan teks UTF-8/nonbiner.');
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
    const manifestBytes = await readFile(manifestPath);
    checkText(manifestBytes, 'snapshot-manifest.json');
    const manifest = JSON.parse(manifestBytes.toString('utf8').replace(/^\uFEFF/, ''));
    const entries = manifestEntries(manifest);
    compare(entries, await inventory());
    console.log(`Snapshot cocok: ${entries.size} berkas; ukuran dan SHA-256 sesuai manifest.`);
  }
} catch (error) {
  console.error(`Verifikasi gagal: ${error.message}\nPeriksa snapshot/manifest terhadap sumber tepercaya; verifier tidak memperbaiki atau menyalin berkas.`);
  process.exitCode = 1;
}
