import type { APIRoute } from 'astro';
// lastmod = data do build (cada deploy publica o conteúdo atualizado).
const hoje = new Date().toISOString().slice(0, 10);
export const GET: APIRoute = ({ site }) => {
  const paginas: readonly (readonly [string, string])[] = [
    ['/', '1.0'],
    ['/privacidade/', '0.3'],
  ];
  const urls = paginas
    .map(([p, prioridade]) => `<url><loc>${new URL(p, site)}</loc><lastmod>${hoje}</lastmod><priority>${prioridade}</priority></url>`)
    .join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
