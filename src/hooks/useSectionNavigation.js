import { useEffect, useState } from 'react'
import { getNavigationInset, getSectionAnchor, scrollToSection, sectionLinks } from '../utils/sectionNavigation'

export function useSectionNavigation() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    let frame = 0
    let releaseTimer
    let navigating = false
    let alive = true
    const updateActive = () => {
      frame = 0
      if (navigating) return
      const inset = getNavigationInset() + 2
      let current = 'hero'
      sectionLinks.forEach(([, id]) => {
        const anchor = getSectionAnchor(id)
        if (anchor && anchor.getBoundingClientRect().top <= inset) current = id
      })
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = 'contact'
      setActive(current)
    }
    const queueUpdate = () => { if (!frame) frame = requestAnimationFrame(updateActive) }
    const release = () => { if (!alive) return; navigating = false; clearTimeout(releaseTimer); queueUpdate() }
    const navigate = (id, options = {}) => {
      if (!getSectionAnchor(id)) return
      navigating = true
      setActive(id === 'main-content' ? 'hero' : id)
      clearTimeout(releaseTimer)
      scrollToSection(id, { ...options, onComplete: release })
      releaseTimer = setTimeout(release, 1200)
    }
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href]')
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return
      let id
      try { id = decodeURIComponent(url.hash.slice(1)) } catch { return }
      if (!getSectionAnchor(id)) return
      event.preventDefault()
      navigate(id)
      if (id === 'main-content') {
        const main = document.getElementById(id)
        main.setAttribute('tabindex', '-1')
        main.focus({ preventScroll: true })
      }
    }
    const followHash = () => {
      let id
      try { id = decodeURIComponent(window.location.hash.slice(1)) || 'hero' } catch { return }
      navigate(id, { updateHistory: false, immediate: true })
    }
    document.addEventListener('click', onClick)
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchstart', release, { passive: true })
    window.addEventListener('popstate', followHash)
    window.addEventListener('hashchange', followHash)
    const initialFrame = requestAnimationFrame(() => window.location.hash ? followHash() : updateActive())
    return () => {
      alive = false
      cancelAnimationFrame(frame)
      cancelAnimationFrame(initialFrame)
      clearTimeout(releaseTimer)
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', release)
      window.removeEventListener('popstate', followHash)
      window.removeEventListener('hashchange', followHash)
    }
  }, [])
  return active
}
