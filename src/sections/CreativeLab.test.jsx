import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CreativeLab from './CreativeLab'

describe('Creative lab', () => {
  it('links to the dedicated lab and distinguishes published images from work in progress', () => {
    render(<CreativeLab />)
    expect(screen.getByRole('link', { name: 'Enter the lab' })).toHaveAttribute('href', '/ai-lab')
    expect(screen.getByRole('link', { name: 'Open Images' })).toHaveAttribute('href', '/ai-lab?view=images')
    expect(screen.getByRole('img', { name: /stone arch reflected/ })).toHaveAttribute('src', '/ai-lab/stone-arch.jpg')
    expect(screen.getByText('Published')).toBeInTheDocument()
    expect(screen.getAllByText(/COMING SOON/)).toHaveLength(2)
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
  })
  it('shows an eight-image collage and a clear video progress state', async () => {
    const user = userEvent.setup()
    render(<CreativeLab standalone />)
    await user.click(screen.getByRole('button', { name: 'Images' }))
    expect(screen.getByLabelText('AI generated image gallery').querySelectorAll('figure')).toHaveLength(8)
    expect(screen.queryByRole('heading', { name: 'Imagined worlds.' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Videos' }))
    expect(screen.getByRole('heading', { name: 'AI videos are coming soon.' })).toBeInTheDocument()
    expect(screen.queryByLabelText('AI generated image gallery')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Imagined worlds.' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to portfolio' })).toHaveAttribute('href', '/#ai-lab')
    await user.click(screen.getByRole('button', { name: 'All explorations' }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'Open Experiments' }))
    expect(screen.getByRole('heading', { name: 'Experiments are coming soon.' })).toBeInTheDocument()
  })
})
