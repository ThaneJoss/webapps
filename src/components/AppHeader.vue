<template>
  <header class="sticky top-0 z-40 px-3 pt-3 sm:px-6 lg:px-8">
    <div class="section-wrap">
      <div class="surface-card px-4 py-3 sm:px-5 sm:py-4">
        <div class="flex items-center justify-between gap-3">
          <RouterLink
            to="/"
            class="min-w-0 flex items-center gap-3"
          >
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-line/80 bg-ink text-sm font-semibold text-white sm:h-10 sm:w-10"
            >
              W
            </span>
            <div class="min-w-0">
              <div class="panel-label text-steel sm:hidden">WAAS</div>
              <div class="panel-label hidden truncate text-steel sm:block">Web Apps as a Service</div>
              <div class="text-xs font-medium text-ink/80 sm:text-sm">Build surface</div>
            </div>
          </RouterLink>

          <RouterLink
            to="/contact"
            class="shrink-0 whitespace-nowrap rounded-full border border-ink bg-ink px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            启动一个构建
          </RouterLink>
        </div>

        <nav class="mt-4 flex flex-wrap gap-2 border-t border-line/70 pt-4 text-sm">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-full border px-3 py-2 transition-colors"
            :class="isActive(item.to)
              ? 'border-ink bg-ink text-white'
              : 'border-line/70 bg-white/75 text-steel hover:text-ink'"
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

import { primaryNavItems } from '../data/navigation.js'

const route = useRoute()

const navItems = primaryNavItems

const isActive = (to: string) => route.path === to
</script>
