<template>
  <SiteShell>
    <RouterView v-slot="{ Component, route }">
      <Transition
        name="route-content"
        mode="out-in"
      >
        <div
          :key="route.path"
          class="route-stage"
        >
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </SiteShell>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import SiteShell from './components/SiteShell.vue'
</script>
