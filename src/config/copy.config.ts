import { aviso, confirmado } from './campo.ts';

/** Textos-chave da landing. Títulos ainda não aprovados ficam como aviso. */
export const copy = {
  hero: {
    titulo: aviso(
      'Fisioterapia para o desenvolvimento motor de crianças',
      'Título do hero proposto: confirmar com o cliente.',
    ),
    subtitulo: confirmado(
      'Atendimento neuropediátrico com foco no desenvolvimento infantil, em Lages, Santa Catarina.',
    ),
  },
} as const;
