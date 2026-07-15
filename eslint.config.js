import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue']
      },
      globals: globals.browser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style']
      }],
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: [
      '*.config.{js,ts}',
      'scripts/**/*.{cjs,mjs}',
      'vite.config.ts'
    ],
    languageOptions: {
      globals: globals.node
    }
  }
)
