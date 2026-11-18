import assert from 'node:assert/strict';
import {parse} from 'parse5';
export const origin='https://heywunmi.com';
export const paths=['/','/executive-operations/','/ai-creative/','/novasync-graduation-hub/','/ai-mastery-class/','/passport-potluck/','/travel-command-center/'];
export const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
export const text=node=>(node.nodeName==='#text'?node.value:'')+(node.childNodes||[]).map(text).join('');
export function descendants(node){return [node,...(node.childNodes||[]).flatMap(descendants),...(node.content?descendants(node.content):[])];}
function keys(object,expected){assert(object && typeof object==='object' && !Array.isArray(object));assert.deepEqual(Object.keys(object).sort(),expected.split(' ').sort(),'Unapproved structured-data fields');}
const reference=id=>({'@id':id});
export function inspectDocument(html,path){
 const errors=[];const document=parse(html,{sourceCodeLocationInfo:true,onParseError:e=>errors.push(e.code)});
 assert.deepEqual(errors,[],'Malformed HTML, including duplicate attributes, is not permitted');
 const nodes=descendants(document);const scripts=nodes.filter(n=>n.tagName==='script');let structured;
 for(const script of scripts){
  assert.equal(script.namespaceURI,'http://www.w3.org/1999/xhtml','Foreign script element');
  const attrs=Object.fromEntries(script.attrs.map(a=>[a.name,a.value]));
  if(attrs.type==='application/ld+json'){
   assert(!structured,'Duplicate JSON-LD block');
   assert.deepEqual(attrs,{type:'application/ld+json',id:'structured-data'},'Unexpected JSON-LD attributes');
   assert.equal(script.parentNode?.tagName,'head','JSON-LD must be in head');
   const content=text(script);assert(!/[<>&\u2028\u2029]/u.test(content),'JSON-LD must use safe serialization');
   structured=JSON.parse(content);
  }else{
   assert.deepEqual(Object.keys(attrs).sort(),['src','type'],'Unexpected executable script attributes');
   assert.equal(attrs.type,'module');
   assert.match(attrs.src,/^\/_astro\/[A-Za-z0-9_.-]+\.js$/,'Unexpected executable script source');
   assert.equal(text(script).trim(),'','Inline executable scripts prohibited');
  }
 }
 assert.equal(Boolean(structured),path!=='/404.html','Expected exactly one graph per public page, none on 404');
 if(structured)validateGraph(structured,path,nodes);
 return {document,nodes,graph:structured};
}
export function validateGraph(graph,path,nodes){
 assert(paths.includes(path),'Unexpected public route');keys(graph,'@context @graph');assert.equal(graph['@context'],'https://schema.org');
 const project=paths.indexOf(path)>=3;const home=path==='/';const list=graph['@graph'];
 assert(Array.isArray(list));assert.equal(list.length,home?6:project?4:3);
 const types=list.map(n=>n['@type']);assert.deepEqual(types,['Person','WebSite','WebPage',...(home?['Service','Service','Service']:project?['CreativeWork']:[])]);
 const url=origin+path,personId=origin+'/#janet-oguns',siteId=origin+'/#website',pageId=url+'#webpage';
 const [person,site,page]=list;
 keys(person,'@type @id name url sameAs');assert.equal(person['@id'],personId);assert.equal(person.name,'Janet Oguns');assert.equal(person.url,origin+'/');
 assert.deepEqual(person.sameAs,['https://www.linkedin.com/in/janet-oguns/','https://www.instagram.com/ogunsjanet/','https://x.com/virtualwunmi']);
 keys(site,'@type @id name url publisher inLanguage');assert.equal(site['@id'],siteId);assert.equal(site.name,'HeyWunmi');assert.equal(site.url,origin+'/');assert.equal(site.inLanguage,'en');assert.deepEqual(site.publisher,reference(personId));
 keys(page,'@type @id url name description isPartOf inLanguage'+(home?' mainEntity about':project?' mainEntity':''));assert.equal(page['@id'],pageId);assert.equal(page.url,url);assert.equal(page.inLanguage,'en');assert.deepEqual(page.isPartOf,reference(siteId));
 const title=nodes.find(n=>n.tagName==='title');const description=nodes.find(n=>n.tagName==='meta'&&attr(n,'name')==='description');
 assert.equal(page.name,text(title));assert.equal(page.description,attr(description,'content'));
 const canonical=nodes.filter(n=>n.tagName==='link'&&attr(n,'rel')==='canonical');assert.equal(canonical.length,1);assert.equal(attr(canonical[0],'href'),url);
 if(home){
  assert.deepEqual(page.mainEntity,reference(personId));
  const ids=['executive-assistance','executive-operations','ai-powered-automation'].map(s=>origin+'/#'+s);
  assert.deepEqual(page.about,ids.map(reference));
  const container=nodes.find(n=>attr(n,'class')==='operations-list');assert(container,'Missing visible services');
  const articles=descendants(container).filter(n=>n.tagName==='article');assert.equal(articles.length,3);
  list.slice(3).forEach((service,i)=>{keys(service,'@type @id name description provider');assert.equal(service['@id'],ids[i]);assert.deepEqual(service.provider,reference(personId));const parts=descendants(articles[i]);assert.equal(service.name,text(parts.find(n=>n.tagName==='h3')));assert.equal(service.description,text(parts.find(n=>n.tagName==='p')));});
 }else if(project){
  const work=list[3];keys(work,'@type @id name description url creator mainEntityOfPage');assert.equal(work['@id'],url+'#project');assert.equal(work.url,url);assert.deepEqual(work.creator,reference(personId));assert.deepEqual(work.mainEntityOfPage,reference(pageId));assert.deepEqual(page.mainEntity,reference(work['@id']));
  assert.equal(work.name,text(nodes.find(n=>n.tagName==='h1')));assert.equal(work.description,page.description);
 }
 const ids=list.map(n=>n['@id']);assert.equal(new Set(ids).size,ids.length);
}
