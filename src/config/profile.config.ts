import { aviso, confirmado, type Campo } from './campo.ts';

/**
 * Perfil profissional: fonte única de verdade para a identificação exigida pelo
 * COFFITO (nome completo, profissão e CREFITO) em toda página e todo vídeo.
 *
 * Campos incertos usam `bloqueante(...)` (o build de produção falha) ou
 * `aviso(...)` (produção passa e o dado fica oculto). Para confirmar, troque
 * por `confirmado(...)`.
 */

/**
 * 'confirmada-pelo-cliente': aceita pela trava de produção; a falta do
 * comprovante vira AVISO de baixa prioridade.
 */
export type Autorizacao = 'pendente' | 'confirmada-pelo-cliente' | 'formal-arquivada';

export interface Vinculo {
  readonly id: string;
  readonly nome: string;
  readonly instagram: string;
  readonly autorizacao: Autorizacao;
  /** Onde está arquivado o comprovante (fora do repositório). Null = a arquivar. */
  readonly comprovante: string | null;
}

export interface Unidade {
  readonly id: string;
  readonly nome: string;
  /** Id do vínculo institucional que autoriza o uso do nome/espaço. */
  readonly vinculoId: string;
  readonly mapsUrl: Campo<string | null>;
  /** Identificador do lugar no Google Maps (parâmetro "ftid"). */
  readonly ftid: Campo<string | null>;
  /** Endereço por extenso: rua, número, bairro, cidade/UF, CEP. */
  readonly endereco: Campo<string>;
}

export const profile = {
  nomeCompleto: confirmado('João Pedro Frederes'),
  nomeMarca: confirmado('João Pedro Frederes'),
  profissao: confirmado('Fisioterapeuta' as const),

  crefito: {
    numero: confirmado('369113-F'),
    regiao: confirmado('CREFITO-10'), // Santa Catarina
    atuacaoUfs: ['SC', 'RS'] as const,
    /** Registro no CREFITO-5 (RS) confirmado pelo cliente. */
    comprovanteAtuacaoUfs: confirmado<string | null>('CREFITO-5: registro confirmado pelo cliente'),
  },

  /**
   * Opcional. A norma exige exibir nome, profissão e número do CREFITO, não um
   * link. Se um dia for informado, aparece ao lado do registro.
   */
  linkVerificacaoCrefito: confirmado<string | null>(null),

  titulos: {
    graduacao: confirmado({ curso: 'Fisioterapia', instituicao: 'Uniplac' }),
    posGraduacao: confirmado({ area: 'Fisioterapia Neuropediátrica', instituicao: null as string | null }),
    /** Concluído (confirmado pelo cliente). */
    mestrado: confirmado({ programa: 'Ambiente e Saúde', instituicao: 'Uniplac' as string | null, concluido: true }),
  },

  /** Sem registro de especialista + RQE, o site nunca usa a palavra "especialista". */
  especialista: { registrado: false, rqe: null as string | null, especialidade: null as string | null },

  vinculos: [
    {
      id: 'neurokids',
      nome: 'NeuroKids',
      instagram: 'neurokidslages',
      autorizacao: 'confirmada-pelo-cliente',
      comprovante: null,
    },
    {
      id: 'cer-uniplac',
      nome: 'Centro de reabilitação Uniplac',
      instagram: 'ceruniplac',
      autorizacao: 'confirmada-pelo-cliente',
      comprovante: null,
    },
  ] as const satisfies readonly Vinculo[],

  areasAtuacao: [
    'Neuropediatria',
    'Desenvolvimento motor',
    'Transtorno do espectro autista (TEA): aspectos motores e sensório-motores',
  ],

  regioesAtendimento: ['Lages e região (SC)'],

  /** Não divulgado no site enquanto `divulgar` for false. */
  atendimentoRS: {
    divulgar: false,
    observacao: aviso(
      'Ocasional, quando está com a família.',
      'Definir como comunicar o atendimento ocasional no RS (ou manter fora do site).',
    ),
  },

  unidades: [
    {
      id: 'neurokids-lages',
      nome: 'NeuroKids',
      vinculoId: 'neurokids',
      mapsUrl: confirmado<string | null>('https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQ-5LYuZqXAxUAAAAAHQAAAAAQBQ..i&udm&fvr=1&pvq=Cg0vZy8xMXdxZDlqZngwIg8KCW5ldXJva2lkcxACGAM&lqi=CgluZXVyb2tpZHNIgO_gxNm7gIAIWg8QABgAIgluZXVyb2tpZHOSAQxwc3ljaG9sb2dpc3Q&cs=0&um=1&ie=UTF-8&fb=1&gl=br&sa=X&ftid=0x94e01f8509f8d6f9:0x40a9e7d3fe01acf5'),
      ftid: confirmado<string | null>('0x94e01f8509f8d6f9:0x40a9e7d3fe01acf5'),
      endereco: confirmado('R. Frei Rogério, 394, Centro, Lages (SC), CEP 88502-161'),
    },
  ] satisfies readonly Unidade[],

  sedePrincipal: 'neurokids-lages',

  instagram: confirmado('fisiofrederes.ped'),
  /** Somente dígitos: 55 + DDD + número. */
  whatsapp: confirmado('5554996593170'),
  /** Não será usado (decisão do cliente). */
  lattes: confirmado<string | null>(null),

  /** Domínio de produção, sem barra final. */
  dominio: aviso('https://example.com', 'Definir o domínio de produção.'),
} as const;

export type Profile = typeof profile;

/** Título profissional conforme a regra do RQE. */
export function tituloProfissional(): string {
  const e = profile.especialista;
  return e.registrado && e.rqe && e.especialidade
    ? `Especialista em ${e.especialidade} (RQE ${e.rqe})`
    : `Pós-graduado em ${profile.titulos.posGraduacao.valor.area}`;
}

export const registroCrefito = (): string =>
  `${profile.crefito.regiao.valor} ${profile.crefito.numero.valor}`;

export const sede = (): Unidade => {
  const u = profile.unidades.find((x) => x.id === profile.sedePrincipal);
  if (!u) throw new Error(`sedePrincipal "${profile.sedePrincipal}" não existe em unidades.`);
  return u;
};
