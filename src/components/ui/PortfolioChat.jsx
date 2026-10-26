import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, MessageCircle, X } from 'lucide-react'
import { getPortfolioReply, welcomeMessage } from '../../data/portfolioChat'
import { checkKaiAvailability, requestKaiReply } from '../../data/kaiClient'
import { personalInfo } from '../../data/personalInfo'
import { getCurrentPageContext } from '../../utils/pageContext'

const suggestions = [['Projects', 'Show me projects'], ['Skills', 'What are your skills?'], ['Experience', 'Your journey'], ['Contact', 'How can I contact you?']]
const getKaiApiUrl = () => import.meta.env.PROD ? '/api/kai' : (import.meta.env.VITE_KAI_API_URL || (import.meta.env.MODE === 'development' ? 'http://127.0.0.1:8000' : ''))

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [mode, setMode] = useState('checking')
  const reduced = useReducedMotion()
  const launcherRef = useRef(null)
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const logRef = useRef(null)
  const messagesRef = useRef([welcomeMessage])
  const pendingRef = useRef(false)
  const checkIdRef = useRef(0)

  const close = () => { setOpen(false); launcherRef.current?.focus({ preventScroll: true }) }
  useEffect(() => {
    const openChat = () => setOpen(true)
    window.addEventListener('open-portfolio-chat', openChat)
    return () => window.removeEventListener('open-portfolio-chat', openChat)
  }, [])
  useEffect(() => {
    if (!open) return
    // Opening the panel on a phone should not immediately summon the keyboard.
    if (window.matchMedia('(pointer: coarse)').matches) panelRef.current?.focus({ preventScroll: true })
    else inputRef.current?.focus({ preventScroll: true })
    const onKeyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); launcherRef.current?.focus({ preventScroll: true }) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])
  useEffect(() => {
    if (!open) return
    const apiUrl = getKaiApiUrl()
    if (!apiUrl) {
      setMode('fallback')
      return
    }
    let active = true
    const checkId = ++checkIdRef.current
    setMode('checking')
    checkKaiAvailability(apiUrl).then(available => {
      if (active && checkId === checkIdRef.current) setMode(available ? 'kai' : 'fallback')
    })
    return () => { active = false }
  }, [open])
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, open, pending])

  const appendMessage = message => {
    messagesRef.current = [...messagesRef.current, message]
    setMessages(messagesRef.current)
  }

  const send = async (value, focusInput = true) => {
    const text = value.trim()
    if (!text || pendingRef.current) return
    const pageContext = getCurrentPageContext()
    const history = messagesRef.current.slice(1).map(message => ({ role: message.role, content: message.text }))
    appendMessage({ role: 'user', text })
    setInput('')
    if (focusInput) inputRef.current?.focus({ preventScroll: true })
    const apiUrl = getKaiApiUrl()
    ++checkIdRef.current
    if (!apiUrl) {
      setMode('fallback')
      appendMessage({ role: 'assistant', source: 'fallback', ...getPortfolioReply(text, pageContext) })
      return
    }
    pendingRef.current = true
    setPending(true)
    try {
      const reply = await requestKaiReply(text, history, apiUrl, fetch, pageContext)
      setMode('kai')
      appendMessage({ role: 'assistant', source: 'kai', ...reply })
    } catch (error) {
      console.warn('KAI unavailable; using the local portfolio reply.', error)
      setMode('fallback')
      appendMessage({ role: 'assistant', source: 'fallback', ...getPortfolioReply(text, pageContext) })
    } finally {
      pendingRef.current = false
      setPending(false)
    }
  }

  return (
    <div className="portfolio-chat">
      <AnimatePresence>{open && <motion.section ref={panelRef} tabIndex={-1} id="portfolio-chat-panel" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title" className="chat-panel" data-lenis-prevent
        initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 }} transition={{ duration: reduced ? 0 : 0.25 }}>
        <header className="chat-header">
          <img className="chat-avatar" src={personalInfo.avatar} alt="" width="36" height="36" />
          <div><h2 id="portfolio-chat-title">Kartik’s portfolio</h2><p>{mode === 'kai' ? 'KAI online' : mode === 'fallback' ? 'KAI unavailable · Portfolio guide active' : 'Checking KAI…'}</p></div>
          <button className="chat-close" onClick={close} aria-label="Close portfolio chat"><X size={19} /></button>
        </header>
          <div ref={logRef} className="chat-log" role="log" aria-label="Portfolio conversation" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => <motion.div key={index} className={`chat-message ${message.role}`} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.24, ease: 'easeOut' }}><span className="chat-speaker">{message.role === 'assistant' ? message.source === 'kai' ? 'KAI' : message.source === 'fallback' ? 'Portfolio guide (KAI unavailable)' : 'Portfolio assistant' : 'You'}</span><p>{message.text}</p>
              {message.link && <a href={message.link} download={message.download ? 'Kartik_Varma_Resume.pdf' : undefined} onClick={() => { if (message.link.startsWith('#')) close() }}>{message.label}<ArrowUpRight size={14} /></a>}
            </motion.div>)}
            {pending && <div className="chat-message assistant chat-typing" role="status" aria-label="KAI is thinking"><span className="chat-speaker">KAI</span><span className="chat-typing-dots" aria-hidden="true"><span /><span /><span /></span></div>}
          </div>
          <div className="chat-suggestions" aria-label="Suggested questions">{suggestions.map(([label, question]) => <button key={label} aria-label={question} onClick={() => send(question, false)}>{label}</button>)}</div>
          <form className="chat-form" onSubmit={event => { event.preventDefault(); send(input) }}>
            <input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} aria-label="Ask about Kartik" placeholder="Ask about my work…" maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!input.trim() || pending} aria-label="Send message"><ArrowUp size={18} /></button>
          </form>
        <footer className="chat-footer"><span>Automated portfolio guide</span><a href="#contact" onClick={close}>Email Kartik <ArrowUpRight size={12} /></a></footer>
      </motion.section>}</AnimatePresence>
      <button ref={launcherRef} className={`chat-launcher ${open ? 'is-open' : ''}`} aria-label={open ? 'Minimize portfolio chat' : 'Open portfolio chat'} aria-expanded={open} aria-controls="portfolio-chat-panel" onClick={() => open ? close() : setOpen(true)}>
        {open ? <X size={18} /> : <MessageCircle size={19} />}<span>{open ? 'Close' : 'Portfolio Q&A'}</span>
      </button>
    </div>
  )
}
