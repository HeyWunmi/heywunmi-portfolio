import type { APIRoute } from 'astro';
const paths=['/','/executive-operations/','/ai-creative/','/novasync-graduation-hub/','/ai-mastery-class/','/passport-potluck/','/travel-command-center/','/novasync-ai-bootcamp/'];
export const GET: APIRoute = ({site}) => new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>${new URL(path,site)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});
