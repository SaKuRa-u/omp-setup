import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { performance } from 'node:perf_hooks';

const runtime = fileURLToPath(new URL('.',import.meta.url));
const sample = 'acceptance_7c5b26e4-b9ac-4042-ae08-5ed1d3823186';
const prefix = `Authorized native-memory comparator only. The process overlay activates an isolated Mnemopi test bank, llmMode none, no embeddings, automatic capture off. Global memory.backend remains off. This explicit synthetic comparator is the exception authorized by the user; do not invoke Supermemory, cloud memory, external tools, installers, deletion or policy edits. Use only the exposed native retain/recall/memory_edit and read tools. Public synthetic sample: ${sample}. `;

async function phase(name, instruction, isolated=false) {
  const done=Promise.withResolvers();
  const start=performance.now();
  const child=spawn(join(homedir(),'.bun/bin/omp.exe'),['-p','--mode','json','--no-session','--no-title','--config',join(runtime,isolated?'native-memory-isolation.yml':'native-memory-selftest.yml'),'--tools','read,retain,recall,memory_edit','--max-time','120s',prefix+instruction],{cwd:process.cwd(),windowsHide:true,stdio:['ignore','pipe','pipe']});
  let buffer='',stderr='';const frames=[];
  const timer=setTimeout(()=>{child.kill();done.reject(Error('Native comparator deadline'));},135000);
  child.once('error',done.reject);
  child.stderr.on('data',chunk=>{stderr+=chunk.toString();});
  child.stdout.on('data',chunk=>{buffer+=chunk.toString();for(;;){const at=buffer.indexOf('\n');if(at<0)break;const line=buffer.slice(0,at);buffer=buffer.slice(at+1);try{frames.push(JSON.parse(line));}catch{}}});
  child.once('close',code=>{clearTimeout(timer);done.resolve(code);});
  const exitCode=await done.promise;
  const messages=frames.filter(f=>f.type==='message_end'&&f.message?.role==='assistant').map(f=>f.message);
  const results=frames.filter(f=>f.type==='tool_execution_end').map(f=>({tool:f.toolName,isError:f.isError,text:f.result?.content?.filter(c=>c.type==='text').map(c=>c.text).join('\n')??'',details:f.result?.details}));
  if(exitCode!==0||results.some(r=>r.isError)||messages.at(-1)?.stopReason==='error')throw Error('Native comparator process/tool failure');
  const usage={input:0,cacheRead:0,output:0,totalTokens:0};for(const m of messages)for(const k of Object.keys(usage))usage[k]+=m.usage?.[k]??0;
  const report={name,pid:child.pid,exitCode,wallMs:performance.now()-start,usage,toolCalls:results.length,results:results.filter(r=>r.tool!=='read'||r.text.includes(sample)),stderr};
  console.log(JSON.stringify(report));
  return report;
}

const first=await phase('capture',`Store exactly one fact using retain: The public synthetic sample ${sample} has the label blue. Then recall it by the sample identifier and report the actual stored memory ID. Do not store this instruction or any other content.`);
const hit=first.results.find(r=>r.tool==='recall'&&r.text.includes(sample)&&/\bblue\b/i.test(r.text));
const nativeId=hit?.text.match(/\(id:\s*([^\)]+)\)/)?.[1];
if(!nativeId)throw Error('Capture did not produce a recallable native ID');
const fresh=await phase('fresh-process-recall',`Do not retain or update anything. Recall ${sample} and report its current label and actual ID from native recall.`);
if(!fresh.results.some(r=>r.tool==='recall'&&r.text.includes(sample)&&r.text.includes(nativeId)&&/\bblue\b/i.test(r.text)))throw Error('Fresh-process blue recall failed');
const updated=await phase('correction',`Read memory://${nativeId} in full, then use memory_edit op update on that exact native ID to replace its complete fact with: The public synthetic sample ${sample} has the label green. Do not retain another ID or delete anything.`);
if(!updated.results.some(r=>r.tool==='memory_edit'&&r.details?.status==='updated'))throw Error('Native correction not confirmed');
const corrected=await phase('fresh-process-corrected-recall',`Do not retain or update anything. Recall ${sample} and report its current label and native ID.`);
const correctedText=corrected.results.filter(r=>r.tool==='recall').map(r=>r.text).join('\n');
if(!correctedText.includes(sample)||!correctedText.includes(nativeId)||!/\bgreen\b/i.test(correctedText)||/\bblue\b/i.test(correctedText))throw Error('Native stale/corrected recall failed');
const isolation=await phase('isolated-bank-recall',`The overlay selects a different empty bank/database. Only recall ${sample}. Do not retain, update, or copy facts into this bank.`,true);
if(!isolation.results.some(r=>r.tool==='recall')||isolation.results.some(r=>r.tool==='recall'&&r.text.includes(sample)))throw Error('Native isolation failed');
console.log(JSON.stringify({state:'passed-nondestructive-stages',backend:'Mnemopi FTS-only, llmMode none',sample,nativeId,processes:[first.pid,fresh.pid,updated.pid,corrected.pid,isolation.pid],globalBackend:'off',destructiveOperations:'not run; exact ID approval required',comparisonLimit:'Native bank isolation uses separate local DB paths; no semantic embedding quality or automatic extraction comparison claimed'}));
