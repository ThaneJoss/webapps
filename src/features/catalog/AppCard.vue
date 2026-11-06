<template>
  <article
    class="home-app-card"
    :aria-disabled="app.availability === 'planned' ? 'true' : undefined"
    :data-catalog-id="app.id"
    :data-catalog-availability="app.availability"
  >
    <div>
      <h4 class="home-app-title">{{ app.title }}</h4>
      <p class="home-app-description">{{ app.description }}</p>
    </div>

    <div class="home-app-footer">
      <p class="home-app-status">{{ availabilityLabels[app.availability] }}</p>

      <div class="home-app-actions">
        <RouterLink
          v-if="app.availability !== 'planned' && app.destination.kind === 'internal'"
          :to="app.destination.href"
          class="home-app-visit"
          :aria-label="`访问${app.title}`"
          data-catalog-route
        >
          访问网站
          <span aria-hidden="true">→</span>
        </RouterLink>

        <a
          v-else-if="app.availability !== 'planned'"
          :href="app.destination.href"
          class="home-app-visit"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="app.destination.kind === 'repository' ? `查看${app.title}项目` : `访问${app.title}`"
          data-catalog-link
        >
          {{ app.destination.kind === 'repository' ? '查看项目' : '访问网站' }}
          <span aria-hidden="true">↗</span>
        </a>

        <a
          v-if="app.availability !== 'planned' && app.repositoryUrl && app.destination.kind !== 'repository'"
          :href="app.repositoryUrl"
          class="home-app-visit"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`查看${app.title}源码`"
          data-catalog-source
        >
          查看源码
          <span aria-hidden="true">↗</span>
        </a>
      </div>
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
