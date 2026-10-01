import manifestoJson from '../../media.manifest.json' with { type: 'json' };

export type Consentimento = 'ok' | 'pendente' | 'nao-se-aplica';
export type StatusLegenda = 'pendente' | 'revisada' | 'nao-se-aplica';

export interface ItemManifesto {
  readonly id: string;
  readonly arquivo: string;
  readonly categoria: 'marca' | 'pessoa' | 'espaco' | 'videos';
  readonly tipo: 'imagem' | 'video' | 'audio';
  readonly largura: number;
  readonly altura: number;
  readonly descricao: string;
  readonly alt: string;
  readonly autoria: 'propria' | 'terceiro' | 'desconhecida' | 'CONFIRMAR';
  readonly consentimento: Consentimento;
  readonly tcleRef?: string | null;
  readonly tcleArquivadoForaDoRepo?: boolean;
  readonly publicavel: boolean;
  readonly previewOk: boolean;
  readonly pacienteRef: string | null;
  readonly menorDeIdade: boolean;
  readonly dataRegistro: string | null;
  readonly dataRegistroObs?: string;
  readonly antesDepois?: boolean;
  readonly autoriaInstituicao?: string;
  readonly vinculoId?: string;
  readonly autorizacaoInstituicao?: 'pendente' | 'confirmada-pelo-cliente' | 'formal-arquivada';
  readonly comprovanteAutorizacao?: string | null;
  readonly legenda?: { readonly status: StatusLegenda; readonly arquivo?: string } | null;
  readonly crop?: { readonly largura: number; readonly altura: number } | null;
  readonly derivados?: readonly string[];
  readonly problemas: readonly string[];
}

export const manifesto = manifestoJson as unknown as {
  readonly antesDepoisHabilitado: boolean;
  readonly itens: readonly ItemManifesto[];
};

export const midiaPorId = (id: string): ItemManifesto | undefined =>
  manifesto.itens.find((i) => i.id === id);

export const dataValida = (d: string | null | undefined): d is string =>
  !!d && /^\d{4}-\d{2}-\d{2}$/.test(d);

/** URL pública de um derivado (copiado para public/midia por prepare-media). */
export function urlDerivado(item: ItemManifesto, tipo: 'secao' | 'loop' | 'poster', ext: string): string | null {
  const d = item.derivados?.find((x) => x.includes(`-${tipo}`) && x.endsWith(`.${ext}`));
  return d ? `/midia/${d.split('/').pop()}` : null;
}
