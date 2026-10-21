import { spawn } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';

const scenarios = [
  {name:'A_chunk',prompt:'Gunakan skill tdd. Smoke test sintetis yang disetujui; seam sudah diputuskan: chunk(items,size), array tidak dimutasi, size integer positif atau RangeError. Kode awal: function chunk(items,size){if(!Number.isInteger(size)||size<1)throw new RangeError();const out=[];for(let i=0;i<items.length;i+=size)out.push(items.slice(i,i+size-1));return out}. Kerjakan HANYA di RAM melalui eval, tanpa file/network/subagent/dependency baru. Buktikan RED lalu perbaikan GREEN. Periksa sembilan assertion: chunk([1,2,3],2), array kosong, size=1, size lebih besar, input frozen tetap utuh, serta size 0,-1,1.5,NaN. Jalankan assertion nyata node:assert/strict. Laporkan hasil aktual singkat; jangan sekadar mencetak PASS.'},
  {name:'B_TTL',prompt:'Gunakan systematic-debugging untuk bug sintetis ini, HANYA di RAM melalui eval. Jangan file/network/subagent/install. Kode: function get(entry,now){if(!entry||now>entry.expires)return null;return entry.value||null}. Clock diinjeksi. Reproduksi masalah pada now===expires dan value 0/false, jelaskan akar sebab, lalu perbaiki. Jalankan tujuh assertion node:assert/strict: entry tidak ada, sebelum expiry, tepat expiry, setelah expiry, nilai 0,false,string kosong. Buktikan hasil aktual before/after singkat. Jangan membaca environment atau credential.'},
  {name:'C_native_review',prompt:'/review Review ONLY this provided synthetic diff, not a repository: function canRead(session,doc){\n- return session.active && session.userId === doc.ownerId;\n+ return session.active || session.userId === doc.ownerId;\n}. No filesystem/network/subagents/dependencies. Prove the authorization regression through an actual four-case truth table in eval RAM (active owner, active nonowner, inactive owner, inactive nonowner). Report actionable bug findings, not spec/style review. This self-contained diff is the complete target.'},
  {name:'D_negative_trigger',prompt:'Berapa 2 + 2? Jawab singkat dalam Bahasa Indonesia. Ini Q&A biasa, bukan permintaan menulis kode, debugging, review, memory, dokumentasi, atau membuat skill.'}
];

async function run(scenario) {
  const {promise,resolve,reject} = Promise.withResolvers();
  const start=performance.now();
  const child=spawn(join(homedir(),'.bun/bin/omp.exe'),['-p','--mode','json','--no-session','--no-title','--tools','read,eval,bash,glob,grep','--max-time','180s',scenario.prompt],{cwd:process.cwd(),windowsHide:true,stdio:['ignore','pipe','pipe']});
  let buffer='',stderr='';
  const frames=[];
  const timer=setTimeout(()=>{child.kill();reject(Error('Behavior smoke deadline exceeded: '+scenario.name));},200000);
  child.once('error',reject);
  child.stderr.on('data',chunk=>{stderr+=chunk.toString()});
  child.stdout.on('data',chunk=>{
    buffer+=chunk.toString();
    for(;;){const at=buffer.indexOf('\n');if(at<0)break;const line=buffer.slice(0,at);buffer=buffer.slice(at+1);try{frames.push(JSON.parse(line))}catch{}}
  });
  child.once('close',code=>{clearTimeout(timer);resolve(code)});
  const exitCode=await promise;
  const messages=frames.filter(x=>x.type==='message_end'&&x.message?.role==='assistant').map(x=>x.message);
  const calls=messages.flatMap(x=>x.content?.filter(c=>c.type==='toolCall')??[]);
  const results=frames.filter(x=>x.type==='tool_execution_end').map(x=>({tool:x.toolName,isError:x.isError,result:x.result?.content?.filter(c=>c.type==='text').map(c=>c.text).join('\n')}));
  const usage={input:0,cacheRead:0,output:0,totalTokens:0};
  for(const m of messages)for(const k of Object.keys(usage))usage[k]+=m.usage?.[k]??0;
  const skillReads=calls.filter(x=>x.name==='read'&&typeof x.arguments?.path==='string'&&x.arguments.path.startsWith('skill://')).map(x=>x.arguments.path);
  const answer=messages.at(-1)?.content?.filter(c=>c.type==='text').map(c=>c.text).join('\n')??'';
  return {name:scenario.name,exitCode,wallMs:performance.now()-start,modelRequests:messages.length,usage,toolCalls:calls.length,skillReads,toolResults:results,answer,stderr};
}
const selection=process.argv[2];
if(selection&&!scenarios.some(s=>s.name===selection))throw new Error('Unknown smoke scenario');
const results=[];
for(const scenario of scenarios.filter(s=>!selection||s.name===selection)){const result=await run(scenario);results.push(result);console.log(JSON.stringify(result));if(result.exitCode!==0){process.exitCode=1;break;}}
const negative=results.find(x=>x.name==='D_negative_trigger');
if(negative&&negative.skillReads.some(x=>!x.startsWith('skill://caveman'))){console.error('Negative-trigger failure: unrelated skill read');process.exitCode=1;}
