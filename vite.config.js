import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Site de varias paginas: a landing (index.html) + as paginas legais + a pagina de obrigado (uma pasta por pagina).
const page = (file) => path.resolve(import.meta.dirname, file)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: page('index.html'),
        termosCondicoes: page('termos-e-condicoes/index.html'),
        termosServico: page('termos-de-servico/index.html'),
        politicaPrivacidade: page('politica-de-privacidade/index.html'),
        politicaCookies: page('politica-de-cookies/index.html'),
        obrigado: page('obrigado/index.html'),
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
