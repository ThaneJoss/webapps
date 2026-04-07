<template>
  <section
    id="services"
    class="section-wrap section-space"
  >
    <SectionTitle
      eyebrow="What can be built"
      title="先定义可交付的系统，而不是空谈“全能开发”"
      description="V1 不假装已经有大规模产品矩阵，而是明确能先落地的 web app 类型。每种模块都围绕真实使用动作展开。"
    />

    <div class="mt-10 grid gap-5 lg:grid-cols-2">
      <article
        v-for="service in services"
        :key="service.id"
        class="surface-card group p-6 sm:p-7"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="panel-label text-steel">Module {{ service.id }}</p>
            <h3 class="mt-3 text-2xl font-semibold text-ink">{{ service.title }}</h3>
          </div>
          <span
            class="flex h-12 w-12 items-center justify-center rounded-2xl border border-line/70 bg-ink text-sm font-semibold text-white transition-transform group-hover:-translate-y-1"
          >
            {{ service.title.slice(0, 2).toUpperCase() }}
          </span>
        </div>

        <p class="mt-4 text-base leading-7 text-steel">
          {{ service.description }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="tag in service.tags"
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
import type { ServiceItem } from '../../shared/types.js'
import SectionTitle from '../components/SectionTitle.vue'

defineProps<{
  services: ServiceItem[]
}>()
</script>
