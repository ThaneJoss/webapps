<template>
  <form
    class="text-ink"
    :class="compact
      ? 'space-y-3'
      : 'space-y-6 rounded-[1.55rem] border border-[#12304c]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,249,255,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:p-8 md:p-10'"
    @submit.prevent="handleSubmit"
  >
    <div
      v-if="showHeader"
      class="border-b border-[#12304c]/10 pb-5 text-left"
    >
      <div>
        <p class="panel-label text-steel">网页表单</p>
        <h2 class="mt-3 text-2xl font-semibold sm:text-[2rem]">{{ title }}</h2>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-steel">
          {{ description }}
        </p>
      </div>
    </div>

    <div :class="compact ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2'">
      <label class="block">
        <span class="mb-2 block text-sm text-steel">怎么称呼你</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          :class="compact
            ? 'w-full rounded-[1.1rem] border border-[#12304c]/12 bg-white px-3.5 py-2.5 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'
            : 'w-full rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'"
          placeholder="例如：Joss"
        />
      </label>

      <label class="block">
        <span class="mb-2 block text-sm text-steel">联系邮箱</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          :class="compact
            ? 'w-full rounded-[1.1rem] border border-[#12304c]/12 bg-white px-3.5 py-2.5 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'
            : 'w-full rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'"
          placeholder="you@example.com"
        />
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm text-steel">填写你的建议</span>
      <textarea
        v-model="form.message"
        name="message"
        :rows="compact ? 3 : 5"
        :class="compact
          ? 'w-full resize-y rounded-[1.1rem] border border-[#12304c]/12 bg-white px-3.5 py-2.5 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'
          : 'w-full resize-y rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]'"
        placeholder="比如你想做什么、遇到了什么问题，或者希望我先给你什么建议。"
      ></textarea>
    </label>

    <div :class="compact ? 'space-y-3' : 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'">
      <button
        type="submit"
        class="tech-button tech-button--light inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
        :class="compact ? 'w-full' : ''"
        :disabled="submitting"
      >
        {{ submitting ? '提交中...' : submitLabel }}
      </button>

      <p
        v-if="hintText"
        class="text-sm text-steel"
      >
        {{ hintText }}
      </p>
    </div>

    <div
      v-if="feedback"
      class="rounded-2xl border px-4 py-3 text-sm"
      :class="feedback.type === 'success'
        ? 'border-mint/30 bg-mint/10 text-mint'
        : 'border-ember/30 bg-ember/10 text-ember'"
    >
      <p>{{ feedback.message }}</p>
      <a
        v-if="mailtoHref"
        :href="mailtoHref"
        class="mt-3 inline-flex rounded-full border border-current/25 px-3 py-1.5 font-medium"
      >
        打开邮件草稿
      </a>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const {
  compact = false,
  showHeader = true,
  title = '填写你的建议',
  description = '把你想做的页面、想优化的问题，或者希望我先给出的建议写下来就可以。',
  submitLabel = '生成邮件草稿',
  hintText = '生成邮件草稿后，请在邮件客户端里确认并发送。'
} = defineProps<{
  compact?: boolean
  showHeader?: boolean
  title?: string
  description?: string
  submitLabel?: string
  hintText?: string
}>()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)
const mailtoHref = ref<string | null>(null)

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
}

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)

const buildMailtoHref = (payload: typeof form) => {
  const subject = encodeURIComponent('Web Apps Inquiry')
  const body = encodeURIComponent([
    `姓名：${payload.name}`,
    `邮箱：${payload.email}`,
    '',
    payload.message
  ].join('\n'))

  return `mailto:support@thanejoss.com?subject=${subject}&body=${body}`
}

const handleSubmit = async () => {
  feedback.value = null
  mailtoHref.value = null
  submitting.value = true

  try {
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    }

    if (!payload.name || !payload.email || !payload.message || !isValidEmail(payload.email)) {
      feedback.value = {
        type: 'error',
        message: '请检查邮箱格式，并确认姓名、邮箱和项目需求都已经填写完整。'
      }
      return
    }

    mailtoHref.value = buildMailtoHref(payload)
    feedback.value = {
      type: 'success',
      message: '已生成邮件草稿，请在邮件客户端里确认并发送。'
    }
    resetForm()
  } finally {
    submitting.value = false
  }
}
</script>
