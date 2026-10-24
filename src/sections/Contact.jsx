import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react'
import { personalInfo } from '../data/personalInfo'

const emptyForm = { name: '', email: '', subject: '', message: '' }
const fields = [{ name: 'name', label: 'Your name', placeholder: 'How should I call you?', autoComplete: 'name' }, { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' }, { name: 'subject', label: 'What do you have in mind?', placeholder: 'A project, an opportunity, a hello…' }]

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm)
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const configured = Boolean(service && template && publicKey)
  const change = event => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }))
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(personalInfo.email); setCopied(true); setStatus('Email address copied.') }
    catch { setStatus('Copy is unavailable. You can select the email address or open the email link.') }
  }
  const submit = async event => {
    event.preventDefault()
    if (!Object.values(formData).every(value => value.trim())) { setStatus('Please complete every field before continuing.'); return }
    if (!configured) {
      const body = `${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`
      setStatus('Finish sending in your email app. If it did not open, use the email link above.')
      return
    }
    setSending(true)
    setStatus('')
    try {
      await emailjs.send(service, template, { from_name: formData.name, from_email: formData.email, subject: formData.subject, message: formData.message, to_email: personalInfo.email }, publicKey)
      setStatus('Message sent. Thanks for reaching out!'); setFormData(emptyForm)
    } catch { setStatus('Your message could not be sent. Please use the email link. Your draft is saved here.') }
    finally { setSending(false) }
  }

  return (
    <section id="contact" className="contact-studio section-padding">
      <div className="container-custom contact-grid">
        <div className="contact-copy">
          <div data-section-heading><span className="eyebrow">07 / NEXT, LET’S BUILD SOMETHING</span><h2>Good things start<br />with a <em>hello.</em><span aria-hidden="true">✳</span></h2></div>
          <p>Have an idea worth building, an interesting opportunity, or a question about my work? I’d love to hear from you.</p>
          <div className="contact-email-row"><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}<ArrowUpRight size={20} /></a><button onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={17} /> : <Copy size={17} />}</button></div>
          <div className="contact-location"><MapPin size={16} /><span>{personalInfo.location}</span><span>OPEN TO A CONVERSATION</span></div>
          <div className="contact-signature" aria-hidden="true">Ideas → Code → Impact.</div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="contact-form-heading"><span className="eyebrow">START A CONVERSATION</span><ArrowUpRight size={23} /></div>
          <div className="contact-fields">{fields.map(field => <div className={`contact-field field-${field.name}`} key={field.name}><label htmlFor={`contact-${field.name}`}>{field.label}</label><input id={`contact-${field.name}`} name={field.name} type={field.type || 'text'} autoComplete={field.autoComplete} value={formData[field.name]} onChange={change} placeholder={field.placeholder} required maxLength={field.name === 'subject' ? 200 : 120} /></div>)}</div>
          <div className="contact-field"><label htmlFor="contact-message">Tell me a little more</label><textarea id="contact-message" name="message" rows={4} value={formData.message} onChange={change} placeholder="The idea, the challenge, or just what’s on your mind." required maxLength={4000} /></div>
          <button className="contact-submit" type="submit" disabled={sending}>{sending ? 'Sending…' : configured ? 'Send message' : 'Open email draft'}<ArrowUpRight size={19} /></button>
          <p className="contact-form-note">{configured ? 'Your message goes directly to my inbox.' : 'Opens your email app. You review and send.'}</p>
          <p className="contact-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  )
}
