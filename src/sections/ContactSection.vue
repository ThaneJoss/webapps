<template>
  <section
    id="contact"
    class="section-wrap section-space pt-0"
  >
    <div class="grid gap-6 xl:grid-cols-[0.76fr_1.18fr_0.86fr]">
      <div class="grid gap-6">
        <article class="surface-card p-6 sm:p-8">
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
        </article>

        <article class="surface-card p-6 sm:p-8">
          <SectionTitle
            eyebrow="Best starting point"
            title="适合先从这里聊的，一般是这些项目"
            description="如果你的项目还在起步阶段，先把需求收紧，再启动第一版，通常会比一开始追求完整系统更有效。"
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
        </article>
      </div>

      <div class="surface-card p-2 sm:p-3">
        <ContactForm />
      </div>

      <div class="grid gap-6">
        <article class="surface-card p-6 sm:p-8">
          <SectionTitle
            eyebrow="What you get"
            title="提交之后，我会先帮你把方向和优先级理顺"
            description="这一步不是直接报价，而是先判断什么值得做、什么应该延后，以及第一版应该做到什么程度。"
          />

          <div class="mt-8 grid gap-3 text-sm text-steel">
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              先判断你的目标更适合官网、内部工具，还是一个更小的 MVP。
            </div>
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              把第一版真正需要的页面、功能和交付顺序收紧。
            </div>
            <div class="rounded-2xl border border-line/70 bg-white/74 px-4 py-4">
              尽量避免一开始就把需求做散、做重、做不清楚。
            </div>
          </div>
        </article>

        <article class="surface-dark panel-glow p-6 sm:p-8">
          <p class="panel-label text-white/55">Project fit</p>
          <h3 class="mt-3 text-2xl font-semibold">如果你已经有明确目标，现在就可以发需求</h3>
          <p class="mt-4 text-sm leading-7 text-white/70">
            这页现在的主目标不是展示技术细节，而是让你能更快把想法转成一次有效沟通。
          </p>

          <div class="mt-6 rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/72">
            一条写得清楚的需求，通常比一串技术名词更有价值。
          </div>
        </article>
      </div>
    </div>

    <div class="mt-8 grid gap-5 xl:grid-cols-3">
      <article
        v-for="slot in paymentSlots"
        :key="slot.id"
        class="surface-card flex h-full flex-col justify-between p-6 sm:p-7"
      >
        <div>
          <p class="panel-label text-steel">{{ slot.eyebrow }}</p>
          <h3 class="mt-3 text-2xl font-semibold text-ink">{{ slot.title }}</h3>
          <p class="mt-4 text-base leading-7 text-steel">
            {{ slot.description }}
          </p>
        </div>

        <div class="mt-8 space-y-4">
          <div class="rounded-2xl border border-dashed border-line bg-white/78 px-4 py-4 text-sm text-steel">
            这里预留为后续可直接点击付款的空间。
          </div>

          <button
            type="button"
            disabled
            class="tech-button tech-button--ghost inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium opacity-80"
          >
            {{ slot.cta }}
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue'
import SectionTitle from '../components/SectionTitle.vue'

const paymentSlots = [
  {
    id: 'discovery',
    eyebrow: 'Future payment slot',
    title: '需求梳理',
    description: '适合先对目标、页面结构和第一版范围做一次收紧，后续可放成独立付款入口。',
    cta: '后续可在这里付款'
  },
  {
    id: 'mvp',
    eyebrow: 'Future payment slot',
    title: 'MVP 启动',
    description: '适合已经确认要开工，只差把第一版界面、功能和交付边界敲定的项目。',
    cta: '后续可在这里付款'
  },
  {
    id: 'iteration',
    eyebrow: 'Future payment slot',
    title: '后续迭代',
    description: '适合第一版已经明确，后面准备继续扩页面、补流程或接入更多自动化能力。',
    cta: '后续可在这里付款'
  }
]
</script>
