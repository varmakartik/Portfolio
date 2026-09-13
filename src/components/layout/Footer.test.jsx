import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the current year in copyright text', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders all section anchor links', () => {
    render(<Footer />)
    ;['Home', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('renders a back-to-top button', () => {
    render(<Footer />)
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })

  it('calls window.scrollTo when back-to-top button is clicked', async () => {
    const user = userEvent.setup()
    render(<Footer />)
    await user.click(screen.getByRole('button', { name: /back to top/i }))
    expect(window.scrollTo).toHaveBeenCalled()
  })
})
