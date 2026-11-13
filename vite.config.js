import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Site de varias paginas: a landing (index.html) + as paginas legais + a pagina de obrigado.
const page = (file) => path.resolve(import.meta.dirname, file)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Porta propria (registo de portas do utilizador): 5173 e a da Stara. strictPort = nao salta para a porta de outro projeto.
  server: { port: 5191, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: page('index.html'),
        termosCondicoes: page('pages/termos-e-condicoes.html'),
        termosServico: page('pages/termos-de-servico.html'),
        politicaPrivacidade: page('pages/politica-de-privacidade.html'),
        politicaCookies: page('pages/politica-de-cookies.html'),
        obrigado: page('pages/obrigado.html'),
        notFound: page('404.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
