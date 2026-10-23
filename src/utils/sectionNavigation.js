import { getLenis } from '../hooks/useLenis'

export const sectionLinks = [
  ['Home', 'hero'], ['My Journey', 'experience'], ['Skills', 'skills'],
  ['Projects', 'projects'], ['GitHub', 'github'], ['AI Lab', 'ai-lab'], ['Education', 'education'], ['Contact', 'contact'],
]

export function getNavigationInset() {
  return (document.querySelector('.nav-inner')?.getBoundingClientRect().height || 84) + 24
}

export function getSectionAnchor(id) {
  const section = document.getElementById(id)
  return section?.querySelector('[data-section-heading]') || section
}

export function scrollToSection(id, { immediate = false, updateHistory = true, onComplete } = {}) {
  const anchor = getSectionAnchor(id)
  if (!anchor) return false
  const top = id === 'hero' ? 0 : Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - getNavigationInset())
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (updateHistory && window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
  const lenis = getLenis()
  if (lenis) {
    lenis.resize()
    // A numeric destination avoids adding CSS scroll margins/padding a second time.
    lenis.scrollTo(top, { immediate: immediate || reduced, duration: 1, onComplete })
  } else {
    window.scrollTo({ top, behavior: immediate || reduced ? 'instant' : 'smooth' })
  }
  return true
}
