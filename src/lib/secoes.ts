import { renderCompilado, renderConvite } from './slots.ts';

/** Seções da landing, na ordem. Fonte única para o menu e para "A Coluna". */
export interface Secao {
  readonly id: string;
  readonly rotulo: string;
  readonly noMenu: boolean;
}

export function secoes(): Secao[] {
  return [
    { id: 'inicio', rotulo: 'Início', noMenu: false },
    ...(renderConvite() ? [{ id: 'convite', rotulo: 'Apresentação', noMenu: true }] : []),
    { id: 'sobre', rotulo: 'Quem é', noMenu: true },
    { id: 'desenvolvimento', rotulo: 'Desenvolvimento', noMenu: true },
    { id: 'tea', rotulo: 'TEA', noMenu: true },
    { id: 'atendimento', rotulo: 'Atendimento', noMenu: true },
    ...(renderCompilado() ? [{ id: 'videos', rotulo: 'Vídeos', noMenu: true }] : []),
    { id: 'contato', rotulo: 'Contato', noMenu: true },
  ];
}
