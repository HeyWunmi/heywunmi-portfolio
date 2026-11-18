import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {inspectDocument,paths,origin} from './structured-data-policy.mjs';
import {serializeJsonLd} from '../src/lib/structured-data.ts';
const root=process.argv[2]||'dist-launch';
const pages=new Map();let entities=0;
for(const path of [...paths,'/404.html']){
 const html=await readFile(join(root,path==='/404.html'?'404.html':path.slice(1)+'index.html'),'utf8');
 const result=inspectDocument(html,path);pages.set(path,html);entities+=result.graph?.['@graph'].length||0;
}
const sitemap=await readFile(join(root,'sitemap.xml'),'utf8');
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).sort(),paths.map(p=>origin+p).sort());
const redirects=await readFile(join(root,'_redirects'),'utf8');
for(const path of ['/novasync-ai-bootcamp/','/novasync-ai-bootcamp'])assert(redirects.split(/\r?\n/).includes(path+' /ai-mastery-class/ 301'));
const home=pages.get('/');const block=home.match(/<script type="application\/ld\+json" id="structured-data">([\s\S]*?)<\/script>/);assert(block);
let rejected=0;const reject=(html,label)=>{assert.throws(()=>inspectDocument(html,'/'),undefined,label);rejected++;};
for(const [label,replacement] of [
 ['inline JavaScript','<script>alert(1)</script>'],['inline module','<script type="module">alert(1)</script>'],['empty inline script','<script></script>'],['import map','<script type="importmap">{}</script>'],
 ['malformed JSON',block[0].replace(block[1],'{')],['duplicate type',block[0].replace('type=', 'type="text/javascript" type=')],['duplicate id',block[0].replace('id=', 'id="other" id=')],['event attribute',block[0].replace('<script ','<script onload="alert(1)" ')],['external JSON',block[0].replace('<script ','<script src="https://example.com/a.json" ')],['nonce',block[0].replace('<script ','<script nonce="x" ')],['duplicate graph',block[0]+block[0]],['missing graph',''],
 ['script breakout',block[0].replace('Janet Oguns','</script><script>alert(1)</script>')],['HTML injection',block[0].replace('Janet Oguns','<img src=x onerror=alert(1)>')],['external module','<script type="module" src="https://example.com/evil.js"></script>'],['unexpected module attribute','<script type="module" src="/_astro/test.js" onload="alert(1)"></script>'],['protocol-relative script','<script type="module" src="//example.com/a.js"></script>']
])reject(home.replace(block[0],replacement),label);
for(const extra of ['<script>alert(1)</script>','<script type="module">alert(1)</script>','<script type="importmap">{}</script>','<script type="module" src="https://example.com/evil.js"></script>','<script type="module" src="/_astro/test.js" nonce="x"></script>'])reject(home.replace('</head>',extra+'</head>'),'Executable addition to otherwise valid graph');
for(const mutation of [g=>g['@graph'][0].address='private',g=>g['@graph'][0].sameAs=['https://example.com/'],g=>g['@graph'][0]['@id']='https://preview.example/#janet',g=>g['@graph'][3].provider={'@id':'https://example.com/'},g=>g['@graph'].push(g['@graph'][0])]){
 const g=JSON.parse(block[1]);mutation(g);reject(home.replace(block[1],serializeJsonLd(g)),'Invalid graph');
}
for(const payload of ['</script><script>alert(1)</script>','<img src=x onerror=alert(1)>','<!--','quotes " and & >','\u2028\u2029']){
 const graph=JSON.parse(block[1]);graph['@graph'][0].name=payload;const serialized=serializeJsonLd(graph);
 assert(!/[<>&\u2028\u2029]/u.test(serialized));assert.equal(JSON.parse(serialized)['@graph'][0].name,payload);
 reject(home.replace(block[1],serialized),'Safely escaped but unapproved identity');
}
assert.throws(()=>inspectDocument(pages.get('/404.html').replace('</head>',block[0]+'</head>'),'/404.html'));
console.log(JSON.stringify({passed:true,publicPages:paths.length,entityOccurrences:entities,adversarialRejections:rejected+1,serializerRoundTrips:5,sitemapAndCanonicals:true,retiredRedirects:true},null,2));
