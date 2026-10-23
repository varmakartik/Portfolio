import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Project case studies', () => {
  it('opens directly from the keyboard and restores focus after Escape', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    const trigger = screen.getByRole('button', { name: 'Read Zero Authentication System case study' })
    trigger.focus()
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('dialog', { name: 'Zero Authentication System' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close project details' })).toHaveFocus()
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(screen.getByRole('link', { name: /Source code/ })).toHaveFocus()
    await user.keyboard('{Tab}')
    expect(screen.getByRole('button', { name: 'Close project details' })).toHaveFocus()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })

  it('combines category and technology filters and offers an empty-state reset', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    await user.click(screen.getByRole('button', { name: /AI-powered/ }))
    expect(screen.getByRole('heading', { name: 'Careerly' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'FinTrack' })).not.toBeInTheDocument()
    await user.selectOptions(screen.getByRole('combobox', { name: 'Filter by technology' }), 'PostgreSQL')
    expect(screen.getByText('No projects in this combination yet.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Show all projects/ }))
    expect(screen.getAllByRole('article')).toHaveLength(5)
    expect(screen.getByRole('combobox')).toHaveValue('All technologies')
  })
})
