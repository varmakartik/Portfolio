import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { getPortfolioReply, welcomeMessage } from '../../data/portfolioChat'

const suggestions = ['Show me projects', 'What are your skills?', 'Your journey', 'How can I contact you?']

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [input, setInput] = useState('')
  const reduced = useReducedMotion()
  const launcherRef = useRef(null)
  const panelRef = useRef(null)
  const inputRef = useRef(null)
  const logRef = useRef(null)

  const close = () => { setOpen(false); launcherRef.current?.focus({ preventScroll: true }) }
  useEffect(() => {
    const openChat = () => setOpen(true)
    window.addEventListener('open-portfolio-chat', openChat)
    return () => window.removeEventListener('open-portfolio-chat', openChat)
  }, [])
  useEffect(() => {
    if (!open) return
    inputRef.current?.focus({ preventScroll: true })
    const onKeyDown = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); launcherRef.current?.focus({ preventScroll: true }) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, open])

  const send = (value) => {
    const text = value.trim()
    if (!text) return
    setMessages(previous => [...previous, { role: 'user', text }, { role: 'assistant', ...getPortfolioReply(text) }])
    setInput('')
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="portfolio-chat">
      <AnimatePresence>{open && <motion.section ref={panelRef} id="portfolio-chat-panel" role="dialog" aria-modal="false" aria-labelledby="portfolio-chat-title" className="chat-panel" data-lenis-prevent
        initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.98 }} transition={{ duration: reduced ? 0 : 0.25 }}>
        <header className="chat-header">
          <span className="chat-avatar"><Sparkles size={23} /></span>
          <div><h2 id="portfolio-chat-title">Ask about Kartik<span>✳</span></h2><p><span className="status-dot" /> Projects, experience & creative work</p></div>
          <button className="chat-close" onClick={close} aria-label="Close portfolio chat"><X size={19} /></button>
        </header>
          <div className="chat-intro-label"><span>A CLOSER LOOK AT MY WORK</span><span>↘</span></div>
          <div ref={logRef} className="chat-log" role="log" aria-label="Portfolio conversation" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => <div key={index} className={`chat-message ${message.role}`}><span className="chat-speaker">{message.role === 'assistant' ? 'PORTFOLIO GUIDE' : 'YOU'}</span><p>{message.text}</p>
              {message.link && <a href={message.link} download={message.download ? 'Kartik_Varma_Resume.pdf' : undefined} onClick={() => { if (message.link.startsWith('#')) close() }}>{message.label}<ArrowUpRight size={14} /></a>}
            </div>)}
          </div>
          <div className="chat-suggestions" aria-label="Suggested questions">{suggestions.map(text => <button key={text} onClick={() => send(text)}>{text}<ArrowUpRight size={12} /></button>)}</div>
          <form className="chat-form" onSubmit={event => { event.preventDefault(); send(input) }}>
            <input ref={inputRef} value={input} onChange={event => setInput(event.target.value)} aria-label="Ask about Kartik" placeholder="Ask about my work…" maxLength={500} autoComplete="off" />
            <button type="submit" disabled={!input.trim()} aria-label="Send message"><Send size={17} /></button>
          </form>
        <footer className="chat-footer"><span>Answers from this portfolio</span><a href="#contact" onClick={close}>Contact Kartik <ArrowUpRight size={12} /></a></footer>
      </motion.section>}</AnimatePresence>
      <button ref={launcherRef} className={`chat-launcher ${open ? 'is-open' : ''}`} aria-label={open ? 'Minimize portfolio chat' : 'Open portfolio chat'} aria-expanded={open} aria-controls="portfolio-chat-panel" onClick={() => open ? close() : setOpen(true)}>
        {open ? <X size={20} /> : <MessageCircle size={21} />}<span>{open ? 'Close chat' : 'Ask about me'}</span>{!open && <span className="chat-launcher-dot" />}
      </button>
    </div>
  )
}
