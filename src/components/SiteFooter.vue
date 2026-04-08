<template>
  <footer class="section-wrap pb-10 pt-2">
    <div class="flex flex-col gap-3 border-t border-line/70 py-6 text-sm text-steel sm:flex-row sm:items-center sm:justify-between">
      <p>内容正在整理中，欢迎通过联系页留下你的想法、建议或需求。</p>
      <p>{{ footerNote }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerNote = `更新于 ${new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date())}`
</script>
