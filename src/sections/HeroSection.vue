<template>
  <section
    id="home"
    class="section-wrap scroll-mt-28 pt-6 sm:scroll-mt-36 sm:pt-10"
  >
    <div class="surface-card rise-in relative overflow-hidden px-5 py-7 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
      <div
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-neon/8 to-transparent lg:block"
      ></div>

      <div class="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div class="max-w-3xl">
          <span class="eyebrow">Modern Delivery Surface</span>
          <h1
            class="mt-6 max-w-[11ch] text-[3rem] font-semibold leading-[0.9] tracking-[-0.05em] text-ink sm:mt-7 sm:max-w-4xl sm:text-6xl sm:tracking-[-0.04em] lg:text-[4.5rem]"
          >
            把想法交付成真正可上线的
            <span class="text-transparent bg-gradient-to-r from-ink via-signal to-mint bg-clip-text">
              Web App
            </span>
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            用 Vue 前端和通用 Hono REST API，先做结构清晰、移动端完整、后续扩展不受平台绑定限制的第一版。
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <RouterLink
              to="/services"
              class="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              查看交付能力
            </RouterLink>
            <RouterLink
              to="/contact"
              class="inline-flex w-full items-center justify-center rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-medium text-ink shadow-[0_12px_30px_rgba(9,17,31,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(9,17,31,0.12)] sm:w-auto"
            >
              启动一个构建
            </RouterLink>
          </div>

          <div class="mt-8 flex flex-wrap gap-3 text-sm text-steel">
            <span
              v-for="chip in highlightChips"
              :key="chip"
              class="rounded-full border border-line/80 bg-white/70 px-4 py-2"
            >
              {{ chip }}
            </span>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="surface-dark panel-glow drift overflow-hidden p-6 sm:p-7">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="panel-label text-white/55">Live Board</p>
                <h2 class="mt-2 text-2xl font-semibold">Provider-agnostic runtime</h2>
              </div>
              <StatusChip
                :label="statusLabel"
                :tone="statusTone"
              />
            </div>

            <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/40">
                <span>REST surface</span>
                <span v-if="lastSync">{{ lastSync }}</span>
              </div>

              <div class="mt-4 space-y-3 font-mono text-sm text-white/80">
                <div
                  v-for="route in routes"
                  :key="route.path"
                  class="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-2"
                >
                  <span>{{ route.path }}</span>
                  <span :class="route.tone">{{ route.label }}</span>
                </div>
              </div>

              <div class="glass-divider pulse-line mt-5 h-px w-full"></div>

              <p class="mt-5 text-sm leading-6 text-white/70">
                首页优先展示交付能力，API 统一用 JSON envelope，后续可切数据库、邮件服务或第三方 webhook。
              </p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="signal in signals"
              :key="signal.id"
              class="rounded-3xl border border-line/70 bg-white/82 p-5 backdrop-blur"
            >
              <p class="panel-label text-steel">{{ signal.label }}</p>
              <p class="mt-3 text-xl font-semibold text-ink">{{ signal.value }}</p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span
                  class="h-2 w-2 rounded-full"
                  :class="signal.tone === 'good'
                    ? 'bg-mint'
                    : signal.tone === 'accent'
                      ? 'bg-neon'
                      : 'bg-steel/40'"
                ></span>
                <span class="uppercase tracking-[0.18em] text-steel">
                  {{ signal.tone }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { HealthStatus, SignalMetric } from '../../shared/types.js'
import StatusChip from '../components/StatusChip.vue'

const props = defineProps<{
  signals: SignalMetric[]
  apiStatus: 'checking' | 'online' | 'offline'
  health: HealthStatus | null
}>()

const highlightChips = ['Vue 3', 'Hono', 'RESTful', 'Serverless-ready', 'TypeScript']

const routes = [
  { path: 'GET /api/health', label: 'Live check', tone: 'text-mint' },
  { path: 'GET /api/services', label: 'Services page', tone: 'text-neon' },
  { path: 'GET /api/apps', label: 'Pipeline cards', tone: 'text-white/70' },
  { path: 'POST /api/contact', label: 'Queued', tone: 'text-ember' }
]

const statusLabel = computed(() => {
  if (props.apiStatus === 'online') {
    return 'API online'
  }

  if (props.apiStatus === 'offline') {
    return 'Fallback mode'
  }

  return 'Checking API'
})

const statusTone = computed(() => {
  if (props.apiStatus === 'online') {
    return 'good'
  }

  if (props.apiStatus === 'offline') {
    return 'warn'
  }

  return 'neutral'
})

const lastSync = computed(() => {
  if (!props.health) {
    return null
  }

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(props.health.timestamp))
})
</script>
