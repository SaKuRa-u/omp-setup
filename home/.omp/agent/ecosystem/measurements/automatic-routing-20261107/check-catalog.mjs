import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const selection=JSON.parse(await readFile(new URL('./selection.json',import.meta.url),'utf8'));
const exe='C:/Users/Indrimeilla-PC/.bun/bin/omp.exe';
const overlay=fileURLToPath(new URL('../global-optimization-20261107/inspection.yml',import.meta.url));
const old=JSON.parse(await readFile(new URL('../candidate-adoption-20261107/native-baseline.json',import.meta.url),'utf8'));
async function check(cwd){
  const listed=spawnSync(exe,['skill','list','--json'],{cwd,encoding:'utf8',windowsHide:true,timeout:60000,maxBuffer:16*1024*1024});
  assert.equal(listed.status,0);
  const inventory=JSON.parse(listed.stdout);
  const names=inventory.skills.map(s=>s.name);
  assert.equal(new Set(names).size,names.length);
  assert.deepEqual(old.skills.filter(s=>!names.includes(s.name)),[]);
  for(const skill of selection.skills){
    const found=inventory.skills.find(s=>s.name===skill.name);
    assert.ok(found,skill.name);
    assert.equal(Boolean(found.hide),skill.manual,skill.name);
  }
  const child=spawn(exe,['--mode','rpc','--no-ui','--no-session','--no-title','--no-extensions','--tools','read','--config',overlay],{cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
  let buffer='',state,failure,stderr='';
  const deadline=setTimeout(()=>{failure=new Error('RPC deadline');child.kill();},90000);
  child.stderr.on('data',chunk=>{stderr+=chunk;});
  child.stdout.on('data',chunk=>{
    buffer+=chunk;
    while(buffer.includes('\n')){
      const end=buffer.indexOf('\n'),line=buffer.slice(0,end);buffer=buffer.slice(end+1);
      let frame;try{frame=JSON.parse(line);}catch{continue;}
      if(frame.type==='ready')child.stdin.write('{"id":"catalog","type":"get_state"}\n');
      if(frame.id==='catalog'){
        if(!frame.success)failure=new Error('RPC get_state failed');else state=frame.data;
        child.stdin.end();
      }
    }
  });
  const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
  clearTimeout(deadline);if(failure)throw failure;assert.equal(code,0);
  const catalog=state?.systemPrompt?.join('\n').match(/<skills>([\s\S]*?)<\/skills>/)?.[1];assert.ok(catalog);
  const lines=catalog.split('\n');
  const checks=selection.skills.map(s=>{const visible=lines.some(line=>line.startsWith('- '+s.name+':'));assert.equal(visible,!s.manual,s.name);return{name:s.name,manual:s.manual,visible};});
  const result={cwd,registered:names.length,hidden:inventory.skills.filter(s=>s.hide).map(s=>s.name),visibleCatalogEntries:lines.filter(line=>line.startsWith('- ')).length,catalogCharacters:catalog.length,checks,baselinePreserved:true,warnings:stderr.split('\n').filter(line=>line.includes('Warning:')),inferenceRequested:false};
  await writeFile(new URL('./catalog-'+cwd.split(/[\\/]/).at(-1)+'.json',import.meta.url),JSON.stringify(result,null,2));
  return {cwd,registered:result.registered,visible:result.visibleCatalogEntries,hidden:result.hidden.length,selectedVisible:checks.filter(s=>s.visible).length,selectedHidden:checks.filter(s=>!s.visible).length};
}
const results=await Promise.all([root.replace(/[\\/]$/,''),'C:/Users/Indrimeilla-PC/orca/projects/management-hub','C:/Users/Indrimeilla-PC/orca/projects/Onboarding'].map(check));
const raw=spawnSync(exe,['config','list','--json'],{cwd:root,windowsHide:true,encoding:'utf8',timeout:60000,maxBuffer:16*1024*1024});assert.equal(raw.status,0);
const cfg=JSON.parse(raw.stdout);
assert.deepEqual([...cfg['skills.manualSkills'].value].sort(),[...selection.retainedExplicit].sort());
assert.equal(cfg['memory.backend'].value,'off');assert.equal(cfg['tools.approvalMode'].value,'yolo');
const safe={results,security:{memory:cfg['memory.backend'].value,approval:cfg['tools.approvalMode'].value,modelRoles:cfg.modelRoles.value}};
await writeFile(new URL('./catalog-acceptance.json',import.meta.url),JSON.stringify(safe,null,2));
console.log(JSON.stringify(safe));
