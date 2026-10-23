"""Vetoriza a logo de 2026 em camadas editáveis (SVG).

    python3 scripts/vetorizar-logo.py        # requer: pip install potracer numpy pillow

Cada parte da logo vira um <path> próprio, com id e cor sólida (ou degradê no J),
para poder ser editada no Figma, Illustrator, Inkscape ou Canva:
J, F (sálvia, mostarda, verde-azulado), cabecinha, faíscas, cubo, bola, fios,
sombras e textos. Os pixels de assets-originais/marca/logo-2026.jpg são
classificados por cor dentro da caixa de cada parte e contornados com potrace.

Saída:
  assets-originais/marca/vetor/logo-2026.svg   logo completa (com nome e CREFITO)
  assets-originais/marca/vetor/logo-2026-fundo-escuro.svg   idem, com textos claros
  assets-originais/marca/vetor/emblema.svg     cubo + JF + bola, sem textos
  assets-originais/marca/vetor/monograma.svg   JF + cabecinha + faíscas
  public/marca/monograma.svg, public/favicon.svg (usados pelo site)
"""
import colorsys
import math
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAL = RAIZ / 'assets-originais/marca/logo-2026.jpg'
DESTINO = RAIZ / 'assets-originais/marca/vetor'
FUNDO = (253, 252, 248)
ESCALA = 2  # contorna na imagem ampliada: curvas mais suaves

# Cores finais (amostradas da logo; ver docs/midia/LOTE-04.md).
COR = {
    'f-braco': '#afc5b8', 'f-mostarda': '#f2ae3d', 'f-barra': '#539691',
    'cabeca': '#f0ab3a', 'faisca-coral': '#e5978a', 'faisca-salvia': '#a9c2b4', 'faisca-mostarda': '#f3c46c',
    'cubo-topo': '#e89b89', 'cubo-direita': '#f3c46c', 'cubo-esquerda': '#5b9d97', 'cubo-estrela': '#fbf6ee',
    'bola-coral': '#e8a08f', 'bola-mostarda': '#f3b955', 'bola-salvia': '#a9c4b6', 'bola-teal': '#6aa39c', 'bola-creme': '#f8efe0',
    'fios': '#a9c0b3', 'sombra': '#efe6d8',
    'nome': '#601727', 'profissao': '#6e8981', 'crefito': '#653640', 'linhas': '#a9c0b3',
}

CLASSES = ('fundo', 'vinho', 'coral', 'mostarda', 'teal', 'salvia', 'creme')


def classificar(im: Image.Image, moda: int = 7) -> np.ndarray:
    """Rótulo de cor de cada pixel (índice em CLASSES). moda > 0: filtro de moda contra ruído
    (apaga linhas finas; para fios e textos use moda=0)."""
    rgb = np.asarray(im.convert('RGB')).astype(np.float32) / 255
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    d = np.abs(rgb * 255 - np.array(FUNDO)).sum(-1)
    mx, mn = rgb.max(-1), rgb.min(-1)
    v, s = mx, np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    h = np.vectorize(lambda a, b_, c: colorsys.rgb_to_hsv(a, b_, c)[0] * 360, otypes=[np.float32])(r, g, b)
    k = np.full(r.shape, CLASSES.index('salvia'), np.uint8)
    k[(s < 0.12) & (r > g)] = CLASSES.index('creme')
    verm = (h >= 320) | (h < 22)
    k[verm & ((v < 0.80) | (s > 0.55))] = CLASSES.index('vinho')
    k[verm & ~((v < 0.80) | (s > 0.55))] = CLASSES.index('coral')
    lar = (h >= 22) & (h < 32)
    k[lar & (v < 0.75)] = CLASSES.index('vinho')
    k[lar & (v >= 0.75)] = CLASSES.index('coral')
    k[(h >= 32) & (h < 62)] = CLASSES.index('mostarda')
    verde = (h >= 62) & (h < 200)
    k[verde & (s > 0.30) & (v < 0.72)] = CLASSES.index('teal')
    k[verde & ~((s > 0.30) & (v < 0.72))] = CLASSES.index('salvia')
    k[(s < 0.12) & ~(r > g)] = CLASSES.index('salvia')
    k[d < 36] = CLASSES.index('fundo')
    return np.asarray(Image.fromarray(k, 'L').filter(ImageFilter.ModeFilter(moda))) if moda else k


