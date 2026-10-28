import { describe, expect, it } from 'vitest'
import { creativeImages, getCreativeImage } from './creativeImageMetadata'

describe('AI Lab image metadata', () => {
  it('provides a unique route and a documented prompt for every published image', () => {
    expect(creativeImages).toHaveLength(12)
    expect(new Set(creativeImages.map(image => image.slug)).size).toBe(creativeImages.length)
    expect(creativeImages.every(image => image.prompt?.length > 100)).toBe(true)
    expect(getCreativeImage('fern-monolith')?.orientation).toBe('portrait')
  })
})
