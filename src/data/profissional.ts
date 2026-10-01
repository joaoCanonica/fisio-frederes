import { aviso, bloqueante, confirmado, type Campo } from './campo.ts';

/**
 * Dados do profissional. Fonte única de verdade para identificação
 * exigida pelo COFFITO (nome completo, profissão, CREFITO) em todo o site.
 *
 * Para confirmar um campo, troque `bloqueante(...)`/`aviso(...)` por
 * `confirmado(...)` com o valor conferido em documento.
 */

export interface Formacao {
  readonly titulo: string;
  readonly instituicao: string;
  readonly ano?: string;
}

export const profissional = {
  /** Nome completo conforme registro no CREFITO. */
  nomeCompleto: bloqueante(
    'João Pedro Frederes',
    'Confirmar o nome completo exatamente como consta no registro do CREFITO.',
  ),
  nomeCurto: confirmado('João Pedro Frederes'),
  profissao: confirmado('Fisioterapeuta'),

  crefito: {
    /** Ex.: "CREFITO-5". */
    regiao: bloqueante('CREFITO-?', 'Informar a região do CREFITO (ex.: CREFITO-5).'),
    /** Número de inscrição, ex.: "123456-F". */
    numero: bloqueante('000000-F', 'Informar o número de inscrição no CREFITO.'),
    /** Página oficial de consulta pública do registro do CREFITO da região. */
    consultaPublicaUrl: bloqueante(
      'https://www.coffito.gov.br/',
      'Substituir pelo link da consulta pública de profissionais do CREFITO da região.',
    ),
  },

  /**
   * Título de especialista só com registro no COFFITO e RQE.
   * Enquanto `rqe` for null, o site usa "pós-graduado em Fisioterapia Neuropediátrica".
   */
  rqe: aviso<{ readonly especialidade: string; readonly numero: string } | null>(
    null,
    'Sem RQE confirmado: o site usa "pós-graduado" e nunca "especialista".',
  ),

  /**
   * Em produção só aparecem itens confirmados. Mestrado só pode ser citado
   * se concluído.
   */
  formacao: [
    aviso<Formacao>(
      { titulo: 'Graduação em Fisioterapia', instituicao: 'Instituição a confirmar' },
      'Confirmar instituição e ano da graduação.',
    ),
    aviso<Formacao>(
      { titulo: 'Pós-graduação em Fisioterapia Neuropediátrica', instituicao: 'Instituição a confirmar' },
      'Confirmar instituição e ano da pós-graduação.',
    ),
    aviso<Formacao>(
      { titulo: 'Mestrado', instituicao: 'Programa e instituição a confirmar' },
      'Confirmar programa, instituição, ano e se o mestrado está concluído (só citar se concluído).',
    ),
  ],

  lattesUrl: aviso<string | null>(null, 'Informar link do Currículo Lattes, se existir.'),

  vinculo: {
    instituicao: aviso(
      'NeuroKids',
      'Arquivar autorização formal da NeuroKids para uso do nome, marca e espaço.',
    ),
    descricao: confirmado('Atendimento em neuropediatria'),
  },

  endereco: {
    linha: bloqueante(
      'Endereço a confirmar',
      'Endereço completo por extenso (rua, número, bairro, cidade/UF, CEP).',
    ),
    /** Busca usada pelo mapa (só carrega após consentimento). */
    consultaMapa: bloqueante('', 'Mesma informação do endereço, para o mapa.'),
  },

  contato: {
    /** Somente dígitos, com DDI e DDD: 55 + DDD + número. */
    whatsapp: bloqueante('5500000000000', 'Informar o número real de WhatsApp.'),
    instagram: aviso('jpfrederes.fisio', 'Confirmar o @ do Instagram profissional.'),
  },

  /** Domínio de produção, sem barra final. */
  site: aviso('https://example.com', 'Definir domínio de produção.'),
} as const;

export type Profissional = typeof profissional;

/** Título de pós-graduação conforme regra do RQE. */
export function tituloNeuro(
  rqe: Campo<{ readonly especialidade: string; readonly numero: string } | null>,
): string {
  // A denominação da especialidade vem do registro, nunca é escrita à mão aqui.
  return rqe.status === 'confirmado' && rqe.valor
    ? `Especialista em ${rqe.valor.especialidade} (RQE ${rqe.valor.numero})`
    : 'Pós-graduado em Fisioterapia Neuropediátrica';
}
