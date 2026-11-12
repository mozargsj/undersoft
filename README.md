# Undersoft | landing page (React + Vite)

Landing page da Undersoft convertida de HTML/CSS/JS puro para React,
com o background do hero usando um efeito de "fios" animados
(`WebThreads`), no lugar do vídeo original.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Deploy (Cloudflare Pages)

O site publica em `https://undersoft.pt` pelo projeto Cloudflare Pages **`undersoft-pt`**
(upload direto, branch de produção `main`, mesma conta dos outros sites). Desde 12/11/2026 não usa mais o GitHub Pages.

- Cada `git push` na `main` roda `.github/workflows/deploy.yml`: ele faz `npm ci`, `npm run build` e
  `wrangler pages deploy dist --project-name=undersoft-pt --branch=main`.
- O workflow precisa do secret **`CLOUDFLARE_API_TOKEN`** (token de conta **só com a permissão "Pages Write"**, criado só para este
  site) e da variável **`CLOUDFLARE_ACCOUNT_ID`** (identificador da conta, não é segredo). Ficam em
  *Settings > Secrets and variables > Actions*.
- Para publicar sem commit: aba **Actions** > *Deploy para Cloudflare Pages* > *Run workflow* (só na branch `main`).
- Deploy manual, da sua máquina: `npm run build` e `npx wrangler pages deploy dist --project-name=undersoft-pt --branch=main`
  (com `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no ambiente). Defina `VITE_TURNSTILE_SITE_KEY` (a site key **real**) no ambiente do
  build: sem ela o captcha não aparece. A site key de **teste** do dev fica em `.env.development.local`, que o Vite só lê no `npm run dev`
  (nunca use um `.env.local` com a chave de teste: ele entraria no build de produção).
- DNS (zona `undersoft.pt` na Cloudflare): `undersoft.pt` e `www` são CNAME (com proxy) para o `undersoft-pt.pages.dev`.
  O apex é domínio personalizado do projeto (ativo). O `www` redireciona (301) para o apex por uma Redirect Rule da zona, que age
  antes do Pages; por isso o `www` fica como `pending` na lista de domínios do projeto (a validação do Pages bate na regra) e isso é esperado.
  A mesma zona tem outra regra que leva `http://undersoft.pt` para `https`. O e-mail (MX/TXT do Email Routing) não muda.
- `*.pages.dev` não é indexado (`public/_headers` manda `X-Robots-Tag: noindex` só nesse host).
- A zona injeta no `robots.txt` do domínio o bloco "Managed content" da Cloudflare (bloqueia bots de IA); isso vem da zona, não do arquivo `public/robots.txt`.
- O formulário usa o Worker `undersoft-contact` e o Turnstile (ver `worker/README.md`). Variáveis de build opcionais
  (*Settings > Secrets and variables > Actions > Variables*): `VITE_TURNSTILE_SITE_KEY` (obrigatória para o captcha aparecer)
  e `VITE_CONTACT_ENDPOINT` (opcional: o padrão já é o Worker de produção).

## O que foi feito

- Projeto novo em **Vite + React**, todo o `index.html` original foi
  quebrado em componentes dentro de `src/components/`.
- O `style.css` original foi movido quase 1:1 para `src/undersoft.css`
  (só ajustei o `.bg-wrapper`/`.pulse-img` pra funcionar com o canvas
  do novo background).
- Toda a lógica que estava em `script.js` (loader, efeito de
  "máquina de escrever" no hero, indicador de menu deslizante,
  seletor de idioma, envio do formulário (hoje por um Worker da Cloudflare com Turnstile), e a
  simulação "manual vs automático") foi portada para hooks React
  (`useEffect`/`useRef`/`useState`), mantendo o mesmo comportamento
  visual.
- **Background do hero**: o vídeo `gradient.webm` foi substituído
  pelo componente `WebThreads` (`src/components/WebThreads.jsx`),
  feito em Canvas 2D com a mesma interface de props do componente
  do react-bits. Ele fica plugado em
  `src/components/HeroBackground.jsx` — pra trocar de efeito no
  futuro é só mexer nesse arquivo.

  > Obs: o comando oficial `npx shadcn@latest add
  > @react-bits/WebThreads-JS-CSS` não funcionou no ambiente onde
  > montei o projeto (sem acesso à internet), então implementei o
  > efeito manualmente em Canvas, replicando o comportamento das
  > props (`color1/2/3`, `speed`, `threadCount`, `frequency`,
  > `spread`, `glow`, `mouseInteraction`, etc). Se você tiver acesso
  > ao registry do shadcn/react-bits, pode rodar o comando original
  > no terminal do VS Code e trocar o conteúdo de
  > `HeroBackground.jsx` pelo componente oficial, sem precisar mexer
  > em mais nada — as props já estão todas mapeadas.

## Estrutura

```
src/
  App.jsx                   # monta a página inteira
  main.jsx                  # entrypoint
  undersoft.css              # todo o CSS original
  components/
    PageLoader.jsx           # loader de carregamento (círculo)
    Header.jsx                # nav, logo, menu, seletor de idioma
    Hero.jsx                   # hero + efeito de digitação
    HeroBackground.jsx         # onde o WebThreads é plugado
    WebThreads.jsx              # efeito de fios animados (canvas)
    ProblemSection.jsx         # seção "problema" + demo animada
    ProcessDemo.jsx             # simulação manual vs automático
    SolutionSection.jsx       # comparação modelo tradicional x Undersoft
    ServicesSection.jsx       # grid "o que pode ser automatizado"
    ProcessSection.jsx        # timeline do processo
    DiagnosticSection.jsx     # CTA de diagnóstico
    CaseSection.jsx            # case de sucesso (antes/depois/resultado)
    ContactSection.jsx        # formulário (Worker da Cloudflare + Turnstile)
    SuccessDialog.jsx         # modal de sucesso do formulário
    Footer.jsx
```

## Pendências / avisos

- **Imagens do case de sucesso**: o HTML original referenciava
  `assets/images/icone-before.png`, `icone-automation.png` e
  `icone-result.png`, mas esses arquivos não estavam entre os
  uploads — então não vieram neste projeto. Coloque-os em
  `public/assets/images/` com esses mesmos nomes que tudo volta a
  aparecer (a pasta já está criada, só falta os arquivos).
- **Favicon**: só veio o `favicon.png` nos uploads (o `favicon.svg`
  e `favicon.ico` referenciados no HTML original não estavam lá).
  O projeto está usando apenas o PNG; se tiver o SVG, é só colocar
  em `public/favicon.svg`.
- O vídeo antigo (`gradient.webm`) continua na pasta `public/` e o
  código de fallback está comentado dentro de
  `HeroBackground.jsx`, caso queira voltar a usá-lo.
