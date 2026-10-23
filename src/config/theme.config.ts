/**
 * Design system: ÚNICO lugar do projeto com valores de cor.
 * Componentes e CSS usam apenas os tokens semânticos (var(--texto), var(--acao)…),
 * gerados por src/lib/tema.ts. `scripts/validate-theme.ts` verifica:
 *  - contraste AA de todos os pares declarados em `pares`, nos dois esquemas e nos tons;
 *  - que nenhum arquivo em src/ (fora deste) tenha cor hardcoded.
 *
 * Origem: cores amostradas da logo de 2026 (assets-originais/marca/logo-2026.jpg),
 * por faixa de matiz nos pixels do monograma: vinho do J (mediana #872f3d, sombra
 * #681527, nome #601727), mostarda da cabecinha (#f0ab3a), verde-azulado da barra
 * do F (#539691), sálvia do F (#afc5b8), coral das faíscas e do cubo (#e5978a) e o
 * creme do fundo (#fdfcf8).
 */

/** Primitivas: nomes por papel, não por uso. Não usar direto em componentes. */
export const primitivas = {
  vinhoProfundo: '#681527', // sombra do J na logo · cor de ação
  vinhoMedio: '#872f3d', // corpo do J na logo · hover
  vinhoNoite: '#2e0b14',
  vinhoClaro: '#e8aab4', // ação/links sobre fundos escuros
  rose: '#f3d5cd', // acento quente, do coral da logo clareado
  roseSuave: '#faece7',
  gelo: '#f6f2ec',
  geloClaro: '#fdfcf8', // creme do fundo da logo
  branco: '#ffffff',
  creme: '#fdfcf8', // fundo da logo
  offWhite: '#f8f3ea', // creme um tom abaixo, só para alternar seções
  roseNevoa: '#fcf2e2', // topo do hero: creme com um toque da mostarda
  // Cores da logo (decorativas: bolinhas, formas, ilustrações; nunca texto).
  mostarda: '#f0ab3a',
  tealLogo: '#539691',
  salvia: '#afc5b8',
  coral: '#e5978a',
  ilustraRose: '#eeb0a4', // coral
  ilustraSalvia: '#bcd1c5', // sálvia
  ilustraSol: '#f5c46a', // mostarda
  ilustraCeu: '#9cc6c1', // verde-azulado
  grafite: '#262123', // texto
  grafiteMedio: '#5b5053',
  grafiteNoite: '#1a1416',
  grafiteNoite2: '#241c1f',
  grafiteNoite3: '#2f2629',
  cinzaQuente: '#ddd5d2', // neutro cinza-quente
  cinzaQuenteEscuro: '#4a3f42',
  cinzaQuenteTexto: '#c8bcbf',
  avisoFundo: '#fff1d6',
  avisoTexto: '#5a3b00',
  avisoBorda: '#8a5a00',
} as const;

type P = keyof typeof primitivas;

/** Tokens semânticos que todo tom precisa definir. */
export interface Tokens {
  fundo: P;
  superficie: P;
  superficieAlt: P;
  texto: P;
  textoSuave: P;
  borda: P;
  /** Preenchimento de botão primário (a cor de ação é o vinho). */
  acao: P;
  acaoHover: P;
  acaoTexto: P;
  /** Links, ênfases (em), eyebrow, pontos da marca. */
  destaque: P;
  acento: P;
  acentoTexto: P;
  foco: P;
  sombra: P;
}

const claro: Tokens = {
  fundo: 'creme',
  superficie: 'branco',
  superficieAlt: 'offWhite',
  texto: 'grafite',
  textoSuave: 'grafiteMedio',
  borda: 'cinzaQuente',
  acao: 'vinhoProfundo',
  acaoHover: 'vinhoMedio',
  acaoTexto: 'geloClaro',
  destaque: 'vinhoProfundo',
  acento: 'rose',
  acentoTexto: 'vinhoNoite',
  foco: 'vinhoMedio',
  sombra: 'vinhoNoite',
};

const escuro: Tokens = {
  fundo: 'grafiteNoite',
  superficie: 'grafiteNoite2',
  superficieAlt: 'grafiteNoite3',
  texto: 'gelo',
  textoSuave: 'cinzaQuenteTexto',
  borda: 'cinzaQuenteEscuro',
  acao: 'vinhoMedio',
  acaoHover: 'vinhoProfundo',
  acaoTexto: 'geloClaro',
  destaque: 'vinhoClaro',
  acento: 'vinhoNoite',
  acentoTexto: 'rose',
  foco: 'vinhoClaro',
  sombra: 'grafiteNoite',
};

const vinho: Tokens = {
  fundo: 'vinhoProfundo',
  superficie: 'vinhoNoite',
  superficieAlt: 'vinhoMedio',
  texto: 'geloClaro',
  textoSuave: 'rose',
  borda: 'vinhoMedio',
  acao: 'geloClaro', // botão invertido sobre o vinho
  acaoHover: 'roseSuave',
  acaoTexto: 'vinhoProfundo',
  destaque: 'rose',
  acento: 'vinhoNoite',
  acentoTexto: 'rose',
  foco: 'rose',
  sombra: 'vinhoNoite',
};

export const theme = {
  primitivas,
  /** Esquemas da página (prefers-color-scheme / data-tema). */
  esquemas: { claro, escuro },
  /** Tons de seção. "claro" segue o esquema; "escuro" e "vinho" são fixos. */
  tons: { escuro, vinho },
  aviso: { fundo: 'avisoFundo', texto: 'avisoTexto', borda: 'avisoBorda' } satisfies Record<string, P>,
  /** Cor da barra do navegador (meta theme-color). */
  themeColor: 'vinhoProfundo' satisfies P,

  /** Pares verificados (frente, fundo, mínimo). 4.5 = texto; 3 = texto grande/UI/foco. */
  pares: [
    ['texto', 'fundo', 4.5],
    ['texto', 'superficie', 4.5],
    ['texto', 'superficieAlt', 4.5],
    ['textoSuave', 'fundo', 4.5],
    ['textoSuave', 'superficie', 4.5],
    ['destaque', 'fundo', 4.5],
    ['destaque', 'superficie', 4.5],
    ['acaoTexto', 'acao', 4.5],
    ['acaoTexto', 'acaoHover', 4.5],
    ['acentoTexto', 'acento', 4.5],
    ['foco', 'fundo', 3],
    ['foco', 'superficie', 3],
  ] as const satisfies readonly (readonly [keyof Tokens, keyof Tokens, number])[],

  fontes: {
    display: "'Marcellus', 'Optima', 'Candara', serif",
    texto: "'Lato', 'Lato Fallback', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },

  /**
   * Motivo das bolinhas (a "cabecinha" e a bola da logo): diâmetros relativos, de cima
   * para baixo. As cores alternam entre as da logo (--marca e --bola-2 a --bola-5).
   */
  pontos: [4, 6, 8, 9, 6, 5, 12],
} as const;

export type Tom = 'claro' | 'escuro' | 'vinho';
