import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { ApiRequestError, submitContact } from '../lib/api.js'
import ContactForm from './ContactForm.vue'

vi.mock('../lib/api.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/api.js')>()

  return {
    ...actual,
    submitContact: vi.fn()
  }
})

const mockedSubmitContact = vi.mocked(submitContact)

describe('ContactForm', () => {
  it('submits the form and shows a queued receipt', async () => {
    mockedSubmitContact.mockResolvedValue({
      submissionId: '6ef0fe1b-8c2a-44a7-8f76-4a6da7808f81',
      receivedAt: '2026-04-07T10:00:00.000Z',
      status: 'queued'
    })

    const wrapper = mount(ContactForm)

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('codex@thanejoss.com')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')
    await flushPromises()

    expect(mockedSubmitContact).toHaveBeenCalledWith({
      name: 'Codex',
      email: 'codex@thanejoss.com',
      message: 'Need a launch page'
    })
    expect(wrapper.text()).toContain('Request queued. Submission ID: 6ef0fe1b')
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('')
  })

  it('shows API validation errors without clearing the form', async () => {
    mockedSubmitContact.mockRejectedValue(
      new ApiRequestError('Please provide a valid email address.', 'VALIDATION_ERROR', 400)
    )

    const wrapper = mount(ContactForm)

    await wrapper.get('input[name="name"]').setValue('Codex')
    await wrapper.get('input[name="email"]').setValue('bad-email')
    await wrapper.get('textarea[name="message"]').setValue('Need a launch page')
    await wrapper.get('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Please provide a valid email address.')
    expect((wrapper.get('input[name="name"]').element as HTMLInputElement).value).toBe('Codex')
    expect((wrapper.get('input[name="email"]').element as HTMLInputElement).value).toBe('bad-email')
    expect((wrapper.get('textarea[name="message"]').element as HTMLTextAreaElement).value).toBe('Need a launch page')
  })
})
