<template>
  <section
    id="contact"
    class="section-wrap section-space pt-5 sm:pt-6"
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
              type="button"
              class="contact-entry-card__face contact-entry-card__face--front surface-card group flex h-full w-full flex-col items-start rounded-[2rem] border border-[#122540]/18 bg-white/88 p-4 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-cyan-500/28 hover:shadow-[0_26px_48px_rgba(10,22,40,0.12)] sm:p-5"
              :data-contact-card-front="entry.id"
              @click="openCard(entry.id)"
            >
              <div class="flex w-full items-start justify-between gap-4">
                <h3 class="max-w-[10ch] text-[1.55rem] font-semibold leading-tight text-ink sm:text-[1.7rem]">
                  {{ entry.title }}
                </h3>

                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] border border-[#17304b]/14 bg-[#eff7ff] text-[#123a63] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                  <Icon
                    :icon="entry.icon"
                    class="h-4 w-4"
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
              class="contact-entry-card__face contact-entry-card__face--back surface-card flex h-full w-full flex-col rounded-[2rem] border border-[#122540]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.96))] p-4 text-left shadow-[0_20px_40px_rgba(10,22,40,0.1)] sm:p-5"
              :data-contact-card-back="entry.id"
            >
              <template v-if="entry.kind === 'form'">
                <div class="flex flex-1 items-center">
                  <ContactForm
                    compact
                    :show-header="false"
                    submit-label="提交建议"
                    hint-text=""
                  />
                </div>
              </template>

              <template v-else>
                <div class="flex flex-1 items-center justify-center">
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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

import ContactForm from '../components/ContactForm.vue'

const activeCardId = ref<string | null>(null)

const openCard = (id: string) => {
  activeCardId.value = id
}

const closeCard = () => {
  activeCardId.value = null
}

const isCardActive = (id: string) => activeCardId.value === id

const handleDocumentPointerDown = (event: PointerEvent) => {
  const target = event.target

  if (!(target instanceof Element)) {
    return
  }

  if (target.closest('[data-contact-card]')) {
    return
  }

  closeCard()
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})

const contactEntries = [
  {
    id: 'email',
    kind: 'confirm',
    title: '邮件',
    description: '发送邮件到 support@thanejoss.com。',
    frontCta: '点击展开',
    icon: 'solar:letter-bold-duotone',
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
    icon: 'solar:clipboard-list-bold-duotone',
    actionLabel: '',
    actionHref: '',
    external: false
  },
  {
    id: 'issues',
    kind: 'confirm',
    title: 'Github 留言',
    description: '前往 GitHub 留言页，公开留下你的想法。',
    frontCta: '点击展开',
    icon: 'solar:chat-round-line-line-duotone',
    actionLabel: '前往留言',
    actionHref: 'https://github.com/ThaneJoss/webapps/issues/new',
    external: true
  }
] as const

</script>
