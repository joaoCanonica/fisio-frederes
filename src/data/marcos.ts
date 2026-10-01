/**
 * Janelas de aquisição (percentis 1 e 99, em meses) dos seis marcos motores amplos.
 * Fonte: WHO Multicentre Growth Reference Study Group. Acta Paediatrica 2006;
 * Suppl 450:86–95. Registro: docs/pesquisa/marcos-motores.md#1
 * Conferir os valores na tabela original antes do go-live.
 */
export interface Marco {
  readonly nome: string;
  readonly inicio: number;
  readonly fim: number;
}

export const FONTE_MARCOS = {
  texto: 'OMS, WHO Motor Development Study, Acta Paediatrica, 2006',
  url: 'https://www.who.int/tools/child-growth-standards/standards/motor-development-milestones',
} as const;

export const marcos: readonly Marco[] = [
  { nome: 'Sentar sem apoio', inicio: 3.8, fim: 9.2 },
  { nome: 'Ficar em pé com apoio', inicio: 4.8, fim: 11.4 },
  { nome: 'Engatinhar', inicio: 5.2, fim: 13.5 },
  { nome: 'Andar com apoio', inicio: 5.9, fim: 13.7 },
  { nome: 'Ficar em pé sozinho', inicio: 6.9, fim: 16.9 },
  { nome: 'Andar sozinho', inicio: 8.2, fim: 17.6 },
];
