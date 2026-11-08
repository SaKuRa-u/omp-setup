import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const exe='C:/Users/Indrimeilla-PC/.bun/bin/omp.exe';
const overlay=fileURLToPath(new URL('../global-optimization-20261107/inspection.yml',import.meta.url));
const selection=JSON.parse(await readFile(new URL('./selection.json',import.meta.url),'utf8'));
const model=process.argv[2]??'openai-codex/gpt-6.1-sol';
const outputDir=new URL('./default-model/',import.meta.url);
const preface='Ini fixture evaluasi sintetis dengan scope final disetujui: hanya berikan jawaban yang diminta, bukan implementasi. Tidak ada intake baru. Read-only: boleh membaca panduan yang relevan, jangan menjalankan command, membuat file, mengakses jaringan atau mengunggah data. Maksimal 150 kata bahasa Indonesia. ';
const cases=[
 {id:'company-art-direction',task:'Berikan arahan visual website baru studio rekayasa industri: identitas teknis tegas, copy lugas, bukan template SaaS generik. Audiens manajer fasilitas, tujuan meminta konsultasi, konten hanya layanan dan proses yang diketahui; tanpa statistik/testimoni rekaan. Tidak perlu kode, ilustrasi buatan API, atau workflow engine. Pilih satu pendekatan utama dan jelaskan hasil arahnya.',expectAny:['design-taste-frontend','frontend-design','hallmark'],maxUiLeads:1},
 {id:'prompt-authoring',task:'Tuliskan satu prompt siap salin untuk asisten AI OpenAI agar meninjau rencana migrasi SQLite lokal dari kolom nama ke nama_lengkap. Prompt harus meminta skema aktual, backup yang dapat dipulihkan, rollback dan verifikasi jumlah/nilai baris. Jangan menjalankan migrasi. Jangan meminta unggahan database.',expectAny:['prompt-master']},
 {id:'graph-explanation',cwd:fileURLToPath(new URL('../candidate-adoption-20261107/fixtures/ua/',import.meta.url)),task:'Jelaskan invoice_total: graph existing .ua/knowledge-graph.json ada, source fixture ada di ../graph/pricing.py dan ../graph/orders.py. Sebut pemanggil berdasarkan edge graph dan hasil prices=[10,20], tax_rate=0.1 berdasarkan source. Bedakan fakta graph dari source. Jangan generate graph baru.',expectAny:['understand-explain','understand-chat']},
 {id:'ordinary-question',task:'Berapa 17 dikali 19? Jawab hasilnya dan satu cara hitung mental singkat.',expectNone:true},
 {id:'quoted-trigger',task:'Terjemahkan kalimat log ini saja: "agent-reach and last30days are names in this log, not commands." Jangan melakukan riset atau setup.',expectNone:true},
 {id:'native-spec-no-publication',task:'Ringkas brief final berikut menjadi 4 butir spesifikasi teks lokal: aplikasi catatan offline, tambah/edit/hapus catatan, tanpa akun atau sync, ekspor JSON melalui tindakan pengguna. Jangan menerbitkan tiket, membuat artefak, memanggil setup atau mengubah gaya personal. Ini sintesis kebutuhan, bukan proposal fitur baru.',forbidManual:true}
];
async function run(test){
 const child=spawn(exe,['-p','--mode','json','--no-session','--no-title','--no-extensions','--tools','read,grep','--model',model,'--thinking','medium','--max-time','180','--config',overlay,preface+test.task],{cwd:test.cwd??root,windowsHide:true,stdio:['ignore','pipe','pipe']});
 let buffer='',stderr='',answer='',events=0;const reads=[],tools=[],errors=[];
 const timer=setTimeout(()=>{errors.push('Outer210s deadline');child.kill();},210000);
 child.stderr.on('data',chunk=>{stderr+=chunk;});
 child.stdout.on('data',chunk=>{buffer+=chunk;while(buffer.includes('\n')){
   const end=buffer.indexOf('\n'),line=buffer.slice(0,end);buffer=buffer.slice(end+1);
   let frame;try{frame=JSON.parse(line);}catch{continue;}events++;
   if(frame.type==='tool_execution_start'){tools.push(frame.toolName);if(frame.toolName==='read')reads.push(frame.args?.path??'');}
   if(frame.type==='message_end'&&frame.message?.role==='assistant')for(const part of frame.message.content??[])if(part.type==='text')answer+=part.text+'\n';
   if(frame.type==='error')errors.push(frame.message??frame.error??'Unspecified event error');
 }});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});clearTimeout(timer);
 const loaded=selection.skills.filter(s=>reads.some(p=>p.startsWith('skill://'+s.name)&&(p.length===8+s.name.length||/[:/]/.test(p[8+s.name.length]??''))||p.replaceAll('\\','/').toLowerCase()===(s.path+'/SKILL.md').replaceAll('\\','/').toLowerCase())).map(s=>s.name);
 const issues=[];
 if(code!==0)issues.push('Process exit '+code);
 if(!answer.trim())issues.push('No final text observed');
 if(test.expectAny&&!test.expectAny.some(name=>loaded.includes(name)))issues.push('Expected relevant newly-discoverable guide not loaded');
 if(test.expectNone&&loaded.length)issues.push('Candidate activated on irrelevant/quoted task');
 if(loaded.some(name=>selection.retainedExplicit.includes(name)))issues.push('Vendor explicit-only guide invoked automatically');
 if(tools.some(name=>!['read','grep'].includes(name)))issues.push('Tool outside read-only grant');
 if(test.maxUiLeads&&loaded.filter(name=>['design-taste-frontend','frontend-design','hallmark'].includes(name)).length>test.maxUiLeads)issues.push('Multiple competing candidate UI leads');
 const result={id:test.id,cwd:test.cwd??root,prompt:preface+test.task,model,exit:code,events,reads,tools,loaded,answer,issues,errors,warnings:stderr.split('\n').filter(x=>x.includes('Warning:')),passed:issues.length===0&&errors.length===0};
 await writeFile(new URL('./intent-'+test.id+'.json',outputDir),JSON.stringify(result,null,2));
 console.log(JSON.stringify({id:test.id,exit:code,loaded,tools,passed:result.passed,issues,warnings:result.warnings}));
 return result;
}
const results=[];
for(let index=0;index<cases.length;index+=2)results.push(...await Promise.all(cases.slice(index,index+2).map(run)));
await writeFile(new URL('./intent-acceptance.json',outputDir),JSON.stringify({model,scope:'Six synthetic native default-model runs; unchanged case prompts/assertions; not a general routing benchmark; raw reasoning/session content not retained',cases:results.map(x=>({id:x.id,loaded:x.loaded,passed:x.passed,issues:x.issues,warnings:x.warnings})),passed:results.filter(x=>x.passed).length,total:results.length},null,2));
assert.ok(results.every(x=>x.passed),'One or more intent cases failed; inspect saved first-pass evidence');
