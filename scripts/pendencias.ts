// Relatório de pendências: `pnpm pendencias`. Sai com código 1 se houver bloqueantes.
import { formatarRelatorio, listarPendencias } from '../src/lib/pendencias.ts';

const ps = listarPendencias();
console.log(formatarRelatorio(ps));
process.exitCode = ps.some((p) => p.nivel === 'bloqueante') ? 1 : 0;
