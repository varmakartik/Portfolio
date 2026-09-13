import { describe, expect, it } from 'vitest'
import { personalInfo } from './personalInfo'
import { experiences } from './experience'

describe('personalInfo data', () => {
  it('has required personal fields', () => {
    expect(personalInfo).toHaveProperty('name')
    expect(personalInfo).toHaveProperty('email')
    expect(personalInfo).toHaveProperty('location')
    expect(personalInfo).toHaveProperty('bio')
    expect(personalInfo).toHaveProperty('resumeUrl')
    expect(personalInfo).toHaveProperty('socials')
  })

  it('resumeUrl starts with "/" (root-relative public asset)', () => {
    expect(personalInfo.resumeUrl).toMatch(/^\//)
  })

  it('resumeUrl points to a PDF file', () => {
    expect(personalInfo.resumeUrl.toLowerCase()).toContain('.pdf')
  })

  it('socials object has github and linkedin keys', () => {
    expect(personalInfo.socials).toHaveProperty('github')
    expect(personalInfo.socials).toHaveProperty('linkedin')
    expect(personalInfo.socials.github).toMatch(/^https?:\/\//)
    expect(personalInfo.socials.linkedin).toMatch(/^https?:\/\//)
  })

  it('stats array has 4 entries each with label, value, and suffix', () => {
    expect(Array.isArray(personalInfo.stats)).toBe(true)
    expect(personalInfo.stats).toHaveLength(4)
    personalInfo.stats.forEach((stat) => {
      expect(stat).toHaveProperty('label')
      expect(stat).toHaveProperty('value')
      expect(stat).toHaveProperty('suffix')
    })
  })
})

describe('experience data', () => {
  it('contains Retail Rockets as current full-stack role', () => {
    const current = experiences[0]
    expect(current.company).toBe('Retail Rockets')
    expect(current.role).toContain('Full-Stack')
    expect(current.companyUrl).toBe('https://retailrockets.in')
    expect(current.endDate).toBe('Present')
  })

  it('every experience has required fields', () => {
    experiences.forEach((exp) => {
      expect(exp).toHaveProperty('id')
      expect(exp).toHaveProperty('company')
      expect(exp).toHaveProperty('role')
      expect(exp).toHaveProperty('duration')
      expect(exp).toHaveProperty('skills')
      expect(Array.isArray(exp.skills)).toBe(true)
    })
  })
})
