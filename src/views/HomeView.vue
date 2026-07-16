<template>
  <section
    class="section-wrap home-hero-section"
    data-page-ready="home"
  >
    <div class="home-hero-shell mx-auto max-w-6xl">
      <div class="home-hero-card surface-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div class="max-w-3xl">
          <p class="panel-label text-steel">网站介绍</p>
          <h1 class="mt-4 text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.05em] text-ink sm:text-6xl">
            规划中的<span class="hero-native-emphasis">原生</span>网页 APP
          </h1>
          <p class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            这里展示准备建设的浏览器工具。当前没有工具开放使用，交付前不会提供无效入口。
          </p>

          <button
            type="button"
            class="tech-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
            @click="scrollToApps"
          >
            查看规划
          </button>
        </div>
      </div>
    </div>
  </section>

  <section
    id="home-apps"
    class="section-wrap home-apps-section pb-12 pt-5 sm:pb-16 sm:pt-8"
    aria-labelledby="catalog-title"
  >
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p class="panel-label text-steel">APP 规划区</p>
        <h2
          id="catalog-title"
          class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-[2.7rem]"
        >
          规划中的网页 APP
        </h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-steel sm:text-base">
          所有条目目前都处于规划阶段，因此只展示范围，不提供点击入口。完成真实功能与验收后才会开放。
        </p>
      </div>

      <div class="home-app-board mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AppCard
          v-for="app in catalogApps"
          :key="app.id"
          :app="app"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppCard from '../features/catalog/AppCard.vue'
import { catalogApps } from '../features/catalog/apps'

function scrollToApps() {
  if (typeof document === 'undefined') {
    return
  }

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  document.getElementById('home-apps')?.scrollIntoView({
    behavior: shouldReduceMotion ? 'auto' : 'smooth',
    block: 'start'
  })
}
</script>
