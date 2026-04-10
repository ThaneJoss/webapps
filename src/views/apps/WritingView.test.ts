import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import WritingView from './WritingView.vue'
import {
  buildMarkdownHtmlDocument,
  calculateWritingStats
} from '../../lib/apps/writingWorkspace.js'

describe('writing workspace', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('renders markdown preview and persists edits', async () => {
    const wrapper = mount(WritingView)
    const textarea = wrapper.get('textarea')

    await textarea.setValue('# 标题\n\n第一段内容')
    await new Promise((resolve) => window.setTimeout(resolve, 350))

    expect(wrapper.html()).toContain('<h1>标题</h1>')
    expect(window.localStorage.getItem('writing-workspace:v1')).toContain('第一段内容')
  }, 10000)

  it('calculates writing stats and exports html documents', () => {
    const stats = calculateWritingStats('# 标题\n\nMarkdown writing flow')
    const html = buildMarkdownHtmlDocument('草稿', '<h1>标题</h1>')

    expect(stats.headingCount).toBe(1)
    expect(stats.wordCount).toBeGreaterThan(0)
    expect(stats.characterCount).toBeGreaterThan(0)
    expect(html).toContain('<title>草稿</title>')
    expect(html).toContain('<h1>标题</h1>')
  })
})
