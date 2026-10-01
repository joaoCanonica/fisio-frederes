import { slots } from '../config/slots-video.config.ts';
import { EM_PRODUCAO } from './modo.ts';
import { impedimentosMidia } from './validacao.ts';
import { midiaPorId, type ItemManifesto } from './manifesto.ts';

export type Render =
  | { readonly tipo: 'video'; readonly itens: readonly { item: ItemManifesto; provisorio: boolean }[] }
  | { readonly tipo: 'placeholder' }
  | null;

function resolver(estado: 'vago' | 'preenchido', ids: readonly string[]): Render {
  if (estado === 'vago') return EM_PRODUCAO ? null : { tipo: 'placeholder' };
  const itens = ids
    .map((id) => midiaPorId(id))
    .filter((m): m is ItemManifesto => !!m)
    .map((item) => ({ item, provisorio: impedimentosMidia(item).length > 0 }))
    // Produção: só mídia liberada (o portão já falha antes, isto é defesa extra).
    // Preview: mídia não liberada aparece com selo PROVISÓRIO se previewOk.
    .filter(({ item, provisorio }) => (EM_PRODUCAO ? !provisorio : !provisorio || item.previewOk));
  if (itens.length) return { tipo: 'video', itens };
  return EM_PRODUCAO ? null : { tipo: 'placeholder' };
}

export const renderConvite = (): Render =>
  resolver(slots.conviteVideo.estado, slots.conviteVideo.midiaId ? [slots.conviteVideo.midiaId] : []);

export const renderCompilado = (): Render => resolver(slots.compilado.estado, slots.compilado.midiaIds);
