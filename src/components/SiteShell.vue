<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import SiteFooter from './SiteFooter.vue'
</script>
