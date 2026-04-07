<template>
  <section
    id="process"
    class="section-wrap section-space pt-0"
  >
    <div class="surface-card px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
      <SectionTitle
        eyebrow="Delivery system"
        title="先收紧边界，再进入编码，避免把不确定性写进代码里"
        description="这个流程适合还在起步阶段的服务型站点和 web app。重点不是流程图做得多完整，而是每一步都能缩短从想法到上线的距离。"
      />

      <div class="mt-10 grid gap-4 lg:grid-cols-4">
        <article
          v-for="step in steps"
          :key="step.id"
          class="rounded-3xl border border-line/70 bg-white/76 p-6"
        >
          <p class="panel-label text-steel">{{ step.marker }}</p>
          <h3 class="mt-4 text-xl font-semibold text-ink">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-steel">{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BuildStep } from '../../shared/types.js'
import SectionTitle from '../components/SectionTitle.vue'

defineProps<{
  steps: BuildStep[]
}>()
</script>
