import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { personalInfo } from '../../data/personalInfo'
import { useSectionNavigation } from '../../hooks/useSectionNavigation'
import { sectionLinks as links } from '../../utils/sectionNavigation'

export default function Navbar() {
  const active = useSectionNavigation()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus() } }
    const closeOnResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnResize)
    return () => { document.removeEventListener('keydown', closeOnEscape); window.removeEventListener('resize', closeOnResize) }
  }, [open])
  const navigate = () => setOpen(false)
  return (
    <header className="studio-nav">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="container-custom nav-inner">
        <a href="#hero" className="studio-brand" aria-label="Kartik Varma home" onClick={() => navigate('hero')}>kv<span>✳</span></a>
        <nav aria-label="Main navigation" className="desktop-navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => navigate(id)} aria-current={active === id ? 'location' : undefined}>{label}{active === id && <motion.span layoutId="nav-marker" className="nav-marker" />}</a>)}</nav>
        <a href={personalInfo.resumeUrl} download="Kartik_Varma_Resume.pdf" className="nav-resume">Resume <ArrowUpRight size={15} /></a>
        <button ref={toggleRef} className="nav-toggle" aria-label={open ? 'Close' : 'Toggle menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation" data-lenis-prevent initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
        {links.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={() => navigate(id)} aria-current={active === id ? 'location' : undefined}><span>0{index + 1}</span>{label}<ArrowUpRight size={18} /></a>)}
      </motion.nav>}</AnimatePresence>
    </header>
  )
}
