import type { Campo, Nivel } from '../data/campo.ts';
import { ANTES_E_DEPOIS_HABILITADO, midia, type ItemMidia } from '../data/midia.ts';
import { profissional } from '../data/profissional.ts';

export interface Pendencia {
  readonly nivel: Nivel;
  readonly campo: string;
  readonly nota: string;
}

const isCampo = (v: unknown): v is Campo<unknown> =>
  typeof v === 'object' && v !== null && 'status' in v && 'valor' in v;

function coletarCampos(obj: unknown, caminho: string, out: Pendencia[]): void {
  if (isCampo(obj)) {
    if (obj.status === 'pendente') out.push({ nivel: obj.nivel, campo: caminho, nota: obj.nota });
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => coletarCampos(v, `${caminho}[${i}]`, out));
    return;
  }
  if (typeof obj === 'object' && obj !== null) {
    for (const [k, v] of Object.entries(obj)) coletarCampos(v, caminho ? `${caminho}.${k}` : k, out);
  }
}

export function pendenciasMidia(itens: readonly ItemMidia[]): Pendencia[] {
  const out: Pendencia[] = [];
  for (const m of itens) {
    const campo = `midia.${m.id}`;
    if (m.tcle === 'revogado') continue; // fora do ar em qualquer modo
    if (!m.arquivo) {
      out.push({ nivel: 'aviso', campo, nota: 'Slot de mídia vago (oculto em produção).' });
      continue;
    }
    if (m.pacienteRef && m.tcle !== 'assinado') {
      out.push({
        nivel: 'aviso',
        campo,
        nota: 'Sem TCLE do responsável legal: só aparece em preview, com selo PROVISÓRIO.',
      });
      continue;
    }
    if (m.pacienteRef && !m.dataRegistro) {
      out.push({
        nivel: 'bloqueante',
        campo,
        nota: 'Mídia com TCLE sem data de registro: a data é obrigatória junto à publicação.',
      });
    }
    if (m.pacienteRef && m.tcle === 'assinado') {
      out.push({
        nivel: 'aviso',
        campo,
        nota: 'Confirmar que o TCLE assinado está arquivado fora do repositório.',
      });
    }
    if (m.autorizacaoTerceiro === 'pendente') {
      out.push({
        nivel: 'bloqueante',
        campo,
        nota: 'Caso de outro profissional sem autorização formal arquivada.',
      });
    }
    if (m.antesDepois && !ANTES_E_DEPOIS_HABILITADO) {
      out.push({ nivel: 'aviso', campo, nota: '"Antes e depois" desligado: item oculto.' });
    }
  }
  return out;
}

export function listarPendencias(): Pendencia[] {
  const out: Pendencia[] = [];
  coletarCampos(profissional, 'profissional', out);
  out.push(...pendenciasMidia(midia));
  return out;
}

export function formatarRelatorio(ps: readonly Pendencia[]): string {
  const bloq = ps.filter((p) => p.nivel === 'bloqueante');
  const avis = ps.filter((p) => p.nivel === 'aviso');
  const linha = (p: Pendencia) => `  • ${p.campo}: ${p.nota}`;
  return [
    `BLOQUEANTES para produção (${bloq.length}):`,
    ...(bloq.length ? bloq.map(linha) : ['  nenhuma']),
    '',
    `AVISOS (${avis.length}):`,
    ...(avis.length ? avis.map(linha) : ['  nenhum']),
  ].join('\n');
}
