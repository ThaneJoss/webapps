<template>
  <form
    class="text-ink"
    :class="compact
      ? 'space-y-3'
      : 'space-y-6 rounded-[1.55rem] border border-[#12304c]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,249,255,0.94))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] sm:p-8 md:p-10'"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div
      v-if="showHeader"
      class="border-b border-[#12304c]/10 pb-5 text-left"
    >
      <p class="panel-label text-steel">网页表单</p>
      <h2 class="mt-3 text-2xl font-semibold sm:text-[2rem]">{{ title }}</h2>
      <p class="mt-3 max-w-2xl text-sm leading-7 text-steel">
        {{ description }}
      </p>
    </div>

    <div :class="compact ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2'">
      <label class="block">
        <span class="mb-2 block text-sm text-steel">怎么称呼你</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="errors.name ? fieldIds.nameError : undefined"
          :class="[controlClass, compact ? compactControlClass : regularControlClass]"
          placeholder="例如：Joss"
        />
        <p
          v-if="errors.name"
          :id="fieldIds.nameError"
          class="mt-1.5 text-sm font-medium text-[#8a2f1a]"
        >
          {{ errors.name }}
        </p>
      </label>

      <label class="block">
        <span class="mb-2 block text-sm text-steel">联系邮箱</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="errors.email ? fieldIds.emailError : undefined"
          :class="[controlClass, compact ? compactControlClass : regularControlClass]"
          placeholder="you@example.com"
        />
        <p
          v-if="errors.email"
          :id="fieldIds.emailError"
          class="mt-1.5 text-sm font-medium text-[#8a2f1a]"
        >
          {{ errors.email }}
        </p>
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm text-steel">填写你的建议</span>
      <textarea
        v-model="form.message"
        name="message"
        required
        :rows="compact ? 3 : 5"
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="errors.message ? fieldIds.messageError : undefined"
        :class="[controlClass, 'resize-y', compact ? compactControlClass : regularControlClass]"
        placeholder="比如你想做什么、遇到了什么问题，或者希望我先给你什么建议。"
      ></textarea>
      <p
        v-if="errors.message"
        :id="fieldIds.messageError"
        class="mt-1.5 text-sm font-medium text-[#8a2f1a]"
      >
        {{ errors.message }}
      </p>
    </label>

    <div :class="compact ? 'space-y-3' : 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'">
      <button
        type="submit"
        class="tech-button tech-button--light inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
        :class="compact ? 'w-full' : ''"
        :disabled="submitting"
      >
        {{ submitting ? '处理中...' : submitLabel }}
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
        ? 'border-[#167258]/35 bg-[#e7f7f1] text-[#0b5945]'
        : 'border-[#a54025]/35 bg-[#fff0eb] text-[#842b18]'"
      :role="feedback.type === 'error' ? 'alert' : 'status'"
      :aria-live="feedback.type === 'error' ? 'assertive' : 'polite'"
      data-form-feedback
    >
      <p>{{ feedback.message }}</p>
      <a
        v-if="mailtoHref"
        :href="mailtoHref"
        class="mt-3 inline-flex rounded-full border border-current/35 px-3 py-1.5 font-semibold"
      >
        打开邮件草稿
      </a>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, useId } from 'vue'

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

const formId = useId()
const fieldIds = {
  nameError: `${formId}-name-error`,
  emailError: `${formId}-email-error`,
  messageError: `${formId}-message-error`
}

const controlClass = 'form-control w-full border border-[#12304c]/18 bg-white text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] transition placeholder:text-steel/60 focus:border-[#006b8f] focus:bg-[#fbfdff]'
const compactControlClass = 'rounded-[1.1rem] px-3.5 py-2.5'
const regularControlClass = 'rounded-2xl px-4 py-3'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)
const mailtoHref = ref<string | null>(null)

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
  clearErrors()
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

const handleSubmit = () => {
  feedback.value = null
  mailtoHref.value = null
  submitting.value = true
  clearErrors()

  const payload = {
    name: form.name.trim(),
    email: form.email.trim(),
    message: form.message.trim()
  }

  errors.name = payload.name ? '' : '请输入你的称呼。'
  errors.email = !payload.email
    ? '请输入联系邮箱。'
    : isValidEmail(payload.email) ? '' : '请输入有效的邮箱地址。'
  errors.message = payload.message ? '' : '请填写你的建议或需求。'

  if (errors.name || errors.email || errors.message) {
    feedback.value = {
      type: 'error',
      message: '请检查邮箱格式，并确认姓名、邮箱和项目需求都已经填写完整。'
    }
    submitting.value = false
    return
  }

  mailtoHref.value = buildMailtoHref(payload)
  feedback.value = {
    type: 'success',
    message: '已生成邮件草稿，请在邮件客户端里确认并发送。'
  }
  resetForm()
  submitting.value = false
}
</script>
