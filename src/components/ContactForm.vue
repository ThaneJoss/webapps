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
          class="w-full rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]"
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
          class="w-full rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]"
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
        class="w-full resize-y rounded-2xl border border-[#12304c]/12 bg-white px-4 py-3 text-ink shadow-[0_8px_20px_rgba(10,22,40,0.04)] outline-none transition placeholder:text-steel/50 focus:border-cyan-500/38 focus:bg-[#fbfdff]"
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

const {
  compact = false,
  showHeader = true,
  title = '填写你的建议',
  description = '把你想做的页面、想优化的问题，或者希望我先给出的建议写下来就可以。',
  submitLabel = '提交',
  hintText = '留言提交后，我会先根据你写下的内容给出更合适的起步建议。'
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
