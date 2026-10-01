# Site · João Pedro Frederes, fisioterapeuta

Landing page de presença profissional (neuropediatria, TEA, desenvolvimento motor).
Astro + TypeScript strict, JS mínimo (ilhas pequenas: cabeçalho, revelação ao rolar, consentimento).

## Comandos
| Comando | O que faz |
|---|---|
| `npm run dev` | desenvolvimento (selos PROVISÓRIO, slots vagos desenhados, página `/pendencias`) |
| `npm run build:preview` | build de revisão: `noindex`, selos ativos, mídia `previewOk` incluída |
| `npm run build` | build de **produção**: falha com mensagem clara se houver pendência BLOQUEANTE |
| `npm run pendencias` | relatório agrupado (identidade e registro, consentimentos, autorizações, vídeos, legendas…) |
| `npm run check` | typecheck + validação do media.manifest.json |

Depois de todo build, `scripts/conformidade.ts` varre o HTML final com os termos vetados de `src/config/compliance.config.ts` e exige nome completo + CREFITO em toda página.

## Onde editar
- `src/config/profile.config.ts`: identidade, CREFITO, títulos, vínculos, unidades, contatos. Campos `bloqueante(...)` / `aviso(...)` / `confirmado(...)`.
- `src/config/compliance.config.ts`: perfil COFFITO (termos vetados, identificação, antes e depois, crianças).
- `src/config/slots-video.config.ts`: slots `conviteVideo` (após o hero) e `compilado` (atendimentos).
- `media.manifest.json`: mídia (só `pacienteRef`, nunca nome). Derivados em `assets-originais/*/derivados/`.
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

## Vídeos: como preencher um slot
1. Coloque o original em `assets-originais/videos/` e cadastre-o em `media.manifest.json` (com `pacienteRef`, `tcleRef`, `dataRegistro`, `legenda` e derivados MP4/WebM/poster/.vtt em `assets-originais/videos/derivados/`).
2. Em `src/config/slots-video.config.ts`: mude `estado` para `'preenchido'` e aponte `midiaId`, `titulo` neutro (`{data}` vira a data do registro) e `capitulos`.
3. Rode `npm run pendencias`: se faltar algo (TCLE, data, legenda, autorização), a produção bloqueia e o preview mostra o vídeo com selo PROVISÓRIO.

As trilhas de capítulos e "[Vídeo sem áudio]" são geradas no build (`/midia/<id>.capitulos.vtt`, `/midia/<id>.sem-audio.vtt`).
