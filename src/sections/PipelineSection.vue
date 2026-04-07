<template>
  <section
    id="pipeline"
    class="section-wrap section-space pt-0"
  >
    <SectionTitle
      eyebrow="First release pipeline"
      title="现在还没有线上产品，所以先把应用方向和状态透明地摆出来"
      description="这些卡片不是虚构成功案例，而是适合这个站点后续继续孵化的首批应用模块。等真实 app 上线后，这一段可以自然替换。"
    />

    <div class="mt-10 grid gap-5 lg:grid-cols-3">
      <article
        v-for="app in apps"
        :key="app.id"
        class="surface-card p-6 sm:p-7"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="panel-label text-steel">Pipeline / {{ app.id }}</p>
            <h3 class="mt-3 text-2xl font-semibold text-ink">{{ app.name }}</h3>
          </div>
          <StatusChip
            :label="app.status"
            :tone="statusTone(app.status)"
          />
        </div>

        <p class="mt-5 text-base leading-7 text-steel">
          {{ app.summary }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in app.tags"
            :key="tag"
            class="rounded-full border border-line/70 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-steel"
          >
            {{ tag }}
          </span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { AppItem, AppStatus } from '../../shared/types.js'
import SectionTitle from '../components/SectionTitle.vue'
import StatusChip from '../components/StatusChip.vue'

defineProps<{
  apps: AppItem[]
}>()

const statusTone = (status: AppStatus) => {
  if (status === 'Prototype') {
    return 'good'
  }

  if (status === 'In Design') {
    return 'accent'
  }

  return 'warn'
}
</script>
