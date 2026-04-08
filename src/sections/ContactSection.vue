<template>
  <section
    id="contact"
    class="section-wrap section-space pt-5 sm:pt-6"
  >
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-5 md:grid-cols-3">
        <component
          :is="entry.kind === 'form' ? 'button' : 'a'"
          v-for="entry in contactEntries"
          :key="entry.id"
          :href="entry.kind !== 'form' ? entry.href : undefined"
          :target="entry.external ? '_blank' : undefined"
          :rel="entry.external ? 'noreferrer' : undefined"
          :type="entry.kind === 'form' ? 'button' : undefined"
          class="surface-card group flex min-h-[250px] flex-col justify-between rounded-[2rem] border border-[#122540]/18 bg-white/88 p-6 shadow-[0_20px_40px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-cyan-500/28 hover:shadow-[0_26px_48px_rgba(10,22,40,0.12)]"
          @click="entry.kind === 'form' ? scrollToForm() : undefined"
        >
          <div>
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="panel-label text-steel">{{ entry.eyebrow }}</p>
                <h3 class="mt-3 text-2xl font-semibold text-ink">{{ entry.title }}</h3>
              </div>

              <div class="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                <Icon
                  :icon="entry.icon"
                  class="h-5 w-5"
                />
              </div>
            </div>
            <p class="mt-4 text-base leading-7 text-steel">
              {{ entry.description }}
            </p>
          </div>

          <div class="mt-8 flex items-center justify-between gap-4">
            <span class="rounded-full border border-[#17304b]/14 bg-[#0f2036]/[0.03] px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
              {{ entry.meta }}
            </span>
            <span class="inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink transition group-hover:border-cyan-500/28 group-hover:bg-cyan-400/12">
              {{ entry.cta }}
            </span>
          </div>
        </component>
      </div>
    </div>

    <div
      id="contact-form"
      class="mt-10 scroll-mt-28 sm:scroll-mt-32"
    >
      <div class="mx-auto max-w-5xl">
        <div class="rounded-[2rem] border border-[#102743]/18 bg-[linear-gradient(140deg,rgba(7,18,35,0.98),rgba(16,37,68,0.97)_52%,rgba(12,73,86,0.92))] p-2 shadow-[0_28px_64px_rgba(10,22,40,0.22)] sm:p-3">
          <div class="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-1.5 sm:p-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 grid gap-5 xl:grid-cols-3">
      <article
        v-for="slot in paymentSlots"
        :key="slot.id"
        class="surface-card flex h-full flex-col justify-between rounded-[2rem] border border-[#122540]/16 bg-white/86 p-6 shadow-[0_18px_38px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1 hover:border-cyan-500/24 sm:p-7"
      >
        <div>
          <p class="panel-label text-steel">{{ slot.eyebrow }}</p>
          <h3 class="mt-3 text-2xl font-semibold text-ink">{{ slot.title }}</h3>
          <p class="mt-4 text-base leading-7 text-steel">
            {{ slot.description }}
          </p>
        </div>

        <div class="mt-8 space-y-4">
          <div class="rounded-2xl border border-dashed border-[#17304b]/18 bg-[#0f2036]/[0.03] px-4 py-4 text-sm text-steel">
            这里预留为后续可直接点击付款的空间。
          </div>

          <button
            type="button"
            disabled
            class="tech-button tech-button--ghost inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-100"
          >
            {{ slot.cta }}
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

import ContactForm from '../components/ContactForm.vue'

const scrollToForm = () => {
  const target = document.getElementById('contact-form')
  if (!target) {
    return
  }

  const header = document.querySelector('header')
  const headerHeight = header instanceof HTMLElement
    ? header.getBoundingClientRect().height
    : 0
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24

  window.scrollTo({
    top,
    behavior: 'smooth'
  })
}

const contactEntries = [
  {
    id: 'email',
    eyebrow: '直接邮件',
    title: 'Email',
    description: '适合已经有明确需求，想直接用邮件把目标、范围和时间节奏发过来。',
    meta: 'support@thanejoss.com',
    cta: '发送邮件',
    icon: 'solar:letter-bold-duotone',
    href: 'mailto:support@thanejoss.com',
    kind: 'link',
    external: false
  },
  {
    id: 'form',
    eyebrow: '结构化表单',
    title: '网页表单',
    description: '适合按页面结构填写项目背景、目标用户和第一版希望先完成的内容。',
    meta: '滚动到表单',
    cta: '填写表单',
    icon: 'solar:clipboard-list-bold-duotone',
    href: '',
    kind: 'form',
    external: false
  },
  {
    id: 'issues',
    eyebrow: '公开需求',
    title: 'GitHub Issues',
    description: '适合公开记录需求、问题或改动建议，方便后续持续跟踪和讨论。',
    meta: '在新标签页打开',
    cta: '新建 Issue',
    icon: 'solar:chat-round-line-line-duotone',
    href: 'https://github.com/ThaneJoss/webapps/issues/new',
    kind: 'link',
    external: true
  }
] as const

const paymentSlots = [
  {
    id: 'discovery',
    eyebrow: '未来付款位',
    title: '需求梳理',
    description: '适合先对目标、页面结构和第一版范围做一次收紧，后续可放成独立付款入口。',
    cta: '后续可在这里付款'
  },
  {
    id: 'mvp',
    eyebrow: '未来付款位',
    title: 'MVP 启动',
    description: '适合已经确认要开工，只差把第一版界面、功能和交付边界敲定的项目。',
    cta: '后续可在这里付款'
  },
  {
    id: 'iteration',
    eyebrow: '未来付款位',
    title: '后续迭代',
    description: '适合第一版已经明确，后面准备继续扩页面、补流程或接入更多自动化能力。',
    cta: '后续可在这里付款'
  }
]
</script>
