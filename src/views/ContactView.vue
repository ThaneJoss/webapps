<template>
  <SiteShell>
    <PageHero
      eyebrow="Start a project"
      title="选一个最适合你的联系入口，直接开始"
      description="如果你已经知道自己要聊什么，这一页不需要先读一大段说明。直接选 Email、网页表单或 GitHub Issues，就可以开始。"
      side-label="Contact options"
      side-note="Email 适合直接发明确需求，网页表单适合按结构填写项目背景，GitHub Issues 适合公开记录需求、问题或改动建议。"
      :highlights="['Email', '网页表单', 'GitHub Issues']"
    />

    <ContactSection />
  </SiteShell>
</template>

<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>
