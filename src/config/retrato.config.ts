/**
 * Poses do "retrato que percorre o site" (<PortraitTravel>).
 * Para trocar/adicionar poses (ex.: corpo inteiro, fundo limpo), só edite esta
 * lista e o media.manifest.json. O layout não muda.
 *
 * Regra: a foto só aparece se a mídia for `publicavel: true`; em preview, também
 * se `previewOk: true`, com selo PROVISÓRIO.
 */
export interface Pose {
  /** Seção (id) em que a pose aparece. */
  readonly secao: string;
  readonly midiaId: string;
  /** Enquadramento: object-position e zoom (1 = foto inteira). Só recorte, sem retoque. */
  readonly foco: string;
  readonly zoom: number;
  /** Também renderiza a pose dentro da seção em telas estreitas (mobile). */
  readonly inline: boolean;
}

export const poses: readonly Pose[] = [
  { secao: 'inicio', midiaId: 'pessoa-foto-01', foco: '50% 40%', zoom: 1, inline: true },
  { secao: 'sobre', midiaId: 'pessoa-foto-02', foco: '50% 45%', zoom: 1, inline: true },
  { secao: 'porque', midiaId: 'pessoa-foto-01', foco: '78% 72%', zoom: 1.6, inline: false },
  { secao: 'atua', midiaId: 'pessoa-foto-02', foco: '50% 38%', zoom: 1.7, inline: false },
  { secao: 'atendimento', midiaId: 'pessoa-foto-01', foco: '42% 42%', zoom: 1.5, inline: false },
  { secao: 'onde', midiaId: 'pessoa-foto-02', foco: '50% 50%', zoom: 1.15, inline: false },
  { secao: 'faq', midiaId: 'pessoa-foto-01', foco: '50% 40%', zoom: 1.2, inline: false },
  { secao: 'contato', midiaId: 'pessoa-foto-02', foco: '50% 45%', zoom: 1, inline: false },
];
