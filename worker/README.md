# Worker do formulário (Turnstile)

1. Cloudflare > Turnstile > **Add widget**: tipo **Invisible**, domínios `undersoft.pt` e `www.undersoft.pt`.
   Guarde a **Site key** (pública) e a **Secret key**.
2. Neste diretório:
   ```bash
   npx wrangler deploy
   npx wrangler secret put TURNSTILE_SECRET   # cole a Secret key
   ```
3. No build do site, defina (ver `.env.example`):
   ```
   VITE_TURNSTILE_SITE_KEY=<site key>
   VITE_CONTACT_ENDPOINT=https://undersoft-contact.<conta>.workers.dev
   ```
   Se o site for publicado por GitHub Actions, estas variáveis têm de existir no passo de build.

Teste local: a Cloudflare disponibiliza chaves de teste na documentação do Turnstile (confirme os valores atuais lá).
