<template>
  <SiteShell>
    <HeroSection
      :signals="heroSignals"
      :api-status="apiStatus"
      :health="health"
    />
    <PageDirectorySection />
    <PageActionBanner
      eyebrow="Direct entry"
      title="如果你已经想好要做什么，就直接进入联系页"
      description="现在导航已经拆成独立页面。首页只保留总览和入口，具体内容放到对应页面里展开。"
      cta-label="前往联系页"
      to="/contact"
    />
  </SiteShell>
</template>

<script setup lang="ts">
import PageActionBanner from '../components/PageActionBanner.vue'
import SiteShell from '../components/SiteShell.vue'
import { useApiHealthStatus } from '../composables/useShowcaseData.js'
import { heroSignals } from '../data/fallbackContent.js'
import HeroSection from '../sections/HeroSection.vue'
import PageDirectorySection from '../sections/PageDirectorySection.vue'

const { apiStatus, health } = useApiHealthStatus()
</script>
