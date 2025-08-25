import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 5173, // Port par défaut de Vite
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // URL de ton backend FastAPI
        changeOrigin: true, // Change l'origine de la requête pour correspondre au backend
        rewrite: (path) => path.replace(/^\/api/, ''), // Supprime le préfixe /api avant d'envoyer la requête au backend
      },
    },
  },
})



