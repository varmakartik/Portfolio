import { getNavigationInset, getSectionAnchor, sectionLinks } from './sectionNavigation'

const sectionTitles = {
  hero: 'Home',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  github: 'GitHub activity',
  'ai-lab': 'AI Creative Lab',
  education: 'Education',
  contact: 'Contact',
}

export function getCurrentPageContext() {
  let sectionId = window.location.pathname.replace(/\/$/, '') === '/ai-lab' ? 'ai-lab' : 'hero'
  if (sectionId !== 'ai-lab') {
    const inset = getNavigationInset() + 2
    for (const [, id] of sectionLinks) {
      const anchor = getSectionAnchor(id)
      if (anchor && anchor.getBoundingClientRect().top <= inset) sectionId = id
    }
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      sectionId = 'contact'
    }
  }

  const section = document.getElementById(sectionId)
  const excerpt = section
    ? Array.from(section.querySelectorAll('h1, h2, h3, p'))
      .filter(element => !element.closest('[hidden], [aria-hidden="true"]'))
      .map(element => (element.innerText || element.textContent).replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .filter((text, index, all) => all.indexOf(text) === index)
      .join(' · ')
      .slice(0, 1200)
    : ''

  return { section_id: sectionId, section_title: sectionTitles[sectionId], excerpt }
}
