<template>
  <footer class="section-wrap pb-10 pt-2">
    <div class="flex flex-col gap-3 border-t border-line/70 py-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
      <p>Frontend: Vue + Vite. API: Hono + REST. Runtime: provider-agnostic.</p>
      <p>{{ footerNote }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerNote = `Seeded on ${new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date())}`
</script>
