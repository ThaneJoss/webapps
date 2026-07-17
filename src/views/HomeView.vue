<template>
  <section
    class="section-wrap home-hero-section"
    data-page-ready="home"
  >
    <div class="home-hero-shell mx-auto max-w-6xl">
      <div class="home-hero-card surface-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div class="home-hero-content max-w-4xl">
          <p class="home-hero-enter home-hero-enter--label panel-label text-steel">网站介绍</p>
          <h1 class="home-hero-enter home-hero-enter--title mt-4 text-[2.9rem] font-semibold leading-[0.92] tracking-[-0.05em] text-ink sm:text-6xl">
            规划中的<span class="hero-native-emphasis">原生</span>网页 APP
          </h1>
          <p class="home-hero-enter home-hero-enter--copy mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl">
            这里展示准备建设的浏览器工具。当前没有工具开放使用，交付前不会提供无效入口。
          </p>

          <div class="home-hero-enter home-hero-enter--actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              class="tech-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium"
              @click="scrollToApps"
            >
              查看规划
            </button>

            <RouterLink
              to="/contact"
              class="secondary-action inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium"
            >
              提交建议
            </RouterLink>
          </div>

          <dl class="home-hero-enter home-hero-enter--summary home-roadmap-summary mt-8 grid gap-3 sm:grid-cols-3">
            <div class="home-roadmap-summary__item">
              <dt>规划条目</dt>
              <dd>{{ catalogApps.length }}</dd>
            </div>
            <div class="home-roadmap-summary__item">
              <dt>下一项</dt>
              <dd>{{ priorityAppTitle }}</dd>
            </div>
            <div class="home-roadmap-summary__item">
              <dt>已开放</dt>
              <dd>{{ availableAppCount }}</dd>
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

      <div
        class="home-roadmap-group home-roadmap-group--priority mt-8"
        aria-labelledby="priority-roadmap-label"
        role="group"
      >
        <div class="home-roadmap-group__heading">
          <p
            id="priority-roadmap-label"
            class="text-sm font-semibold text-ink"
          >
            优先开发
          </p>
          <p class="mt-1 text-sm leading-6 text-steel">先完成一个真实可用的工具，再开放对应入口。</p>
        </div>

        <div class="home-app-board home-app-board--priority mt-4 grid gap-5">
          <AppCard
            v-for="(app, index) in priorityApps"
            :key="app.id"
            :app="app"
            class="catalog-reveal"
            data-catalog-reveal
            :data-reveal-order="index"
          />
        </div>
      </div>

      <div
        class="home-roadmap-group mt-10"
        aria-labelledby="later-roadmap-label"
        role="group"
      >
        <div class="home-roadmap-group__heading">
          <p
            id="later-roadmap-label"
            class="text-sm font-semibold text-ink"
          >
            后续规划
          </p>
          <p class="mt-1 text-sm leading-6 text-steel">这些方向会在优先项交付后依次评估。</p>
        </div>

        <div class="home-app-board home-app-board--later mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AppCard
            v-for="(app, index) in laterApps"
            :key="app.id"
            :app="app"
            class="catalog-reveal"
            data-catalog-reveal
            :data-reveal-order="index % 3"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import AppCard from '../features/catalog/AppCard.vue'
import { catalogApps } from '../features/catalog/apps'
import { prefersReducedMotion } from '../lib/motion'

const priorityApps = catalogApps.filter((app) => app.roadmapStage === 'next')
const laterApps = catalogApps.filter((app) => app.roadmapStage === 'later')
const availableAppCount = catalogApps.filter((app) => app.availability !== 'planned').length
const priorityAppTitle = priorityApps[0]?.title ?? '待确定'
const catalogSection = ref<HTMLElement | null>(null)

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
  document.getElementById('home-apps')?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start'
  })
}
</script>
