# Regulação da publicidade (COFFITO) e LGPD

**Status:** resumo de trabalho. **Conferir o texto vigente** das resoluções no site do COFFITO antes do go-live e registrar aqui a data da conferência.

| Norma | Ponto aplicado no site | Onde está implementado |
|---|---|---|
| Res. COFFITO 424/2013 (Código de Ética) | identificação nome + profissão + CREFITO; proibição de promessa de resultado, preço, sensacionalismo | `src/components/Identificacao.astro`, `scripts/conformidade.mjs` |
| Res. COFFITO 532/2021 | uso de imagem de paciente só com TCLE; data do registro e identificação junto à publicação | `src/data/midia.ts`, `src/lib/modo.ts` |
| Especialidade / RQE | "especialista" só com título registrado e RQE | `tituloNeuro()` em `src/data/profissional.ts` |
| LGPD, art. 14 | dado de criança: consentimento do responsável legal | TCLE fora do repo; `pacienteRef` |
| LGPD / cookies | não essenciais só após aceite; Aceitar e Recusar com o mesmo peso | `src/components/Consentimento.astro` |

Conferência do texto vigente: **pendente** (responsável: profissional / assessoria).
"Antes e depois": **desligado** até resposta do CREFITO da região.
