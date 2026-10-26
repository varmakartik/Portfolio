import { describe, expect, it, vi } from 'vitest'
import { checkKaiAvailability, formatKaiReply, requestKaiReply } from './kaiClient'

describe('KAI response adapter', () => {
  it('keeps the existing chat text and action-link shape', () => {
    expect(formatKaiReply('**Connect** is live. [Live demo](https://crosser.vercel.app).', {
      title: 'Connect flow',
      steps: [{ label: 'Editor', detail: 'Write a document.' }],
    })).toEqual({
      text: 'Connect is live. Live demo.\n\nConnect flow\n1. Editor — Write a document.',
      link: 'https://crosser.vercel.app/',
      label: 'Live demo',
    })
  })

  it('sends only the configured public API URL and recent conversation', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', api_key_set: true }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ reply: 'KAI answer', visual: null }) })
    const pageContext = { section_id: 'projects', section_title: 'Projects', excerpt: 'Selected work' }
    const result = await requestKaiReply('What about it?', [{ role: 'user', content: 'Tell me about Connect' }], 'https://kai.example/', fetcher, pageContext)
    expect(result.text).toBe('KAI answer')
    expect(fetcher.mock.calls[0][0]).toBe('https://kai.example/health')
    expect(fetcher.mock.calls[1][0]).toBe('https://kai.example/chat')
    expect(JSON.parse(fetcher.mock.calls[1][1].body).history).toEqual([{ role: 'user', content: 'Tell me about Connect' }])
    expect(JSON.parse(fetcher.mock.calls[1][1].body).page_context).toEqual(pageContext)
  })

  it('reports unavailable when the health request fails', async () => {
    expect(await checkKaiAvailability('', vi.fn())).toBe(false)
    expect(await checkKaiAvailability('https://kai.example', vi.fn().mockRejectedValue(new Error('offline')))).toBe(false)
  })
})
