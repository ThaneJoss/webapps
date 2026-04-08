<template>
  <SiteShell>
    <PageHero
      eyebrow="Process page"
      title="先把交付流程单独展开，而不是挤在首页里一带而过"
      description="独立页面更适合说明需求收敛、页面结构、接口契约和上线节奏，也更便于以后继续细化每一步。"
      side-label="Execution note"
      side-note="这条流程不是为了装专业，而是为了减少边做边猜的返工。先收紧边界，再动代码，后面的迭代会轻很多。"
      :highlights="['Discover', 'Shape', 'Ship', 'Iterate']"
    />

    <ProcessSection :steps="buildSteps" />

    <PageActionBanner
      eyebrow="Next page"
      title="流程之后，就是技术架构"
      description="如果你更关心前端、API 和部署怎么组合，可以直接进入技术页。"
      cta-label="查看技术页"
      to="/stack"
    />
  </SiteShell>
</template>

<script setup lang="ts">
import PageActionBanner from '../components/PageActionBanner.vue'
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import { buildSteps } from '../data/fallbackContent.js'
import ProcessSection from '../sections/ProcessSection.vue'
</script>
