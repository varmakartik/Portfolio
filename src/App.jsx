import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLenis } from './hooks/useLenis'
import { personalInfo } from './data/personalInfo'

// Components
import BackgroundEffects from './components/ui/BackgroundEffects'
import CustomCursor from './components/cursor/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MusicPlayer from './components/ui/MusicPlayer'

// Sections
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Research from './sections/Research'
import Contact from './sections/Contact'

// Custom high-performance Animated Counter (supports decimals & integers)
function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState('0')

  useEffect(() => {
    let startTimestamp = null
    const end = parseFloat(value)
    const hasDecimal = value.toString().includes('.')
    const decimals = hasDecimal ? value.toString().split('.')[1].length : 0

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      const current = progress * end

      setCount(hasDecimal ? current.toFixed(decimals) : Math.floor(current).toString())

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [value, duration])

  return <span>{count}</span>
}

import TechMessages from './sections/TechMessages'

// Stats Counter Section component
function StatsCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="relative py-8 sm:py-12 bg-transparent overflow-hidden z-10">
      <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {personalInfo.stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center px-1">
            <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black font-sora tracking-tight text-[#1E293B] mb-1 leading-tight whitespace-nowrap">
              {inView ? (
                <AnimatedCounter value={stat.value} duration={2} />
              ) : (
                '0'
              )}
              <span className="text-[#2563EB]">{stat.suffix}</span>
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm font-grotesk text-slate-600 tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function PortfolioHome() {
  return (
    <>
      {/* Sticky scroll indicator progress bar */}
      <div className="scroll-bar" />

      {/* Navigation Header */}
      <Navbar />

      {/* Main content elements */}
      <main>
        {/* Intro Hero Section */}
        <Hero />

        {/* Stats showcase metrics */}
        <StatsCounter />

        {/* Technical skills grid */}
        <TechStack />

        {/* Timeline Experience */}
        <Experience />

        {/* Projects Bento Grid */}
        <Projects />

        {/* Academic publication research */}
        <Research />

        {/* Direct connection form */}
        <Contact />
      </main>

      {/* Base Footer */}
      <Footer />
    </>
  )
}

export default function App() {
  const [view, setView] = useState(() => {
    // If we visit any path other than '/', treat it as a 404 fallback to 'tech-messages'
    return window.location.pathname === '/' ? 'portfolio' : 'tech-messages'
  })

  // Initialize Lenis scroll engine
  useLenis()

  useEffect(() => {
    const handleNavigation = (e) => {
      if (e.detail) {
        setView(e.detail)
        // Dynamically update the browser URL to match the view state
        if (e.detail === 'portfolio') {
          window.history.pushState({}, '', '/')
        } else if (e.detail === 'tech-messages') {
          window.history.pushState({}, '', '/telemetry')
        }
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
    window.addEventListener('navigate', handleNavigation)
    return () => window.removeEventListener('navigate', handleNavigation)
  }, [])

  return (
    <>
      {/* Premium custom cursor */}
      <CustomCursor />

      {/* Floating background music player */}
      <MusicPlayer />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative min-h-screen bg-transparent selection:bg-[#2563EB]/20 selection:text-[#2563EB]"
        >
          {/* Background spotlight textures & particles */}
          <BackgroundEffects />

          {view === 'portfolio' ? (
            <PortfolioHome />
          ) : (
            <TechMessages />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
