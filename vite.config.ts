import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:8787',
        changeOrigin: true
      }
    }
  }
})
