<template>
  <section
    id="contact"
    class="section-wrap section-space pt-5 sm:pt-6"
    aria-label="联系方式"
  >
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="entry in contactEntries"
          :key="entry.id"
          class="contact-entry-card"
          :class="[
            isCardActive(entry.id) ? 'is-flipped contact-entry-card--active' : '',
            entry.kind === 'form' ? 'contact-entry-card--form' : ''
          ]"
          :data-contact-card="entry.id"
        >
          <div class="contact-entry-card__inner">
            <button
              :id="`contact-card-trigger-${entry.id}`"
              type="button"
              class="contact-entry-card__face contact-entry-card__face--front surface-card group flex h-full w-full flex-col items-start rounded-[2rem] border border-[#122540]/18 bg-white/88 p-4 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-cyan-500/28 hover:shadow-[0_26px_48px_rgba(10,22,40,0.12)] sm:p-5"
              :data-contact-card-front="entry.id"
              :aria-controls="`contact-card-panel-${entry.id}`"
              :aria-expanded="isCardActive(entry.id)"
              :aria-hidden="isCardActive(entry.id)"
              :tabindex="isCardActive(entry.id) ? -1 : undefined"
              @click="openCard(entry.id)"
            >
              <div class="flex w-full items-start justify-between gap-4">
                <h2 class="max-w-[10ch] text-[1.55rem] font-semibold leading-tight text-ink sm:text-[1.7rem]">
                  {{ entry.title }}
                </h2>

                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                  <component
                    :is="entry.icon"
                    class="h-4 w-4"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <p class="mt-4 max-w-[22ch] flex-1 text-[0.95rem] leading-6 text-steel">
                {{ entry.description }}
              </p>

              <span class="mt-6 inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink transition group-hover:border-cyan-500/28 group-hover:bg-cyan-400/12">
                {{ entry.frontCta }}
              </span>
            </button>

            <div
              :id="`contact-card-panel-${entry.id}`"
              class="contact-entry-card__face contact-entry-card__face--back surface-card relative flex h-full w-full flex-col rounded-[2rem] border border-[#122540]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.96))] p-4 text-left shadow-[0_20px_40px_rgba(10,22,40,0.1)] sm:p-5"
              :aria-hidden="!isCardActive(entry.id)"
              :aria-labelledby="`contact-card-trigger-${entry.id}`"
              :data-contact-card-back="entry.id"
              role="region"
              @keydown.esc="closeCard"
            >
              <template v-if="isCardActive(entry.id)">
                <button
                  type="button"
                  class="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#17304b]/14 bg-white/86 text-[#123a63] shadow-[0_8px_18px_rgba(10,22,40,0.08)] transition hover:border-cyan-500/30"
                  :aria-label="`关闭${entry.title}联系卡片`"
                  data-contact-card-close
                  @click.stop="closeCard"
                >
                  <CloseIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>

                <div
                  v-if="entry.kind === 'form'"
                  class="flex flex-1 items-center"
                >
                  <ContactForm
                    compact
                    :show-header="false"
                    submit-label="生成邮件草稿"
                    hint-text=""
                  />
                </div>

                <div
                  v-else
                  class="flex flex-1 items-center justify-center"
                >
                  <a
                    :href="entry.actionHref"
                    :target="entry.external ? '_blank' : undefined"
                    :rel="entry.external ? 'noreferrer' : undefined"
                    class="tech-button inline-flex min-w-[10rem] items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
                  >
                    {{ entry.actionLabel }}
                  </a>
                </div>
              </template>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ChatIcon from '~icons/solar/chat-round-line-bold-duotone'
import ClipboardIcon from '~icons/solar/clipboard-list-bold-duotone'
import CloseIcon from '~icons/solar/close-circle-bold-duotone'
import LetterIcon from '~icons/solar/letter-bold-duotone'

import ContactForm from '../components/ContactForm.vue'

interface ContactEntry {
  id: string
  kind: 'confirm' | 'form'
  title: string
  description: string
  frontCta: string
  icon: Component
  actionLabel: string
  actionHref: string
  external: boolean
}

const activeCardId = ref<string | null>(null)

const openCard = (id: string) => {
  activeCardId.value = id
  void nextTick(() => {
    document.querySelector<HTMLElement>(`[data-contact-card="${id}"] [data-contact-card-close]`)?.focus()
  })
}

const closeCard = async () => {
  const closingCardId = activeCardId.value
  activeCardId.value = null

  if (!closingCardId) {
    return
  }

  await nextTick()
  document.querySelector<HTMLElement>(`[data-contact-card-front="${closingCardId}"]`)?.focus()
}

const isCardActive = (id: string) => activeCardId.value === id

const handleDocumentPointerDown = (event: PointerEvent) => {
  const target = event.target

  if (!(target instanceof Element) || target.closest('[data-contact-card]')) {
    return
  }

  void closeCard()
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})

const contactEntries: readonly ContactEntry[] = [
  {
    id: 'email',
    kind: 'confirm',
    title: '邮件',
    description: '发送邮件到 support@thanejoss.com。',
    frontCta: '点击展开',
    icon: LetterIcon,
    actionLabel: '发送邮件',
    actionHref: 'mailto:support@thanejoss.com?subject=Web%20Apps%20Inquiry',
    external: false
  },
  {
    id: 'form',
    kind: 'form',
    title: '网页表单',
    description: '打开网页表单，填写联系方式与建议。',
    frontCta: '点击展开',
    icon: ClipboardIcon,
    actionLabel: '',
    actionHref: '',
    external: false
  },
  {
    id: 'issues',
    kind: 'confirm',
    title: 'GitHub 留言',
    description: '前往 GitHub 留言页，公开留下你的想法。',
    frontCta: '点击展开',
    icon: ChatIcon,
    actionLabel: '前往留言',
    actionHref: 'https://github.com/ThaneJoss/webapps/issues/new',
    external: true
  }
]
</script>
