<template>
  <section class="section-wrap section-space pt-0">
    <SectionTitle
      eyebrow="Page map"
      title="把导航变成独立页面，让每一块信息都有自己的上下文"
      description="现在顶部导航不再只是同页滚动。每个入口都有单独页面，结构更清楚，也更适合后续继续扩展成真正的网站。"
    />

    <div class="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <RouterLink
        v-for="item in pageLinks"
        :key="item.to"
        :to="item.to"
        class="surface-card group flex min-h-[220px] flex-col justify-between p-6 transition-transform hover:-translate-y-1"
      >
        <div>
          <p class="panel-label text-steel">{{ item.title }}</p>
          <h3 class="mt-3 text-2xl font-semibold text-ink">{{ item.label }}</h3>
          <p class="mt-4 text-base leading-7 text-steel">
            {{ item.description }}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between text-sm font-medium text-ink">
          <span>进入页面</span>
          <span class="rounded-full border border-line/70 bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
            {{ item.to.replace('/', '') }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { primaryNavItems } from '../data/navigation.js'
import SectionTitle from '../components/SectionTitle.vue'

const pageLinks = primaryNavItems.filter((item) => item.to !== '/')
</script>
