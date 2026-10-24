import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import PortfolioChat from './PortfolioChat'

describe('Portfolio chat', () => {
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
})
