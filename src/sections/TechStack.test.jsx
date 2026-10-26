import { describe, expect, it, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TechStack from './TechStack'
import { skillCategories } from '../data/skills'

// setup.js answers every media query with matches:false, which is the narrow
// layout. These helpers pick a width per test instead.
function setViewport(pinned) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 768px)' ? pinned : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('TechStack', () => {
  afterEach(() => vi.restoreAllMocks())

  it('does not listen for scroll on a narrow screen', () => {
    setViewport(false)
    const addEventListener = vi.spyOn(window, 'addEventListener')
    render(<TechStack />)
    const scrollListeners = addEventListener.mock.calls.filter(([type]) => type === 'scroll')
    expect(scrollListeners).toHaveLength(0)
  })

  it('listens for scroll once the pinned layout applies', () => {
    setViewport(true)
    const addEventListener = vi.spyOn(window, 'addEventListener')
    render(<TechStack />)
    const scrollListeners = addEventListener.mock.calls.filter(([type]) => type === 'scroll')
    expect(scrollListeners).toHaveLength(1)
  })

  it('shows only the selected panel on a narrow screen', () => {
    setViewport(false)
    const { container } = render(<TechStack />)
    const visible = () => [...container.querySelectorAll('.toolkit-panel')].filter(panel => !panel.hidden)

    expect(visible()).toHaveLength(1)
    expect(visible()[0]).toHaveAttribute('id', `skill-group-${skillCategories[0].id}`)

    const second = skillCategories[1]
    fireEvent.click(screen.getByRole('button', { name: new RegExp(second.title, 'i') }))

    expect(visible()).toHaveLength(1)
    expect(visible()[0]).toHaveAttribute('id', `skill-group-${second.id}`)
  })

  it('marks the tapped tab as the selected one on a narrow screen', () => {
    setViewport(false)
    render(<TechStack />)
    const tab = screen.getByRole('button', { name: new RegExp(skillCategories[1].title, 'i') })
    fireEvent.click(tab)
    expect(tab).toHaveAttribute('aria-pressed', 'true')
  })

  it('stacks every panel on the pinned layout', () => {
    setViewport(true)
    const { container } = render(<TechStack />)
    const panels = [...container.querySelectorAll('.toolkit-panel')]
    expect(panels).toHaveLength(skillCategories.length)
    expect(panels.every(panel => !panel.hidden)).toBe(true)
  })
})
