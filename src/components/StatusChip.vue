<template>
  <span
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
    :class="toneClass"
  >
    <span
      class="h-2 w-2 rounded-full"
      :class="dotClass"
    ></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  tone: 'neutral' | 'good' | 'accent' | 'warn'
}>()

const toneClass = computed(() => {
  switch (props.tone) {
    case 'good':
      return 'bg-mint/14 text-mint'
    case 'accent':
      return 'bg-neon/14 text-signal'
    case 'warn':
      return 'bg-ember/14 text-ember'
    default:
      return 'bg-white/8 text-white/80'
  }
})

const dotClass = computed(() => {
  switch (props.tone) {
    case 'good':
      return 'bg-mint'
    case 'accent':
      return 'bg-neon'
    case 'warn':
      return 'bg-ember'
    default:
      return 'bg-white/60'
  }
})
</script>
