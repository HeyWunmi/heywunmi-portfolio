import {readFile,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
const config=JSON.parse(await readFile('wrangler.json','utf8'));
if(config.name!=='heywunmi-portfolio'||Object.keys(config).some(k=>!['name','pages_build_output_dir','compatibility_date'].includes(k)))throw new Error('Unexpected deployment target or bindings');
const root=config.pages_build_output_dir;let count=0,total=0,largest={path:'',bytes:0};
async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){const p=join(path,entry.name);if(entry.isDirectory())await walk(p);else{const s=await stat(p);count++;total+=s.size;if(s.size>largest.bytes)largest={path:p,bytes:s.size};if(s.size>25*1024*1024)throw new Error(`Cloudflare Pages asset exceeds 25 MiB: ${p}`);if(/(?:\.env|\.pem|\.key|private-review|node_modules)/.test(p))throw new Error(`Unexpected private build asset: ${p}`);}}}
await walk(root);if(count>20000)throw new Error('File count exceeds Pages limit');
for(const file of ['index.html','ai-creative/index.html','executive-operations/index.html','novasync-graduation-hub/index.html','ai-mastery-class/index.html','passport-potluck/index.html','travel-command-center/index.html']){const h=await readFile(join(root,file),'utf8');if(!h.includes('content="index, follow"')||!h.includes('property="og:image"')||!h.includes('rel="canonical"'))throw new Error(`Launch metadata incomplete: ${file}`);}
if(!(await readFile(join(root,'404.html'),'utf8')).includes('noindex, nofollow'))throw new Error('404 must remain noindex');
if(!(await readFile(join(root,'robots.txt'),'utf8')).includes('Allow: /'))throw new Error('Launch robots blocked');
console.log(JSON.stringify({status:'PASS: local equivalent deployment preflight; no upload or account changes',project:config.name,files:count,totalBytes:total,largest},null,2));
