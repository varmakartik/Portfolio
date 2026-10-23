import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Experience from './Experience'

describe('Journey', () => {
  it('filters work and education and restores the full timeline', async () => {
    const user = userEvent.setup()
    render(<Experience />)
    expect(screen.getByRole('list', { name: 'All chapters timeline' }).children).toHaveLength(5)
    await user.click(screen.getByRole('button', { name: /^Education/ }))
    const education = screen.getByRole('list', { name: 'Education timeline' })
    expect(education.children).toHaveLength(1)
    expect(within(education).getByText(/Bachelor of Science/)).toBeInTheDocument()
    expect(screen.queryByText('Retail Rockets')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^Work/ }))
    expect(screen.getByRole('list', { name: 'Work timeline' }).children).toHaveLength(4)
    await user.click(screen.getByRole('button', { name: /^All chapters/ }))
    expect(screen.getByRole('list', { name: 'All chapters timeline' }).children).toHaveLength(5)
  })

  it('expands and collapses career details with a keyboard', async () => {
    const user = userEvent.setup()
    render(<Experience />)
    const current = screen.getByRole('button', { name: /Retail Rockets/ })
    expect(current).toHaveAttribute('aria-expanded', 'true')
    const internship = screen.getByRole('button', { name: /Elevate Labs/ })
    internship.focus()
    await user.keyboard('{Enter}')
    expect(internship).toHaveAttribute('aria-expanded', 'true')
    expect(current).toHaveAttribute('aria-expanded', 'false')
    expect(await screen.findByText(/Designed, implemented, and tested 15/)).toBeInTheDocument()
    await user.keyboard('{Enter}')
    expect(internship).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(screen.queryByText(/Designed, implemented, and tested 15/)).not.toBeInTheDocument())
  })
})
