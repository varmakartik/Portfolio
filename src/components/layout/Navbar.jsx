import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll behavior: hide on down, show on up
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 50)
      setHidden(sy > lastScrollY && sy > 100)
      setLastScrollY(sy)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -80 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: scrolled
            ? 'rgba(248, 250, 252, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(15,23,42,0.06)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        <div className="container-custom h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="relative flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-sora"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235,0.12), rgba(56, 189, 248,0.12))',
                border: '1px solid rgba(37, 99, 235,0.25)',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 0 15px rgba(37, 99, 235,0.25)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* AI Diamond Sparkle & Dashed Orbit Ring SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#2563EB]">
                <path d="M12 4c.4 2.5 2 4 4.5 4.4-2.5.4-4 2-4.4 4.5-.4-2.5-2-4-4.5-4.4 2.5-.4 4-2 4.4-4.5z" fill="#2563EB" />
                <circle cx="12" cy="12" r="8" stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
              </svg>
            </div>
            <span className="hidden sm:block font-grotesk font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
              {personalInfo.name}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1)
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="relative px-4 py-2 text-sm font-grotesk font-medium transition-colors duration-200 group"
                  style={{ color: isActive ? '#2563EB' : 'rgba(15,23,42,0.6)' }}
                >
                  <span className="relative z-10 group-hover:text-slate-900 transition-colors">
                    {label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px transition-all duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #2563EB, #38BDF8)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-50"
                    style={{
                      background: 'linear-gradient(90deg, #2563EB, #38BDF8)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      opacity: 0,
                    }}
                  />
                </a>
              )
            })}

            {/* CTA: Changed from HIRE ME to Download Resume */}
            <motion.a
              href={personalInfo.resumeUrl}
              download="Kartik_Varma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 rounded-lg text-sm font-grotesk font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235,0.08), rgba(56, 189, 248,0.08))',
                border: '1px solid rgba(37, 99, 235,0.25)',
                color: '#2563EB',
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 15px rgba(37, 99, 235,0.2)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Resume
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg"
            onClick={() => setMenuOpen((o) => !o)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} color="rgba(255,255,255,0.8)" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} color="rgba(255,255,255,0.8)" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[98] md:hidden"
              style={{ background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 z-[99] md:hidden flex flex-col"
              style={{
                background: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
                <span className="font-grotesk font-semibold text-white">Menu</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={20} color="rgba(255,255,255,0.6)" />
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-2 flex-1">
                {navLinks.map(({ label, href }, i) => {
                  const isActive = activeSection === href.slice(1)
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="px-4 py-3 rounded-lg font-grotesk font-medium transition-all duration-200"
                      style={{
                        color: isActive ? '#2563EB' : 'rgba(255,255,255,0.7)',
                        background: isActive ? 'rgba(37, 99, 235,0.07)' : 'transparent',
                        border: isActive ? '1px solid rgba(37, 99, 235,0.15)' : '1px solid transparent',
                      }}
                    >
                      {label}
                    </motion.a>
                  )
                })}
              </nav>

              <div className="p-6 border-t border-slate-200/50">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="block w-full text-center py-3 px-5 rounded-lg font-grotesk font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37, 99, 235,0.15), rgba(56, 189, 248,0.15))',
                    border: '1px solid rgba(37, 99, 235,0.3)',
                    color: '#2563EB',
                  }}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
