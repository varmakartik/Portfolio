import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import emailjs from '@emailjs/browser'
import Contact from './Contact'

vi.mock('@emailjs/browser', () => ({ default: { send: vi.fn() } }))
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks() })

describe('Contact', () => {
  it('offers an honest email draft fallback when delivery is not configured', () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '')
    render(<Contact />)
    expect(screen.getByRole('button', { name: 'Open email draft' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /kartikvarma/ })).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })

  it('preserves the message if configured delivery fails and clears it only on success', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test-service')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test-template')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'test-public')
    const user = userEvent.setup()
    render(<Contact />)
    await user.type(screen.getByLabelText('Your name'), 'Visitor')
    await user.type(screen.getByLabelText('Email address'), 'visitor@example.com')
    await user.type(screen.getByLabelText('What do you have in mind?'), 'A project')
    await user.type(screen.getByLabelText('Tell me a little more'), 'Build a useful product.')
    emailjs.send.mockRejectedValueOnce(new Error('Unavailable'))
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(screen.getByRole('status')).toHaveTextContent('could not be sent')
    expect(screen.getByLabelText('Tell me a little more')).toHaveValue('Build a useful product.')
    emailjs.send.mockResolvedValueOnce({ status: 200 })
    await user.click(screen.getByRole('button', { name: 'Send message' }))
    expect(screen.getByRole('status')).toHaveTextContent('Message sent')
    expect(screen.getByLabelText('Tell me a little more')).toHaveValue('')
  })

  it('handles clipboard failure without claiming the address was copied', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Denied'))
    render(<Contact />)
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(screen.getByRole('status')).toHaveTextContent('Copy is unavailable')
  })
})
