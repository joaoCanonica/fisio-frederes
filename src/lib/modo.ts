import type { Campo } from '../data/campo.ts';
import { ANTES_E_DEPOIS_HABILITADO, type ItemMidia } from '../data/midia.ts';

/**
 * "production" só quando o build é chamado com SITE_MODE=production
 * (script `pnpm build`). Dev e `build:preview` são sempre preview.
 */
export const MODO: 'production' | 'preview' =
  import.meta.env.SITE_MODE === 'production' ? 'production' : 'preview';

export const EM_PRODUCAO = MODO === 'production';

/** Valor a exibir; em produção, campos pendentes de nível "aviso" somem. */
export function exibir<T>(c: Campo<T>): T | null {
  if (c.status === 'confirmado') return c.valor;
  return EM_PRODUCAO && c.nivel === 'aviso' ? null : c.valor;
}

export const provisorio = <T>(c: Campo<T>): boolean => c.status === 'pendente' && !EM_PRODUCAO;

export interface MidiaVisivel {
  readonly item: ItemMidia;
  readonly provisorio: boolean;
}

/** Aplica as regras de consentimento do manifesto para o modo atual. */
export function midiaVisivel(itens: readonly ItemMidia[]): MidiaVisivel[] {
  const out: MidiaVisivel[] = [];
  for (const item of itens) {
    if (item.tcle === 'revogado') continue;
    if (item.antesDepois && !ANTES_E_DEPOIS_HABILITADO) continue;
    if (item.autorizacaoTerceiro === 'pendente' && EM_PRODUCAO) continue;
    const liberado =
      !!item.arquivo &&
      (!item.pacienteRef || (item.tcle === 'assinado' && !!item.dataRegistro));
    if (liberado) out.push({ item, provisorio: false });
    else if (!EM_PRODUCAO) out.push({ item, provisorio: true });
  }
  return out;
}
