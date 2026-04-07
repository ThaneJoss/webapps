<template>
  <div class="max-w-3xl">
    <span class="eyebrow">{{ eyebrow }}</span>
    <h2 class="mt-5 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
      {{ title }}
    </h2>
    <p class="mt-4 text-base leading-7 text-steel sm:text-lg">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>
