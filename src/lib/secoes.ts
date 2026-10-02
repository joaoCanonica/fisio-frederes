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
    ...(renderConvite() ? [{ id: 'convite', rotulo: 'Conheça', noMenu: false }] : []),
    { id: 'sobre', rotulo: 'Quem é', noMenu: true },
    { id: 'atua', rotulo: 'Para quem', noMenu: true },
    { id: 'atendimento', rotulo: 'Atendimento', noMenu: true },
    ...(renderCompilado() ? [{ id: 'videos', rotulo: 'Atendimentos em vídeo', noMenu: false }] : []),
    { id: 'porque', rotulo: 'Para os pais', noMenu: true },
    { id: 'onde', rotulo: 'Onde atendo', noMenu: true },
    { id: 'faq', rotulo: 'Perguntas', noMenu: true },
    { id: 'contato', rotulo: 'Contato', noMenu: true },
  ];
}
