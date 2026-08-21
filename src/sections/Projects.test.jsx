import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Projects from './Projects'

describe('Projects modal', () => {
  it('supports keyboard opening, dialog focus, Escape closing, and focus restoration', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    const projectCard = screen.getByRole('button', {
      name: /open zero authentication system project card/i,
    })

    projectCard.focus()
    fireEvent.keyDown(projectCard, { key: 'Enter' })
    await user.click(await screen.findByRole('button', { name: /view details/i }))

    const dialog = await screen.findByRole('dialog', {
      name: /zero authentication system/i,
    })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close project details/i })).toHaveFocus()
    expect(document.body).toHaveStyle({ overflow: 'hidden' })

    await user.keyboard('{Escape}')

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(projectCard).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })
})
