import { profissional } from '../data/profissional.ts';

/** Mensagem inicial neutra: não pede nem sugere envio de dado de saúde. */
const MENSAGEM = 'Olá! Gostaria de informações sobre consulta fisioterapêutica.';

export const whatsappUrl = (): string =>
  `https://wa.me/${profissional.contato.whatsapp.valor}?text=${encodeURIComponent(MENSAGEM)}`;

export const instagramUser = (): string => profissional.contato.instagram.valor;
export const instagramUrl = (): string => `https://www.instagram.com/${instagramUser()}/`;

/** Linha de identificação exigida pelo COFFITO. */
export const identificacao = (): string => {
  const { nomeCompleto, profissao, crefito } = profissional;
  return `${nomeCompleto.valor} · ${profissao.valor} · ${crefito.regiao.valor} ${crefito.numero.valor}`;
};
