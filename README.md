# Site · João Pedro Frederes, fisioterapeuta

Landing page de presença profissional (neuropediatria, TEA, desenvolvimento motor).
Astro + TypeScript strict, JS mínimo (cerca de 2 kB gzip na home), sem nenhum request a terceiros.
Também serve de **template para sites de fisioterapeutas e clínicas de fisioterapia** (ver o fim deste arquivo).

## Comandos
| Comando | O que faz |
|---|---|
| `pnpm dev` | desenvolvimento (selos PROVISÓRIO, slots vagos desenhados, `/pendencias`, `/_kit`) |
| `pnpm build:preview` | build "em revisão": `noindex`, robots bloqueado, faixa de aviso, mídia `previewOk` |
| `pnpm build` | build de **produção**: falha com mensagem clara se houver pendência BLOQUEANTE |
| `pnpm build:vercel` | o que a Vercel roda: produção só com `SITE_ENV=production`, senão "em revisão" |
| `pnpm pendencias` | relatório agrupado (identidade, consentimentos, autorizações, vídeos, legendas…) |
| `pnpm check` | typecheck, design system (AA + cores) e validação do manifesto de mídia |
| `pnpm audit:a11y` | axe-core (claro/escuro/mobile), foco por teclado, legendas, CSP |
| `pnpm audit:lighthouse` | Lighthouse mobile (metas 95/100/95/95) + orçamento de JS. Rodar depois de `pnpm build` |
| `pnpm audit:compliance` | termos vetados, identificação, mídia e vínculos no HTML final |

Node 22 (`.nvmrc`, `engines`), pnpm 10.28 (`packageManager`).
Navegador das auditorias: `CHROME_PATH` ou `/opt/pw-browsers/chromium`.

## Onde editar (tudo em `src/config/`)
| Arquivo | Conteúdo |
|---|---|
| `profile.config.ts` | nome, CREFITO, títulos, RQE, vínculos, unidades, WhatsApp, Instagram. Cada campo é `confirmado()`, `bloqueante()` ou `aviso()` |
| `copy.config.ts` | todos os textos, com as fontes das afirmações clínicas |
| `compliance.config.ts` | perfil COFFITO: termos vetados, identificação, antes e depois, crianças |
| `theme.config.ts` | o **único** lugar com cores; tokens semânticos, esquemas claro/escuro, pares AA |
| `slots-video.config.ts` | slots de vídeo (convite, atendimentos com capítulos, apresentação) |
| `retrato.config.ts` | poses do retrato que percorre o site |
| `instagram.config.ts` | até 6 publicações locais (sem embed) |
| `contato.config.ts` | analytics (desligado), canal de revogação do TCLE |

Mídia: `assets-originais/` (originais intactos) + `media.manifest.json` (só `pacienteRef`, nunca nome) + `scripts/prepare-media.mjs`.
Pesquisa de conteúdo de saúde: `docs/pesquisa/`. Conformidade: `docs/COMPLIANCE.md`.

## Vídeos: como preencher um slot
1. Coloque o original em `assets-originais/videos/` e cadastre-o em `media.manifest.json` (com `pacienteRef`, `tcleRef`, `dataRegistro`, `legenda` e derivados MP4/WebM/poster/.vtt em `assets-originais/videos/derivados/`).
2. Em `src/config/slots-video.config.ts`: mude `estado` para `'preenchido'` e preencha `midiaId`, um `titulo` neutro (`{data}` vira a data do registro) e os `capitulos`.
3. Rode `pnpm pendencias`. Se faltar algo, a produção bloqueia e o preview mostra o vídeo com selo PROVISÓRIO.

## Deploy (Vercel)
- Projeto `fisio-frederes`, ligado ao GitHub. `vercel.json` define install/build, cabeçalhos de segurança, redirect www → domínio principal e cache.
- Sem `SITE_ENV=production`, todo deploy sai **em revisão** (`noindex`, robots `Disallow: /`, faixa amarela).
- Go-live: no painel, definir `SITE_ENV=production` e `SITE_URL=https://dominio` (ambiente Production), apontar o domínio e fazer um novo deploy.

---

## Como criar o próximo site de fisioterapeuta ou clínica a partir deste template

1. **Copiar sem histórico**
   ```bash
   git clone --depth 1 <este-repo> novo-site && cd novo-site && rm -rf .git && git init
   rm -rf assets-originais/*/* media.manifest.json docs/midia docs/COPY_DECK.md
   ```
   Recrie `media.manifest.json` com `{"versao":1,"antesDepoisHabilitado":false,"itens":[]}`.
2. **Identidade** (`src/config/profile.config.ts`): comece com tudo como `bloqueante()`/`aviso()` e só use `confirmado()` com documento em mãos. Para clínica: `nomeMarca` = clínica; cada fisioterapeuta citado precisa de nome completo + CREFITO (a identificação COFFITO vale para todos); `vinculos` e `unidades` para cada endereço.
3. **Marca e tema** (`src/config/theme.config.ts`): amostre a cor principal do logo (veja como em `docs/midia/LOTE-01.md`), troque as primitivas e rode `pnpm check`. Não pode haver nenhum par abaixo de AA. Troque `Marca.astro` pelo monograma da nova marca e as fontes em `Base.astro`. **Não reutilize a identidade visual deste site** (monograma, coluna de pontos, vinho).
4. **Conteúdo** (`src/config/copy.config.ts`): pesquise antes, registre em `docs/pesquisa/<tema>.md` (fonte, data, nível de evidência), escreva o copy deck, aprove com o cliente e só então integre. Sem evidência, não afirme.
5. **Mídia**: originais em `assets-originais/`, manifesto com `pacienteRef`/`tcleRef`/`dataRegistro`, derivados com `prepare-media.mjs` (vídeos: ffmpeg, comandos em `docs/midia/LOTE-02.md`). Criança: só com TCLE do responsável e sem rosto frontal.
6. **Regras do conselho** (`src/config/compliance.config.ts`): o perfil `coffito` já vem pronto. Revise os termos vetados se o conselho atualizar as resoluções.
7. **Verificar**: `pnpm pendencias` → `pnpm build:preview` → `pnpm audit:a11y` → `pnpm build` → `pnpm audit:lighthouse`.
8. **Deploy**: crie o projeto na Vercel a partir do repositório (sem `SITE_ENV`, sai "em revisão"), revise com o cliente e preencha `docs/COMPLIANCE.md` antes do go-live.
