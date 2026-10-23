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

## Variações (`python3 scripts/gerar-marca.py`)
- `public/marca/monograma-{64,128,256,512}.webp`: JF + cabecinha + faíscas, fundo removido, sem os fios
  do cubo e da bola (cabeçalho, rodapé, entrada, placeholders).
- `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-512.png`: monograma num quadrado creme.
- `public/og.jpg` (1200x630): logo completa para links compartilhados (WhatsApp, redes).
- O emblema com cubo e bola não é recortado: as sombras não ficam boas sobre o fundo escuro.

Quando houver o vetor (SVG/PDF) do designer, trocar os recortes por ele.
