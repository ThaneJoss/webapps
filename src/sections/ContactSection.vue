<template>
  <section
    id="contact"
    class="section-wrap section-space pt-0"
  >
    <div class="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div class="grid gap-6">
        <div class="surface-card p-6 sm:p-8">
          <SectionTitle
            eyebrow="Before you send"
            title="你不需要先写技术方案，只需要把目标讲清楚"
            description="如果你还没把页面结构、接口或功能列表想完整，这很正常。先把你想解决的问题、面向谁，以及为什么现在要做这件事说清楚，就足够开始。"
          />

          <div class="mt-8 space-y-4 text-sm leading-7 text-steel">
            <p>给我发需求时，优先写这三件事：</p>
            <p>1. 你想做的是什么产品、页面或工具。</p>
            <p>2. 它主要给谁使用，要解决什么问题。</p>
            <p>3. 你希望第一版先完成到什么程度。</p>
          </div>
        </div>

        <div class="surface-card p-6 sm:p-8">
          <SectionTitle
            eyebrow="Good fit"
            title="下面这些项目，通常都适合先从这里开始聊"
            description="如果你的需求属于这些类型，通常都可以先做一个小而清晰的版本，再逐步扩展。"
          />

          <div class="mt-8 grid gap-3 text-sm text-steel">
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              新服务或新产品的官网、落地页和转化页。
            </div>
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              面向内部流程的表单工具、运营面板或状态看板。
            </div>
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              需要把 AI 能力包装成清晰可用界面的工作台或功能页。
            </div>
          </div>
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
