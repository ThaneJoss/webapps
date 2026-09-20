<template>
  <article
    class="home-app-card surface-card flex flex-col items-start justify-between p-6 text-left"
    :class="[
      featured ? 'home-app-card--featured sm:p-8' : 'home-app-card--tile'
    ]"
    :aria-disabled="app.availability === 'planned' ? 'true' : undefined"
    :data-catalog-availability="app.availability"
    :data-display-tier="featured ? 'featured' : 'standard'"
  >
    <div class="w-full">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="panel-label text-steel">{{ app.label }}</p>
          <h3
            class="mt-3 font-semibold text-ink"
            :class="featured ? 'text-2xl tracking-tight sm:text-3xl' : 'text-xl'"
          >
            {{ app.title }}
          </h3>
        </div>

        <div
          class="home-app-card__badge"
          aria-hidden="true"
        >
          {{ app.badge }}
        </div>
      </div>

      <p
        class="mt-4 text-steel"
        :class="featured ? 'max-w-[38ch] text-base leading-8 sm:text-lg' : 'max-w-[30ch] text-base leading-7'"
      >
        {{ app.description }}
      </p>

      <ul
        class="mt-6 flex list-none flex-wrap gap-2.5 pl-0"
        :aria-label="`${app.title}功能标签`"
      >
        <li
          v-for="feature in app.features"
          :key="feature"
        >
          <span class="home-app-entry inline-flex items-center rounded-full border px-3 py-2 text-sm">
            {{ feature }}
          </span>
        </li>
      </ul>
    </div>

    <div class="home-app-footer mt-8 flex w-full flex-wrap items-center justify-between gap-3">
      <span
        class="home-app-stage inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
        :class="`home-app-stage--${app.availability}`"
      >
        <span
          class="home-app-stage__dot"
          aria-hidden="true"
        ></span>
        {{ availabilityLabels[app.availability] }}
      </span>

      <RouterLink
        v-if="app.availability !== 'planned' && app.destination.kind === 'internal'"
        :to="app.destination.href"
        class="home-app-visit inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
        :aria-label="`访问${app.title}`"
        data-catalog-route
      >
        访问网站
        <span aria-hidden="true">→</span>
      </RouterLink>

      <a
        v-else-if="app.availability !== 'planned'"
        :href="app.destination.href"
        class="home-app-visit inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`访问${app.title}`"
        data-catalog-link
      >
        访问网站
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { CatalogApp } from './types'
import { availabilityLabels } from './types'

defineProps<{
  app: CatalogApp
  featured?: boolean
}>()
</script>
