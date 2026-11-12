# Worker do formulário (Turnstile + e-mail pela Cloudflare)

Estado (12/11/2026): publicado como `undersoft-contact` na conta Cloudflare.
O widget Turnstile "Undersoft - Contacto (undersoft.pt)" (modo *managed*, visível ao lado de "aceito os termos")
cobre `undersoft.pt` e `www.undersoft.pt`.

## Como foi montado

1. Cloudflare > Turnstile: widget com os domínios `undersoft.pt` e `www.undersoft.pt`.
   Guarde a **Site key** (pública) e a **Secret key**.
2. Neste diretório:
   ```bash
   npx wrangler deploy
   npx wrangler secret put TURNSTILE_SECRET   # cole a Secret key
   npx wrangler secret put MAIL_TO            # destino VERIFICADO no Email Routing
   ```
   `MAIL_TO` é segredo porque o repositório é público. Tem de ser um endereço da lista
   *Email Routing > Destination addresses* (o mesmo para onde `contacto@undersoft.pt` encaminha).
3. No build do site, defina como **variáveis do repositório** (GitHub > Settings > Secrets and variables > Actions > Variables):
   ```
   VITE_TURNSTILE_SITE_KEY=<site key>
   VITE_CONTACT_ENDPOINT=https://undersoft-contact.<conta>.workers.dev
   ```
   O workflow `.github/workflows/deploy.yml` lê as duas. Sem `VITE_TURNSTILE_SITE_KEY` o captcha não aparece e o Worker
   recusa o envio (400 `captcha`). Sem `VITE_CONTACT_ENDPOINT` o site usa o Worker de produção (padrão no código).

## Teste

- A Cloudflare tem chaves de teste do Turnstile (confirme os valores atuais na documentação dela). Com a secret
  de teste "sempre passa", um `curl -F` com `Origin: https://undersoft.pt` e qualquer token chega ao envio de e-mail.
  Depois do teste, volte a gravar a secret real.
- Em `localhost` a site key **real** não funciona (o domínio não está na lista do widget) e o Worker recusa a origem. Para ver o widget
  no `npm run dev`, use a site key de teste da Cloudflare em `.env.development.local` (o arquivo de exemplo está em `.env.example`).
