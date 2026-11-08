import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const cwd = process.argv[2];
assert.ok(cwd, 'Expected explicit project path');
const start = performance.now();
const child = spawn('C:/Users/Indrimeilla-PC/.bun/bin/omp.exe', ['--mode','rpc','--no-ui','--no-session','--no-title','--no-extensions','--config',new URL('./inspection.yml',import.meta.url).pathname.replace(/^\//,'')], {cwd,windowsHide:true,stdio:['pipe','pipe','pipe']});
let buffer = '', errors = 0, result;
const timer = setTimeout(()=>child.kill(),60000);
child.stderr.on('data',()=>{errors++;});
child.stdout.on('data', chunk=>{
  buffer += chunk;
  while (buffer.includes('\n')) {
    const at=buffer.indexOf('\n'); const line=buffer.slice(0,at); buffer=buffer.slice(at+1);
    let frame; try { frame=JSON.parse(line); } catch { continue; }
    if(frame.type==='ready') child.stdin.write('{"id":"commands","type":"get_available_commands"}\n');
    if(frame.id==='commands') {
      assert.equal(frame.success,true,'RPC command failed');
      const skills=frame.data.commands.filter(x=>x.source==='skill').map(x=>x.name).sort();
      assert.ok(skills.includes('skill:systematic-debugging'));
      assert.ok(skills.includes('skill:impeccable'));
      assert.equal(new Set(skills).size,skills.length,'Duplicate skill command names');
      for(const name of ['mcp-builder','terraform-policy']) {
        assert.ok(skills.includes('skill:'+name),'Missing native upgraded skill');
        assert.ok(!skills.some(x=>x.endsWith('/'+name)),'Old alias remains exposed');
      }
      result={cwd,skills,count:skills.length,elapsedMs:Math.round(performance.now()-start),inferenceRequested:false,extensionsDisabledForInspection:true};
      child.stdin.end();
    }
  }
});
const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
clearTimeout(timer);
assert.equal(code,0,'RPC process failed or timed out'); assert.ok(result,'No command inventory returned');
result.stderrChunks=errors;
await writeFile(new URL('./rpc-'+cwd.split('/').at(-1)+'.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
