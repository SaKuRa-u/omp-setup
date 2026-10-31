import assert from 'node:assert/strict';
import { realpathSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(homedir(), '.omp/agent');
const source = join(homedir(), '.bun/install/global/node_modules/@oh-my-pi/pi-coding-agent/src');
const native = relative => import(pathToFileURL(join(source, relative)).href);
const discovery = await native('discovery/index.ts');
const { loadSkills } = await native('extensibility/skills.ts');
const { Settings } = await native('config/settings.ts');
const { cfgSkills } = await native('extensibility/settings.ts');
const { SkillProtocolHandler } = await native('internal-urls/skill-protocol.ts');
const { buildAvailableSlashCommands } = await native('slash-commands/available-commands.ts');
const { createAgentSession } = await native('sdk.ts');
const { SessionManager } = await native('session/session-manager.ts');
const { prompt: nativePrompt } = await import(pathToFileURL(Bun.resolveSync('@oh-my-pi/pi-utils', source)).href);
const cases = await Bun.file(join(dirname(fileURLToPath(import.meta.url)), 'skill-routing-cases.json')).json();
const expected = cases.skills.map(item => item.name).sort();
assert.equal(new Set(expected).size, expected.length, 'Duplicate routing catalog entry');
const forbidden = ['design-taste-frontend', 'redesign-existing-projects', 'agents/impeccable', 'claude/impeccable'];
const results = [];

for (const cwd of [...new Set([process.argv[2] ?? process.cwd(), tmpdir()])]) {
  const settings = await Settings.loadReadOnly({ cwd, agentDir: root });
  const release = discovery.initializeWithSettings(settings);
  let loaded;
  try {
    loaded = await loadSkills({ cwd, ...cfgSkills.get(settings) });
  } finally {
    release();
  }
  const names = loaded.skills.map(skill => skill.name).sort();
  assert.deepEqual(loaded.warnings, [], 'Native skill collision/validation warnings');
  assert.deepEqual(names, expected, 'Discovery and complete routing catalog diverge');
  for (const name of forbidden) assert.ok(!names.includes(name), `Excluded skill admitted: ${name}`);
  const commands = await buildAvailableSlashCommands({
    skills: loaded.skills,
    skillsSettings: cfgSkills.get(settings),
    customCommands: [],
    sessionManager: { getCwd: () => cwd },
    setSlashCommands() {},
  });
  assert.deepEqual(commands.filter(command => command.source === 'skill').map(command => command.name).sort(), expected.map(name => `skill:${name}`).sort());
  const protocol = new SkillProtocolHandler();
  for (const skill of loaded.skills) {
    const resource = await protocol.resolve(new URL(`skill://${skill.name}`), { skills: loaded.skills });
    assert.equal(realpathSync(resource.sourcePath), realpathSync(skill.filePath), `Wrong URI source: ${skill.name}`);
    assert.equal(Boolean(skill.hide), cases.skills.find(item => item.name === skill.name).hidden, `Explicit-only visibility changed: ${skill.name}`);
  }
  const { session, mcpManager } = await createAgentSession({
    cwd,
    agentDir: root,
    settings: settings.overlay({ 'retry.enabled': false, 'retry.modelFallback': false, 'retry.fallbackChains': {}, 'memory.backend': 'off', 'autolearn.enabled': false }),
    sessionManager: SessionManager.inMemory(cwd),
    enableMCP: false,
    enableLsp: false,
    disableExtensionDiscovery: true,
    toolNames: ['read'],
    restrictToolNames: true,
    skipPythonPreflight: true,
    cacheWarming: false,
    bindProcessState: false,
  });
  try {
    assert.equal(mcpManager, undefined, 'Smoke must not start MCP');
    assert.deepEqual(session.getActiveToolNames(), ['read'], 'Smoke exposed an unexpected tool');
    assert.deepEqual(session.skills.map(skill => skill.name).sort(), expected, 'Fresh session lost registered skills');
    const prompt = session.systemPrompt.join('\n');
    const globalPolicy = await Bun.file(join(root, 'AGENTS.md')).text();
    assert.ok(prompt.includes(nativePrompt.render('{{content}}', { content: globalPolicy }).trim()), 'Actual global policy not loaded into the fresh session');
    const listing = prompt.match(/<skills>([\s\S]*?)<\/skills>/)?.[1];
    assert.ok(listing, 'Native model-visible skill listing absent');
    for (const skill of loaded.skills) {
      const advertised = listing.includes(`- ${skill.name}:`);
      assert.equal(advertised, !skill.hide, `Wrong model-visible registration: ${skill.name}`);
    }
    results.push({ cwd, skills: names.length, modelVisible: loaded.skills.filter(skill => !skill.hide).length, hidden: loaded.skills.filter(skill => skill.hide).map(skill => skill.name), warnings: loaded.warnings, skillCommands: expected.length, resolvedSkillUris: names.length, globalRoutingLoaded: true, model: { provider: session.model.provider, id: session.model.id }, toolNames: session.getActiveToolNames(), mcpDisabled: mcpManager === undefined, modelInferenceRequested: false });
  } finally {
    await session.dispose();
  }
}
console.log(JSON.stringify({ status: 'passed', kind: 'Native discovery, command, URI and prompt smoke; not semantic selection or workload execution', results }, null, 2));
