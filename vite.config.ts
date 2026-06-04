import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import splitVendorChunkPlugin from 'split-vendor-chunk-plugin'
import Sitemap from 'vite-plugin-sitemap'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url))
      }
    }
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    UnoCSS(),
    Sitemap({
      hostname: 'https://thanejoss.com',
      dynamicRoutes: ['/contact'],
      generateRobotsTxt: true,
      readable: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
