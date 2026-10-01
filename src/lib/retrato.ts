import { poses, type Pose } from '../config/retrato.config.ts';
import { imagemLiberada, srcsetImagem, type ItemManifesto } from './manifesto.ts';
import { EM_PRODUCAO } from './modo.ts';

export interface PoseResolvida extends Pose {
  readonly item: ItemManifesto;
  readonly provisorio: boolean;
  readonly avif: string;
  readonly webp: string;
  readonly fallback: string;
  readonly largura: number;
  readonly altura: number;
}

/** Poses cuja mídia está liberada no modo atual. */
export function posesLiberadas(): PoseResolvida[] {
  return poses.flatMap((p) => {
    const item = imagemLiberada(p.midiaId, EM_PRODUCAO);
    if (!item) return [];
    const a = srcsetImagem(item, 'avif');
    const w = srcsetImagem(item, 'webp');
    const fallback = w.srcset.split(', ').at(-1)?.split(' ')[0] ?? '';
    return [{ ...p, item, provisorio: !item.publicavel, avif: a.srcset, webp: w.srcset, fallback, largura: w.largura, altura: w.altura }];
  });
}

export const poseDaSecao = (secao: string): PoseResolvida | undefined =>
  posesLiberadas().find((p) => p.secao === secao);

/** sizes do retrato do hero (também usado no <link rel=preload>). */
export const SIZES_HERO = '(min-width: 60rem) 28rem, 78vw';
