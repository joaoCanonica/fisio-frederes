# Aparecer no Google e nas IAs (SEO local e GEO)

## O que o site já faz (técnico)
- Produção indexável: `robots.txt` liberado, `sitemap.xml` (com `lastmod`), URL canônica, título e descrição com nome + "fisioterapia pediátrica" + "Lages (SC)".
- Dados estruturados (`schema.org`, em `src/pages/index.astro`): `Physiotherapy`/`MedicalBusiness` com endereço, telefone, área atendida e Instagram, e `Person` com CREFITO, formação, áreas e vínculos. FAQ em `FAQPage`.
- `/llms.txt`: resumo em texto para assistentes de IA (só em produção).
- Imagem de compartilhamento (`og.jpg`) e ícones.
- Deploys "em revisão" (preview) ficam fora do Google (`noindex` e robots bloqueado).

## Por que ainda não aparece
O site está no ar em produção desde 2026-10-23, num subdomínio `vercel.app`, sem nenhum link externo apontando para ele
e sem ter sido enviado ao Google. O Google só indexa o que descobre (por links ou pelo Search Console), e a IA do Google
responde com base no que está indexado e no Perfil da Empresa. Não é erro do site nem da Vercel.

## O que precisa ser feito por alguém com as contas (ordem recomendada)
1. **Domínio definitivo** (`fisiojoaofrederes.com.br`, Registro.br) antes de investir no resto: trocar de endereço depois obriga a refazer a indexação.
   Na Vercel: Settings → Domains → adicionar o domínio e marcar `fisio-frederes.vercel.app` para **redirecionar (308)** para ele; apagar a variável `SITE_URL` (o domínio já é o padrão) e fazer um novo deploy.
2. **Google Search Console** (search.google.com/search-console): adicionar a propriedade.
   - Com domínio próprio: tipo "Domínio", verificação por registro TXT no DNS.
   - Enquanto for `vercel.app`: tipo "Prefixo do URL", método "Tag HTML". Copiar só o código do `content="..."` para a variável
     `GOOGLE_SITE_VERIFICATION` na Vercel (ambiente Production) e fazer um novo deploy; depois clicar em Verificar.
   - Em "Sitemaps", enviar `sitemap.xml`. Em "Inspeção de URL", pedir indexação da página inicial.
   - (Opcional) Bing Webmaster Tools: variável `BING_SITE_VERIFICATION`. O Bing alimenta o ChatGPT e o Copilot.
3. **Perfil da Empresa no Google** (business.google.com): é o que mais pesa em buscas como "fisioterapeuta infantil Lages" e na IA do Google.
   Categoria "Fisioterapeuta", endereço da NeuroKids (ou área atendida), WhatsApp, horário, fotos, e o link do site.
   Pedir avaliações às famílias (sem oferecer nada em troca; regras do COFFITO sobre depoimentos valem também lá).
4. **Links para o site**: bio do Instagram @fisiofrederes.ped, Instagram/site da NeuroKids e do CER, WhatsApp Business (campo site),
   perfis em diretórios (Doctoralia etc.). Mesmo nome, endereço e telefone em todos.
5. **Conteúdo**: publicar no Instagram com link para o site de vez em quando ajuda o Google a descobrir e a associar o nome ao site.

## Quanto tempo leva
Depois de verificar no Search Console e pedir a indexação, a página costuma entrar no Google em alguns dias a poucas semanas.
Aparecer em primeiro para o **nome dele** é rápido; para buscas genéricas ("fisioterapeuta infantil Lages") depende do Perfil da Empresa,
de avaliações e de links, e leva semanas a meses. Ninguém consegue garantir a primeira posição.
