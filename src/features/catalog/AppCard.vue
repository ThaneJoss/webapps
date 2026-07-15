<template>
  <article
    class="home-app-card surface-card flex flex-col items-start justify-between rounded-[2rem] border border-[#122540]/18 bg-white/88 p-6 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)]"
    :class="[
      app.featured ? 'home-app-card--featured md:col-span-2 xl:col-span-1 sm:p-8' : 'home-app-card--tile',
      app.boardClass
    ]"
    :aria-disabled="app.availability === 'planned' ? 'true' : undefined"
    :data-catalog-availability="app.availability"
  >
    <div class="w-full">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="panel-label text-steel">{{ app.label }}</p>
          <h3
            class="mt-3 font-semibold text-ink"
            :class="app.featured ? 'text-3xl tracking-[-0.05em] sm:text-[2.8rem]' : 'text-2xl'"
          >
            {{ app.title }}
          </h3>
        </div>

        <div
          class="flex items-center justify-center rounded-2xl border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
          :class="app.featured ? 'h-14 w-14 text-sm font-semibold' : 'h-11 w-11 text-xs font-semibold'"
          aria-hidden="true"
        >
          {{ app.badge }}
        </div>
      </div>

      <p
        class="mt-4 text-steel"
        :class="app.featured ? 'max-w-[34ch] text-base leading-8 sm:text-lg' : 'max-w-[28ch] text-base leading-7'"
      >
        {{ app.description }}
      </p>

      <ul
        class="home-app-planned-entries mt-6 flex flex-wrap gap-2.5"
        :aria-label="`${app.title}规划条目`"
      >
        <li
          v-for="entry in app.quickEntries"
          :key="entry.id"
        >
          <RouterLink
            v-if="entry.availability !== 'planned' && entry.route"
            :to="entry.route"
            class="home-app-entry home-app-entry--interactive inline-flex items-center rounded-full border px-3 py-2 text-sm"
          >
            {{ entry.label }}
          </RouterLink>
          <span
            v-else
            class="home-app-entry inline-flex items-center rounded-full border px-3 py-2 text-sm"
            aria-disabled="true"
          >
            {{ entry.label }}
          </span>
        </li>
      </ul>
    </div>

    <div class="mt-8 flex w-full items-center justify-end">
      <span class="inline-flex items-center rounded-full border border-[#35506e]/18 bg-[#35506e]/6 px-3 py-1 text-sm font-medium text-[#35506e]">
        {{ availabilityLabels[app.availability] }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { CatalogApp } from './types'
import { availabilityLabels } from './types'

defineProps<{
  app: CatalogApp
}>()
</script>
