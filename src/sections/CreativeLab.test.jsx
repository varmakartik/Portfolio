import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CreativeLab from './CreativeLab'

describe('Creative lab', () => {
  it('links to a dedicated gallery and labels all unpublished work', () => {
    render(<CreativeLab />)
    expect(screen.getByRole('link', { name: 'Enter the lab' })).toHaveAttribute('href', '/ai-lab')
    expect(screen.getAllByText('In progress', { exact: false })).toHaveLength(4)
    expect(screen.getAllByText(/VISUAL PLACEHOLDER/)).toHaveLength(3)
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
  })
  it('filters the standalone gallery by medium', async () => {
    const user = userEvent.setup()
    render(<CreativeLab standalone />)
    await user.click(screen.getByRole('button', { name: 'Videos' }))
    expect(screen.getByRole('heading', { name: 'Ideas in motion.' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Imagined worlds.' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to portfolio' })).toHaveAttribute('href', '/#ai-lab')
    await user.click(screen.getByRole('button', { name: 'All explorations' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })
})
