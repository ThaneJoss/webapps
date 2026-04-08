<template>
  <section class="section-wrap pt-6 sm:pt-10">
    <div class="surface-card rise-in relative overflow-hidden px-5 py-7 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <div
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-neon/8 to-transparent lg:block"
      ></div>

      <div
        class="grid gap-8 lg:items-start"
        :class="hasAside ? 'lg:grid-cols-[1.02fr_0.98fr]' : ''"
      >
        <div class="max-w-3xl">
          <span
            v-if="eyebrow"
            class="eyebrow"
          >
            {{ eyebrow }}
          </span>
          <h1
            class="max-w-4xl text-[2.7rem] font-semibold leading-[0.94] tracking-[-0.05em] text-ink sm:text-6xl sm:tracking-[-0.04em]"
            :class="eyebrow ? 'mt-6' : ''"
          >
            {{ title }}
          </h1>
          <p
            v-if="description"
            class="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-xl"
          >
            {{ description }}
          </p>

          <div
            v-if="highlights.length"
            class="mt-8 flex flex-wrap gap-3 text-sm text-steel"
          >
            <span
              v-for="highlight in highlights"
              :key="highlight"
              class="rounded-full border border-line/80 bg-white/70 px-4 py-2"
            >
              {{ highlight }}
            </span>
          </div>
        </div>

        <div
          v-if="hasAside"
          class="surface-dark panel-glow p-6 sm:p-7"
        >
          <p
            v-if="sideLabel"
            class="panel-label text-white/55"
          >
            {{ sideLabel }}
          </p>
          <p
            class="text-lg leading-8 text-white/86"
            :class="sideLabel ? 'mt-3' : ''"
          >
            {{ sideNote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    sideLabel?: string
    sideNote?: string
    highlights?: string[]
  }>(),
  {
    eyebrow: '',
    description: '',
    sideLabel: '',
    sideNote: '',
    highlights: () => []
  }
)

const hasAside = computed(() => Boolean(props.sideLabel || props.sideNote))
</script>
