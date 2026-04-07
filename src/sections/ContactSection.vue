<template>
  <section
    id="contact"
    class="section-wrap section-space pt-0"
  >
    <div class="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div class="surface-card p-6 sm:p-8">
        <SectionTitle
          eyebrow="Next action"
          title="如果你已经有一个目标场景，就从最小可用版本开始"
          description="V1 适合把需求入口、运营看板、AI 工作台或单一流程工具先做出来。范围小一点，上线更快，后面再接数据库和更复杂的自动化。"
        />

        <div class="mt-8 space-y-4 text-sm leading-7 text-steel">
          <p>适合先开工的场景：</p>
          <p>1. 一个需要清晰首页和能力表达的新服务站点。</p>
          <p>2. 一个需要简单表单、状态流和 API 的内部工具。</p>
          <p>3. 一个需要把 AI 功能收敛成可用界面的工作台。</p>
        </div>
      </div>

      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
import SectionTitle from '../components/SectionTitle.vue'
</script>
