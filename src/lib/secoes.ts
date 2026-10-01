import { renderCompilado, renderConvite } from './slots.ts';

/** Seções da landing, na ordem do copy deck. Fonte única para o menu e "A Coluna". */
export interface Secao {
  readonly id: string;
  readonly rotulo: string;
  readonly noMenu: boolean;
}

export function secoes(): Secao[] {
  return [
    { id: 'inicio', rotulo: 'Início', noMenu: false },
    { id: 'sobre', rotulo: 'Quem é', noMenu: true },
    ...(renderConvite() ? [{ id: 'convite', rotulo: 'Apresentação', noMenu: false }] : []),
    { id: 'atua', rotulo: 'Em que atua', noMenu: true },
    { id: 'atendimento', rotulo: 'Atendimento', noMenu: true },
    ...(renderCompilado() ? [{ id: 'videos', rotulo: 'Vídeos', noMenu: false }] : []),
    { id: 'porque', rotulo: 'Desenvolvimento', noMenu: true },
    { id: 'onde', rotulo: 'Onde atende', noMenu: true },
    { id: 'faq', rotulo: 'Perguntas', noMenu: true },
    { id: 'contato', rotulo: 'Contato', noMenu: true },
  ];
}
