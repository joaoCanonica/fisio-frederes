# Logo em vetor (editável)

Vetorizada a partir de `../logo-2026.jpg` por `scripts/vetorizar-logo.py` (2026-10-23).

| Arquivo | O que é | Para quê |
|---|---|---|
| `logo-2026.svg` / `.pdf` / `.png` | logo completa (emblema + nome + profissão + CREFITO) | papelaria, gráfica, redes |
| `logo-2026-fundo-escuro.svg` / `.pdf` / `.png` | idem, textos claros e sem sombras | fundos escuros ou em vinho |
| `emblema.svg` / `.pdf` / `.png` | cubo + JF + bola, sem textos | avatar, adesivos, brindes |
| `monograma.svg` / `.pdf` / `.png` | só o JF com a cabecinha e as faíscas | ícone, carimbo, site |

- **SVG**: abre e edita no Figma, Illustrator, Inkscape, Affinity e Canva (enviar como imagem SVG).
- **PDF**: vetorial, para gráfica.
- **PNG**: fundo transparente, 2000 a 4000 px de largura.

## Camadas (ids no SVG)
`sombras` · `fios` (`fio-cubo`, `fio-bola`, traço de 7) · `cubo` (`cubo-topo`, `cubo-esquerda`,
`cubo-direita`, `cubo-estrela`) · `bola` (`bola-gomo-1` a `5`, `bola-costura-1` a `5`, `bola-centro`) ·
`letra-f` (`f-braco`, `f-base` com degradê, `f-mostarda`, `f-barra`) · `letra-j` (degradê `grad-j`) ·
`cabecinha` (círculo com degradê `grad-cabeca`) · `faiscas` (3) · `textos` (`nome`, `profissao`, `crefito`, `linhas`).

Cada camada tem uma cor só (`fill`), exceto J, base do F e cabecinha, que usam degradês definidos no
`<defs>`: para trocar, edite as `stop-color`.

## Cores
Vinho #681527 / #872f3d (J; nome #601727) · mostarda #f0ab3a · verde-azulado #539691 · sálvia #afc5b8 ·
coral #e5978a · creme #fdfcf8 (fundo). Ver `docs/midia/LOTE-04.md`.

## Observações
- Os textos estão em curvas (não dependem de fonte instalada). Para mudar uma palavra, é preciso redesenhar
  com a fonte (serifada clássica em versaletes no nome; sem serifa espaçada na profissão).
- Cubo e bola foram redesenhados em geometria (faces, estrela, gomos), mais limpos que o raster.
- Para refazer: `pip install potracer numpy pillow`, `python3 scripts/vetorizar-logo.py` e
  `node scripts/exportar-logo.mjs`.
