import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Navbar from '../components/layout/Navbar'
import { scrollToSection } from '../utils/sectionNavigation'
import { getLenis } from './useLenis'

vi.mock('./useLenis', () => ({ getLenis: vi.fn() }))

function fixture(headerHeight = 84) {
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 5000 })
  render(<><Navbar /><main><section id="hero" /><section id="skills"><div data-section-heading>Skills heading</div></section><section id="projects"><div data-section-heading>Projects heading</div></section></main></>)
  document.querySelector('.nav-inner').getBoundingClientRect = () => ({ height: headerHeight })
  for (const [id, top] of [['hero', 0], ['skills', 1200], ['projects', 2200]]) {
    const section = document.getElementById(id)
    const anchor = section.querySelector('[data-section-heading]') || section
    anchor.getBoundingClientRect = () => ({ top: top - window.scrollY })
  }
}

afterEach(() => {
  vi.clearAllMocks()
  window.history.replaceState(null, '', '/')
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
  delete document.documentElement.scrollHeight
})

describe('Section navigation', () => {
  it('lands Skills and Projects using one measured offset and updates the selected link', async () => {
    const lenis = { resize: vi.fn(), scrollTo: vi.fn() }
    getLenis.mockReturnValue(lenis)
    fixture()
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: 'Skills' }))
    expect(lenis.scrollTo).toHaveBeenLastCalledWith(1092, expect.objectContaining({ duration: 1 }))
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'location')
    await user.click(screen.getByRole('link', { name: 'Projects' }))
    expect(lenis.scrollTo).toHaveBeenLastCalledWith(2092, expect.any(Object))
    expect(window.location.hash).toBe('#projects')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 2092 })
    act(() => lenis.scrollTo.mock.lastCall[1].onComplete())
    await act(() => new Promise(resolve => requestAnimationFrame(resolve)))
    await waitFor(() => expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'location'))
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1092 })
    fireEvent.scroll(window)
    await waitFor(() => expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'location'))
  })

  it('uses the mobile header height and closes the mobile navigation', async () => {
    const lenis = { resize: vi.fn(), scrollTo: vi.fn() }
    getLenis.mockReturnValue(lenis)
    fixture(70)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Toggle menu' }))
    const mobileLink = screen.getAllByRole('link', { name: /Projects/ }).at(-1)
    await user.click(mobileLink)
    expect(lenis.scrollTo).toHaveBeenLastCalledWith(2106, expect.any(Object))
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('preserves modified-click browser behavior', () => {
    const lenis = { resize: vi.fn(), scrollTo: vi.fn() }
    getLenis.mockReturnValue(lenis)
    fixture()
    fireEvent.click(screen.getByRole('link', { name: 'Projects' }), { ctrlKey: true })
    expect(lenis.scrollTo).not.toHaveBeenCalled()
  })

  it('supports native reduced-motion navigation and missing destinations', () => {
    getLenis.mockReturnValue(null)
    fixture(70)
    const originalMatchMedia = window.matchMedia
    window.matchMedia = () => ({ matches: true })
    try {
      scrollToSection('projects')
      expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 2106, behavior: 'instant' })
      expect(scrollToSection('missing')).toBe(false)
    } finally { window.matchMedia = originalMatchMedia }
  })

  it('restores section destinations on browser history changes', async () => {
    const lenis = { resize: vi.fn(), scrollTo: vi.fn() }
    getLenis.mockReturnValue(lenis)
    fixture()
    window.history.replaceState(null, '', '#skills')
    act(() => window.dispatchEvent(new PopStateEvent('popstate')))
    expect(lenis.scrollTo).toHaveBeenLastCalledWith(1092, expect.objectContaining({ immediate: true }))
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'location')
  })
})
