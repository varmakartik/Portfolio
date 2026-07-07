import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'

const navLinks = [
  { label: 'Home',       href: '#hero' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Research',   href: '#research' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen]           = useState(false)
  const [isMobile, setIsMobile]           = useState(false)

  const isManualClick = useRef(false)
  const clickTimeout = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualClick.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.05, rootMargin: '-15% 0px -45% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => {
      observer.disconnect()
      if (clickTimeout.current) clearTimeout(clickTimeout.current)
    }
  }, [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      isManualClick.current = true
      setActiveSection(href.slice(1))
      
      if (clickTimeout.current) clearTimeout(clickTimeout.current)
      clickTimeout.current = setTimeout(() => {
        isManualClick.current = false
      }, 950) // Ignore scroll intersections during smooth scroll

      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }, [])

  return (
    <>
      {/* Floating pill navbar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none transition-all duration-500 ease-out"
        style={{
          top: scrolled ? '16px' : '0px',
          paddingLeft: scrolled ? '16px' : '0px',
          paddingRight: scrolled ? '16px' : '0px',
        }}
      >
        <motion.header
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-auto w-full flex items-center justify-between px-4 sm:px-8 border-b transition-all duration-500 ease-out"
          style={{
            height: scrolled ? '56px' : '72px',
            maxWidth: scrolled ? '1024px' : '100%',
            borderRadius: scrolled ? '16px' : '0px',
            boxShadow: scrolled
              ? '0 4px 32px rgba(37, 99, 235, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04)'
              : 'none',
            background: isMobile
              ? '#FFFFFF'
              : (scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.70)'),
            borderColor: isMobile
              ? 'rgba(15, 23, 42, 0.08)'
              : (scrolled ? 'rgba(15, 23, 42, 0.08)' : 'rgba(15, 23, 42, 0.04)'),
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group flex-shrink-0"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.12))',
                border: '1px solid rgba(37,99,235,0.22)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 4c.4 2.5 2 4 4.5 4.4-2.5.4-4 2-4.4 4.5-.4-2.5-2-4-4.5-4.4 2.5-.4 4-2 4.4-4.5z" fill="#2563EB" />
                <circle cx="12" cy="12" r="8" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
              </svg>
            </div>
            <span className=" font-extrabold text-sm text-[#0F172A] tracking-wide lg:hidden">
              {personalInfo.name}
            </span>
          </motion.a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1)
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="relative px-3.5 py-1.5 text-[13px] font-syne font-bold rounded-lg transition-colors duration-200 z-10"
                  style={{
                    color: isActive ? '#2563EB' : '#475569',
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 rounded-lg bg-[#2563EB]/10 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <motion.a
              href={personalInfo.resumeUrl}
              download="Kartik_Varma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-syne font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                boxShadow: '0 2px 10px rgba(37,99,235,0.28)',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 4px 20px rgba(37,99,235,0.40)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={13} /> Resume
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl"
            onClick={() => setMenuOpen((o) => !o)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Toggle menu"
            style={{
              background: 'rgba(37,99,235,0.08)',
              border: '1px solid rgba(37,99,235,0.18)',
            }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}
                >
                  <X size={17} color="#2563EB" />
                </motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}
                >
                  <Menu size={17} color="#2563EB" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.header>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[110] lg:hidden"
              style={{ background: 'rgba(15,23,42,0.3)', backdropFilter: 'blur(6px)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer â€” frosted glass card */}
            <motion.div
              key="drawer"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 z-[120] lg:hidden flex flex-col"
              style={{
                background: '#FFFFFF',
                borderLeft: '1px solid rgba(15,23,42,0.08)',
                boxShadow: '-6px 0 40px rgba(0,0,0,0.06)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/50">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.12))',
                      border: '1px solid rgba(37,99,235,0.22)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                      <path d="M12 4c.4 2.5 2 4 4.5 4.4-2.5.4-4 2-4.4 4.5-.4-2.5-2-4-4.5-4.4 2.5-.4 4-2 4.4-4.5z" fill="#2563EB" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-syne font-extrabold text-sm text-[#0F172A] leading-none">Kartik</p>
                    <p className="font-grotesk text-[10px] text-slate-500 mt-0.5">Full-Stack Developer</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 bg-white/70 text-slate-600 hover:text-slate-800 transition-colors"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Nav links with stagger */}
              <nav className="flex flex-col px-3 pt-3 gap-0.5 flex-1">
                {navLinks.map(({ label, href }, i) => {
                  const isActive = activeSection === href.slice(1)
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      initial={{ x: 28, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
                      className="relative flex items-center gap-3 px-4 py-3 rounded-xl font-syne font-bold text-sm transition-colors duration-200 z-10"
                      style={{
                        color: isActive ? '#2563EB' : '#475569',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-pill"
                          className="absolute inset-0 rounded-xl bg-[#2563EB]/[0.06] border border-[#2563EB]/[0.12] -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                        style={{ background: isActive ? '#2563EB' : '#CBD5E1' }}
                      />
                      {label}
                    </motion.a>
                  )
                })}
              </nav>

              {/* Footer CTA */}
              <div className="px-4 pb-6 pt-3 border-t border-slate-200/50 flex flex-col gap-2.5">
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-syne font-bold text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
                    boxShadow: '0 3px 14px rgba(37,99,235,0.25)',
                  }}
                >
                  Hire Me <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
