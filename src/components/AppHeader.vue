<template>
  <header class="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8">
    <div class="section-wrap">
      <div class="surface-card flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <a
          href="#home"
          class="min-w-0 flex items-center gap-3"
        >
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-line/80 bg-ink text-sm font-semibold text-white sm:h-10 sm:w-10"
          >
            W
          </span>
          <div class="min-w-0">
            <div class="panel-label text-steel sm:hidden">WAAS</div>
            <div class="panel-label hidden truncate text-steel sm:block">Web Apps as a Service</div>
            <div class="text-xs font-medium text-ink/80 sm:text-sm">Build surface</div>
          </div>
        </a>

        <nav class="hidden items-center gap-6 text-sm text-steel md:flex">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="transition-colors hover:text-ink"
          >
            {{ item.label }}
          </a>
        </nav>

        <a
          href="#contact"
          class="shrink-0 whitespace-nowrap rounded-full border border-ink bg-ink px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          启动一个构建
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { href: '#services', label: '能力' },
  { href: '#process', label: '流程' },
  { href: '#stack', label: '技术' },
  { href: '#pipeline', label: 'Pipeline' }
]
</script>
