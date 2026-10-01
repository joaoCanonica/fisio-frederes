/**
 * Slots de vídeo da landing. Trocar o conteúdo de um slot é só editar este
 * arquivo (e o media.manifest.json); nenhum componente precisa mudar.
 *
 * Comportamento (src/lib/slots.ts):
 *  - vago, em dev/preview  → bloco desenhado "Vídeo em breve" (para aprovar o layout);
 *  - vago, em produção     → não renderiza: a seção some do DOM e do menu;
 *  - preenchido            → exige mídia publicavel, consentimento ok, dataRegistro,
 *                            legenda revisada (ou vídeo sem fala) e identificação.
 *                            Se faltar algo: preview mostra com selo PROVISÓRIO,
 *                            produção bloqueia o build.
 */
export type EstadoSlot = 'vago' | 'preenchido';

export interface SlotConvite {
  readonly estado: EstadoSlot;
  readonly midiaId: string | null;
  readonly titulo: string;
  /** Caminho do .vtt revisado (relativo à raiz do projeto). */
  readonly legendaVtt: string | null;
  /** Preenchido a partir do manifesto quando null. */
  readonly dataRegistro: string | null;
  readonly posicao: 'apos-hero';
}

export interface SlotCompilado {
  readonly estado: EstadoSlot;
  readonly midiaIds: readonly string[];
  readonly titulo: string;
  readonly posicao: 'atendimentos';
}

export const slots = {
  conviteVideo: {
    estado: 'vago',
    midiaId: null,
    titulo: 'Uma conversa sobre o desenvolvimento do seu filho',
    legendaVtt: null,
    dataRegistro: null,
    posicao: 'apos-hero',
  } satisfies SlotConvite as SlotConvite,

  /** Provisório: 1 item (vídeo P-001) até o compilado chegar. */
  compilado: {
    estado: 'preenchido',
    midiaIds: ['video-P-001-marcha'],
    titulo: 'No atendimento',
    posicao: 'atendimentos',
  } satisfies SlotCompilado as SlotCompilado,
} as const;
