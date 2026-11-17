import {readFile,stat,access} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
const root=resolve(process.argv[2] || 'dist');
const launch=process.argv.includes('--launch');
const routes=['index.html','ai-creative/index.html','executive-operations/index.html','novasync-graduation-hub/index.html','ai-mastery-class/index.html','passport-potluck/index.html','travel-command-center/index.html','novasync-ai-bootcamp/index.html','404.html'];
const failures=[];
for(const route of routes){
 const file=join(root,route);await access(file);const html=await readFile(file,'utf8');
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(`${route}: expected one H1`);
 if(!html.includes(launch && route!=='404.html' ? 'index, follow' : 'noindex, nofollow'))failures.push(`${route}: robots policy mismatch`);
 for(const m of html.matchAll(/<(?:a|img|script|link|button)\b[^>]*?\b(?:href|src|data-video)="([^"]+)"[^>]*>/g)){
  const value=m[1];if(/^(https?:|mailto:|data:)/.test(value))continue;
  const [path,hash]=value.split('#');
  let target=path?resolve(path.startsWith('/')?root:dirname(file),'.'+(path.startsWith('/')?path:'/'+path)):file;
  if(path.endsWith('/'))target=join(target,'index.html');
  try{const info=await stat(target);if(info.isDirectory())target=join(target,'index.html');await access(target);if(hash&&target.endsWith('.html')&&!(await readFile(target,'utf8')).includes(`id="${hash}"`))failures.push(`${route}: missing #${hash}`);}catch{failures.push(`${route}: missing ${value}`);}
 }
 for(const m of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]+"/.test(m[0]))failures.push(`${route}: image without meaningful alt`);
 for(const m of html.matchAll(/<a\b[^>]*href="https:\/\/calendar\.app\.google\/[^\"]+"[^>]*>/g))if(!m[0].includes('LH4oDu2zttKAtKY59')||!m[0].includes('target="_blank"')||!m[0].includes('noopener'))failures.push(`${route}: booking link contract`);
 if(/<video\b[^>]*\bautoplay/.test(html))failures.push(`${route}: autoplay video`);
}
const home=await readFile(join(root,'index.html'),'utf8');
for(const id of ['portfolio','work','operations','experience','testimonials','about','contact'])if(!home.includes(`id="${id}"`))failures.push(`Missing homepage section ${id}`);
for(const text of ['THE BOSS BEHIND THE BOSS.','She saw a gap, filled it, and now leads it.','Her ability to craft compelling job descriptions','Working with Janet was a delight.'])if(!home.includes(text))failures.push(`Missing approved text ${text}`);
for(const text of ['hello@heywunmi.com','https://x.com/virtualwunmi','https://www.instagram.com/ogunsjanet?stkn=cHZvMmtkaG15cHUy','Download CV (PDF)','/videos/meet-wunmi.mp4'])if(!home.includes(text))failures.push(`Missing final integration: ${text}`);
const registry=JSON.parse(await readFile('src/data/assets.json','utf8'));
for(const asset of registry)await access(join(root,asset.src));
if(failures.length)throw new Error(failures.join('\n'));
console.log(`Passed: ${routes.length} pages; internal routes, anchors, media files, meaningful alt text, booking targets, noindex and approved copy. ${registry.length} registered assets resolve.`);
