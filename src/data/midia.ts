/**
 * Manifesto de mídia (vídeos e imagens com pacientes ou do consultório).
 *
 * PRIVACIDADE: nunca escrever nome, escola, cidade ou rotina de paciente
 * neste arquivo, no código ou em commits. Use apenas `pacienteRef`, um código
 * opaco (ex.: "P-001") cuja chave fica fora do repositório, junto com o TCLE.
 *
 * Regras aplicadas pelo site (ver src/lib/midia.ts):
 *  - Sem TCLE assinado pelo responsável legal → só aparece em dev/preview,
 *    com selo "PROVISÓRIO". Em produção, nunca.
 *  - TCLE revogado → sai do ar em qualquer modo.
 *  - Com TCLE e sem data de registro → BLOQUEIA o build de produção.
 *  - "Antes e depois" fica desligado (flag abaixo) até confirmação do CREFITO.
 *  - Edição permitida: só recorte e cobertura de identificadores. Sem retoque.
 */

export type StatusTcle = 'ausente' | 'assinado' | 'revogado';

export interface ItemMidia {
  readonly id: string;
  readonly tipo: 'video' | 'imagem';
  /** Código opaco. Nunca o nome. Null para mídia sem paciente. */
  readonly pacienteRef: string | null;
  readonly tcle: StatusTcle;
  /** Data do registro (gravação/foto), ISO AAAA-MM-DD. Exigida junto à publicação. */
  readonly dataRegistro: string | null;
  /** Caminho em /public. Null = slot vago. */
  readonly arquivo: string | null;
  readonly poster: string | null;
  /** Descrição objetiva do que aparece. Sem legenda emocional ou de "conquista". */
  readonly descricao: string;
  /** Texto alternativo / transcrição resumida. */
  readonly alt: string;
  readonly antesDepois: boolean;
  /** Mídia de caso de outro profissional exige autorização formal. */
  readonly autorizacaoTerceiro: 'nao-se-aplica' | 'pendente' | 'arquivada';
}

/** Desligado até o CREFITO da região confirmar o alcance da regra. */
export const ANTES_E_DEPOIS_HABILITADO = false;

export const midia: readonly ItemMidia[] = [
  {
    id: 'video-01',
    tipo: 'video',
    pacienteRef: 'P-001',
    tcle: 'ausente',
    dataRegistro: null,
    arquivo: null,
    poster: null,
    descricao: 'Atividade de equilíbrio em circuito com obstáculos baixos.',
    alt: 'Criança, filmada de costas, caminha sobre uma trave baixa com apoio do fisioterapeuta.',
    antesDepois: false,
    autorizacaoTerceiro: 'nao-se-aplica',
  },
  {
    id: 'video-02',
    tipo: 'video',
    pacienteRef: 'P-002',
    tcle: 'ausente',
    dataRegistro: null,
    arquivo: null,
    poster: null,
    descricao: 'Brincadeira de arremesso para coordenação olho-mão.',
    alt: 'Mãos de uma criança arremessando uma bola leve em direção a um alvo no chão.',
    antesDepois: false,
    autorizacaoTerceiro: 'nao-se-aplica',
  },
  {
    id: 'video-03',
    tipo: 'video',
    pacienteRef: null,
    tcle: 'ausente',
    dataRegistro: null,
    arquivo: null,
    poster: null,
    descricao: 'Slot vago: espaço reservado para um vídeo do ambiente de atendimento.',
    alt: 'Espaço reservado.',
    antesDepois: false,
    autorizacaoTerceiro: 'nao-se-aplica',
  },
];
