<template>
  <section class="section-wrap py-5 sm:py-8">
    <div class="mx-auto max-w-6xl">
      <div class="surface-card overflow-hidden rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <p class="panel-label text-steel">口袋写作</p>
            <h1 class="mt-4 text-[2.4rem] font-semibold leading-[0.94] tracking-[-0.05em] text-ink sm:text-[3.3rem]">
              Markdown 写作工作台
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-8 text-steel sm:text-lg">
              这里会自动保存你的草稿，左侧编辑、右侧预览，支持专注模式、统计、导出 HTML 或 Markdown。
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              class="tech-button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
              @click="toggleFocusMode"
            >
              {{ focusMode ? '退出专注模式' : '进入专注模式' }}
            </button>
            <button
              type="button"
              class="tech-button tech-button--light inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
              @click="downloadMarkdownDraft"
            >
              导出 Markdown
            </button>
            <button
              type="button"
              class="tech-button tech-button--ghost inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
              @click="downloadHtmlDraft"
            >
              导出 HTML
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in statsCards"
            :key="item.label"
            class="surface-card rounded-[1.4rem] border border-[#122540]/14 bg-white/78 px-4 py-4"
          >
            <p class="panel-label text-steel">{{ item.label }}</p>
            <div class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink">
              {{ item.value }}
            </div>
            <p class="mt-2 text-sm leading-6 text-steel">
              {{ item.helper }}
            </p>
          </article>
        </div>
      </div>

      <div class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
        <article class="surface-card rounded-[2rem] border border-[#122540]/16 bg-white/88 p-5 shadow-[0_18px_38px_rgba(10,22,40,0.08)] sm:p-6">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="panel-label text-steel">编辑器</p>
              <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ink">
                打开就能写
              </h2>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink">
                {{ saveLabel }}
              </span>
              <span class="inline-flex items-center rounded-full border border-[#122540]/12 bg-white/70 px-3 py-1 text-sm font-medium text-ink">
                {{ updatedHint }}
              </span>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
            <button
              v-for="preset in writingPresets"
              :key="preset.id"
              type="button"
              class="inline-flex items-center rounded-full border border-[#17304b]/14 bg-[#0f2036]/[0.03] px-3 py-2 text-sm font-medium text-ink transition duration-200 hover:border-cyan-500/28 hover:bg-cyan-400/10"
              @click="applyPreset(preset.id)"
            >
              {{ preset.name }}
            </button>
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-[#17304b]/14 bg-white/72 px-3 py-2 text-sm font-medium text-ink transition duration-200 hover:border-cyan-500/28"
              @click="resetDraft"
            >
              清空草稿
            </button>
          </div>

          <div class="mt-6 grid gap-4">
            <label class="grid gap-2">
              <span class="text-sm font-medium text-steel">标题</span>
              <input
                v-model="title"
                class="w-full rounded-[1.15rem] border border-[#122540]/14 bg-white/88 px-4 py-3 text-[#0a1628] outline-none transition duration-200 placeholder:text-[#5f7790] focus:border-cyan-500/38 focus:shadow-[0_0_0_4px_rgba(82,215,255,0.12)]"
                type="text"
                placeholder="输入文档标题"
              >
            </label>

            <label class="grid gap-2">
              <span class="text-sm font-medium text-steel">正文</span>
              <textarea
                v-model="content"
                class="min-h-[26rem] w-full rounded-[1.15rem] border border-[#122540]/14 bg-white/88 px-4 py-4 font-[inherit] leading-7 text-[#0a1628] outline-none transition duration-200 placeholder:text-[#5f7790] focus:border-cyan-500/38 focus:shadow-[0_0_0_4px_rgba(82,215,255,0.12)]"
                placeholder="写下你的 Markdown 内容"
                spellcheck="false"
              />
            </label>
          </div>
        </article>

        <aside
          v-if="!focusMode"
          class="surface-card rounded-[2rem] border border-[#122540]/16 bg-white/86 p-5 shadow-[0_18px_38px_rgba(10,22,40,0.08)] sm:p-6"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="panel-label text-steel">实时预览</p>
              <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ink">
                排版结果
              </h2>
            </div>
            <span class="inline-flex items-center rounded-full border border-cyan-500/18 bg-cyan-400/8 px-3 py-1 text-sm font-medium text-ink">
              Live
            </span>
          </div>

          <div
            class="writing-preview mt-5 rounded-[1.5rem] border border-[#122540]/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,255,0.92))] p-5"
            v-html="renderedContent"
          />

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <article class="rounded-[1.2rem] border border-[#122540]/12 bg-white/70 px-4 py-3">
              <p class="panel-label text-steel">模板</p>
              <div class="mt-2 text-base font-semibold text-ink">
                {{ activePresetName }}
              </div>
            </article>
            <article class="rounded-[1.2rem] border border-[#122540]/12 bg-white/70 px-4 py-3">
              <p class="panel-label text-steel">当前长度</p>
              <div class="mt-2 text-base font-semibold text-ink">
                {{ stats.characterCount }} 字符
              </div>
            </article>
          </div>
        </aside>

        <aside
          v-else
          class="surface-card rounded-[2rem] border border-[#122540]/16 bg-white/86 p-5 shadow-[0_18px_38px_rgba(10,22,40,0.08)] sm:p-6"
        >
          <p class="panel-label text-steel">专注模式</p>
          <h2 class="mt-3 text-2xl font-semibold tracking-[-0.04em] text-ink">
            预览已收起，专注在编辑区
          </h2>
          <p class="mt-4 text-base leading-8 text-steel">
            继续写作时可以保留自动保存、统计和导出功能，等写完再切回预览检查排版。
          </p>

          <div class="mt-5 grid gap-3">
            <article class="rounded-[1.2rem] border border-[#122540]/12 bg-white/72 px-4 py-4">
              <p class="panel-label text-steel">当前模板</p>
              <div class="mt-2 text-base font-semibold text-ink">
                {{ activePresetName }}
              </div>
            </article>
            <article class="rounded-[1.2rem] border border-[#122540]/12 bg-white/72 px-4 py-4">
              <p class="panel-label text-steel">保存状态</p>
              <div class="mt-2 text-base font-semibold text-ink">
                {{ saveLabel }}
              </div>
            </article>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  buildHtmlFilename,
  buildMarkdownFilename,
  buildMarkdownHtmlDocument,
  calculateWritingStats,
  createDefaultWorkspace,
  downloadText,
  loadWorkspaceState,
  persistWorkspaceState,
  renderMarkdown,
  writingPresets,
  writingStorageKey
} from '../../lib/apps/writingWorkspace.js'

