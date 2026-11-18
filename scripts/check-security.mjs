import {inspectDocument} from './structured-data-policy.mjs';
import {readFile,readdir} from 'node:fs/promises';
import {join,relative} from 'node:path';
import assert from 'node:assert/strict';
const root=process.argv[2] || 'dist-launch';
const headers=await readFile(join(root,'_headers'),'utf8');
for(const required of ["default-src 'none'","script-src 'self'","frame-ancestors 'none'","object-src 'none'","base-uri 'none'","form-action 'none'","X-Content-Type-Options: nosniff","Strict-Transport-Security: max-age=86400"])
 assert(headers.includes(required),`Missing protection: ${required}`);
assert(!/unsafe-inline|unsafe-eval|includeSubDomains|preload/i.test(headers),'Unexpected CSP or HSTS relaxation/scope');
assert(headers.includes("script-src 'self' https://static.cloudflareinsights.com/beacon.min.js https://static.cloudflareinsights.com/beacon.min.js/;"), "Unexpected analytics script permissions");
assert(headers.includes("connect-src 'self';"), "Automatic Analytics needs same-origin reporting");
const registry=JSON.parse(await readFile('src/data/assets.json','utf8'));
const allowed=new Set(registry.map(x=>x.src.replace(/^\//,'')));
allowed.add('documents/Janet-Oguns-Executive-Operations-Automation-CV.pdf');
const externals=new Set();let pages=0;
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const f=join(dir,e.name);if(e.isDirectory()){await walk(f);continue;}const p=relative(root,f).replaceAll('\\','/');
 assert(!/(^|\/)(?:\.env(?:\.|$)|\.git\/|node_modules\/|reference\/|functions\/)|\.(?:map|bak|old|sql|pem|key|zip)$|_worker\.js/.test(p),`Unexpected deployment file: ${p}`);
 if(/^(images|videos|documents)\//.test(p)&&!p.endsWith('/.gitkeep'))assert(allowed.has(p),`Unregistered public asset: ${p}`);
 if(!p.endsWith('.html'))continue;pages++;const h=await readFile(f,'utf8');
 inspectDocument(h,p==='404.html'?'/404.html':p==='index.html'?'/':'/'+p.replace(/index\.html$/,''));
 assert(!/<style\b|\sstyle=|\son[a-z]+=|<iframe\b|<form\b/i.test(h),`Unexpected inline code/embed/form: ${p}`);
 for(const match of h.matchAll(/<(script|link|img|a|button)\b[^>]*>/gi)){const t=match[0];const value=t.match(/\b(?:href|src|data-video)="([^"]*)"/)?.[1];if(!value)continue;assert(!/^(javascript|data|vbscript):|^\/\//i.test(value),`Unsafe URL scheme: ${p}`);if(/^https?:/.test(value)){assert(value.startsWith('https:'),`Non-HTTPS link: ${p}`);externals.add(value);}if(/target="_blank"/.test(t))assert(/rel="[^"]*noopener/.test(t)&&/rel="[^"]*noreferrer/.test(t),`New-tab link protection: ${p}`);if(/^<script/.test(t))assert(value.startsWith('/_astro/'),`Unexpected script source: ${p}`);}
}}
await walk(root);assert.equal(pages,8);console.log(JSON.stringify({passed:true,pages,externalDestinations:[...externals]},null,2));
