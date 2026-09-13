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
            这里汇集已经上线的用户应用、开发工作台与运维工具。无需安装，选择一个入口即可打开。
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
              <dt>应用入口</dt>
              <dd>{{ catalogApps.length }}</dd>
            </div>
            <div class="home-catalog-summary__item">
              <dt>主推应用</dt>
              <dd>{{ featuredAppTitle }}</dd>
            </div>
            <div class="home-catalog-summary__item">
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
        <p class="panel-label text-steel">APP 展示区</p>
        <h2
          id="catalog-title"
          class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-3xl"
        >
          已上线的网页 APP
        </h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-steel sm:text-base">
          以下卡片都连接真实运行的网站，点击访问即可在新标签页打开对应应用。
        </p>
      </div>

      <div
        class="home-catalog-group home-catalog-group--featured mt-8"
        aria-labelledby="featured-catalog-label"
        role="group"
      >
        <div class="home-catalog-group__heading">
          <p
            id="featured-catalog-label"
            class="text-sm font-semibold text-ink"
          >
            重点应用
          </p>
          <p class="mt-1 text-sm leading-6 text-steel">从文件中转站开始，快速进入最常用的网页服务。</p>
        </div>

        <div class="home-app-board home-app-board--featured mt-4 grid gap-5">
          <AppCard
            v-for="(app, index) in featuredApps"
            :key="app.id"
            :app="app"
            class="catalog-reveal"
            data-catalog-reveal
            :data-reveal-order="index"
          />
        </div>
      </div>

      <div
        class="home-catalog-group mt-10"
        aria-labelledby="standard-catalog-label"
        role="group"
      >
        <div class="home-catalog-group__heading">
          <p
            id="standard-catalog-label"
            class="text-sm font-semibold text-ink"
          >
            更多应用
          </p>
          <p class="mt-1 text-sm leading-6 text-steel">继续访问 AI、开发、远程连接与运维工作台。</p>
        </div>

        <div class="home-app-board home-app-board--standard mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AppCard
            v-for="(app, index) in standardApps"
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

const featuredApps = catalogApps.filter((app) => app.displayTier === 'featured')
const standardApps = catalogApps.filter((app) => app.displayTier === 'standard')
const availableAppCount = catalogApps.filter((app) => app.availability !== 'planned').length
const featuredAppTitle = featuredApps[0]?.title ?? '待确定'
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