const workspace = loadWorkspaceState(writingStorageKey)

const title = ref(workspace.title)
const content = ref(workspace.content)
const focusMode = ref(workspace.focusMode)
const updatedAt = ref<string | null>(workspace.updatedAt)
const activePresetId = ref(writingPresets[0].id)
const saveState = ref<'saved' | 'saving' | 'loaded'>('loaded')
const saveMessage = ref('已加载本地草稿')

let saveTimer: number | undefined

const stats = computed(() => calculateWritingStats(content.value))
const renderedContent = computed(() => renderMarkdown(content.value))

const statsCards = computed(() => [
  {
    label: '词数',
    value: stats.value.wordCount.toLocaleString('zh-CN'),
    helper: '基于当前文本的分词估算'
  },
  {
    label: '字符',
    value: stats.value.characterCount.toLocaleString('zh-CN'),
    helper: '去除空白后的有效字符数'
  },
  {
    label: '段落',
    value: stats.value.paragraphCount.toLocaleString('zh-CN'),
    helper: '按空行分隔的内容块'
  },
  {
    label: '预计阅读',
    value: `${stats.value.estimatedReadMinutes} 分钟`,
    helper: '用于快速判断草稿长度'
  }
])

const activePresetName = computed(() => {
  return writingPresets.find((preset) => preset.id === activePresetId.value)?.name ?? '自定义草稿'
})

