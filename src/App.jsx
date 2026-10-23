import { useState, useEffect } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion, useScroll } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLenis } from './hooks/useLenis'
import { personalInfo } from './data/personalInfo'

// Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PortfolioChat from './components/ui/PortfolioChat'

// Sections
import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Research from './sections/Research'
import Contact from './sections/Contact'
import CreativeLab from './sections/CreativeLab'
import GithubActivity from './sections/GithubActivity'

// Custom high-performance Animated Counter (supports decimals & integers)
function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState('0')
  const reduced = useReducedMotion()

  useEffect(() => {
    let startTimestamp = null
    let frame
    if (reduced) { setCount(String(value)); return }
    const end = parseFloat(value)
    const hasDecimal = value.toString().includes('.')
    const decimals = hasDecimal ? value.toString().split('.')[1].length : 0

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      const current = progress * end

      setCount(hasDecimal ? current.toFixed(decimals) : Math.floor(current).toString())

      if (progress < 1) {
        frame = window.requestAnimationFrame(step)
      }
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [value, duration, reduced])

  return <span>{count}</span>
}


// Stats Counter Section component
function StatsCounter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="studio-stats relative bg-transparent overflow-hidden z-10" aria-label="At a glance">
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
  const { scrollYProgress } = useScroll()
  return (
    <>
      {/* Sticky scroll indicator progress bar */}
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />

      {/* Navigation Header */}
      <Navbar />

      {/* Main content elements */}
      <main id="main-content">
        {/* Intro Hero Section */}
        <Hero />

        {/* Stats showcase metrics */}
        <StatsCounter />

        {/* Timeline Experience */}
        <Experience />

        {/* Technical skills grid */}
        <TechStack />

        {/* Projects Bento Grid */}
        <Projects />
        <GithubActivity />
        <CreativeLab />

        {/* Academic publication research */}
        <Research />

        {/* Direct connection form */}
        <Contact />
      </main>

      {/* Base Footer */}
      <Footer />
      <PortfolioChat />
    </>
  )
}

export default function App() {
  const [view, setView] = useState(() => {
    return window.location.pathname
  })

  // Initialize Lenis scroll engine
  useLenis()

  useEffect(() => {
    document.title = view.replace(/\/$/, '') === '/ai-lab'
      ? 'AI Creative Lab — Kartik Varma'
      : view === '/' ? 'Kartik Varma — Full-Stack Developer' : 'Page not found — Kartik Varma'
  }, [view])

  useEffect(() => {
    const syncPath = () => setView(window.location.pathname)
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])

  return (
    <MotionConfig reducedMotion="user">

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative min-h-screen bg-transparent selection:bg-[#2563EB]/20 selection:text-[#2563EB]"
        >
          {view === '/' ? (
            <PortfolioHome />
          ) : view.replace(/\/$/, '') === '/ai-lab' ? (
            <main><CreativeLab standalone /></main>
          ) : (
            <main className="not-found container-custom"><span className="eyebrow">404 / A SMALL DETOUR</span><h1>This page isn’t here.</h1><a href="/">Back to the portfolio ↗</a></main>
          )}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
