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
- [x] **Estado de atuação:** somente Santa Catarina (CREFITO-10). O site não menciona outro estado (confirmado pelo cliente em 2026-10-23).
- [x] **Título de especialista / RQE:** não será usado (decisão do cliente). Se um dia mudar, preencher `profile.especialista` (`registrado`, `rqe`, `especialidade`). Até lá, o site usa "Pós-graduado em Fisioterapia Neuropediátrica" e o validador bloqueia "especialista".
- [ ] **Link de verificação do CREFITO (opcional):** se houver link de consulta pública, preencher `linkVerificacaoCrefito`.

### Consentimentos e autorizações (guardar fora do repositório)
- [x] **TCLE T-001:** consentimento do responsável legal da criança do vídeo `video-P-001-marcha` confirmado e arquivado com o cliente (2026-10-23).
- [x] **Autorização da NeuroKids:** nome, marca e espaço (site e vídeos), confirmada e arquivada com o cliente (2026-10-23).
- [x] **Autorização do Centro de Reabilitação da Uniplac:** idem (2026-10-23).
- [ ] **Endereço do CER Uniplac:** veio de fonte pública de 2016 (COSEMS-SC). Confirmar se continua atual.

### Privacidade
- [ ] **Revisão da política** (`/privacidade`) por quem responde juridicamente: bases legais, prazo de retirada ("até 5 dias úteis") e canal (WhatsApp).
- [ ] **E-mail para pedidos de privacidade** (opcional): `contato.config.ts → emailPrivacidade`.
- [ ] **Hospedagem:** a política cita registros técnicos da hospedagem de forma genérica. Citar a Vercel se for o provedor definitivo.

### Normas do conselho
- [ ] **Conferência final das resoluções vigentes do COFFITO** (424/2013, 532/2021 e atualizações) **com o CREFITO-10** antes do go-live. Registrar a data em `docs/pesquisa/regulacao-coffito.md`.
- [ ] **"Antes e depois":** continua desligado (`compliance.antesDepois = false`) até o CREFITO confirmar o alcance da regra.

### Conteúdo ainda provisório (avisos, não bloqueiam)
- [x] Título do hero (aprovado pelo cliente).
- [x] Duração e frequência: combinadas em conversa com o fisioterapeuta; o site não promete números.
- [x] Vídeo de apresentação da NeuroKids: legenda dispensada pelo cliente (`legenda.status: "dispensada"`).
- [ ] Nomes dos capítulos do vídeo P-001 (propostos a partir dos quadros).
- [x] Fotos: as capturas do Instagram foram liberadas para o site (trocar por originais em alta resolução quando houver).
- [ ] Até 6 publicações selecionadas para o bloco do Instagram.
- [ ] Domínio definitivo: **fisiojoaofrederes.com.br** (já configurado no site; falta registrar no Registro.br e apontar na Vercel).

## Go-live
1. Resolver o que for possível da lista acima.
2. Na Vercel: definir `SITE_ENV=production` (e `SITE_URL=https://dominio`) no ambiente Production.
3. Apontar o domínio. O `vercel.json` redireciona www → domínio principal.
4. Fazer um novo deploy: o build de produção roda todas as auditorias e falha se algo bloquear.
