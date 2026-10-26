import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCurrentPageContext } from './pageContext'
import { getPortfolioReply } from '../data/portfolioChat'

describe('portfolio section context', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('uses the section at the reading position for questions about this section', () => {
    document.body.innerHTML = '<section id="hero"></section><section id="experience"><h2>My journey</h2><p>Full-Stack Developer at Retail Rockets.</p></section><section id="skills"></section>'
    vi.spyOn(document.getElementById('hero'), 'getBoundingClientRect').mockReturnValue({ top: -500 })
    vi.spyOn(document.getElementById('experience'), 'getBoundingClientRect').mockReturnValue({ top: 50 })
    vi.spyOn(document.getElementById('skills'), 'getBoundingClientRect').mockReturnValue({ top: 900 })
    const context = getCurrentPageContext()
    expect(context).toMatchObject({ section_id: 'experience', section_title: 'Experience' })
    expect(context.excerpt).toContain('Full-Stack Developer at Retail Rockets')
    expect(getPortfolioReply('Tell me about this section', context).text).toContain('Retail Rockets')
  })
})
