import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Hero from './Hero'

describe('Hero chat invitation', () => {
  it('opens the floating portfolio guide from the hero', async () => {
    const openChat = vi.fn()
    window.addEventListener('open-portfolio-chat', openChat)
    const user = userEvent.setup()
    render(<Hero />)
    await user.click(screen.getByRole('button', { name: /Curious about the person/ }))
    expect(openChat).toHaveBeenCalledOnce()
    window.removeEventListener('open-portfolio-chat', openChat)
  })
})
