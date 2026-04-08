<template>
  <RouterView v-slot="{ Component, route }">
    <div
      :key="route.fullPath"
      class="route-stage"
      :class="animateRoute ? 'route-stage--animate' : ''"
    >
      <component :is="Component" />
    </div>
  </RouterView>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const animateRoute = ref(false)
const hasLoaded = ref(false)

watch(
  () => route.fullPath,
  async () => {
    if (!hasLoaded.value) {
      hasLoaded.value = true
      return
    }

    animateRoute.value = false
    await nextTick()
    animateRoute.value = true
  },
  { immediate: true }
)
</script>
