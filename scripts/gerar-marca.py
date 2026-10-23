"""Gera as variações da logo a partir de assets-originais/marca/logo-2026.jpg.

    python3 scripts/gerar-marca.py

O original tem fundo creme (#fdfcf8). Para cada variação o fundo é removido por
"desmistura" de cor (alfa proporcional à distância do creme e cor recuperada sem
halo). No monograma, uma abertura morfológica apaga as linhas finas (os fios que
ligam o cubo e a bola), que ficariam soltas no recorte. Saída em public/marca/ e
nos ícones de public/. Rodar de novo só se a logo mudar.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIGINAL = RAIZ / 'assets-originais/marca/logo-2026.jpg'
SAIDA = RAIZ / 'public/marca'
FUNDO = (253, 252, 248)
T0, T1 = 10, 70  # distância (soma RGB) do creme: abaixo de T0 é fundo, acima de T1 é opaco


def sem_fundo(im: Image.Image) -> Image.Image:
    im = im.convert('RGB')
    out = Image.new('RGBA', im.size)
    src, dst = im.load(), out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = src[x, y]
            d = abs(r - FUNDO[0]) + abs(g - FUNDO[1]) + abs(b - FUNDO[2])
            a = 0.0 if d <= T0 else 1.0 if d >= T1 else (d - T0) / (T1 - T0)
            if a == 0:
                dst[x, y] = (0, 0, 0, 0)
                continue
            # p = a*c + (1-a)*fundo  →  c = (p - (1-a)*fundo) / a
            c = [max(0, min(255, round((v - (1 - a) * f) / a))) for v, f in zip((r, g, b), FUNDO)]
            dst[x, y] = (*c, round(a * 255))
    return out


def sem_fios(rgba: Image.Image, abaixo_de: int, raio: int = 8) -> Image.Image:
    """Apaga linhas finas só abaixo da linha `abaixo_de` (as faíscas, acima, ficam)."""
    alfa = rgba.getchannel('A')
    k = raio * 2 + 1
    aberto = alfa.filter(ImageFilter.MinFilter(k)).filter(ImageFilter.MaxFilter(k))
    # Mantém a borda suave original onde a forma sobreviveu à abertura.
    mascara = aberto.filter(ImageFilter.MaxFilter(5))
    ImageDraw.Draw(mascara).rectangle((0, 0, alfa.width, abaixo_de), fill=255)
    novo = Image.composite(alfa, Image.new('L', alfa.size, 0), mascara)
    rgba = rgba.copy()
    rgba.putalpha(novo)
    return rgba


def apagar(rgba: Image.Image, caixas: list[tuple[int, int, int, int]]) -> Image.Image:
    """Zera o alfa nas caixas (coordenadas do recorte)."""
    rgba = rgba.copy()
    px = rgba.load()
    for x0, y0, x1, y1 in caixas:
        for y in range(max(0, y0), min(rgba.height, y1)):
            for x in range(max(0, x0), min(rgba.width, x1)):
                r, g, b, _ = px[x, y]
                px[x, y] = (r, g, b, 0)
    return rgba




def so_formas_grandes(rgba: Image.Image, minimo: int = 600) -> Image.Image:
    """Remove pedacinhos soltos (restos dos fios) menores que `minimo` pixels."""
    from collections import deque
    w, h = rgba.size
    alfa = rgba.getchannel('A').load()
    visto = bytearray(w * h)
    rgba = rgba.copy()
    px = rgba.load()
    for y0 in range(h):
        for x0 in range(w):
            i0 = y0 * w + x0
            if visto[i0] or alfa[x0, y0] <= 8:
                continue
            fila, comp = deque([(x0, y0)]), []
            visto[i0] = 1
            while fila:
                x, y = fila.popleft()
                comp.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx] and alfa[nx, ny] > 8:
                        visto[ny * w + nx] = 1
                        fila.append((nx, ny))
            if len(comp) < minimo:
                for x, y in comp:
                    r, g, b, _ = px[x, y]
                    px[x, y] = (r, g, b, 0)
    return rgba


def aparar(rgba: Image.Image, margem: int) -> Image.Image:
    caixa = rgba.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    x0, y0, x1, y1 = caixa
    return rgba.crop((x0 - margem, y0 - margem, x1 + margem, y1 + margem))


def quadrado(rgba: Image.Image, fundo=None) -> Image.Image:
    lado = max(rgba.size)
    base = Image.new('RGBA', (lado, lado), fundo or (0, 0, 0, 0))
    base.alpha_composite(rgba, ((lado - rgba.width) // 2, (lado - rgba.height) // 2))
    return base


def salvar(rgba: Image.Image, nome: str, alturas: list[int]) -> None:
    for h in alturas:
        w = round(rgba.width * h / rgba.height)
        rgba.resize((w, h), Image.LANCZOS).save(SAIDA / f'{nome}-{h}.webp', quality=90, method=6)
    print(nome, rgba.size, [f'{nome}-{h}.webp' for h in alturas])


def main() -> None:
    SAIDA.mkdir(parents=True, exist_ok=True)
    orig = Image.open(ORIGINAL)
    # Emblema completo (cubo, JF e bola) fica só no og.jpg: sobre fundo escuro as sombras
    # do cubo e da bola não recortam bem, então o site usa o monograma.
    # Monograma: JF + cabecinha + faíscas, sem os fios.
    mono = sem_fios(sem_fundo(orig.crop((440, 115, 1050, 740))), abaixo_de=420 - 115)
    # Tira a bola (canto inferior direito) e restos à esquerda do J.
    mono = apagar(mono, [(520, 400, 610, 625), (0, 0, 20, 625)])
    mono = aparar(so_formas_grandes(mono), 6)
    salvar(mono, 'monograma', [64, 128, 256, 512])
    # Logo completa (com nome e CREFITO), fundo creme preservado, para compartilhamento.
    og = Image.new('RGB', (1200, 630), FUNDO)
    cheia = orig.convert('RGB')
    cheia = cheia.resize((round(cheia.width * 600 / cheia.height), 600), Image.LANCZOS)
    og.paste(cheia, ((1200 - cheia.width) // 2, 15))
    og.save(RAIZ / 'public/og.jpg', quality=88)
    # Ícones: monograma num quadrado creme arredondado (legível em abas claras e escuras).
    for lado, nome in [(32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (512, 'icon-512.png')]:
        q = quadrado(mono)
        fundo = Image.new('RGBA', (q.width + q.width // 6, q.height + q.height // 6), (*FUNDO, 255))
        fundo.alpha_composite(q, (q.width // 12, q.width // 12))
        fundo.resize((lado, lado), Image.LANCZOS).save(RAIZ / 'public' / nome)
    print('og.jpg, favicon-32.png, apple-touch-icon.png, icon-512.png')


main()
