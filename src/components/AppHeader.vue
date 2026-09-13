<template>
  <header
    class="site-header sticky top-0 z-40"
  >
    <div class="section-wrap">
      <div class="site-header__inner mx-auto max-w-6xl">
        <RouterLink
          to="/"
          class="site-brand shrink-0"
          aria-label="返回首页"
        >
          <AppMark />
          <span>Web Apps</span>
        </RouterLink>

        <nav
          class="nav-scroll min-w-0 flex items-center gap-2 overflow-x-auto text-sm sm:justify-center"
          aria-label="主导航"
        >
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="tech-nav-link shrink-0 rounded-full border px-3 py-2"
            :class="isActive(item.to) ? 'is-active' : ''"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'

import AppMark from './AppMark.vue'
import { primaryNavItems } from '../data/navigation'

const route = useRoute()

const navItems = primaryNavItems

const isActive = (to: string) => route.path === to
</script>
