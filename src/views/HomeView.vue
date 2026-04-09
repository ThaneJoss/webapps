<template>
  <SiteShell>
    <section class="section-wrap pt-6 sm:pt-10">
      <div class="mx-auto max-w-5xl">
        <div class="surface-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div class="max-w-3xl">
            <p class="panel-label text-steel">网站介绍</p>
            <h1 class="mt-4 text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.05em] text-ink sm:text-6xl">
              你的第一个<span class="hero-native-emphasis">原生</span>网页APP
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
              从这里开始，以更纯净清晰的方式逐步呈现完整内容、联系入口与后续更新。
            </p>

            <RouterLink
              to="/contact"
              class="tech-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
            >
              前往联系页
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </SiteShell>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import SiteShell from '../components/SiteShell.vue'
</script>
