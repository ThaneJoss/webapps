<template>
  <form
    class="surface-dark panel-glow space-y-5 p-6 sm:p-8"
    @submit.prevent="handleSubmit"
  >
    <div>
      <p class="panel-label text-white/55">Contact / RESTful flow</p>
      <h3 class="mt-3 text-2xl font-semibold">先把一个小而清晰的版本上线</h3>
      <p class="mt-3 max-w-lg text-sm leading-6 text-white/70">
        V1 先收需求与目标。接口是通用 JSON 提交，不绑定邮件服务，后面可以换成任何自动化链路。
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-2 block text-sm text-white/78">Name</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          class="w-full rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white shadow-inner shadow-black/6 outline-none transition placeholder:text-white/34 focus:border-neon/60 focus:bg-white/12"
          placeholder="你希望怎么称呼"
        />
      </label>

      <label class="block">
        <span class="mb-2 block text-sm text-white/78">Email</span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          class="w-full rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white shadow-inner shadow-black/6 outline-none transition placeholder:text-white/34 focus:border-neon/60 focus:bg-white/12"
          placeholder="you@example.com"
        />
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm text-white/78">What are you building?</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="5"
        class="w-full resize-y rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white shadow-inner shadow-black/6 outline-none transition placeholder:text-white/34 focus:border-neon/60 focus:bg-white/12"
        placeholder="描述一下你想做的 web app、目标用户和希望先交付什么。"
      ></textarea>
    </label>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        class="tech-button tech-button--light inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
        :disabled="submitting"
      >
        {{ submitting ? 'Submitting...' : 'POST /api/contact' }}
      </button>

      <p class="text-sm text-white/55">
        当前返回的是队列确认结构，后续可接邮件、数据库或 webhook。
      </p>
    </div>

    <p
      v-if="feedback"
      class="rounded-2xl border px-4 py-3 text-sm"
      :class="feedback.type === 'success'
        ? 'border-mint/30 bg-mint/10 text-mint'
        : 'border-ember/30 bg-ember/10 text-ember'"
    >
      {{ feedback.message }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { ApiRequestError, submitContact } from '../lib/api.js'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.message = ''
}

const handleSubmit = async () => {
  feedback.value = null
  submitting.value = true

  try {
    const receipt = await submitContact({ ...form })
    feedback.value = {
      type: 'success',
      message: `Request queued. Submission ID: ${receipt.submissionId.slice(0, 8)}`
    }
    resetForm()
  } catch (error) {
    feedback.value = {
      type: 'error',
      message:
        error instanceof ApiRequestError
          ? error.message
          : 'Request failed. Please try again after the API is available.'
    }
  } finally {
    submitting.value = false
  }
}
</script>
