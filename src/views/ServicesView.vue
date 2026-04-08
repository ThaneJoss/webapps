<template>
  <SiteShell>
    <PageHero
      eyebrow="Capability page"
      title="把能力拆成真正可交付的 web app 模块"
      description="这一页单独展示当前能先落地的服务方向，让能力表达不再只是首页里的一段滚动内容。"
      side-label="Delivery note"
      side-note="这一页的服务内容直接来自前端本地内容源，展示稳定，也更适合当前这个仍在持续迭代的站点阶段。"
      :highlights="['Landing systems', 'Internal tools', 'AI workspaces', 'Intake portals']"
    />

    <ServicesSection :services="services" />

    <PageActionBanner
      eyebrow="Next page"
      title="能力明确之后，再看交付流程"
      description="如果能力边界已经清楚，下一步就是看这套站点如何把需求收紧、接口定型、再进入编码。"
      cta-label="查看流程页"
      to="/process"
    />
  </SiteShell>
</template>

<script setup lang="ts">
import PageActionBanner from '../components/PageActionBanner.vue'
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import { useServicesCatalog } from '../composables/useShowcaseData.js'
import ServicesSection from '../sections/ServicesSection.vue'

const { services } = useServicesCatalog()
</script>
