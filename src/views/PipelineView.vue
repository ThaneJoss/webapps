<template>
  <SiteShell>
    <PageHero
      eyebrow="Pipeline page"
      title="把正在设计中的应用方向独立出来，而不是压在首页下半段"
      description="这一页只负责展示当前处于研究、设计和原型阶段的 app pipeline，方便后续逐步替换成真实产品。"
      side-label="Status note"
      side-note="当前 pipeline 数据和 services 一样，优先从 API 获取；如果 API 暂时不可用，这一页仍然会使用前端内置内容继续展示。"
      :highlights="['Research', 'In Design', 'Prototype']"
    />

    <PipelineSection :apps="apps" />

    <PageActionBanner
      eyebrow="Next page"
      title="如果已经有目标场景，就直接进入联系页"
      description="看完 pipeline 后，不需要再回首页滚动到最底部，直接到联系页提交你准备启动的项目。"
      cta-label="前往联系页"
      to="/contact"
    />
  </SiteShell>
</template>

<script setup lang="ts">
import PageActionBanner from '../components/PageActionBanner.vue'
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import { useAppPipeline } from '../composables/useShowcaseData.js'
import PipelineSection from '../sections/PipelineSection.vue'

const { apps } = useAppPipeline()
</script>
