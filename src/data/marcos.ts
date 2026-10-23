/**
 * Marcos do desenvolvimento motor usados por João Pedro Frederes no acompanhamento
 * (definidos pelo fisioterapeuta em 2026-10-23). Mês de início e de fim de cada marco;
 * marco de um mês só tem inicio === fim. Registro: docs/pesquisa/marcos-motores.md
 */
export interface Marco {
  readonly nome: string;
  readonly detalhe?: string;
  /** Meses. */
  readonly inicio: number;
  readonly fim: number;
  /** Marco que precisa acontecer até o mês indicado. */
  readonly obrigatorio?: boolean;
}

export const FONTE_MARCOS = {
  texto: 'João Pedro Frederes, fisioterapeuta, CREFITO-10 369113-F',
} as const;

export const marcos: readonly Marco[] = [
  { nome: 'Controle cervical', detalhe: 'tummy time', inicio: 3, fim: 3 },
  { nome: 'Virar e rolar', inicio: 4, fim: 6 },
  { nome: 'Sentar', inicio: 6, fim: 6 },
  { nome: 'Engatinhar', inicio: 9, fim: 9 },
  { nome: 'Ficar em pé', inicio: 9, fim: 9, obrigatorio: true },
  { nome: 'Primeiros passos', inicio: 10, fim: 12 },
  { nome: 'Caminhar', inicio: 12, fim: 18 },
];

/** "3º mês", "4º ao 6º mês". */
export const meses = (m: Marco): string => (m.inicio === m.fim ? `${m.inicio}º mês` : `${m.inicio}º ao ${m.fim}º mês`);
