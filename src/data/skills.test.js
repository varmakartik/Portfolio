import { describe, expect, it } from 'vitest'
import { skillCategories, allSkills } from './skills'

describe('skillCategories data', () => {
  it('has the required shape for every category', () => {
    skillCategories.forEach((cat) => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('title')
      expect(cat).toHaveProperty('color')
      expect(Array.isArray(cat.skills)).toBe(true)
      cat.skills.forEach((skill) => {
        expect(skill).toHaveProperty('name')
        expect(skill).toHaveProperty('icon')
        expect(skill).toHaveProperty('color')
      })
    })
  })

  it('contains the newly added skills in allSkills', () => {
    const names = allSkills.map((s) => s.name)
    expect(names).toContain('Nginx')
    expect(names).toContain('Apache')
    expect(names).toContain('GitHub Actions')
    expect(names).toContain('Linux')
    expect(names).toContain('Oracle DB')
    expect(names).toContain('Redis')
    expect(names).toContain('Jest')
    expect(names).toContain('Claude')
    expect(names).toContain('Codex')
    expect(names).toContain('Qwen')
    expect(names).toContain('Ollama')
    expect(names).toContain('Hugging Face')
    expect(names).toContain('OpenRouter')
  })

  it('contains the AI & LLM Stack category', () => {
    const aiCategory = skillCategories.find((cat) => cat.id === 'aiml')
    expect(aiCategory).toBeDefined()
    expect(aiCategory.title).toBe('AI & LLM Stack')
  })

  it('has no duplicate skill names within a single category', () => {
    skillCategories.forEach((cat) => {
      const names = cat.skills.map((s) => s.name)
      const unique = new Set(names)
      expect(unique.size).toBe(names.length)
    })
  })

  it('exports a non-empty allSkills flat array', () => {
    expect(allSkills.length).toBeGreaterThan(0)
  })
})
