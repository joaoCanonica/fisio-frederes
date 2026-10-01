// Verificação de vocabulário (COFFITO). Roda depois de todo build.
// Varre o TEXTO RENDERIZADO das páginas em dist/ (inclui o que vem de dados e
// frontmatter) e falha se encontrar termos proibidos. Negações explícitas
// ("não cura", "sem garantia") são aceitas.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const REGRAS = [
  // Comercial
  [/\bpre[çc]os?\b/i, 'preço'],
  [/\bpacotes?\b/i, 'pacote'],
  [/\bpromo[çc][ãa]o|promocional/i, 'promoção'],
  [/\bdescontos?\b/i, 'desconto'],
  [/\bofertas?\b/i, 'oferta'],
  [/\bgr[áa]tis\b|\bgratuit[ao]s?\b/i, 'gratuidade'],
  [/\bR\$\s?\d/i, 'valor em reais'],
  // Promessa / sensacionalismo
  [/\bcur(a|ar|ou|ado)\b/i, 'cura'],
  [/\bgarant(e|ia|ido|imos)\b/i, 'garantia'],
  [/\bmilagr/i, 'milagre'],
  [/\bvoltou a andar\b/i, 'sensacionalismo'],
  [/\bsuper(ou|ação)\b/i, 'sensacionalismo'],
  // Superlativos e autoelogio
  [/\bo melhor\b|\ba melhor\b|\bexcelen(te|tes|cia)\b/i, 'superlativo'],
  [/\brefer[êe]ncia em\b|\bde confian[çc]a\b|\bn[ºo°]\s?1\b/i, 'autoelogio'],
  [/\bespecialista\b/i, 'especialista (só com RQE)'],
  // Vocabulário do conselho
  [/\bavalia[çc](ão|ões)\b/i, 'use "consulta fisioterapêutica"'],
  [/\bsess(ão|ões)\b/i, 'use "atendimento"'],
  [/\balun[oa]s?\b/i, 'use "paciente"'],
  [/\btreinos?\b/i, 'use "plano terapêutico"'],
];

function* arquivos(dir) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) yield* arquivos(p);
    // A página interna de pendências (só preview) cita termos proibidos de propósito.
    else if (p.endsWith('.html') && !p.includes('/pendencias/')) yield p;
  }
}

// Texto visível + atributos lidos por humanos (alt, title, aria-label, meta description).
const textoVisivel = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(?:img|meta|a|button|svg|input)[^>]*?(?:alt|title|aria-label|content)="([^"]*)"[^>]*>/gi, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

// Negações explícitas são permitidas: "não cura", "nem promete", "sem garantia".
const negado = (texto, idx) => /\b(n[ãa]o|nem|sem|nunca)\s+(\S+\s+){0,2}$/i.test(texto.slice(Math.max(0, idx - 30), idx));

const dist = process.argv[2] ?? 'dist';
let lista;
try {
  lista = [...arquivos(dist)];
} catch {
  console.error(`Pasta "${dist}" não encontrada. Rode o build antes.`);
  process.exit(1);
}
let erros = 0;
for (const arq of lista) {
  const texto = textoVisivel(readFileSync(arq, 'utf8'));
  for (const [re, motivo] of REGRAS) {
    const g = new RegExp(re.source, 'gi');
    for (const m of texto.matchAll(g)) {
      if (negado(texto, m.index)) continue;
      erros++;
      const trecho = texto.slice(Math.max(0, m.index - 40), m.index + 40).trim();
      console.error(`${arq}: "${m[0]}" → ${motivo}\n    …${trecho}…`);
    }
  }
}
if (erros) {
  console.error(`\n${erros} ocorrência(s) fora da regra de publicidade.`);
  process.exit(1);
}
console.log(`Conformidade de vocabulário: ok (${lista.length} página(s))`);
