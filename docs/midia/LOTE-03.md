# Lote 03 · Vídeo "Conheça o João Pedro" (2026-10-23)

Original: `Vídeo-Fisio (converted by happyscribe.com).mp4`, 2:43, 4K (2160x3840 na vertical), 60 fps,
HEVC 10 bits **HDR (HLG)** do celular, 1,5 GB. sha256 `71c58057…a917b6f` (completo no manifesto).

O original **não fica no repositório** (`originalForaDoRepo: true`): arquivo desse tamanho estoura a
cota do Git LFS e a Vercel baixaria tudo a cada deploy. Guardar o original no Drive/HD do cliente.
Só os derivados (31 MB no total) são versionados.

| Arquivo | Tamanho | Formato |
|---|---|---|
| `conheca-secao.webm` | 12 MB | VP9 + Opus 96k, 720x1280, 30 fps (o navegador usa este primeiro) |
| `conheca-secao.mp4` | 19 MB | H.264 High + AAC 128k, 720x1280, 30 fps, faststart (Safari/iPhone) |
| `conheca-poster.{avif,webp}` | 18/27 kB | quadro de 2 s |

O player usa `preload="none"`: nada do vídeo é baixado até a pessoa tocar.

## Comandos
```bash
# 1. Intermediário SDR 720p 30 fps (converte o HDR para cores normais de tela; sem isso fica desbotado)
ffmpeg -i original.mp4 -vf "fps=30,zscale=w=720:h=1280:f=spline36:t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p" \
  -c:v libx264 -preset slow -crf 14 -c:a pcm_s16le mezz.mkv
# 2. Volume da fala normalizado
ffmpeg -i mezz.mkv -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 audio-norm.wav
# 3. Derivados
ffmpeg -i mezz.mkv -i audio-norm.wav -map 0:v -map 1:a -c:v libx264 -preset slow -crf 24 -profile:v high -pix_fmt yuv420p -g 60 \
  -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 128k conheca-secao.mp4
ffmpeg -i mezz.mkv -i audio-norm.wav -map 0:v -map 1:a -c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -g 60 \
  -c:a libopus -b:a 96k conheca-secao.webm
ffmpeg -ss 2 -i mezz.mkv -frames:v 1 poster.png   # depois: sharp → avif (q55) e webp (q78)
```

Gravado em 22/10/2026 (`dataRegistro`), liberado para produção.

## Opcional
- Legenda: opcional. Se houver transcrição (ex.: SRT exportado do HappyScribe), converter para `.vtt`, revisar e usar `legenda.status: "revisada"`.
