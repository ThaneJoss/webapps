<template>
  <form
    class="surface-dark panel-glow space-y-5 p-6 sm:p-8"
    @submit.prevent="handleSubmit"
  >
    <div>
      <p class="panel-label text-white/55">Project inquiry</p>
      <h3 class="mt-3 text-2xl font-semibold">告诉我你想做什么，我来帮你收紧第一版范围</h3>
      <p class="mt-3 max-w-lg text-sm leading-6 text-white/70">
        不需要把方案写得很技术化。直接说你的目标、使用场景、上线节奏，或者你现在最需要先解决的地方就可以。
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-2 block text-sm text-white/78">怎么称呼你</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          class="w-full rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white shadow-inner shadow-black/6 outline-none transition placeholder:text-white/34 focus:border-neon/60 focus:bg-white/12"
          placeholder="例如：Joss"
        />
      </label>

      <label class="block">
        <span class="mb-2 block text-sm text-white/78">联系邮箱</span>
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
      <span class="mb-2 block text-sm text-white/78">你想做什么</span>
      <textarea
        v-model="form.message"
        name="message"
        rows="5"
        class="w-full resize-y rounded-2xl border border-white/16 bg-white/8 px-4 py-3 text-white shadow-inner shadow-black/6 outline-none transition placeholder:text-white/34 focus:border-neon/60 focus:bg-white/12"
        placeholder="描述一下你的项目目标、面向谁、希望先做出什么版本，或者你现在最需要我先解决哪一块。"
      ></textarea>
    </label>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="submit"
        class="tech-button tech-button--light inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
        :disabled="submitting"
      >
        {{ submitting ? '发送中...' : '发送项目需求' }}
      </button>

      <p class="text-sm text-white/55">
        留言提交后，我会根据你的目标判断更适合从哪一版开始。
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

const toUserFacingError = (error: unknown) => {
  if (!(error instanceof ApiRequestError)) {
    return '提交失败了，请稍后再试。'
  }

  if (error.code === 'VALIDATION_ERROR') {
    return '请检查邮箱格式，并确认姓名、邮箱和项目需求都已经填写完整。'
  }

  if (error.code === 'INVALID_JSON' || error.code === 'INVALID_RESPONSE') {
    return '提交没有成功送达，请稍后重试。'
  }

  return '提交失败了，请稍后再试。'
}

const handleSubmit = async () => {
  feedback.value = null
  submitting.value = true

  try {
    const receipt = await submitContact({ ...form })
    feedback.value = {
      type: 'success',
      message: `已收到你的项目需求，我会尽快查看。参考编号：${receipt.submissionId.slice(0, 8)}`
    }
    resetForm()
  } catch (error) {
    feedback.value = {
      type: 'error',
      message: toUserFacingError(error)
    }
  } finally {
    submitting.value = false
  }
}
</script>
