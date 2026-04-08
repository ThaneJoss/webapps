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
      return 'bg-mint/16 text-mint'
    case 'accent':
      return 'bg-signal/14 text-signal'
    case 'warn':
      return 'bg-ember/14 text-ember'
    default:
      return 'bg-signal/10 text-white/82'
  }
})

const dotClass = computed(() => {
  switch (props.tone) {
    case 'good':
      return 'bg-mint'
    case 'accent':
      return 'bg-signal'
    case 'warn':
      return 'bg-ember'
    default:
      return 'bg-signal/70'
  }
})
</script>
