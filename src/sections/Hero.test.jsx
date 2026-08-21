import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Hero from './Hero'

describe('Hero AI Shell', () => {
  it('is the default first tab and keeps command results inside the terminal', async () => {
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    const user = userEvent.setup()

    render(<Hero />)

    const aiShellTab = screen.getByRole('button', { name: /^ai shell$/i })
    const consoleTab = screen.getByRole('button', { name: /^console diagnostics$/i })
    expect(aiShellTab.compareDocumentPosition(consoleTab) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    const commandInput = screen.getByRole('textbox', { name: /ai shell command/i })
    await user.type(commandInput, 'skills{Enter}')

    expect(await screen.findByText(/Proficiencies: React, Next.js/i)).toBeInTheDocument()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
