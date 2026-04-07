import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      shell: '#f5f7fb',
      ink: '#09111f',
      steel: '#60708c',
      line: 'rgba(96, 112, 140, 0.18)',
      panel: 'rgba(10, 18, 32, 0.72)',
      panelSoft: 'rgba(255, 255, 255, 0.72)',
      neon: '#66e4ff',
      mint: '#8bf0d9',
      ember: '#ff9b71',
      signal: '#7dd3fc'
    },
    fontFamily: {
      sans: '"Space Grotesk", "Avenir Next", "Segoe UI", sans-serif',
      mono: '"JetBrains Mono", "SFMono-Regular", monospace'
    },
    boxShadow: {
      frame: '0 24px 80px rgba(7, 12, 22, 0.16)',
      glow: '0 0 0 1px rgba(102, 228, 255, 0.12), 0 16px 48px rgba(102, 228, 255, 0.12)'
    }
  },
  shortcuts: {
    'surface-card':
      'rounded-3xl border border-line/70 bg-white/72 backdrop-blur-xl shadow-frame',
    'surface-dark':
      'rounded-3xl border border-white/10 bg-panel backdrop-blur-xl shadow-glow text-white',
    'section-wrap':
      'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
    'section-space':
      'py-18 sm:py-24 lg:py-28',
    eyebrow:
      'inline-flex items-center gap-2 rounded-full border border-line/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-steel',
    'display-title':
      'max-w-4xl text-4xl font-semibold leading-none sm:text-6xl lg:text-[4.5rem]',
    'grid-board':
      'grid gap-5 sm:grid-cols-2 xl:grid-cols-4'
  }
})
