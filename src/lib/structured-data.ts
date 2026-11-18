export const origin = 'https://heywunmi.com';
export const publicPaths = ['/', '/executive-operations/', '/ai-creative/', '/novasync-graduation-hub/', '/ai-mastery-class/', '/passport-potluck/', '/travel-command-center/'];
export const serviceIds = ['executive-assistance', 'executive-operations', 'ai-powered-automation'];
export interface ServiceInput { name: string; description: string }
export interface ProjectInput { title: string; description: string }
export interface GraphInput { path: string; title: string; description: string; services?: ServiceInput[]; project?: ProjectInput }
type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
const ref = (id: string) => ({ '@id': id });
export function buildGraph({ path, title, description, services, project }: GraphInput) {
  if (!publicPaths.includes(path)) throw new Error('Unapproved structured-data route');
  if ((path === '/') !== Boolean(services) || (publicPaths.indexOf(path) >= 3) !== Boolean(project)) throw new Error('Structured-data page kind mismatch');
  if (services && (services.length !== 3 || services.map(s => s.name).join('|') !== 'Executive Assistance|Executive Operations|AI-Powered Automation')) throw new Error('Unapproved services');
  const url = origin + path;
  const personId = origin + '/#janet-oguns';
  const websiteId = origin + '/#website';
  const pageId = url + '#webpage';
  const graph: Json[] = [
    { '@type': 'Person', '@id': personId, name: 'Janet Oguns', url: origin + '/', sameAs: ['https://www.linkedin.com/in/janet-oguns/', 'https://www.instagram.com/ogunsjanet/', 'https://x.com/virtualwunmi'] },
    { '@type': 'WebSite', '@id': websiteId, name: 'HeyWunmi', url: origin + '/', publisher: ref(personId), inLanguage: 'en' },
    { '@type': 'WebPage', '@id': pageId, url, name: title, description, isPartOf: ref(websiteId), inLanguage: 'en',
      ...(path === '/' ? { mainEntity: ref(personId), about: serviceIds.map(id => ref(origin + '/#' + id)) } : {}),
      ...(project ? { mainEntity: ref(url + '#project') } : {}) }
  ];
  if (services) services.forEach((s, i) => graph.push({ '@type': 'Service', '@id': origin + '/#' + serviceIds[i], name: s.name, description: s.description, provider: ref(personId) }));
  if (project) graph.push({ '@type': 'CreativeWork', '@id': url + '#project', name: project.title, description: project.description, url, creator: ref(personId), mainEntityOfPage: ref(pageId) });
  return { '@context': 'https://schema.org', '@graph': graph };
}
// Only explicit graph fields enter HTML. Escaping '<' prevents script-element breakout.
export function serializeJsonLd(graph: ReturnType<typeof buildGraph>): string {
  return JSON.stringify(graph).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
