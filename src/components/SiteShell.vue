<template>
  <div class="app-shell">
    <a
      class="skip-link"
      href="#main-content"
    >
      跳到主要内容
    </a>
    <AppHeader />
    <main
      id="main-content"
      class="app-main"
      tabindex="-1"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>
