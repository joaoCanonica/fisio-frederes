# Lote 1: identidade visual e fotos do profissional

Data: 2026-10-01. **Nada deste lote está exposto ao site**: `prepare-media.mjs` não roda no build, e `public/midia/` e `src/data/midia.gerada.json` estão no `.gitignore`.

| id | Problemas | Ação | Uso sugerido |
|---|---|---|---|
| `marca-logo-original` | Mockup raster (sombra de folhas e relevo), 860×854; o texto traz o número do CREFITO, mas não a região; autoria do design a confirmar | **Usar** como referência de cor. Os SVG derivados são redesenho aproximado: **refazer** a partir do vetor do designer | Tema e marca |
| `pessoa-foto-01` | Print do Instagram (seta à esquerda e bolinhas embaixo), 725×902 comprimida, certificados ilegíveis | **Recortar** (x 40, 685×860, conferido: interface removida). Para o hero em tela grande, **refazer** com o original em alta | Hero |
| `pessoa-foto-02` | Print do Instagram (seta à direita e bolinhas embaixo), 722×904, certificados ilegíveis; caneca com símbolo verde fora da paleta | **Recortar** (x 0, 680×860, conferido) | "Quem é" |

Cores medidas no logo: vinho **#541D2C** (média dos pixels do monograma) e branco-gelo **#F4F3F3** (fundo do mockup, ≈ #F0EFEF com sombra).

Vetores em `assets-originais/marca/derivados/`: monograma JF (cor, mono claro, mono escuro) e logotipo completo (cor, mono claro, mono escuro). O texto ficou em `<text>`, com fonte substituta, porque a fonte do original não foi identificada.

Lacuna: não há foto de corpo inteiro. O recurso "retrato que percorre o site" vai exigir novas poses (ver Prompt 4).

## Para decidir
1. São estas as imagens originais? Há arquivos em resolução maior (fora do Instagram)? Até confirmar: `publicavel: false`.
2. Quem fez o logo? Peça o arquivo vetorial (SVG/AI/PDF) e o nome da fonte. Isso também confirma a autoria e a cessão de uso.
3. Região do CREFITO: o logo traz só "369113-F".
4. A caneca com o símbolo verde pode aparecer, ou prefere a foto 2 recortada sem ela?
