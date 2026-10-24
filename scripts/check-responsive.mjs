import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'

// Exercise the compiled CSS: dev-server checks can miss bundling regressions.
const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true, open: false } })
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
let browser
try {
  browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || (existsSync(edge) ? edge : undefined), headless: true })
  const context = await browser.newContext({ isMobile: true, hasTouch: true, deviceScaleFactor: 3 })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [320, 360, 375, 393, 412, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(1200)
    const hero = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth
      const outside = rect => rect.left < -1 || rect.right > viewport + 1
      const clipped = []
      for (const selector of ['.hero-copy h1', '.hero-intro', '.hero-actions', '.portrait-caption', '.floating-note', '.portrait-index']) {
        const element = document.querySelector(selector)
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent.trim()) continue
          const range = document.createRange()
          range.selectNodeContents(walker.currentNode)
          if ([...range.getClientRects()].some(outside)) clipped.push(walker.currentNode.textContent)
        }
      }
      for (const selector of ['.hero-copy', '.portrait-frame', '.portrait-frame img', '.floating-note']) {
        if (outside(document.querySelector(selector).getBoundingClientRect())) clipped.push(selector)
      }
      return { clipped, launcherWidth: document.querySelector('.chat-launcher').getBoundingClientRect().width }
    })
    assert.deepEqual(hero.clipped, [], `Hero clipping at ${width}px`)
    if (width < 768) assert.equal(hero.launcherWidth, 44, 'Mobile launcher should stay compact')
    await page.getByRole('button', { name: 'Open portfolio chat' }).click()
    await page.waitForTimeout(300)
    const chat = await page.locator('.chat-panel').evaluate(element => {
      const rect = element.getBoundingClientRect()
      const form = element.querySelector('form').getBoundingClientRect()
      return { height: rect.height, right: rect.right, top: rect.top, bottom: rect.bottom, formBottom: form.bottom, inputFocused: document.activeElement?.tagName === 'INPUT' }
    })
    assert.ok(chat.right <= width && chat.top >= 0 && chat.formBottom <= chat.bottom, `Chat is clipped at ${width}px`)
    if (width < 768) {
      assert.ok(chat.height <= 400, 'Mobile conversation must stay compact')
      assert.equal(chat.inputFocused, false, 'Opening touch chat should not force the keyboard open')
    }
    await page.getByRole('button', { name: 'Close portfolio chat' }).click()
    await page.locator('.work-featured').scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    const clippedNodes = await page.locator('.work-featured .work-visual').evaluate(visual => {
      const bounds = visual.getBoundingClientRect()
      return [...visual.querySelectorAll('.auth-node, .auth-core, .auth-orbit')].filter(node => {
        const rect = node.getBoundingClientRect()
        return rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1
      }).map(node => node.className)
    })
    assert.deepEqual(clippedNodes, [], `Authentication diagram clipped at ${width}px`)
    await page.getByRole('button', { name: 'Read Zero Authentication System case study' }).click()
    const modal = await page.getByRole('dialog').evaluate(element => ({ width: element.clientWidth, contentWidth: element.scrollWidth }))
    assert.ok(modal.contentWidth <= modal.width + 1, `Case study overflows at ${width}px`)
    await page.getByRole('button', { name: 'Close project details' }).click()
    console.log(`PASS ${width}px: hero text, portrait, diagram, chatbot and case study`)
  }
  assert.deepEqual(errors, [], 'Browser runtime errors')
} finally {
  await browser?.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
