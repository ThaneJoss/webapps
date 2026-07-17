<template>
  <section
    id="contact"
    class="contact-section section-wrap"
    aria-labelledby="contact-channels-title"
  >
    <div class="mx-auto max-w-6xl">
      <div class="contact-workspace">
        <aside class="contact-channels">
          <header class="contact-channels__header">
            <p class="contact-step">01 / 选择渠道</p>
            <h2 id="contact-channels-title">
              直接联系
            </h2>
            <p>
              简短问题可以直接发出；需要补充上下文时，右侧的项目简报会更合适。
            </p>
          </header>

          <div class="contact-channel-list">
            <a
              v-for="channel in contactChannels"
              :key="channel.id"
              :href="channel.href"
              :target="channel.external ? '_blank' : undefined"
              :rel="channel.external ? 'noopener noreferrer' : undefined"
              class="contact-channel"
              :data-contact-card="channel.id"
              data-contact-action
            >
              <span class="contact-channel__icon">
                <component
                  :is="channel.icon"
                  aria-hidden="true"
                />
              </span>

              <span class="contact-channel__body">
                <small>{{ channel.kicker }}</small>
                <strong>{{ channel.title }}</strong>
                <span>{{ channel.description }}</span>
                <em>{{ channel.meta }}</em>
              </span>

              <span
                class="contact-channel__arrow"
                aria-hidden="true"
              >↗</span>
            </a>
          </div>

          <div class="contact-context-note">
            <span aria-hidden="true"></span>
            <p>
              公开问题适合 GitHub；包含个人信息或附件时，请使用邮件或项目简报。
            </p>
          </div>
        </aside>

        <section
          class="contact-brief"
          data-contact-card="form"
          aria-labelledby="contact-brief-title"
        >
          <header class="contact-brief__header">
            <div>
              <p class="contact-step">02 / 描述需求</p>
              <h2 id="contact-brief-title">
                项目简报
              </h2>
            </div>

            <span class="contact-brief__badge">
              <ClipboardIcon aria-hidden="true" />
              本地生成
            </span>
          </header>

          <p class="contact-brief__intro">
            写下必要背景和你期待的结果。内容只在浏览器中用于生成邮件草稿，不会自动上传。
          </p>

          <div
            class="contact-brief__form"
            data-contact-form-panel
          >
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import ChatIcon from '~icons/solar/chat-round-line-bold-duotone'
import ClipboardIcon from '~icons/solar/clipboard-list-bold-duotone'
import LetterIcon from '~icons/solar/letter-bold-duotone'

import ContactForm from '../components/ContactForm.vue'

interface ContactChannel {
  id: 'email' | 'issues'
  kicker: string
  title: string
  description: string
  meta: string
  href: string
  external: boolean
  icon: Component
}

const contactChannels: readonly ContactChannel[] = [
  {
    id: 'email',
    kicker: 'PRIVATE / EMAIL',
    title: '发送邮件',
    description: '适合附件、截图，或包含私密信息的反馈。',
    meta: 'support@thanejoss.com',
    href: 'mailto:support@thanejoss.com?subject=Web%20Apps%20Inquiry',
    external: false,
    icon: LetterIcon
  },
  {
    id: 'issues',
    kicker: 'PUBLIC / GITHUB',
    title: '公开留言',
    description: '适合功能建议、可复现问题和公开讨论。',
    meta: '新建 GitHub Issue',
    href: 'https://github.com/ThaneJoss/webapps/issues/new',
    external: true,
    icon: ChatIcon
  }
]
</script>
