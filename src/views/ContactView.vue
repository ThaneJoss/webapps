<template>
  <SiteShell>
    <PageHero
      eyebrow="Contact page"
      title="把联系入口做成独立页面，减少找表单的跳转成本"
      description="现在联系表单有自己的页面，用户不需要先回首页再滚到底部。对真实站点来说，这种结构更直接，也更像正式产品官网。"
      side-label="Submission note"
      side-note="当前表单提交走标准 JSON API。后续无论你要接数据库、邮件还是 webhook，这个入口都可以继续保留不变。"
      :highlights="['POST /api/contact', 'Queued receipt', 'Form-first flow']"
    />

    <ContactSection />
  </SiteShell>
</template>

<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>
