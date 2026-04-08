<template>
  <section
    id="contact"
    class="section-wrap section-space pt-0"
  >
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-5 lg:grid-cols-3">
        <component
          :is="entry.kind === 'form' ? 'button' : 'a'"
          v-for="entry in contactEntries"
          :key="entry.id"
          :href="entry.kind !== 'form' ? entry.href : undefined"
          :target="entry.external ? '_blank' : undefined"
          :rel="entry.external ? 'noreferrer' : undefined"
          :type="entry.kind === 'form' ? 'button' : undefined"
          class="surface-card group flex min-h-[250px] flex-col justify-between border border-ink/14 p-6 shadow-[0_16px_34px_rgba(10,22,40,0.08)] transition-transform hover:-translate-y-1 hover:border-ink/24"
          @click="entry.kind === 'form' ? scrollToForm() : undefined"
        >
          <div>
            <p class="panel-label text-steel">{{ entry.eyebrow }}</p>
            <h3 class="mt-3 text-2xl font-semibold text-ink">{{ entry.title }}</h3>
            <p class="mt-4 text-base leading-7 text-steel">
              {{ entry.description }}
            </p>
          </div>

          <div class="mt-8 flex items-center justify-between">
            <span class="rounded-full border border-line/70 bg-white/82 px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
              {{ entry.meta }}
            </span>
            <span class="text-sm font-medium text-ink">
              {{ entry.cta }}
            </span>
          </div>
        </component>
      </div>
    </div>

    <div
      id="contact-form"
      class="mt-8 scroll-mt-32 sm:scroll-mt-36"
    >
      <div class="mx-auto max-w-4xl">
        <div class="surface-card border border-ink/14 p-2 shadow-[0_16px_34px_rgba(10,22,40,0.08)] sm:p-3">
          <ContactForm />
        </div>
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
    eyebrow: 'Direct email',
    title: 'Email',
    description: '适合已经有明确需求，想直接用邮件把目标、范围和时间节奏发过来。',
    meta: 'support@thanejoss.com',
    cta: '发送邮件',
    href: 'mailto:support@thanejoss.com',
    kind: 'link',
    external: false
  },
  {
    id: 'form',
    eyebrow: 'Structured form',
    title: '网页表单',
    description: '适合按页面结构填写项目背景、目标用户和第一版希望先完成的内容。',
    meta: 'Scroll to form',
    cta: '填写表单',
    href: '',
    kind: 'form',
    external: false
  },
  {
    id: 'issues',
    eyebrow: 'Public request',
    title: 'GitHub Issues',
    description: '适合公开记录需求、问题或改动建议，方便后续持续跟踪和讨论。',
    meta: 'Open in new tab',
    cta: '新建 Issue',
    href: 'https://github.com/ThaneJoss/webapps/issues/new',
    kind: 'link',
    external: true
  }
] as const

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
