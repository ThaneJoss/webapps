<template>
  <header class="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8">
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
            class="shrink-0 rounded-full border px-3 py-2 transition-colors"
            :class="isActive(item.to)
              ? 'border-ink bg-ink text-white'
              : 'border-line/70 bg-white/75 text-steel hover:text-ink'"
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
import { useRoute, RouterLink } from 'vue-router'

import AppMark from './AppMark.vue'
import { primaryNavItems } from '../data/navigation.js'

const route = useRoute()

const navItems = primaryNavItems

const isActive = (to: string) => route.path === to
</script>
