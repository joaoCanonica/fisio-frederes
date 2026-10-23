// Exporta os SVGs de assets-originais/marca/vetor/ em PDF (vetorial) e PNG em alta
// resolução com fundo transparente, para gráfica, Canva, redes etc.
//   node scripts/exportar-logo.mjs        (usa o Chromium do Playwright)
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const DIR = 'assets-originais/marca/vetor';
const PECAS = [
  { nome: 'logo-2026', larguraPng: 4000 },
  { nome: 'logo-2026-fundo-escuro', larguraPng: 4000 },
  { nome: 'emblema', larguraPng: 3000 },
  { nome: 'monograma', larguraPng: 2000 },
];
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium' });
const p = await b.newPage();
for (const { nome, larguraPng } of PECAS) {
  const svg = readFileSync(`${DIR}/${nome}.svg`, 'utf8');
  const [, , , w, h] = svg.match(/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/).map(Number);
  const altura = Math.round((larguraPng * h) / w);
  const html = (fundo) => `<style>html,body{margin:0;background:${fundo}}svg{display:block;width:100vw;height:100vh}</style>${svg}`;
  await p.setViewportSize({ width: larguraPng, height: altura });
  await p.setContent(html('transparent'));
  await p.screenshot({ path: `${DIR}/${nome}.png`, omitBackground: true });
  // PDF no tamanho do desenho (1 unidade do SVG = 1 px a 96 dpi).
  await p.setViewportSize({ width: Math.round(w), height: Math.round(h) });
  await p.setContent(html('transparent'));
  await p.pdf({ path: `${DIR}/${nome}.pdf`, width: `${w}px`, height: `${h}px`, printBackground: false, pageRanges: '1' });
  console.log(nome, `${larguraPng}x${altura} png`, `${w}x${h} pdf`);
}
await b.close();
