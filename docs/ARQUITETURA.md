# Arquitetura: landing de uma página (fisio-frederes)

Base: template `dra-nicole` (Astro 5 + TS strict, npm fixado, Node 22). Saída estática.

## Estrutura
```
assets-originais/            # mídia bruta. NUNCA publicada. Nomes = pacienteRef (ex.: P-001_2026-09-12.mp4)
media.manifest.json          # fonte da verdade da mídia (esquema abaixo)
public/midia/                # gerado por scripts/prepare-media.mjs (não editar à mão)
src/
  config/
    profile.config.ts        # nome completo, profissão, CREFITO (região, número, link de consulta), RQE?, formação, mestrado, vínculo NeuroKids, Lattes?
    theme.config.ts          # tokens vinho + branco-gelo, pares de contraste declarados (validados AA)
    compliance.config.ts     # COFFITO: termos vetados, vocabulário obrigatório, antesDepois=false, regras TEA
    copy.pt-BR.ts            # todos os textos da página. Cada afirmação de saúde aponta para docs/pesquisa/<tema>.md#n
    contato.config.ts        # WhatsApp (mensagem neutra), Instagram, analytics: 'nenhum'
    slots-video.config.ts    # slots da seção de vídeos → ids do manifesto; slot vago = aviso
    legal.pt-BR.ts           # privacidade e termos (LGPD, art. 14)
  components/                # base reaproveitada + seções da landing
  layouts/BaseLayout.astro
  lib/                       # ambiente (preview/produção), color, termos, schema, pendencias
  pages/index.astro | privacidade.astro | termos.astro | robots.txt.ts
scripts/
  validate-config.ts         # zod + pendências com nível; --production falha só com BLOQUEANTES
  prepare-media.mjs          # assets-originais → public/midia (recorte/tarja apenas, remove EXIF/GPS, gera poster)
  ocr-midia.mjs              # OCR em quadros/imagens para achar nomes, escola, placas → exige tarja antes de liberar
  gerar-csp.ts | audit-compliance.ts | audit-a11y.ts | audit-lighthouse.ts
docs/
  pesquisa/<tema>.md         # fonte, data de consulta, nível de evidência
  AUDITORIA.md | ARQUITETURA.md | COMPLIANCE.md | A11Y.md | PERFORMANCE.md
```

## Esquema `media.manifest.json` (recriado; repo Marina Branco ausente)
```jsonc
{
  "versao": 1,
  "antesDepoisHabilitado": false,
  "itens": [{
    "id": "video-01",
    "tipo": "video",                 // video | imagem | audio | texto
    "pacienteRef": "P-001",          // código opaco; null = sem paciente. Nunca nome
    "tcle": {
      "status": "ausente",           // ausente | assinado | revogado
      "assinadoPor": "responsavel-legal",
      "arquivadoForaDoRepo": false
    },
    "dataRegistro": null,            // AAAA-MM-DD, exibida junto à publicação
    "original": "assets-originais/P-001_xxx.mp4",
    "saida": null,                   // preenchido por prepare-media
    "edicao": ["recorte", "tarja"],  // só esses valores são aceitos
    "ocr": { "status": "pendente", "achados": [] },
    "rostoFrontal": false,
    "descricao": "Atividade de equilíbrio em circuito.",   // objetiva, sem "conquista"
    "alt": "...",
    "antesDepois": false,
    "autorizacaoTerceiro": "nao-se-aplica"   // nao-se-aplica | pendente | arquivada
  }]
}
```

### Regras de publicação (aplicadas em build)
| Situação | Dev/preview | Produção |
|---|---|---|
| TCLE ausente ou slot vago | aparece com selo **PROVISÓRIO** | oculto (aviso) |
| TCLE revogado | oculto | oculto |
| TCLE assinado sem `dataRegistro` | selo | **bloqueia o build** |
| OCR com achados sem tarja | selo | **bloqueia o build** |
| `antesDepois: true` com flag desligada | oculto | oculto |
| Caso de terceiro sem autorização | selo | **bloqueia o build** |

## Pendências
- **Bloqueantes** (só para `SITE_ENV=production`): endereço por extenso, WhatsApp real, data de gravação dos vídeos publicados, nome completo, região do CREFITO (e número).
- **Avisos**: RQE ausente, slot de vídeo vago, comprovantes de autorização (NeuroKids) e TCLE a arquivar, Lattes ausente.
- `npm run pendencias` gera `docs/PENDENCIAS.md`. Dev e preview nunca falham por pendência.

## Orçamento de JS (cliente, home)
| Ilha | Teto (min+gzip) |
|---|---|
| Consentimento (banner + liberar embeds Instagram/mapa) | 1,5 kB |
| Revelação ao rolar (IntersectionObserver; desligada com `prefers-reduced-motion`) | 0,6 kB |
| Cabeçalho (estado ao rolar) | 0,3 kB |
| Player dos vídeos (nativo `<video>`, sem lib) | 0 kB |
| **Total** | **≤ 3 kB**, sem frameworks de UI |

Referência: o template hoje entrega ≈ 2,1 kB inline (sem gzip) na home. Animação do traço/gráficos via CSS/SVG. `audit-lighthouse.ts` passa a falhar acima de 3 kB.
