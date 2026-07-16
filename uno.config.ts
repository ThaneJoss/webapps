import { defineConfig } from 'unocss'
import { presetWind3 } from '@unocss/preset-wind3'

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      ink: '#0a1628',
      steel: '#5a6e87',
      line: 'rgba(92, 121, 160, 0.18)',
      panelSoft: 'rgba(248, 251, 255, 0.92)',
      neon: '#52d7ff'
    },
    boxShadow: {
      frame: '0 22px 64px rgba(10, 22, 40, 0.12), 0 0 0 1px rgba(93, 148, 255, 0.04)'
    }
  },
  shortcuts: {
    'surface-card':
      'rounded-3xl border border-line/70 bg-panelSoft shadow-frame',
    'section-wrap':
      'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
    'section-space':
      'py-18 sm:py-24 lg:py-28'
  }
})
