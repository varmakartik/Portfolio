import { describe, expect, it } from 'vitest'
import { skillCategories } from './skills'

describe('skill data', () => {
  it('contains a valid FastAPI entry', () => {
    const backend = skillCategories.find((category) => category.id === 'backend')
    const fastApi = backend.skills.find((skill) => skill.name === 'FastAPI')

    expect(fastApi).toBeDefined()
    expect(fastApi.color).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
