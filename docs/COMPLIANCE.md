# Conformidade: checklist para validação humana

Atualizado em 2026-10-01. Estado técnico: **0 pendências bloqueantes** (`npm run pendencias`).
Os itens abaixo dependem de pessoas e documentos; o código não consegue verificá-los.

## Verificações automáticas (rodam em todo build)
| Verificação | Script | Situação |
|---|---|---|
| Pendências bloqueantes impedem produção | `scripts/validate-config.ts --production` | ✔ 0 bloqueantes |
| Termos vetados no HTML final, identificação (nome + CREFITO) em toda página | `scripts/audit-compliance.ts` | ✔ |
| Mídia publicada só com liberação; vídeo de menor só com TCLE; vínculos só com autorização | `scripts/audit-compliance.ts --production` | ✔ |
| Contraste AA e nenhuma cor hardcoded | `scripts/validate-theme.ts` | ✔ 49/49 pares |
| CSP com hash nos scripts inline | `scripts/gerar-csp.ts` | ✔ |
| Acessibilidade: axe-core, foco por teclado, legendas, CSP | `npm run audit:a11y` | ✔ 0 violações |
| Lighthouse mobile e orçamento de JS | `npm run audit:lighthouse` | ✔ Home: Perf 98 · A11y 100 · BP 100 · SEO 100; JS 2,12 kB gzip |
| Nenhum request a terceiros | verificação com navegador (registro de rede) | ✔ 0 |

## Pendências para validação humana

### Registro e título profissional
- [ ] **Região do CREFITO:** o site usa **CREFITO-10 (SC)**, nº 369113-F, confirmado pelo cliente. Conferir na consulta pública do CREFITO-10.
- [ ] **Atuação em dois estados (SC e RS):** guardar o comprovante de que a atuação no RS está coberta (inscrição secundária ou autorização no CREFITO-5). O cliente confirmou que o registro existe. O RS **não** é divulgado no site (`atendimentoRS.divulgar = false`).
- [ ] **Título de especialista / RQE:** quando chegar, preencher `profile.especialista` (`registrado`, `rqe`, `especialidade`). Até lá, o site usa "Pós-graduado em Fisioterapia Neuropediátrica" e o validador bloqueia "especialista".
- [ ] **Link de verificação do CREFITO (opcional):** se houver link de consulta pública, preencher `linkVerificacaoCrefito`.

### Consentimentos e autorizações (guardar fora do repositório)
- [ ] **TCLE T-001:** TCLE assinado pelo responsável legal da criança do vídeo `video-P-001-marcha`. Arquivar o original e, depois, marcar `tcleArquivadoForaDoRepo: true` no manifesto.
- [ ] **Autorização da NeuroKids:** nome, marca e espaço (site e vídeos). Arquivar e preencher `comprovante` em `profile.vinculos`.
- [ ] **Autorização do Centro de Reabilitação da Uniplac:** idem.
- [ ] **Endereço do CER Uniplac:** veio de fonte pública de 2016 (COSEMS-SC). Confirmar se continua atual.

### Privacidade
- [ ] **Revisão da política** (`/privacidade`) por quem responde juridicamente: bases legais, prazo de retirada ("até 5 dias úteis") e canal (WhatsApp).
- [ ] **E-mail para pedidos de privacidade** (opcional): `contato.config.ts → emailPrivacidade`.
- [ ] **Hospedagem:** a política cita registros técnicos da hospedagem de forma genérica. Citar a Vercel se for o provedor definitivo.

### Normas do conselho
- [ ] **Conferência final das resoluções vigentes do COFFITO** (424/2013, 532/2021 e atualizações) **com o CREFITO-10** antes do go-live. Registrar a data em `docs/pesquisa/regulacao-coffito.md`.
- [ ] **"Antes e depois":** continua desligado (`compliance.antesDepois = false`) até o CREFITO confirmar o alcance da regra.

### Conteúdo ainda provisório (avisos, não bloqueiam)
- [ ] Título do hero (oculto em produção até ser aprovado; aparece o padrão).
- [ ] Duração e frequência dos atendimentos (ocultas em produção até confirmação).
- [ ] Legenda `.vtt` do vídeo de apresentação (sem ela, o vídeo não vai para produção).
- [ ] Nomes dos capítulos do vídeo P-001 (propostos a partir dos quadros).
- [ ] Fotos originais em alta resolução (as atuais são capturas do Instagram e ficam só no preview).
- [ ] Até 6 publicações selecionadas para o bloco do Instagram.
- [ ] Domínio definitivo e links do Google Maps.

## Go-live
1. Resolver o que for possível da lista acima.
2. Na Vercel: definir `SITE_ENV=production` (e `SITE_URL=https://dominio`) no ambiente Production.
3. Apontar o domínio. O `vercel.json` redireciona www → domínio principal.
4. Fazer um novo deploy: o build de produção roda todas as auditorias e falha se algo bloquear.