const saveLabel = computed(() => {
  if (saveState.value === 'saving') {
    return '正在保存'
  }

  if (saveState.value === 'saved' && updatedAt.value) {
    return '已自动保存'
  }

  return saveMessage.value
})

const updatedHint = computed(() => {
  if (!updatedAt.value) {
    return '尚未保存'
  }

  return `更新于 ${new Date(updatedAt.value).toLocaleString('zh-CN', {
    hour12: false
  })}`
})

function scheduleSave() {
  saveState.value = 'saving'

  if (saveTimer) {
    window.clearTimeout(saveTimer)
  }

  saveTimer = window.setTimeout(() => {
    const nextState = {
      title: title.value,
      content: content.value,
      focusMode: focusMode.value,
      updatedAt: new Date().toISOString()
    }

    persistWorkspaceState(writingStorageKey, nextState)
    updatedAt.value = nextState.updatedAt
    saveState.value = 'saved'
    saveMessage.value = '已自动保存到本地'
  }, 260)
}

function applyPreset(id: string) {
  const preset = writingPresets.find((item) => item.id === id)

  if (!preset) {
    return
  }

  activePresetId.value = preset.id
  title.value = preset.title
  content.value = preset.content
  saveMessage.value = `已载入「${preset.name}」模板`
  scheduleSave()
}

function resetDraft() {
  const fallback = createDefaultWorkspace()

  title.value = fallback.title
  content.value = fallback.content
  focusMode.value = false
  activePresetId.value = writingPresets[0].id
  saveMessage.value = '已清空草稿'
  scheduleSave()
}

function toggleFocusMode() {
  focusMode.value = !focusMode.value
  saveMessage.value = focusMode.value ? '已进入专注模式' : '已退出专注模式'
  scheduleSave()
}

function downloadMarkdownDraft() {
  downloadText(buildMarkdownFilename(title.value), content.value)
}

function downloadHtmlDraft() {
  const html = buildMarkdownHtmlDocument(title.value, renderedContent.value)
  downloadText(buildHtmlFilename(title.value), html, 'text/html;charset=utf-8')
}

watch([title, content, focusMode], scheduleSave, { deep: false })

onMounted(() => {
  saveMessage.value = workspace.updatedAt ? '已恢复上次草稿' : '开始一篇新的草稿'
})

onBeforeUnmount(() => {
  if (saveTimer) {
    window.clearTimeout(saveTimer)
  }
})
</script>

<style scoped>
.writing-preview :deep(h1),
.writing-preview :deep(h2),
.writing-preview :deep(h3),
.writing-preview :deep(h4),
.writing-preview :deep(h5),
.writing-preview :deep(h6) {
  margin: 1.25em 0 0.55em;
  line-height: 1.2;
  color: #08203a;
  letter-spacing: -0.03em;
}

.writing-preview :deep(h1) {
  font-size: 2rem;
}

.writing-preview :deep(h2) {
  font-size: 1.55rem;
}

.writing-preview :deep(h3) {
  font-size: 1.25rem;
}

.writing-preview :deep(p),
.writing-preview :deep(li) {
  margin: 0 0 0.9rem;
  font-size: 1rem;
  line-height: 1.8;
  color: #27415d;
}

.writing-preview :deep(ul),
.writing-preview :deep(ol) {
  padding-left: 1.4rem;
}

.writing-preview :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.9rem 1rem;
  border-left: 4px solid rgba(82, 215, 255, 0.55);
  border-radius: 0 1rem 1rem 0;
  background: rgba(82, 215, 255, 0.08);
  color: #35506e;
}

.writing-preview :deep(pre) {
  overflow: auto;
  margin: 1rem 0;
  padding: 1rem 1.1rem;
  border-radius: 1rem;
  background: #eef4ff;
  color: #0a1628;
}

.writing-preview :deep(code) {
  padding: 0.15rem 0.35rem;
  border-radius: 0.45rem;
  background: rgba(15, 32, 54, 0.08);
  font-size: 0.92em;
}

.writing-preview :deep(pre code) {
  padding: 0;
  background: transparent;
}

.writing-preview :deep(a) {
  color: #0f5e8d;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
</style>
