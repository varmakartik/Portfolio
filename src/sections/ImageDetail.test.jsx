import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { getCreativeImage } from '../data/creativeImageMetadata'
import ImageDetail from './ImageDetail'

describe('AI Lab image details', () => {
  it('shows the source prompt, image metadata, download, and full-screen controls', async () => {
    const image = getCreativeImage('fern-monolith')
    render(<ImageDetail image={image} />)
    expect(screen.getByRole('heading', { name: 'Fern Monolith' })).toBeInTheDocument()
    expect(screen.getByText(image.prompt)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download image' })).toHaveAttribute('download', 'fern-monolith.jpg')
    const artwork = screen.getByRole('img', { name: image.alt })
    Object.defineProperties(artwork, { naturalWidth: { configurable: true, value: 1024 }, naturalHeight: { configurable: true, value: 1536 } })
    fireEvent.load(artwork)
    expect(screen.getByText('1024 × 1536 px')).toBeInTheDocument()
    expect(screen.getByText('2:3 portrait')).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'View full screen' }))
    expect(screen.getByRole('dialog', { name: 'Full-screen AI image' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Fit' })).toHaveAttribute('aria-pressed', 'true')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Full-screen AI image' })).not.toBeInTheDocument()
  })
})
