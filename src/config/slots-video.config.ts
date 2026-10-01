/**
 * Slots de vídeo da landing. Preencher ou trocar um slot = editar ESTE arquivo
 * e cadastrar a mídia no media.manifest.json. Nenhum componente muda.
 *
 * Comportamento (src/lib/slots.ts):
 *  - vago, em dev/preview  → bloco desenhado "Vídeo em breve" (para aprovar o layout);
 *  - vago, em produção     → não renderiza: a seção some do DOM e do menu;
 *  - preenchido            → cada mídia precisa estar liberada (publicavel, consentimento,
 *                            dataRegistro, legenda revisada ou vídeo sem fala, instituição
 *                            autorizada). Se faltar algo: preview mostra com selo
 *                            PROVISÓRIO; produção bloqueia o build.
 *
 * Nunca usar em títulos/capítulos: nome, escola, cidade ou rotina da criança, nem
 * linguagem de "conquista". Títulos neutros e descritivos.
 */
export type EstadoSlot = 'vago' | 'preenchido';

export interface Capitulo {
  /** Início em segundos. */
  readonly inicio: number;
  /** Conduta/tema, neutro. Ex.: "Marcha com apoio". */
  readonly titulo: string;
}

export interface ItemSlot {
  readonly midiaId: string;
  /** Título neutro. "{data}" é trocado pela data do registro. */
  readonly titulo: string;
  readonly capitulos: readonly Capitulo[];
}

export interface SlotConvite {
  readonly estado: EstadoSlot;
  readonly item: ItemSlot | null;
  readonly titulo: string;
  readonly texto: string;
  readonly cta: string;
  readonly posicao: 'apos-hero';
}

export interface SlotAtendimentos {
  readonly estado: EstadoSlot;
  /** Um vídeo longo com capítulos, ou uma lista de vídeos. */
  readonly itens: readonly ItemSlot[];
  readonly titulo: string;
  readonly texto: string;
  readonly posicao: 'atendimentos';
}

/** Vídeo de apresentação exibido em "Quem é" (fora dos slots). */
export interface VideoApresentacao {
  readonly item: ItemSlot;
}

export const slots = {
  /** SLOT A: começa VAGO. */
  conviteVideo: {
    estado: 'vago',
    item: null,
    titulo: 'Conheça o João Pedro',
    texto: 'Um convite para conhecer o trabalho e conversar sobre o desenvolvimento do seu filho.',
    cta: 'Agendar uma consulta fisioterapêutica',
    posicao: 'apos-hero',
  } satisfies SlotConvite as SlotConvite,

  /** SLOT B: provisório com 1 item (P-001) até o compilado chegar. */
  compilado: {
    estado: 'preenchido',
    itens: [
      {
        midiaId: 'video-P-001-marcha',
        titulo: 'Registro de atendimento fisioterapêutico, {data}',
        // Capítulos propostos a partir dos quadros do vídeo: João confirmar.
        capitulos: [
          { inicio: 0, titulo: 'Marcha acompanhada' },
          { inicio: 20, titulo: 'Marcha com as mãos na cabeça' },
          { inicio: 40, titulo: 'Mudanças de direção e equilíbrio' },
        ],
      },
    ],
    titulo: 'Atendimentos',
    texto: 'Registros publicados com autorização por escrito do responsável legal, que pode ser retirada a qualquer momento. Sem nome, escola ou outros dados que identifiquem a criança.',
    posicao: 'atendimentos',
  } satisfies SlotAtendimentos as SlotAtendimentos,

  /** Em "Quem é": aparece em produção quando a mídia estiver liberada. */
  apresentacao: {
    item: { midiaId: 'video-neurokids-apresentacao', titulo: 'Apresentação de João Pedro Frederes na NeuroKids, {data}', capitulos: [] },
  } satisfies VideoApresentacao as VideoApresentacao,
} as const;
