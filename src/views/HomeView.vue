<template>
  <section
    class="section-wrap home-hero-section"
    data-page-ready="home"
  >
    <div class="home-hero-shell mx-auto max-w-6xl">
      <div class="home-hero-card surface-card overflow-hidden py-6 sm:py-8">
        <div class="home-hero-content max-w-4xl">
          <p class="home-hero-enter home-hero-enter--label panel-label text-steel">网站介绍</p>
          <h1 class="home-hero-enter home-hero-enter--title home-hero-title mt-4 font-semibold text-ink">
            我的<span class="hero-native-emphasis">网页</span> APP
          </h1>
          <p class="home-hero-enter home-hero-enter--copy mt-6 max-w-2xl text-base leading-8 text-steel sm:text-lg">
            这里汇集已经上线的用户应用、开发工作台、运维工具与开源项目。选择入口访问网站，或查看项目与安装说明。
          </p>

          <div class="home-hero-enter home-hero-enter--actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              class="tech-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
              @click="scrollToApps"
            >
              浏览应用
            </button>

            <RouterLink
              to="/contact"
              class="secondary-action inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium"
            >
              提交建议
            </RouterLink>
          </div>

          <dl class="home-hero-enter home-hero-enter--summary home-catalog-summary mt-8 grid gap-3 sm:grid-cols-3">
            <div class="home-catalog-summary__item">
              <dt>应用与项目</dt>
              <dd>{{ catalogApps.length }}</dd>
            </div>
            <div class="home-catalog-summary__item">
              <dt>用途分区</dt>
              <dd>{{ catalogGroups.length }}</dd>
            </div>
            <div class="home-catalog-summary__item">
              <dt>最新项目</dt>
              <dd>{{ latestApp?.title ?? '暂无应用' }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <section
    id="home-apps"
    ref="catalogSection"
    class="section-wrap home-apps-section pb-12 pt-5 sm:pb-16 sm:pt-8"
    aria-labelledby="catalog-title"
  >
    <div class="mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p class="panel-label text-steel">应用与项目展示区</p>
        <h2
          id="catalog-title"
          ref="catalogHeading"
          class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-3xl"
          tabindex="-1"
        >
          应用与开源项目
        </h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-steel sm:text-base">
          从研究到日常，按用途找到需要的项目。网站与公开项目都在新标签页打开。
        </p>
      </div>

      <div class="home-catalog-sections">
        <section
          v-for="group in catalogGroups"
          :key="group.id"
          class="home-catalog-group"
          :data-catalog-group="group.id"
          :aria-labelledby="`catalog-group-${group.id}`"
        >
          <div class="home-catalog-group__heading">
            <div>
              <h3 :id="`catalog-group-${group.id}`">{{ group.title }}</h3>
              <p>{{ group.description }}</p>
            </div>
            <p class="home-catalog-group__count">{{ group.apps.length }} 个项目</p>
          </div>

          <div
            class="home-app-board"
            :class="{ 'home-app-board--paired': group.apps.length === 2 || group.apps.length === 4 }"
          >
            <AppCard
              v-for="(app, index) in group.apps"
              :key="app.id"
              :app="app"
              class="catalog-reveal"
              data-catalog-reveal
              :data-reveal-order="index % 3"
            />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import AppCard from '../features/catalog/AppCard.vue'
import { catalogApps, getCatalogGroups, getLatestCatalogApp } from '../features/catalog/apps'
import { prefersReducedMotion } from '../lib/motion'

const latestApp = getLatestCatalogApp(catalogApps)
const catalogGroups = getCatalogGroups(catalogApps)
const catalogSection = ref<HTMLElement | null>(null)
const catalogHeading = ref<HTMLElement | null>(null)

let revealObserver: IntersectionObserver | null = null

const setupCatalogReveal = () => {
  if (!catalogSection.value || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    return
  }

  const revealThreshold = window.innerHeight * 0.9
  const targets = Array.from(
    catalogSection.value.querySelectorAll<HTMLElement>('[data-catalog-reveal]')
  ).filter((target) => target.getBoundingClientRect().top > revealThreshold)

  if (targets.length === 0) {
    return
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue
      }

      const target = entry.target as HTMLElement
      target.classList.add('is-revealed')
      revealObserver?.unobserve(target)
    }
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  })
  revealObserver = observer

  for (const target of targets) {
    target.classList.add('is-reveal-pending')
    observer.observe(target)
  }
}

onMounted(setupCatalogReveal)

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})

function scrollToApps() {
  catalogHeading.value?.focus({ preventScroll: true })
  catalogSection.value?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start'
  })
}
</script>
