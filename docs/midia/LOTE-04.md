# Lote 04 · Logo nova (2026-10-23)

Original: `assets-originais/marca/logo-2026.jpg` (1402x1122, fundo creme #fdfcf8), enviado pelo cliente.
Substitui `logo-original.png` (monograma com a coluna de pontos), mantido só como histórico.

## Cores amostradas (por faixa de matiz nos pixels do monograma)
| Papel | Cor | Uso no site (`src/config/theme.config.ts`) |
|---|---|---|
| Vinho do J (sombra / corpo) | #681527 / #872f3d | `vinhoProfundo` (ação, títulos) / `vinhoMedio` (hover) |
| Mostarda (cabecinha) | #f0ab3a | `mostarda`, `ilustraSol` |
| Verde-azulado (barra do F) | #539691 | `tealLogo`, `ilustraCeu` |
| Sálvia (F) | #afc5b8 | `salvia`, `ilustraSalvia` |
| Coral (faíscas, cubo) | #e5978a | `coral`, `ilustraRose` |
| Creme (fundo) | #fdfcf8 | `creme` (fundo do esquema claro) |

As cores da logo que não passam AA como texto (mostarda, verde-azulado, sálvia, coral) ficam só em
elementos decorativos: bolinhas da "Coluna", marcadores, formas e ilustrações (`--bola-2` a `--bola-5`).

## Vetor (editável)
`python3 scripts/vetorizar-logo.py` gera em `assets-originais/marca/vetor/` a logo completa, a versão
para fundo escuro, o emblema e o monograma em SVG em camadas (ids por parte, cores sólidas e três degradês),
e `node scripts/exportar-logo.mjs` exporta cada um em PDF vetorial e PNG transparente. Detalhes em
`assets-originais/marca/vetor/LEIA-ME.md`.

No site: `public/marca/monograma.svg` (cabeçalho, rodapé, entrada, placeholders) e `public/favicon.svg`.
`python3 scripts/gerar-marca.py` gera, a partir do raster, os ícones PNG (`favicon-32.png`,
`apple-touch-icon.png`, `icon-512.png`) e `og.jpg` (1200x630, logo completa para links compartilhados).
