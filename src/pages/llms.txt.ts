// /llms.txt: resumo em texto simples para buscadores e assistentes de IA (Google AI,
// ChatGPT, Perplexity…) entenderem quem é o profissional, onde atende e como contatar.
// Em preview não descreve nada (o site "em revisão" não deve ser citado).
import type { APIRoute } from 'astro';
import { copy } from '../config/copy.config.ts';
import { profile, registroCrefito, sede, tituloProfissional } from '../config/profile.config.ts';
import { instagramUrl, telefoneExibicao } from '../lib/contato.ts';
import { EM_PRODUCAO } from '../lib/modo.ts';

export const GET: APIRoute = ({ site }) => {
  if (!EM_PRODUCAO) return new Response('# Em revisão\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const p = profile;
  const u = sede();
  const url = (c: string) => new URL(c, site).href;
  const faq = copy.faq.itens.map((f) => `### ${f.pergunta}\n${f.resposta}`).join('\n\n');
  const corpo = `# ${p.nomeCompleto.valor} · Fisioterapeuta pediátrico em Lages (SC)

> ${p.nomeCompleto.valor} é fisioterapeuta (${registroCrefito()}), ${tituloProfissional().toLowerCase()} e mestre em ${p.titulos.mestrado.valor.programa}, formado pela Uniplac. Atende bebês e crianças em Lages, Santa Catarina, com foco no desenvolvimento motor, em neuropediatria e nos aspectos motores do TEA.

- Site oficial: ${url('/')}
- Local de atendimento: ${u.nome}, ${u.endereco.valor}
- Também atua: ${p.vinculos.filter((v) => v.id !== u.vinculoId).map((v) => v.nome).join(', ')}
- WhatsApp: ${telefoneExibicao()}
- Instagram: ${instagramUrl()}
- Atuação: somente Santa Catarina (CREFITO-10)

## Para quem é o atendimento
${copy.atua.areas.map((a) => `- ${a.titulo}: ${a.texto}`).join('\n')}

## Como funciona
${copy.atendimento.etapas.map((e, i) => `${i + 1}. ${e.titulo}: ${e.texto}`).join('\n')}

## Perguntas frequentes
${faq}

## Páginas
- [Página inicial](${url('/')})
- [Política de privacidade](${url('/privacidade/')})
`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
