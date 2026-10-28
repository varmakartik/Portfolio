import promptsMarkdown from '../../AI_LAB_IMAGE_PROMPTS.md?raw'
import { creativeImages as galleryImages } from './creativeLab'

const promptsByFile = Object.fromEntries(
  [...promptsMarkdown.replace(/\r\n/g, '\n').matchAll(/^## \d+\.[^`\n]*`([^`\n]+)`[^\n]*\n\n> ([^\n]+)/gm)]
    .map(([, filename, prompt]) => [filename, prompt.trim()]),
)

export const creativeImages = galleryImages.map(image => {
  const filename = image.src.split('/').at(-1)
  return { ...image, filename, slug: filename.replace(/\.jpg$/, ''), prompt: promptsByFile[filename] }
})

export function getCreativeImage(slug) {
  return creativeImages.find(image => image.slug === slug)
}
