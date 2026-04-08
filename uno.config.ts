import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      shell: '#f2f7ff',
      ink: '#0a1628',
      steel: '#5a6e87',
      line: 'rgba(92, 121, 160, 0.18)',
      panel: 'rgba(8, 20, 39, 0.78)',
      panelSoft: 'rgba(248, 251, 255, 0.92)',
      neon: '#52d7ff',
      mint: '#74e7c8',
      ember: '#ff8d6b',
      signal: '#5d94ff'
    },
    fontFamily: {
      sans: 'Inter, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
      mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace'
    },
    boxShadow: {
      frame: '0 22px 64px rgba(10, 22, 40, 0.12), 0 0 0 1px rgba(93, 148, 255, 0.04)',
      glow: '0 0 0 1px rgba(82, 215, 255, 0.16), 0 18px 52px rgba(19, 70, 118, 0.2)'
    }
  },
    shortcuts: {
      'surface-card':
        'rounded-3xl border border-line/70 bg-panelSoft shadow-frame',
      'surface-dark':
        'rounded-3xl border border-white/10 bg-panel backdrop-blur-xl shadow-glow text-white',
    'section-wrap':
      'mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12',
    'section-space':
      'py-18 sm:py-24 lg:py-28',
    eyebrow:
      'inline-flex items-center gap-2 rounded-full border border-line/70 bg-panelSoft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-steel',
    'display-title':
      'max-w-4xl text-4xl font-semibold leading-none sm:text-6xl lg:text-[4.5rem]',
    'grid-board':
      'grid gap-5 sm:grid-cols-2 xl:grid-cols-4'
  }
})
