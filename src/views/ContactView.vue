<template>
  <SiteShell>
    <PageHero
      eyebrow="Start a project"
      title="把你的目标发过来，我们先把第一版做成真正能上线的东西"
      description="如果你已经有产品想法、业务场景，或者只是知道自己卡在某个流程上，这一页就是最直接的开始。把目标、当前阶段和你希望优先完成的部分告诉我，我会据此判断更适合从哪一版切入。"
      side-label="What happens next"
      side-note="提交后，我会先判断你的需求更适合做官网、内部工具、AI 工作台，还是一个更小的 MVP，并给出更清楚的下一步建议。"
      :highlights="['需求梳理', 'MVP 范围', '交付优先级']"
    />

    <ContactSection />
  </SiteShell>
</template>

<script setup lang="ts">
import PageHero from '../components/PageHero.vue'
import SiteShell from '../components/SiteShell.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>
