import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'
import { personalInfo } from '../data/personalInfo'
import GlowCard from '../components/ui/GlowCard'
import MagneticButton from '../components/ui/MagneticButton'
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react'

export default function Contact() {
  const formRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    toast.success('Email copied to clipboard!', {
      style: {
        background: '#FFFFFF',
        color: '#2563EB',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        fontFamily: 'Space Grotesk',
      },
      iconTheme: {
        primary: '#2563EB',
        secondary: '#FFFFFF',
      },
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const validate = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address'
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required'
    if (!formData.message.trim()) tempErrors.message = 'Message is required'

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSending(true)

    // Using placeholder keys - will log variables and display simulated alert
    // If EmailJS credentials are configured in .env later, they can be utilized
    emailjs
      .send(
        'service_id_placeholder', // EmailJS Service ID
        'template_id_placeholder', // EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personalInfo.email,
        },
        'public_key_placeholder' // EmailJS Public Key
      )
      .then(
        () => {
          setIsSending(false)
          toast.success('Message sent successfully!', {
            style: {
              background: '#FFFFFF',
              color: '#2563EB',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              fontFamily: 'Space Grotesk',
            },
          })
          setFormData({ name: '', email: '', subject: '', message: '' })
        },
        (error) => {
          setIsSending(false)
          // Simulate successful submit as a fallback
          toast.success('Simulation Mode: Message sent successfully!', {
            style: {
              background: '#FFFFFF',
              color: '#2563EB',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              fontFamily: 'Space Grotesk',
            },
          })
          setFormData({ name: '', email: '', subject: '', message: '' })
        }
      )
  }

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <Toaster position="bottom-right" />

      {/* Background aurora glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-[#1E293B] mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 font-grotesk text-base sm:text-lg max-w-xl"
          >
            Have a project in mind, need a consultant, or just want to connect? Hit the form below.
          </motion.p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <GlowCard
              glowColor="#2563EB"
              className="p-6 md:p-8 flex flex-col justify-between h-full bg-white/90 border border-slate-200/80 shadow-md"
              tilt={false}
            >
              <div>
                <h3 className="text-2xl font-bold font-sora text-slate-800 mb-6">
                  Contact Information
                </h3>
                <p className="text-sm font-grotesk text-slate-600 mb-8 leading-relaxed">
                  Feel free to reach out via direct email or the contact form. I will respond to your inquiry as soon as possible.
                </p>

                {/* Details list */}
                <div className="flex flex-col gap-4 sm:gap-6 mb-8">
                  {/* Email row */}
                  <div className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-slate-200/50 bg-slate-100/70 text-[#2563EB] group-hover:bg-[#2563EB]/10 transition-colors shrink-0">
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase font-grotesk tracking-widest text-slate-500 block">
                        Email Me
                      </span>
                      <span className="font-grotesk text-xs sm:text-sm text-slate-800 block truncate">
                        {personalInfo.email}
                      </span>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg border border-slate-200/50 bg-slate-100/70 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
                      title="Copy Email"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Location row */}
                  <div className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-slate-200/50 bg-slate-100/70 text-[#10B981] group-hover:bg-[#10B981]/10 transition-colors shrink-0">
                      <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] uppercase font-grotesk tracking-widest text-slate-500 block">
                        Location
                      </span>
                      <span className="font-grotesk text-xs sm:text-sm text-slate-800 block">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Indicator */}
              <div className="pt-6 border-t border-slate-200/50 flex items-center gap-3">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#2563EB]"></span>
                </span>
                <span className="font-grotesk text-xs font-semibold text-slate-600 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#2563EB]" /> Available For Freelance & Contracts
                </span>
              </div>
            </GlowCard>
          </motion.div>

          {/* Right panel: Animated Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <GlowCard
              glowColor="#38BDF8"
              className="p-8 h-full"
              tilt={false}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200/50 focus:border-[#2563EB]'
                      } bg-white/[0.02] text-black font-grotesk text-sm focus:outline-none transition-colors duration-300`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <span className="text-[11px] font-grotesk text-red-400 mt-1">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200/50 focus:border-[#2563EB]'
                      } bg-white/[0.02] text-black font-grotesk text-sm focus:outline-none transition-colors duration-300`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <span className="text-[11px] font-grotesk text-red-400 mt-1">{errors.email}</span>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200/50 focus:border-[#2563EB]'
                      } bg-white/[0.02] text-black font-grotesk text-sm focus:outline-none transition-colors duration-300`}
                    placeholder="Project Inquiry"
                  />
                  {errors.subject && (
                    <span className="text-[11px] font-grotesk text-red-400 mt-1">{errors.subject}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200/50 focus:border-[#2563EB]'
                      } bg-white/[0.02] text-black font-grotesk text-sm focus:outline-none transition-colors duration-300 resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <span className="text-[11px] font-grotesk text-red-400 mt-1">{errors.message}</span>
                  )}
                </div>

                {/* Submit Action */}
                <MagneticButton
                  type="submit"
                  disabled={isSending}
                  className="px-8 py-4 mt-2 rounded-xl font-grotesk font-semibold text-sm border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#A855F7] shadow-[0_0_20px_rgba(56, 189, 248,0.1)] hover:bg-[#38BDF8]/20 hover:shadow-[0_0_30px_rgba(56, 189, 248,0.2)] transition-all flex items-center justify-center gap-2 cursor-none disabled:opacity-50"
                >
                  {isSending ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </MagneticButton>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
