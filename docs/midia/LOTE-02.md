# Lote 2: vídeos

Data: 2026-10-01. Nada publicado: os derivados ficam em `assets-originais/videos/derivados/`, fora de `public/`.

| id | Original | Duração | Derivados |
|---|---|---|---|
| `video-neurokids-apresentacao` | 720×1280, H.264 30 fps, AAC estéreo, 3,34 MB | 33,8 s | seção 540×960 MP4 3,1 MB / WebM 3,2 MB (com áudio mono); poster AVIF 15 kB / WebP 22 kB; `.vtt` rascunho vazio |
| `video-P-001-marcha` | 720×1280, H.264 30 fps, AAC estéreo, 5,58 MB | 58,9 s | **recorte só das pernas** 720×400, sem áudio: seção MP4 3,0 MB / WebM 3,2 MB; loop de 10 s MP4 1,07 MB / WebM 0,99 MB; poster AVIF 8 kB / WebP 13 kB |

Nenhum dos originais tem data de criação nos metadados.

Comandos: H.264 em 2 passadas (`-profile:v high -pix_fmt yuv420p -movflags +faststart -map_metadata -1`) e VP9 (`-row-mt 1`). Recorte P-001: `crop=720:400:0:660`. Loop: `-ss 22 -t 10`. Uso no site: `<video preload="none" playsinline poster=…>`, e o loop com `muted loop` e pausa quando `prefers-reduced-motion`.

O original do P-001 foi renomeado para `P-001_atendimento-marcha.mp4`, porque o nome enviado ("Mostrando_cliente1") identifica a natureza do conteúdo de forma desnecessária.
