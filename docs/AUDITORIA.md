# Auditoria do template `dra-nicole` → landing de uma página (fisio-frederes)

Data: 2026-10-01. Base auditada: `joaoCanonica/dra-nicole` (clone raso, sem histórico).

## Estado do template
- `npm ci`, `npm run check` (0 erros, 0 avisos, 1 hint) e `npm run build` (14 páginas, CSP com hashes, auditoria de conformidade aprovada): **verdes**.
- Stack: Astro 5.18.2, TS 5.9.3, npm 10.9.7 (`packageManager`), Node 22 (`.nvmrc`). Versões fixadas.
- JS no cliente da home: 2 scripts inline, ≈ 2,1 kB sem compressão (consentimento + trecho da "linha"). Nenhum bundle externo.

> **Pendência desta etapa:** a substituição do conteúdo deste repositório pelo template não foi aplicada, porque apagaria os arquivos da entrega anterior (commit na branch `claude/zealous-bell-8t0pla`). Isso precisa da autorização explícita do responsável. Esta auditoria descreve o plano; nenhuma feature foi alterada.

## O que fica (reaproveitar sem mudança de comportamento)
| Item | Motivo |
|---|---|
| `src/config/*` como fonte única (profile, theme, compliance, copy, contato, legal) | Mesmo modelo que a arquitetura pede |
| `scripts/validate-config.ts` (zod + `CONFIRMAR` + trava `SITE_ENV=production` + `--relatorio`) | É a trava de produção. Vai ganhar níveis bloqueante/aviso |
| `scripts/audit-compliance.ts` | Varre o HTML final por termos vetados e por terceiros carregados antes do consentimento |
| `scripts/gerar-csp.ts` | CSP com hashes para scripts inline |
| `scripts/audit-a11y.ts`, `audit-lighthouse.ts` | Gate de WCAG 2.2 AA e de performance |
| `src/lib/ambiente.ts` (versão provisória com noindex + faixa) | Equivale ao "preview provisório" |
| `src/lib/color.ts` + checagem de contraste no validador | Garante AA para a nova paleta vinho/gelo |
| `src/lib/termos.ts`, `src/lib/schema.ts` | Termos vetados e JSON-LD (trocar o tipo para fisioterapia) |
| `Consentimento.astro` | Aceitar/Recusar com o mesmo peso; nada de terceiros antes do aceite |
| Componentes base: `Container`, `Section`, `Button`, `Link`, `Icon`, `Eyebrow`, `Tag`, `Texto`, `BotaoWhatsapp`, `RodapeLegal`, `PaginaLegal` | Genéricos. Restilizar via tokens |
| `privacidade.astro`, `termos.astro`, `robots.txt.ts`, `favicon.svg.ts`, `@astrojs/sitemap`, `vercel.json` | Infra e páginas legais continuam necessárias |
| `docs/A11Y.md`, `docs/PERFORMANCE.md`, `docs/COMPLIANCE.md` | Reescrever para COFFITO |

## O que sai
| Item | Motivo |
|---|---|
| `src/content/artigos/*`, `src/content/faq/*`, `pages/leitura/*`, `Breadcrumbs` | Conteúdo de ginecologia e blog. A landing é de uma página só |
| `pages/avaliar.astro`, `print/plaquinha-avaliacao.*`, `scripts/gerar-impressos.ts`, `docs/REPUTACAO.md`, `googleBusiness` | Fluxo de avaliação no Google: fora do escopo, e "avaliação" é vocabulário vetado |
| `FormContato.astro`, `pages/contato.astro` | O briefing pede sem formulário. Contato só por WhatsApp/Instagram |
| `CalendarioCuidado`, `calendario.config.ts`, `docs/CALENDARIO_INSTAGRAM.md` | Específicos da ginecologia |
| `secoes/Convenios`, `ComoAgendar`, `AntesDaConsulta`, `GuiaConsulta`, `AvisoEmergencia`, `IlustracaoMaeBebe`, `PortraitFrame` (versão atual) | Conteúdo/identidade da outra profissional |
| Fontes Cormorant Garamond, Great Vibes, Hanken Grotesk | Assinatura visual do site anterior (proibido reutilizar) |
| `analytics` em `contato.config` | Opcional. Manter `{ tipo: 'nenhum' }` |

## O que muda
| De | Para |
|---|---|
| CRM/UF, RQE médico, "Dra." | `crefito: { regiao, numero }`, `consultaPublicaUrl`, `rqe` opcional, sem tratamento |
| `especialidade` livre | Regra: sem RQE → "pós-graduado em Fisioterapia Neuropediátrica" |
| `compliance.config` (CFM) | COFFITO 424/2013 e 532/2021: vocabulário (consulta fisioterapêutica, atendimento, paciente, plano terapêutico), TEA sem promessa, "antes e depois" desligado |
| `CONFIRMAR` binário | Pendência com nível **bloqueante** (endereço, WhatsApp, data de gravação, nome completo, região do CREFITO) ou **aviso** (RQE, slot vago, comprovantes a arquivar) |
| Várias páginas | `index.astro` único com âncoras + `privacidade` + `termos` |
| Sem pipeline de mídia | `assets-originais/` → `scripts/prepare-media.mjs` → `public/midia/`, com `media.manifest.json` (TCLE, data, `pacienteRef`) e selo PROVISÓRIO no preview |
| `theme.config` (paleta anterior) | Vinho + branco-gelo a partir do logo, com contraste validado |
| `Consentimento` (analytics) | Também bloqueia o embed do Instagram e o mapa |
| npm | Manter npm, como no template (o commit anterior desta branch usava pnpm; o template prevalece) |

## Repo Marina Branco
Não existe localmente nesta sessão. Os scripts `prepare-media.mjs`, `ocr-midia.mjs`, `media.manifest.json` e `validate-config.ts` dela **não foram lidos**. O esquema de mídia foi recriado a partir das regras do briefing (ver `ARQUITETURA.md`).
