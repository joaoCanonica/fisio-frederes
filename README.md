# Site · João Pedro Frederes, fisioterapeuta

Landing page de presença profissional (neuropediatria, TEA, desenvolvimento motor).
Astro + TypeScript strict, JS mínimo (ilhas pequenas: cabeçalho, revelação ao rolar, consentimento).

## Comandos
| Comando | O que faz |
|---|---|
| `pnpm dev` | desenvolvimento (selos PROVISÓRIO ativos, página `/pendencias`) |
| `pnpm build:preview` | build de revisão: `noindex`, selos ativos, mídia sem TCLE visível com selo |
| `pnpm build` | build de **produção**: falha se houver pendência bloqueante |
| `pnpm pendencias` | relatório de bloqueantes e avisos |
| `pnpm check` | typecheck |

Todo build roda `scripts/conformidade.mjs`, que varre o texto renderizado atrás de termos proibidos pelo COFFITO (preço, grátis, cura, garantia, superlativos, "especialista", "sessão", "avaliação", "aluno", "treino"). Negações explícitas ("não cura") são aceitas.

Node 22 (`.nvmrc`), pnpm 10.28 (`packageManager`).

## Onde editar
- `src/data/profissional.ts`: nome, CREFITO, formação, RQE, endereço, contatos. Cada campo é `confirmado(...)`, `bloqueante(...)` ou `aviso(...)`.
- `src/data/midia.ts`: manifesto de vídeos/fotos. **Só `pacienteRef`, nunca nome.** O TCLE fica fora do repo.
- `docs/pesquisa/`: fontes de todo conteúdo de saúde.

## Regras automatizadas
- Sem RQE → "Pós-graduado em Fisioterapia Neuropediátrica" (`tituloNeuro`).
- Mídia sem TCLE → só no preview, com selo; revogada → sai do ar; com TCLE e sem data → bloqueia produção; "antes e depois" desligado.
- Em produção, campos com aviso e valor provisório (formação a confirmar, Lattes, NeuroKids sem autorização) ficam ocultos.
- Instagram e mapa só carregam após "Aceitar"; "Aceitar" e "Recusar" têm o mesmo peso visual. Fontes self-hosted. Sem formulários.

## Antes do go-live
1. Resolver os bloqueantes (`pnpm pendencias`).
2. Conferir o texto vigente das Res. COFFITO 424/2013 e 532/2021 (`docs/pesquisa/regulacao-coffito.md`).
3. Conferir os valores da OMS na tabela original (`docs/pesquisa/marcos-motores.md`).
4. Substituir o monograma provisório pelo logo oficial e reajustar os tons de vinho a partir dele.
5. Atualizar `site` em `astro.config.ts`.
