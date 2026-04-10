import { marked } from 'marked'

marked.use({
  breaks: true,
  gfm: true
})

export interface WritingWorkspaceState {
  title: string
  content: string
  focusMode: boolean
  updatedAt: string | null
}

export interface WritingStats {
  wordCount: number
  characterCount: number
  paragraphCount: number
  lineCount: number
  headingCount: number
  estimatedReadMinutes: number
}

export interface WritingPreset {
  id: string
  name: string
  title: string
  content: string
}

export const writingStorageKey = 'writing-workspace:v1'

export const writingPresets: WritingPreset[] = [
  {
    id: 'article',
    name: '文章草稿',
    title: '新的文章草稿',
    content: `# 标题\n\n这里写开头。\n\n## 重点\n\n- 需要完成的第一项\n- 需要补充的第二项\n\n> 先写出来，再整理。`
  },
  {
    id: 'release',
    name: '发布说明',
    title: '版本发布说明',
    content: `# v1.0.0\n\n## 新增\n\n- 写作预览\n- 自动保存\n- 导出 HTML / Markdown\n\n## 修复\n\n- 统一排版节奏`
  },
  {
    id: 'notes',
    name: '会议记录',
    title: '会议记录',
    content: `# 会议纪要\n\n- 时间：\n- 参与者：\n- 结论：\n\n## 待办\n\n1. \n2. \n3. `
  }
]

function readWordCount(text: string) {
  const content = text.trim()

  if (!content) {
    return 0
  }

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })
    let count = 0

    for (const item of segmenter.segment(content)) {
      if (item.isWordLike) {
        count += 1
      }
    }

    return count
  }

  return content.split(/\s+/).filter(Boolean).length
}

export function createDefaultWorkspace(): WritingWorkspaceState {
  return {
    title: '新的写作草稿',
    content: writingPresets[0].content,
    focusMode: false,
    updatedAt: null
  }
}

export function normalizeWorkspaceState(value: unknown): WritingWorkspaceState {
  const fallback = createDefaultWorkspace()

  if (!value || typeof value !== 'object') {
    return fallback
  }

  const candidate = value as Partial<WritingWorkspaceState>

  return {
    title: typeof candidate.title === 'string' && candidate.title.trim()
      ? candidate.title
      : fallback.title,
    content: typeof candidate.content === 'string'
      ? candidate.content
      : fallback.content,
    focusMode: Boolean(candidate.focusMode),
    updatedAt: typeof candidate.updatedAt === 'string'
      ? candidate.updatedAt
      : null
  }
}

export function loadWorkspaceState(key = writingStorageKey): WritingWorkspaceState {
  if (typeof window === 'undefined') {
    return createDefaultWorkspace()
  }

  try {
    const raw = window.localStorage.getItem(key)

    if (!raw) {
      return createDefaultWorkspace()
    }

    return normalizeWorkspaceState(JSON.parse(raw) as unknown)
  } catch {
    return createDefaultWorkspace()
  }
}

export function persistWorkspaceState(
  key: string,
  state: WritingWorkspaceState
): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(state))
}

export function calculateWritingStats(content: string): WritingStats {
  const plain = content ?? ''
  const trimmed = plain.trim()
  const lines = plain ? plain.split(/\n/).length : 0
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n+/).filter(Boolean).length : 0
  const headings = (plain.match(/^#{1,6}\s.+$/gm) ?? []).length
  const words = readWordCount(plain)
  const characters = trimmed.replace(/\s+/g, '').length
  const estimatedReadMinutes = Math.max(1, Math.ceil(words / 220))

  return {
    wordCount: words,
    characterCount: characters,
    paragraphCount: paragraphs,
    lineCount: lines,
    headingCount: headings,
    estimatedReadMinutes
  }
}

export function renderMarkdown(content: string) {
  return marked.parse(content) as string
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function buildMarkdownHtmlDocument(title: string, renderedHtml: string) {
  const safeTitle = escapeHtml(title || '无标题草稿')

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle}</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      font-family: Inter, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
      line-height: 1.75;
      color: #0a1628;
      background: #f6fbff;
    }
    article {
      max-width: 860px;
      margin: 0 auto;
      padding: 32px;
      background: white;
      border-radius: 24px;
      box-shadow: 0 18px 36px rgba(10, 22, 40, 0.08);
    }
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.2;
      color: #08203a;
    }
    a { color: #0f5e8d; }
    pre {
      overflow: auto;
      padding: 16px;
      border-radius: 16px;
      background: #f2f7ff;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace;
    }
    blockquote {
      margin: 0;
      padding-left: 16px;
      border-left: 4px solid #80c7e8;
      color: #4a637f;
    }
  </style>
</head>
<body>
  <article>
    ${renderedHtml}
  </article>
</body>
</html>`
}

export function buildMarkdownFilename(title: string) {
  const normalized = (title || 'writing-draft')
    .trim()
    .toLowerCase()
    .replace(/[\s/\\:;*"<>|?]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${normalized || 'writing-draft'}.md`
}

export function buildHtmlFilename(title: string) {
  const normalized = (title || 'writing-draft')
    .trim()
    .toLowerCase()
    .replace(/[\s/\\:;*"<>|?]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `${normalized || 'writing-draft'}.html`
}

export function downloadText(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  if (typeof window === 'undefined') {
    return
  }

  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 0)
}
