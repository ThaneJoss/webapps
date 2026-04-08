<template>
  <form
    class="space-y-6 rounded-[1.55rem] bg-[linear-gradient(180deg,rgba(8,20,36,0.96),rgba(11,27,48,0.94))] p-6 text-white sm:p-8 md:p-10"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="panel-label text-white/52">Web form</p>
        <h2 class="mt-3 text-2xl font-semibold sm:text-[2rem]">填写网页表单</h2>
        <p class="mt-3 max-w-2xl text-sm leading-6 text-white/68">
          直接把项目目标、使用场景和你希望先做出的第一版写下来就可以。
        </p>
      </div>

      <div class="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/56">
        通常 1 个工作日内回复
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-2 block text-sm text-white/78">怎么称呼你</span>
        <input
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          class="w-full rounded-2xl border border-white/14 bg-white/7 px-4 py-3 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-white/34 focus:border-cyan-400/60 focus:bg-white/10"
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
          class="w-full rounded-2xl border border-white/14 bg-white/7 px-4 py-3 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-white/34 focus:border-cyan-400/60 focus:bg-white/10"
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
        class="w-full resize-y rounded-2xl border border-white/14 bg-white/7 px-4 py-3 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-white/34 focus:border-cyan-400/60 focus:bg-white/10"
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
        留言提交后，我会先按你写下的第一版目标来判断起步范围。
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
