const HEALTH_TIMEOUT_MS = 5000
const CHAT_TIMEOUT_MS = 45000

async function fetchWithTimeout(fetcher, url, options = {}, timeout = CHAT_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    return await fetcher(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function safeLink(url) {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol) ? parsed.href : null
  } catch {
    return null
  }
}

export function formatKaiReply(reply, visual) {
  let link
  let label
  const text = reply
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, title, url) => {
      if (!link && safeLink(url)) {
        link = safeLink(url)
        label = title
      }
      return title
    })
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .trim()

  if (!link) {
    const rawUrl = text.match(/https?:\/\/[^\s)]+/)
    if (rawUrl) {
      link = safeLink(rawUrl[0].replace(/[.,!?;:]+$/, ''))
      label = 'Open link'
    }
  }

  const steps = visual?.steps?.length
    ? `\n\n${visual.title}\n${visual.steps.map((step, index) => `${index + 1}. ${step.label} — ${step.detail}`).join('\n')}${visual.support ? `\n${visual.support}` : ''}`
    : ''

  return { text: text + steps, ...(link ? { link, label } : {}) }
}

export async function checkKaiAvailability(apiUrl, fetcher = fetch) {
  if (!apiUrl?.trim()) return false
  const base = apiUrl.trim().replace(/\/+$/, '')
  try {
    const health = await fetchWithTimeout(fetcher, `${base}/health`, {}, HEALTH_TIMEOUT_MS)
    if (!health.ok) return false
    const status = await health.json()
    return status.status === 'ok' && status.api_key_set === true
  } catch {
    return false
  }
}

export async function requestKaiReply(message, history, apiUrl, fetcher = fetch, pageContext = null) {
  if (!apiUrl?.trim()) return null
  const base = apiUrl.trim().replace(/\/+$/, '')
  if (!await checkKaiAvailability(apiUrl, fetcher)) throw new Error('KAI is unavailable')
  const response = await fetchWithTimeout(fetcher, `${base}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: history.slice(-12), page_context: pageContext }),
  })
  if (!response.ok) throw new Error('KAI request failed')
  const data = await response.json()
  if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('KAI returned no reply')
  return formatKaiReply(data.reply, data.visual)
}
