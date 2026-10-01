import { contato } from '../config/contato.config.ts';
import { profile, registroCrefito } from '../config/profile.config.ts';

/** Mensagem inicial neutra: não pede nem sugere envio de dado de saúde. */
const MENSAGEM = 'Olá, gostaria de agendar uma consulta fisioterapêutica.';

export const whatsappUrl = (): string =>
  `https://wa.me/${profile.whatsapp.valor}?text=${encodeURIComponent(MENSAGEM)}`;

export const instagramUser = (): string => profile.instagram.valor;
export const instagramUrl = (u: string = instagramUser()): string => `https://www.instagram.com/${u}/`;

/** Linha de identificação exigida pelo COFFITO. */
export const identificacao = (): string =>
  `${profile.nomeCompleto.valor} · ${profile.profissao.valor} · ${registroCrefito()}`;


/** WhatsApp para pedido de retirada de imagem/vídeo (revogação do TCLE). */
export const revogacaoUrl = (): string =>
  `https://wa.me/${profile.whatsapp.valor}?text=${encodeURIComponent(contato.revogacao.mensagemWhatsapp)}`;
