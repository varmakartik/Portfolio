import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(<Navbar />)
    // Each label appears at least once (desktop + potentially mobile)
    ;['Home', 'Skills', 'My Journey', 'Projects', 'Education', 'Contact'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    })
  })

  it('renders a resume download link pointing to a PDF', () => {
    render(<Navbar />)
    const resumeLinks = screen.getAllByRole('link', { name: /resume/i })
    expect(resumeLinks.length).toBeGreaterThan(0)
    expect(resumeLinks[0]).toHaveAttribute('href', expect.stringContaining('.pdf'))
  })

  it('shows hamburger button for mobile menu', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('opens the mobile drawer when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const hamburger = screen.getByRole('button', { name: /toggle menu/i })
    await user.click(hamburger)

    // After opening, a close button appears inside the drawer
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('closes the mobile drawer when the close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByRole('button', { name: /toggle menu/i }))
    const closeBtn = screen.getByRole('button', { name: /close/i })
    await user.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument()
    })
  })
})
