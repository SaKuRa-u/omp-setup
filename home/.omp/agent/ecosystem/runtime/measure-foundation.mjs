import { spawn, execFileSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { homedir } from 'node:os';
import { join } from 'node:path';

const omp = join(homedir(), '.bun/bin/omp.exe');
const ompVersion = execFileSync(omp,['--version'],{encoding:'utf8',windowsHide:true,timeout:15000}).trim();
const cwd = process.cwd();
const expected = ['caveman','grill-me','grilling','tdd','codebase-design','code-review','systematic-debugging','verification-before-completion','receiving-code-review','skill-creator','mcp-builder','impeccable','context7-docs','supermemory-v5',
  'aws-ami-builder','azure-image-builder','azure-verified-modules','new-terraform-provider','provider-actions','provider-configuration','provider-docs','provider-ephemeral-resources','provider-framework-migration','provider-resources','provider-test-patterns','refactor-module','run-acceptance-tests','terraform-policy','terraform-search-import','terraform-stacks','terraform-style-guide','terraform-test','push-to-registry','windows-builder',
  'reverse-engineer-anything','docker-container-builds','kubernetes-manifest-operations','ansible-automation','vercel-react-best-practices','supabase-postgres-best-practices','webapp-testing',
  'ponytail','ponytail-review','ponytail-audit','ponytail-debt','ponytail-gain','ponytail-help','security-audit','computer-use','find-skills','orca-cli','orchestration'];
const { promise, resolve, reject } = Promise.withResolvers();
const started = performance.now();
// RPC startup otherwise returns after the default 250 ms MCP discovery window.
const child = spawn(omp, ['--mode','rpc','--no-ui','--no-session','--no-title'], {cwd, env:{...process.env, OMP_MCP_STARTUP_TIMEOUT_MS:'0'}, windowsHide:true, stdio:['pipe','pipe','pipe']});
let buffer = '', stderr = '', readyMs;
const frames = [];
const timer = setTimeout(() => { child.kill(); reject(new Error('Startup deadline exceeded')); }, 45_000);
child.once('error', reject);
child.stderr.on('data', chunk => { stderr += chunk.toString(); });
child.stdout.on('data', chunk => {
  buffer += chunk.toString();
  for (;;) {
    const at = buffer.indexOf('\n');
    if (at < 0) break;
    const line = buffer.slice(0,at); buffer = buffer.slice(at+1);
    if (!line.trim()) continue;
    let frame;
    try { frame = JSON.parse(line); } catch { continue; }
    frames.push(frame);
    if (frame.type === 'ready') readyMs = performance.now() - started;
    if (frames.some(x=>x.id==='state') && frames.some(x=>x.id==='commands')) child.stdin.end();
  }
});
child.once('close', code => { clearTimeout(timer); code === 0 ? resolve() : reject(new Error('OMP startup failed')); });
child.stdin.write('{"id":"state","type":"get_state"}\n{"id":"commands","type":"get_available_commands"}\n');
await promise;
const state = frames.find(x=>x.id==='state')?.data;
const commands = frames.find(x=>x.id==='commands')?.data?.commands ?? [];
const prompt = state.systemPrompt.join('\n');
const block = prompt.match(/<skills>[\s\S]*?<\/skills>/)?.[0];
const names = commands.filter(x=>x.source==='skill').map(x=>x.name.replace(/^skill:/,''));
const missing = expected.filter(x=>!names.includes(x));
const excludedPresent = ['design-taste-frontend','redesign-existing-projects','agents/impeccable'].filter(name=>names.includes(name));
if (missing.length || excludedPresent.length || !block || !prompt.includes('OMP routing and safety')) throw new Error(JSON.stringify({error:'Discovery/routing acceptance failed',missing,excludedPresent,skillMetadataPresent:!!block,globalRoutingLoaded:prompt.includes('OMP routing and safety')}));
const reaMounted = prompt.includes('xd://mcp__rea_binary_session');
const context7Mounted = prompt.includes('xd://mcp__context7_query_docs');
const semgrepMounted = prompt.includes('xd://mcp__semgrep_get_supported_languages') && prompt.includes('xd://mcp__semgrep_get_abstract_syntax_tree') && prompt.includes('xd://mcp__semgrep_scan_with_custom_rule');
if (!reaMounted || !context7Mounted || !semgrepMounted) throw new Error(JSON.stringify({error:'MCP tools not mounted after initial connection attempts',reaMounted,context7Mounted,semgrepMounted}));
const tokenization = JSON.parse(execFileSync(omp, ['toks', block, '--json'], {encoding:'utf8', timeout:30_000, windowsHide:true}));
const tokens = tokenization.encodings.find(x=>x.encoding==='O200kBase').tokens;
const resolutions = expected.map(name=>{
  const output = execFileSync(omp,['read','skill://'+name],{cwd,encoding:'utf8',timeout:30_000,windowsHide:true,maxBuffer:2*1024*1024});
  return {name,status:'resolved through OMP read',bytes:Buffer.byteLength(output)};
});
console.log(JSON.stringify({kind:'startup-and-resolution-not-behavior-test',omp:ompVersion,model:state.model.id,contextWindow:state.model.contextWindow,readyMs,contextEstimate:state.contextUsage,skillListingTokensO200k:tokens,skillWindowPercent:tokens/state.model.contextWindow*100,skills:names,reviewCommand:commands.some(c=>c.name==='review'),globalRoutingLoaded:true,reaMounted,context7Mounted,semgrepMounted,resolutions,stderr,promptInferenceRequested:false},null,2));
