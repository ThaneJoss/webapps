import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import type { ViteSSGOptions } from 'vite-ssg'

import { applyPageMetadataToHtml } from './src/lib/seo'

const ssgOptions = {
  beastiesOptions: false,
  formatting: 'minify',
  includedRoutes: () => ['/', '/contact', '/404'],
  onPageRendered: (route, html) => applyPageMetadataToHtml(html, route)
} satisfies ViteSSGOptions

export default defineConfig({
  plugins: [
    vue(),
    Icons({ compiler: 'vue' }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      reporter: ['text', 'json-summary']
    }
  }
})
