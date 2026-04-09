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
          :class="[isCardActive(entry.id) ? 'is-flipped' : '', entry.kind === 'form' ? 'contact-entry-card--form' : '']"
          :data-contact-card="entry.id"
        >
          <div class="contact-entry-card__inner">
            <button
              type="button"
              class="contact-entry-card__face surface-card group flex min-h-[290px] w-full flex-col items-start justify-between rounded-[2rem] border border-[#122540]/18 bg-white/88 p-6 text-left shadow-[0_20px_40px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1.5 hover:border-cyan-500/28 hover:shadow-[0_26px_48px_rgba(10,22,40,0.12)] sm:p-7"
              :data-contact-card-front="entry.id"
              @click="openCard(entry.id)"
            >
              <div class="w-full">
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
                <p class="mt-4 max-w-[26ch] text-base leading-7 text-steel">
                  {{ entry.description }}
                </p>
              </div>

              <div class="mt-8 flex w-full items-center justify-between gap-4">
                <span class="rounded-full border border-[#17304b]/14 bg-[#0f2036]/[0.03] px-3 py-1 text-xs uppercase tracking-[0.14em] text-steel">
                  {{ entry.meta }}
                </span>
                <span class="inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink transition group-hover:border-cyan-500/28 group-hover:bg-cyan-400/12">
                  {{ entry.frontCta }}
                </span>
              </div>
            </button>

            <div
              class="contact-entry-card__face contact-entry-card__face--back surface-card flex min-h-[290px] w-full flex-col rounded-[2rem] border border-[#122540]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,249,255,0.92))] p-6 text-left shadow-[0_20px_40px_rgba(10,22,40,0.1)] sm:p-7"
              :data-contact-card-back="entry.id"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="panel-label text-steel">{{ entry.backEyebrow }}</p>
                  <h3 class="mt-3 text-2xl font-semibold text-ink">{{ entry.backTitle }}</h3>
                </div>

                <button
                  type="button"
                  class="rounded-full border border-[#17304b]/14 bg-white/86 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-steel transition hover:border-cyan-500/28 hover:text-ink"
                  @click.stop="closeCard"
                >
                  返回
                </button>
              </div>

              <template v-if="entry.kind === 'form'">
                <p class="mt-4 max-w-[34ch] text-sm leading-7 text-steel">
                  直接留下你的联系方式和建议，提交后我会根据内容尽快回复。
                </p>

                <div class="mt-6 flex-1 rounded-[1.6rem] border border-[#12304c]/10 bg-white/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                  <ContactForm
                    compact
                    :show-header="false"
                    submit-label="提交建议"
                    hint-text="提交后会直接返回回执。"
                  />
                </div>
              </template>

              <template v-else>
                <p class="mt-4 max-w-[34ch] text-base leading-7 text-steel">
                  {{ entry.backDescription }}
                </p>

                <div class="mt-6 w-full rounded-[1.5rem] border border-dashed border-[#17304b]/18 bg-[#0f2036]/[0.03] px-4 py-4 text-sm leading-7 text-steel">
                  {{ entry.confirmationNote }}
                </div>

                <div class="mt-8 flex w-full flex-1 items-end">
                  <a
                    :href="entry.actionHref"
                    :target="entry.external ? '_blank' : undefined"
                    :rel="entry.external ? 'noreferrer' : undefined"
                    class="tech-button inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
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

    <div class="mt-10 grid gap-5 xl:grid-cols-3">
      <article
        v-for="slot in paymentSlots"
        :key="slot.id"
        class="surface-card flex h-full flex-col items-start rounded-[2rem] border border-[#122540]/16 bg-white/86 p-6 text-left shadow-[0_18px_38px_rgba(10,22,40,0.08)] transition duration-200 hover:-translate-y-1 hover:border-cyan-500/24 sm:p-7"
      >
        <div class="w-full">
          <p class="panel-label text-steel">{{ slot.eyebrow }}</p>
          <h3 class="mt-3 text-2xl font-semibold text-ink">{{ slot.title }}</h3>
          <p class="mt-4 text-base leading-7 text-steel">
            {{ slot.description }}
          </p>
        </div>

        <div class="mt-8 flex w-full flex-1 flex-col justify-end gap-4">
          <div class="flex min-h-[132px] flex-1 items-center rounded-2xl border border-dashed border-[#17304b]/18 bg-[#0f2036]/[0.03] px-4 py-4 text-sm leading-7 text-steel">
            {{ slot.note }}
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
import { ref } from 'vue'
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

const contactEntries = [
  {
    id: 'email',
    kind: 'confirm',
    eyebrow: '直接邮件',
    title: '邮件',
    description: '适合已经有明确需求，想直接用邮件把目标、范围和时间节奏发过来。',
    meta: 'support@thanejoss.com',
    frontCta: '点击确认',
    icon: 'solar:letter-bold-duotone',
    backEyebrow: '二次确认',
    backTitle: '确认后发送邮件',
    backDescription: '第二次点击后会直接打开默认邮件客户端，你可以继续补充详细需求。',
    confirmationNote: '背面就是实际动作入口，用翻转承接确认，不会误触直接跳走。',
    actionLabel: '发送邮件',
    actionHref: 'mailto:support@thanejoss.com?subject=Web%20Apps%20Inquiry',
    external: false
  },
  {
    id: 'form',
    kind: 'form',
    eyebrow: '结构化表单',
    title: '网页表单',
    description: '适合直接填写你的建议、需求方向，以及希望我先帮你判断的地方。',
    meta: '翻转后填写',
    frontCta: '打开表单',
    icon: 'solar:clipboard-list-bold-duotone',
    backEyebrow: '直接填写',
    backTitle: '填写联系方式与建议',
    backDescription: '',
    confirmationNote: '',
    actionLabel: '',
    actionHref: '',
    external: false
  },
  {
    id: 'issues',
    kind: 'confirm',
    eyebrow: '公开留言',
    title: '留言页',
    description: '适合公开记录你的想法、问题或补充说明，方便后续继续跟进。',
    meta: '会打开新页面',
    frontCta: '点击确认',
    icon: 'solar:chat-round-line-line-duotone',
    backEyebrow: '二次确认',
    backTitle: '确认后前往留言页',
    backDescription: '第二次点击后会打开 GitHub 新建 issue 页面，适合公开留下想法和补充说明。',
    confirmationNote: '翻到背面后再执行真正动作，避免误触直接跳到外部页面。',
    actionLabel: '前往留言',
    actionHref: 'https://github.com/ThaneJoss/webapps/issues/new',
    external: true
  }
] as const

const paymentSlots = [
  {
    id: 'reward-ad',
    eyebrow: '激励广告',
    title: '激励广告位',
    description: '后续这里会放置激励广告或合作展示内容，当前先保留展示位。',
    note: '当前按钮暂不可用，后续开放。',
    cta: '暂不可用'
  },
  {
    id: 'wechat-alipay',
    eyebrow: '微信 / 支付宝',
    title: '赞赏与支付',
    description: '后续这里会接入微信和支付宝入口，用于赞赏、定金或小额支付。',
    note: '当前按钮暂不可用，后续开放。',
    cta: '暂不可用'
  },
  {
    id: 'web-ad',
    eyebrow: '网页广告',
    title: '网页广告位',
    description: '后续这里会做成点击按钮后展示的网页广告位，当前先保留展示位。',
    note: '当前按钮暂不可用，后续开放。',
    cta: '暂不可用'
  }
]
</script>
