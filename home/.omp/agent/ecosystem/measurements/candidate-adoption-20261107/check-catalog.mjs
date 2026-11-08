import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
const cwd = process.argv[2];
assert.ok(cwd, 'Expected explicit cwd');
const selection = JSON.parse(await readFile(new URL('./selection.json',import.meta.url),'utf8'));
const overlay = new URL('../global-optimization-20261107/inspection.yml',import.meta.url).pathname.replace(/^\//,'');
const child = spawn('C:/Users/Indrimeilla-PC/.bun/bin/omp.exe',['--mode','rpc','--no-ui','--no-session','--no-title','--no-extensions','--tools','read','--config',overlay],{cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
let buffer='', state, error, stderrChunks=0;
const deadline=setTimeout(()=>{error=new Error('RPC catalog deadline');child.kill();},60000);
child.stderr.on('data',()=>{stderrChunks++;});
child.stdout.on('data',chunk=>{
  buffer+=chunk;
  while(buffer.includes('\n')){
    const index=buffer.indexOf('\n'); const line=buffer.slice(0,index);buffer=buffer.slice(index+1);
    let frame;try{frame=JSON.parse(line);}catch{continue;}
    if(frame.type==='ready')child.stdin.write('{"id":"catalog","type":"get_state"}\n');
    if(frame.id==='catalog'){
      if(!frame.success)error=new Error('RPC state failed');
      else state=frame.data;
      child.stdin.end();
    }
  }
});
const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
clearTimeout(deadline);if(error)throw error;assert.equal(code,0);assert.ok(state?.systemPrompt);
const catalog=state.systemPrompt.join('\n').match(/<skills>([\s\S]*?)<\/skills>/)?.[1];
assert.ok(catalog,'No model-visible catalog');
const checks=selection.skills.map(skill=>{const visible=catalog.split('\n').some(line=>line.startsWith('- '+skill.name+':'));assert.equal(visible,!skill.manual,'Catalog activation mismatch '+skill.name);return{name:skill.name,visible,manual:skill.manual};});
const result={cwd,checks,stderrChunks,inferenceRequested:false,scope:'Fresh model-visible metadata; no private session content retained'};
await writeFile(new URL('./catalog-'+cwd.split(/[\\/]/).at(-1)+'.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
