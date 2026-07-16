import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import UnoCSS from 'unocss/vite'
import type { ViteSSGOptions } from 'vite-ssg'
import { defineConfig } from 'vitest/config'

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
    Icons({ compiler: 'vue3' }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions,
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
