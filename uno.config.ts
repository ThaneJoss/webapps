import { defineConfig } from 'unocss'
import { presetWind3 } from '@unocss/preset-wind3'

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      ink: '#182230',
      steel: '#526075',
      line: '#e2e6ec',
      panelSoft: '#ffffff',
      neon: '#52d7ff'
    },
    boxShadow: {
      frame: '0 1px 3px rgba(16, 24, 40, 0.04)'
    }
  },
  shortcuts: {
    'surface-card':
      'rounded-2xl border border-line bg-panelSoft shadow-frame',
    'section-wrap':
      'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
    'section-space':
      'py-18 sm:py-24 lg:py-28'
  }
})
