<template>
  <section class="section-wrap pb-12 pt-2">
    <div class="surface-dark panel-glow flex flex-col gap-5 rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
      <div class="max-w-2xl">
        <p class="panel-label text-white/55">{{ eyebrow }}</p>
        <h2 class="mt-3 text-2xl font-semibold text-white">{{ title }}</h2>
        <p class="mt-3 text-sm leading-7 text-white/72">
          {{ description }}
        </p>
      </div>

      <RouterLink
        :to="to"
        class="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:-translate-y-0.5"
      >
        {{ ctaLabel }}
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  to: string
}>()
</script>
