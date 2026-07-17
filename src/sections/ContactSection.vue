<template>
  <section
    id="contact"
    ref="contactSection"
    class="section-wrap section-space pt-5 sm:pt-6"
    aria-label="联系方式"
  >
    <div class="mx-auto max-w-6xl">
      <div class="contact-entry-grid grid items-start gap-5 lg:grid-cols-3">
        <template
          v-for="entry in contactEntries"
          :key="entry.id"
        >
          <a
            v-if="entry.kind === 'action'"
            :href="entry.actionHref"
            :target="entry.external ? '_blank' : undefined"
            :rel="entry.external ? 'noopener noreferrer' : undefined"
            class="contact-entry-card contact-entry-card--action surface-card group flex flex-col items-start rounded-[2rem] border border-[#122540]/18 bg-white/88 p-4 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)] sm:p-5"
            :data-contact-card="entry.id"
            data-contact-action
          >
            <div class="flex w-full items-start justify-between gap-4">
              <h2 class="max-w-[10ch] text-[1.55rem] font-semibold leading-tight text-ink sm:text-[1.7rem]">
                {{ entry.title }}
              </h2>

              <div class="contact-entry-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
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

            <span class="contact-entry-card__cta mt-6 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-ink">
              {{ entry.actionLabel }}
            </span>
          </a>

          <article
            v-else
            class="contact-entry-card contact-entry-card--form surface-card overflow-hidden rounded-[2rem] border border-[#122540]/18 bg-white/88 shadow-[0_20px_40px_rgba(10,22,40,0.08)]"
            :class="isFormOpen ? 'is-expanded' : ''"
            :data-contact-card="entry.id"
            data-contact-form-card
            @keydown.esc.stop="closeForm()"
          >
            <button
              id="contact-form-trigger"
              type="button"
              class="contact-form-card__trigger group flex min-h-[236px] w-full flex-col items-start p-4 text-left sm:p-5"
              aria-controls="contact-form-panel"
              :aria-expanded="isFormOpen"
              data-contact-form-trigger
              @click="toggleForm"
            >
              <div class="flex w-full items-start justify-between gap-4">
                <h2 class="max-w-[10ch] text-[1.55rem] font-semibold leading-tight text-ink sm:text-[1.7rem]">
                  {{ entry.title }}
                </h2>

                <div class="contact-entry-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
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

              <span class="contact-entry-card__cta mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium text-ink">
                {{ isFormOpen ? '收起表单' : entry.frontCta }}
                <span
                  class="contact-form-card__indicator"
                  aria-hidden="true"
                >↓</span>
              </span>
            </button>

            <div
              id="contact-form-panel"
              class="contact-form-card__panel"
              :class="isFormOpen ? 'is-open' : ''"
              :aria-hidden="!isFormOpen"
              :inert="!isFormOpen"
              aria-labelledby="contact-form-trigger"
              data-contact-form-panel
              role="region"
            >
              <div class="contact-form-card__panel-clip">
                <div class="contact-form-card__panel-body border-t border-[#17304b]/12 p-4 sm:p-5">
                  <p class="mb-4 text-sm leading-6 text-steel">
                    内容只会用于生成本地邮件草稿，关闭面板后也会继续保留。
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ChatIcon from '~icons/solar/chat-round-line-bold-duotone'
import ClipboardIcon from '~icons/solar/clipboard-list-bold-duotone'
import LetterIcon from '~icons/solar/letter-bold-duotone'

import ContactForm from '../components/ContactForm.vue'

interface ContactEntryBase {
  id: string
  title: string
  description: string
  icon: Component
}

type ContactEntry = ContactEntryBase & (
  | {
      kind: 'form'
      frontCta: string
    }
  | {
      kind: 'action'
      actionLabel: string
      actionHref: string
      external: boolean
    }
)

const isFormOpen = ref(false)
const contactSection = ref<HTMLElement | null>(null)

const getFormTrigger = () => contactSection.value?.querySelector<HTMLButtonElement>('[data-contact-form-trigger]')
const getFormPanel = () => contactSection.value?.querySelector<HTMLElement>('[data-contact-form-panel]')

const closeForm = async (restoreFocus = true) => {
  if (!isFormOpen.value) {
    return
  }

  isFormOpen.value = false
  await nextTick()

  if (restoreFocus) {
    getFormTrigger()?.focus()
  }
}

const toggleForm = async () => {
  if (isFormOpen.value) {
    await closeForm()
    return
  }

  isFormOpen.value = true
  await nextTick()
  getFormPanel()?.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
}

const handleDocumentPointerDown = (event: PointerEvent) => {
  const target = event.target

  if (!isFormOpen.value || !(target instanceof Element) || target.closest('[data-contact-form-card]')) {
    return
  }

  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement && getFormPanel()?.contains(activeElement)) {
    activeElement.blur()
  }

  isFormOpen.value = false
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
    kind: 'action',
    title: '邮件',
    description: '发送邮件到 support@thanejoss.com。',
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
    icon: ClipboardIcon
  },
  {
    id: 'issues',
    kind: 'action',
    title: 'GitHub 留言',
    description: '前往 GitHub 留言页，公开留下你的想法。',
    icon: ChatIcon,
    actionLabel: '前往留言',
    actionHref: 'https://github.com/ThaneJoss/webapps/issues/new',
    external: true
  }
]
</script>
