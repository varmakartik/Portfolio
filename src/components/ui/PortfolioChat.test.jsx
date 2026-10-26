import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PortfolioChat from './PortfolioChat'

describe('Portfolio chat', () => {
  beforeEach(() => {
    vi.stubEnv('PROD', false)
    vi.stubEnv('VITE_KAI_API_URL', '')
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('opens with focus, answers questions, and preserves the conversation after closing', async () => {
    const user = userEvent.setup()
    render(<PortfolioChat />)
    const launcher = screen.getByRole('button', { name: 'Open portfolio chat' })
    await user.click(launcher)
    expect(screen.getByRole('dialog', { name: /Kartik/ })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Ask about Kartik' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'What are your skills?' }))
    expect(screen.getByText(/His toolkit includes React/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore the toolkit/ })).toHaveAttribute('href', '#skills')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(launcher).toHaveFocus()
    await user.click(launcher)
    expect(screen.getByText(/His toolkit includes React/)).toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: 'Ask about Kartik' }), 'Tell me about Careerly{Enter}')
    expect(screen.getByText(/Careerly — An AI-powered/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '#projects')
  })

  it('offers portfolio guidance without the legacy terminal', async () => {
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    expect(screen.queryByRole('button', { name: /Developer terminal/ })).not.toBeInTheDocument()
    await user.type(screen.getByRole('textbox', { name: 'Ask about Kartik' }), 'Show me the AI art lab{Enter}')
    expect(screen.getByRole('link', { name: 'Visit the creative lab' })).toHaveAttribute('href', '/ai-lab')
    expect(screen.getByText(/AI Creative Lab is in progress/)).toBeInTheDocument()
  })
  it('disables empty submissions and closes when navigating to a section', async () => {
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Show me projects' }))
    await user.click(screen.getByRole('link', { name: 'See the projects' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('distinguishes the current full-time job from completed internships', async () => {
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    await user.click(screen.getByRole('button', { name: 'Your journey' }))
    expect(screen.getByText(/works full-time as a Full-Stack Developer at Retail Rockets/)).toHaveTextContent('completed 3 internships')
    expect(screen.getByText('Automated portfolio guide')).toBeInTheDocument()
  })

  it('uses KAI when the API is available and keeps the same chat panel', async () => {
    vi.stubEnv('VITE_KAI_API_URL', 'http://127.0.0.1:8000')
    let finishReply
    const delayedReply = new Promise(resolve => { finishReply = resolve })
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', api_key_set: true }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ status: 'ok', api_key_set: true }) })
      .mockReturnValueOnce(delayedReply)
    vi.stubGlobal('fetch', fetcher)
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    await waitFor(() => expect(screen.getByText('KAI online')).toBeInTheDocument())
    await user.type(screen.getByRole('textbox', { name: 'Ask about Kartik' }), 'Tell me about Connect{Enter}')
    expect(screen.getByRole('status', { name: 'KAI is thinking' })).toBeInTheDocument()
    finishReply({ ok: true, json: async () => ({ reply: 'KAI says **hello**. See [Connect](https://crosser.vercel.app).', visual: null }) })
    await waitFor(() => expect(screen.getByText(/KAI says hello/)).toBeInTheDocument())
    expect(screen.queryByRole('status', { name: 'KAI is thinking' })).not.toBeInTheDocument()
    expect(screen.getByText('KAI')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Connect/ })).toHaveAttribute('href', 'https://crosser.vercel.app/')
    expect(screen.getByRole('dialog', { name: /Kartik/ })).toBeInTheDocument()
    expect(JSON.parse(fetcher.mock.calls[2][1].body)).toMatchObject({ message: 'Tell me about Connect', history: [] })
    expect(JSON.parse(fetcher.mock.calls[2][1].body).page_context.section_id).toBe('hero')
  })

  it('uses the same-origin KAI route in production even with a legacy API URL configured', async () => {
    vi.stubEnv('PROD', true)
    vi.stubEnv('VITE_KAI_API_URL', 'https://portfolio-bot-36kr.onrender.com')
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ status: 'ok', api_key_set: true }) })
    vi.stubGlobal('fetch', fetcher)
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    await waitFor(() => expect(screen.getByText('KAI online')).toBeInTheDocument())
    expect(fetcher).toHaveBeenCalledWith('/api/kai/health', expect.any(Object))
  })

  it('uses the old chat reply when KAI is unavailable', async () => {
    vi.stubEnv('VITE_KAI_API_URL', 'http://127.0.0.1:8000')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const user = userEvent.setup()
    render(<PortfolioChat />)
    await user.click(screen.getByRole('button', { name: 'Open portfolio chat' }))
    await waitFor(() => expect(screen.getByText('KAI unavailable · Portfolio guide active')).toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'What are your skills?' }))
    await waitFor(() => expect(screen.getByText(/His toolkit includes React/)).toBeInTheDocument())
    expect(screen.getByText('Portfolio guide (KAI unavailable)')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore the toolkit/ })).toHaveAttribute('href', '#skills')
  })
})
