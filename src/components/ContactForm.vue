<template>
  <form
    class="space-y-3 text-ink"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-3 sm:grid-cols-2">
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
          :class="controlClass"
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
          :class="controlClass"
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
        rows="3"
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="errors.message ? fieldIds.messageError : undefined"
        :class="[controlClass, 'resize-y']"
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

    <div class="space-y-3">
      <button
        type="submit"
        class="tech-button tech-button--light inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
      >
        生成邮件草稿
      </button>
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

const formId = useId()
const fieldIds = {
  nameError: `${formId}-name-error`,
  emailError: `${formId}-email-error`,
  messageError: `${formId}-message-error`
}

const controlClass = 'w-full rounded-[1.1rem] border border-[#12304c]/18 bg-white px-3.5 py-2.5 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] transition placeholder:text-steel/60 focus:border-[#006b8f] focus:bg-[#fbfdff]'

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
    return
  }

  mailtoHref.value = buildMailtoHref(payload)
  feedback.value = {
    type: 'success',
    message: '已生成邮件草稿，请在邮件客户端里确认并发送。'
  }
  resetForm()
}
</script>
