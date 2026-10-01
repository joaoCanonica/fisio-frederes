// Pós-build: varre o TEXTO RENDERIZADO de dist/ com os termos vetados de
// src/config/compliance.config.ts e confere a identificação (nome + CREFITO)
// em toda página. A página interna /pendencias (só preview) é ignorada.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { buscarTermosVetados } from '../src/lib/validacao.ts';
import { profile } from '../src/config/profile.config.ts';

function* paginas(dir: string): Generator<string> {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) yield* paginas(p);
    else if (p.endsWith('.html') && !p.includes('/pendencias/')) yield p;
  }
}

const textoVisivel = (html: string): string =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(?:img|meta|a|button|svg|input|video)[^>]*?(?:alt|title|aria-label|content)="([^"]*)"[^>]*>/gi, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

const dist = process.argv[2] ?? 'dist';
const nome = profile.nomeCompleto.valor;
const crefito = profile.crefito.numero.valor;
let erros = 0;
let n = 0;
for (const arq of paginas(dist)) {
  n++;
  const texto = textoVisivel(readFileSync(arq, 'utf8'));
  for (const a of buscarTermosVetados(texto)) {
    erros++;
    console.error(`${arq}: termo vetado ${a}`);
  }
  if (!texto.includes(nome) || !texto.includes(crefito)) {
    erros++;
    console.error(`${arq}: sem identificação (nome completo + CREFITO).`);
  }
}
if (erros) {
  console.error(`\n✖ ${erros} problema(s) de conformidade.`);
  process.exit(1);
}
console.log(`✔ Conformidade: ${n} página(s) sem termos vetados e com identificação.`);
