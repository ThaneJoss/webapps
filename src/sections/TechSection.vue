<template>
  <section
    id="stack"
    class="section-wrap section-space pt-0"
  >
    <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="surface-dark panel-glow p-6 sm:p-8">
        <p class="panel-label text-white/55">Technical direction</p>
        <h2 class="mt-3 text-3xl font-semibold">技术栈先服务于通用性和清晰结构</h2>
        <p class="mt-4 max-w-xl text-sm leading-7 text-white/70">
          这套实现刻意避开平台私有绑定。前端是 Vue，接口是 Hono，通信只走标准 HTTP。以后要换部署平台，不需要推倒重来。
        </p>

        <div class="mt-8 space-y-4 font-mono text-sm text-white/80">
          <div class="rounded-2xl border border-white/10 bg-white/4 p-4">
            <div class="flex items-center justify-between gap-4">
              <span>frontend</span>
              <span class="text-neon">vite + vue + ts</span>
            </div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/4 p-4">
            <div class="flex items-center justify-between gap-4">
              <span>api</span>
              <span class="text-mint">hono + rest</span>
            </div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/4 p-4">
            <div class="flex items-center justify-between gap-4">
              <span>env</span>
              <span class="text-white/70">VITE_API_BASE_URL</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="pillar in pillars"
          :key="pillar.id"
          class="surface-card p-6"
        >
          <p class="panel-label text-steel">{{ pillar.title }}</p>
          <p class="mt-3 text-lg font-semibold text-ink">{{ pillar.summary }}</p>
          <ul class="mt-5 space-y-2 text-sm text-steel">
            <li
              v-for="detail in pillar.details"
              :key="detail"
              class="flex items-start gap-2"
            >
              <span class="mt-1 h-2 w-2 rounded-full bg-neon"></span>
              <span>{{ detail }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TechPillar } from '../../shared/types.js'

defineProps<{
  pillars: TechPillar[]
}>()
</script>
