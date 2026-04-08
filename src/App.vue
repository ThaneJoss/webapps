<template>
  <RouterView />
  <CustomCursor />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import CustomCursor from './components/CustomCursor.vue'
</script>
