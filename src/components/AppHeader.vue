<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8"
  >
    <div class="section-wrap">
      <div class="surface-card grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <RouterLink
          to="/"
          class="shrink-0"
          aria-label="返回首页"
        >
          <AppMark />
        </RouterLink>

        <nav class="nav-scroll min-w-0 flex items-center gap-2 overflow-x-auto text-sm sm:justify-center">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="tech-nav-link shrink-0 rounded-full border px-3 py-2 transition-colors"
            :class="isActive(item.to) ? 'is-active' : ''"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div
          class="h-10 w-10 shrink-0 sm:h-11 sm:w-11"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import AppMark from './AppMark.vue'
import { primaryNavItems } from '../data/navigation.js'

const route = useRoute()
const headerRef = useTemplateRef('headerRef')

const navItems = primaryNavItems

const isActive = (to: string) => route.path === to

let headerObserver: ResizeObserver | null = null

function updateHeaderHeight() {
  const height = headerRef.value?.offsetHeight ?? 0

  document.documentElement.style.setProperty('--app-header-height', `${Math.ceil(height)}px`)
}

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)

  if (typeof ResizeObserver !== 'undefined' && headerRef.value) {
    headerObserver = new ResizeObserver(updateHeaderHeight)
    headerObserver.observe(headerRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateHeaderHeight)
  headerObserver?.disconnect()
})
</script>
