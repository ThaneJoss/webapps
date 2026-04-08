<template>
  <SiteShell>
    <PageHero
      eyebrow="Stack page"
      title="把技术方向做成独立页面，避免导航点进去还是一段锚点滚动"
      description="这里单独展示 Vue、Hono、REST 和无平台绑定的架构方向，让技术决策和页面结构分开表达。"
      side-label="Architecture note"
      side-note="这套栈优先保证迁移性和清晰结构，而不是追求平台私有能力。以后切运行环境时，前后端都更容易保留现有代码。"
      :highlights="['Vue 3', 'TypeScript', 'Hono', 'REST JSON']"
    />

    <TechSection :pillars="techPillars" />

    <PageActionBanner
      eyebrow="Next page"
      title="架构看完，再看应用方向"
      description="如果要理解这套站点未来准备孵化什么产品方向，下一页就是 pipeline。"
      cta-label="查看 Pipeline"
      to="/pipeline"
    />
  </SiteShell>
</template>

<script setup lang="ts">
import PageActionBanner from '../components/PageActionBanner.vue'
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import { techPillars } from '../data/fallbackContent.js'
import TechSection from '../sections/TechSection.vue'
</script>
