/**
 * Idade (em meses) até a qual pelo menos 75% das crianças já alcançaram cada marco
 * motor, segundo os checklists revisados pelo CDC e pela Academia Americana de
 * Pediatria em 2022 (Zubler JM et al. Pediatrics 2022;149(3):e2021052138).
 * Substitui as janelas da OMS (2006). Registro: docs/pesquisa/marcos-motores.md#3
 */
export interface Marco {
  readonly nome: string;
  /** Meses. */
  readonly idade: number;
}

export const FONTE_MARCOS = {
  texto: 'CDC e Academia Americana de Pediatria, Zubler et al., Pediatrics, 2022',
  url: 'https://doi.org/10.1542/peds.2021-052138',
} as const;

export const marcos: readonly Marco[] = [
  { nome: 'Sustenta a cabeça de bruços', idade: 2 },
  { nome: 'Rola de bruços para barriga para cima', idade: 6 },
  { nome: 'Senta sem apoio', idade: 9 },
  { nome: 'Fica em pé e anda segurando nos móveis', idade: 12 },
  { nome: 'Dá alguns passos sozinha', idade: 15 },
  { nome: 'Anda sem apoio', idade: 18 },
  { nome: 'Chuta bola e corre', idade: 24 },
  { nome: 'Pula com os dois pés', idade: 30 },
];