def mascara(rot: np.ndarray, classes: list[str], caixa, fora=None) -> np.ndarray:
    x0, y0, x1, y1 = caixa
    m = np.zeros(rot.shape, bool)
    sub = np.isin(rot[y0:y1, x0:x1], [CLASSES.index(c) for c in classes])
    m[y0:y1, x0:x1] = sub
    for fx0, fy0, fx1, fy1 in fora or []:
        m[fy0:fy1, fx0:fx1] = False
    return m


def abrir(m: np.ndarray, r: int) -> np.ndarray:
    """Abertura morfológica: some com linhas mais finas que 2r (os fios grudados no F)."""
    img = Image.fromarray(m.astype(np.uint8) * 255)
    img = img.filter(ImageFilter.MinFilter(2 * r + 1)).filter(ImageFilter.MaxFilter(2 * r + 1))
    return (np.asarray(img) > 127) & m


def fechar(m: np.ndarray, r: int) -> np.ndarray:
    img = Image.fromarray(m.astype(np.uint8) * 255)
    return np.asarray(img.filter(ImageFilter.MaxFilter(2 * r + 1)).filter(ImageFilter.MinFilter(2 * r + 1))) > 127


def alisar_borda_esquerda(m: np.ndarray, y0: int, y1: int, janela: int = 21) -> np.ndarray:
    """Na haste do J (linhas y0..y1), troca a borda esquerda pela mediana das vizinhas:
    some com dentes de reflexo de luz sem mexer no resto da letra."""
    m = m.copy()
    esq = {}
    for y in range(y0, y1):
        xs = np.nonzero(m[y])[0]
        if len(xs):
            esq[y] = xs.min()
    for y in esq:
        viz = [esq[v] for v in range(y - janela // 2, y + janela // 2 + 1) if v in esq]
        alvo = int(np.median(viz))
        if alvo < esq[y]:
            m[y, alvo:esq[y]] = True
    return m


def dilatar(m: np.ndarray, r: int) -> np.ndarray:
    img = Image.fromarray(m.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(2 * r + 1))
    return np.asarray(img) > 127


def encher_furos(m: np.ndarray) -> np.ndarray:
    from PIL import ImageDraw
    img = Image.fromarray(m.astype(np.uint8) * 255).copy()  # cópia: o array do numpy é só leitura
    ImageDraw.floodfill(img, (0, 0), 128)
    return np.asarray(img) != 128


def contorno(m: np.ndarray, turd: int = 40, suave: np.ndarray | None = None) -> str:
    """Contorna a máscara. `suave` (0..1): cobertura contínua (antisserrilhado do original),
    usada nos textos e fios para bordas fiéis em vez de degraus."""
    if suave is not None:
        cob = Image.fromarray((np.clip(suave, 0, 1) * m * 255).astype(np.uint8))
        big = cob.resize((m.shape[1] * ESCALA, m.shape[0] * ESCALA), Image.LANCZOS)
    else:
        big = Image.fromarray(m.astype(np.uint8) * 255).resize((m.shape[1] * ESCALA, m.shape[0] * ESCALA), Image.BILINEAR)
        big = big.filter(ImageFilter.GaussianBlur(1.2))
    # potracer contorna os pixels "pretos" (abaixo do blacklevel): passa a máscara invertida.
    bm = potrace.Bitmap(~(np.asarray(big) > 127))
    trilha = bm.trace(turdsize=turd * ESCALA * ESCALA, alphamax=1.1, opttolerance=0.4)
    f = lambda p: f'{p.x / ESCALA:.1f} {p.y / ESCALA:.1f}'
    partes = []
    for curva in trilha:
        partes.append(f'M{f(curva.start_point)}')
        for seg in curva:
            if seg.is_corner:
                partes.append(f'L{f(seg.c)}L{f(seg.end_point)}')
            else:
                partes.append(f'C{f(seg.c1)} {f(seg.c2)} {f(seg.end_point)}')
        partes.append('Z')
    return ''.join(partes)


def circulo(m: np.ndarray) -> tuple[float, float, float]:
    ys, xs = np.nonzero(m)
    return float(xs.mean()), float(ys.mean()), math.sqrt(len(xs) / math.pi)


def elipse(m: np.ndarray) -> tuple[float, float, float, float]:
    ys, xs = np.nonzero(m)
    return float(xs.mean()), float(ys.mean()), (xs.max() - xs.min()) / 2, (ys.max() - ys.min()) / 2


def poligono_arredondado(pts, raio: float) -> str:
    """Polígono com cantos arredondados (arcos de Bézier quadráticos)."""
    n, partes = len(pts), []
    for i in range(n):
        p0, p1, p2 = pts[i - 1], pts[i], pts[(i + 1) % n]
        def ponto(a, b, r):
            dx, dy = b[0] - a[0], b[1] - a[1]
            L = math.hypot(dx, dy)
            return (a[0] + dx * r / L, a[1] + dy * r / L)
        a = ponto(p1, p0, raio)
        b = ponto(p1, p2, raio)
        partes.append(('M' if i == 0 else 'L') + f'{a[0]:.1f} {a[1]:.1f}Q{p1[0]:.1f} {p1[1]:.1f} {b[0]:.1f} {b[1]:.1f}')
    return ''.join(partes) + 'Z'


def encolher(pts, d: float):
    """Afasta os vértices do contorno d px para dentro (frestas creme entre as faces)."""
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    out = []
    for x, y in pts:
        L = math.hypot(x - cx, y - cy)
        out.append((x - (x - cx) * d / L, y - (y - cy) * d / L))
    return out


def estrela(cx: float, cy: float, R: float, r: float, giro: float = -90) -> str:
    pts = []
    for i in range(10):
        ang = math.radians(giro + i * 36)
        rr = R if i % 2 == 0 else r
        pts.append((cx + rr * math.cos(ang), cy + rr * math.sin(ang)))
    return poligono_arredondado(pts, 2.2)


def fio(m: np.ndarray, passo: int = 12, suavizar: int = 1) -> str:
    """Linha central de um fio (média vertical dos pixels por coluna), suavizada e
    escrita como curva Catmull-Rom → Bézier, para ser desenhada com traço."""
    ys, xs = np.nonzero(m)
    pts = []
    for x in range(xs.min(), xs.max() + 1, passo):
        sel = (xs >= x) & (xs < x + passo)
        if sel.sum() >= 3:
            pts.append((float(xs[sel].mean()), float(ys[sel].mean())))
    sp = pts
    for _ in range(suavizar):
        sp = [sp[0]] + [((a[0] + 2 * b[0] + c[0]) / 4, (a[1] + 2 * b[1] + c[1]) / 4) for a, b, c in zip(sp, sp[1:], sp[2:])] + [sp[-1]]
    d = f'M{sp[0][0]:.1f} {sp[0][1]:.1f}'
    for i in range(len(sp) - 1):
        p0 = sp[i - 1] if i > 0 else sp[i]
        p1, p2 = sp[i], sp[i + 1]
        p3 = sp[i + 2] if i + 2 < len(sp) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f'C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}'
    return d


# Cubo e bola: redesenhados em geometria (medidas tiradas da logo), mais limpos que o contorno.
CUBO = {
    'cubo-topo': [(303, 590), (352, 570), (424, 582), (372, 615)],
    'cubo-esquerda': [(289, 594), (367, 617), (362, 704), (283, 681)],
    'cubo-direita': [(375, 618), (431, 594), (429, 685), (372, 702)],
}
ESTRELA = (323.0, 649.0, 27.0, 12.5, -100)
BOLA = {'centro': (1046.7, 610.0), 'raio': 65.0, 'cubo': (1060.5, 569.0), 'raio-cubo': 11.0,
        # fim de cada costura no contorno da bola, no sentido horário a partir de cima,
        # e o quanto ela curva (negativo: para cima/esquerda, como na logo)
        'costuras': [(1048, 545), (1107, 602), (1027, 675), (991, 636), (981, 587)],
        'curvas': [0.05, 0.12, -0.18, -0.28, -0.22],
        'gomos': ['#8ebfba', '#7fb3a0', '#f3c46c', '#f2b26b', '#e8a08f']}


def bola_svg(cor_costura: str) -> str:
    (cx, cy), R = BOLA['centro'], BOLA['raio']
    hx, hy = BOLA['cubo']
    ext = []
    for x, y in BOLA['costuras']:  # estende para fora do círculo (o recorte limpa)
        ext.append((cx + (x - cx) * 1.25, cy + (y - cy) * 1.25))
    def costura(e, k):
        mx, my = (hx + e[0]) / 2, (hy + e[1]) / 2
        dx, dy = e[0] - hx, e[1] - hy
        return mx + dy * k, my - dx * k
    partes = [f'<clipPath id="recorte-bola"><circle cx="{cx}" cy="{cy}" r="{R}"/></clipPath>',
              f'<g clip-path="url(#recorte-bola)"><circle cx="{cx}" cy="{cy}" r="{R}" fill="{BOLA["gomos"][0]}"/>']
    n = len(ext)
    for i in range(n):
        a, b = ext[i], ext[(i + 1) % n]
        ca, cb = costura(a, BOLA['curvas'][i]), costura(b, BOLA['curvas'][(i + 1) % n])
        far = (cx + ((a[0] + b[0]) / 2 - cx) * 1.6, cy + ((a[1] + b[1]) / 2 - cy) * 1.6)
        d = (f'M{hx} {hy}Q{ca[0]:.1f} {ca[1]:.1f} {a[0]:.1f} {a[1]:.1f}L{far[0]:.1f} {far[1]:.1f}L{b[0]:.1f} {b[1]:.1f}'
             f'Q{cb[0]:.1f} {cb[1]:.1f} {hx} {hy}Z')
        partes.append(f'<path id="bola-gomo-{i + 1}" fill="{BOLA["gomos"][i]}" d="{d}"/>')
    for i, e in enumerate(ext):
        c = costura(e, BOLA['curvas'][i])
        partes.append(f'<path id="bola-costura-{i + 1}" fill="none" stroke="{cor_costura}" stroke-width="5.5" d="M{hx} {hy}Q{c[0]:.1f} {c[1]:.1f} {e[0]:.1f} {e[1]:.1f}"/>')
    partes.append('</g>')
    partes.append(f'<circle id="bola-centro" cx="{hx}" cy="{hy}" r="{BOLA["raio-cubo"]}" fill="{cor_costura}"/>')
    return ''.join(partes)


def main() -> None:
    im = Image.open(ORIGINAL)
    rot = classificar(im)
    bruto = classificar(im, moda=0)
    dist = np.abs(np.asarray(im.convert('RGB')).astype(int) - np.array(FUNDO)).sum(-1)
    cobertura = (dist - 18) / 70  # 0 no fundo, 1 na tinta cheia
    P = {}
    # J (inclui o laranja da curva): um contorno só, com degradê.
    P['j'] = alisar_borda_esquerda(fechar(encher_furos(mascara(rot, ['vinho'], (440, 240, 712, 700))), 5), 300, 560)
    # F: camadas de baixo um pouco dilatadas para não abrir frestas entre as cores.
    caixa_f = (700, 180, 972, 732)
    # Braço (sálvia) e barra (verde-azulado) acima de CORTE; abaixo, a base do F (sálvia que
    # escurece até o verde-azulado da ponta) é uma forma só, com degradê.
    CORTE = 478
    salvia_f = abrir(mascara(rot, ['salvia'], caixa_f, fora=[(955, 255, 972, 420)]), 7)
    teal_f = abrir(mascara(rot, ['teal'], (586, 380, 972, 732)), 5)
    acima = np.zeros(rot.shape, bool)
    acima[:CORTE] = True
    P['f-braco'] = dilatar(salvia_f & acima, 2) & ~P['j']
    P['f-barra'] = teal_f & acima
    P['f-base'] = fechar(abrir((salvia_f | teal_f) & ~acima, 4), 4) & ~P['j']
    P['f-mostarda'] = dilatar(mascara(rot, ['mostarda'], (700, 380, 860, 560)), 1) & ~P['j']
    cab = mascara(rot, ['mostarda'], (685, 125, 842, 278))
    P['faisca-coral'] = mascara(rot, ['coral', 'vinho'], (935, 255, 1000, 345))
    P['faisca-salvia'] = mascara(rot, ['salvia', 'teal'], (960, 300, 1045, 360))
    P['faisca-mostarda'] = mascara(rot, ['mostarda'], (955, 360, 1035, 415))
    # Fios (linhas finas) e sombras.
    corpo_f = dilatar(P['f-braco'] | P['f-barra'] | P['f-base'] | P['f-mostarda'] | P['j'], 4)
    fio_esq = mascara(bruto, ['salvia', 'teal'], (385, 425, 600, 556)) & ~corpo_f
    fio_dir = mascara(bruto, ['salvia', 'teal'], (600, 575, 982, 736)) & ~corpo_f
    # Sombras: o bege bem claro sob o cubo e a bola (perto do fundo, por isso pela distância de cor).
    sombras = []
    for x0, y0, x1, y1 in [(255, 676, 485, 712), (975, 668, 1140, 702)]:
        m = np.zeros(rot.shape, bool)
        m[y0:y1, x0:x1] = (dist[y0:y1, x0:x1] > 8) & (rot[y0:y1, x0:x1] != CLASSES.index('vinho'))
        sombras.append(m)
    # Textos.
    # Textos e linhas: tudo o que não é fundo dentro da caixa; a borda vem da cobertura contínua.
    def tinta(caixa):
        x0, y0, x1, y1 = caixa
        m = np.zeros(dist.shape, bool)
        m[y0:y1, x0:x1] = dist[y0:y1, x0:x1] > 10
        return m
    P['nome'] = tinta((120, 752, 1285, 880))
    P['profissao'] = tinta((250, 868, 1160, 922))
    P['crefito'] = tinta((500, 938, 900, 978))
    P['linhas'] = tinta((335, 945, 500, 970)) | tinta((910, 945, 1070, 970))

    finos = ('nome', 'profissao', 'crefito', 'linhas')
    d = {k: contorno(v, turd=(3 if k in finos else 40), suave=cobertura if k in finos else None) for k, v in P.items()}
    cx, cy, cr = circulo(cab)
    sx = [elipse(s) for s in sombras]
    ys, xs = np.nonzero(P['j'])
    jx0, jy0, jx1, jy1 = xs.min(), ys.min(), xs.max(), ys.max()

    defs = (
        f'<linearGradient id="grad-j" gradientUnits="userSpaceOnUse" x1="{jx0}" y1="{jy1}" x2="{jx1}" y2="{jy0}">'
        '<stop offset="0" stop-color="#b4513f"/><stop offset="0.35" stop-color="#872f3d"/>'
        '<stop offset="0.75" stop-color="#7a2235"/><stop offset="1" stop-color="#681527"/></linearGradient>'
        f'<radialGradient id="grad-cabeca" cx="{cx - cr * 0.3:.1f}" cy="{cy - cr * 0.35:.1f}" r="{cr * 1.4:.1f}" gradientUnits="userSpaceOnUse">'
        '<stop offset="0" stop-color="#f6c35e"/><stop offset="1" stop-color="#eda332"/></radialGradient>'
        f'<linearGradient id="grad-f-base" gradientUnits="userSpaceOnUse" x1="760" y1="{CORTE}" x2="640" y2="725">'
        '<stop offset="0" stop-color="#afc5b8"/><stop offset="0.45" stop-color="#93b5a8"/><stop offset="1" stop-color="#4f8f8a"/></linearGradient>'
    )
    p = lambda k, fill=None: f'<path id="{k}" fill="{fill or COR[k]}" d="{d[k]}"/>'
    sombra_svg = ''.join(f'<ellipse cx="{a:.1f}" cy="{b:.1f}" rx="{c:.1f}" ry="{e:.1f}" fill="{COR["sombra"]}" opacity="0.75"/>' for a, b, c, e in sx)
    g = {
        'sombras': f'<g id="sombras">{sombra_svg}</g>',
        'fios': (f'<g id="fios" fill="none" stroke="{COR["fios"]}" stroke-width="7" stroke-linecap="round">'
                 f'<path id="fio-cubo" d="{fio(fio_esq)}"/><path id="fio-bola" d="{fio(fio_dir, passo=22, suavizar=4)}"/></g>'),
        'cubo': '<g id="cubo">' + ''.join(
            f'<path id="{k}" fill="{COR[k]}" d="{poligono_arredondado(encolher(v, 1.5), 15)}"/>' for k, v in CUBO.items())
        + f'<path id="cubo-estrela" fill="{COR["cubo-estrela"]}" d="{estrela(*ESTRELA)}"/></g>',
        'bola': f'<g id="bola">{bola_svg(COR["bola-creme"])}</g>',
        'f': '<g id="letra-f">' + p('f-braco') + p('f-base', 'url(#grad-f-base)') + p('f-mostarda') + p('f-barra') + '</g>',
        'j': f'<g id="letra-j">{p("j", "url(#grad-j)")}</g>',
        'cabeca': f'<g id="cabecinha"><circle id="cabeca" cx="{cx:.1f}" cy="{cy:.1f}" r="{cr:.1f}" fill="url(#grad-cabeca)"/></g>',
        'faiscas': '<g id="faiscas">' + ''.join(p(k) for k in ['faisca-coral', 'faisca-salvia', 'faisca-mostarda']) + '</g>',
        'textos': '<g id="textos">' + ''.join(p(k) for k in ['nome', 'profissao', 'crefito', 'linhas']) + '</g>',
    }
    titulo = 'Logo de João Pedro Frederes, fisioterapeuta pediátrico, CREFITO 369113-F'

    def svg(vb: str, partes: list[str], t: str) -> str:
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="titulo">'
                f'<title id="titulo">{t}</title><defs>{defs}</defs>' + ''.join(g[k] for k in partes) + '</svg>\n')

    DESTINO.mkdir(parents=True, exist_ok=True)
    todas = ['sombras', 'fios', 'cubo', 'bola', 'f', 'j', 'cabeca', 'faiscas']
    (DESTINO / 'logo-2026.svg').write_text(svg('100 100 1202 900', todas + ['textos'], titulo))
    # Versão para fundo escuro: textos claros e sem as sombras de chão.
    escuro = dict(g)
    escuro['textos'] = ('<g id="textos">' + p('nome', '#efc3ca') + p('profissao', '#b9cfc3')
                        + p('crefito', '#efc3ca') + p('linhas', '#8fae9d') + '</g>')
    g_claro, g = g, escuro
    (DESTINO / 'logo-2026-fundo-escuro.svg').write_text(svg('100 100 1202 900', todas[1:] + ['textos'], titulo))
    g = g_claro
    (DESTINO / 'emblema.svg').write_text(svg('262 112 878 600', todas, 'Emblema de João Pedro Frederes'))
    mono = ['f', 'j', 'cabeca', 'faiscas']
    (DESTINO / 'monograma.svg').write_text(svg('448 116 600 612', mono, 'Monograma JF'))
    (RAIZ / 'public/marca').mkdir(parents=True, exist_ok=True)
    (RAIZ / 'public/marca/monograma.svg').write_text(svg('448 116 600 612', mono, 'Monograma JF'))
    # Favicon: monograma num quadrado creme arredondado.
    fav = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="398 72 700 700"><defs>{defs}</defs>'
           f'<rect x="398" y="72" width="700" height="700" rx="150" fill="#fdfcf8"/>' + ''.join(g[k] for k in mono) + '</svg>\n')
    (RAIZ / 'public/favicon.svg').write_text(fav)
    for f in ['logo-2026.svg', 'emblema.svg', 'monograma.svg']:
        print(f, round((DESTINO / f).stat().st_size / 1024), 'kB')


main()
