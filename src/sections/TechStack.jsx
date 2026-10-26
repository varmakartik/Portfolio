import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { skillCategories } from '../data/skills'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { getNavigationInset, scrollToSection } from '../utils/sectionNavigation'

// The breakpoint in refinements.css where .toolkit-sidebar stops being sticky.
// Below it the sidebar scrolls away with the page, so there is nothing pinned
// for a scroll position to drive.
const PINNED_LAYOUT = '(min-width: 768px)'

export default function TechStack() {
  const [active, setActive] = useState('frontend')
  const reduced = useReducedMotion()
  const pinned = useMediaQuery(PINNED_LAYOUT)
  const panels = useRef({})
  // The two layouts answer "which category am I looking at?" differently.
  //
  // Wide: every panel is stacked and the sticky rail follows the scroll
  // position, so the highlight is a readout of where the page already is.
  //
  // Narrow: the rail is gone and stacking all six panels buries the one the
  // reader asked for under hundreds of pixels of the ones they didn't. There
  // the tabs are the real control — one panel at a time, chosen by tapping —
  // so scroll position must not move the selection out from under them.
  useEffect(() => {
    if (!pinned) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      let current = skillCategories[0].id
      const boundary = getNavigationInset() + 80
      skillCategories.forEach(category => {
        if (panels.current[category.id]?.getBoundingClientRect().top <= boundary) current = category.id
      })
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pinned])

  // Each skill rises into place as it enters the viewport — a flourish that
  // belongs to the wide layout. On a phone the grid is a single tall column, so
  // the same effect turns reading the list into a sequence of chips appearing
  // under the thumb. There they are simply present.
  const chipMotion = (index) => (pinned && !reduced
    ? {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.35, delay: index * 0.025 },
      }
    : {})

  return (
    <section id="skills" className="toolkit-section section-padding">
      <div className="container-custom">
        <div className="toolkit-layout toolkit-scroll-layout" data-section-heading>
          <aside className="toolkit-sidebar">
            <div className="studio-section-heading toolkit-intro"><div><span className="eyebrow">02 / TOOLS OF THE TRADE</span><h2>A curious mind.<br /><span>A versatile toolkit.</span></h2></div><p>The technologies I reach for to turn a good idea into a great experience.</p></div>
            <div className="toolkit-tabs" role="group" aria-label="Technology categories">{skillCategories.map((item, index) => <button key={item.id} aria-pressed={active === item.id} aria-controls={`skill-group-${item.id}`} onClick={() => { setActive(item.id); if (pinned) scrollToSection(`skill-group-${item.id}`, { updateHistory: false }) }}><span className="toolkit-tab-index">0{index + 1}</span>{item.title}<ArrowUpRight size={17} /></button>)}</div>
          </aside>
          <div className="toolkit-panels">{skillCategories.map((category, categoryIndex) => <section key={category.id} id={`skill-group-${category.id}`} ref={node => { panels.current[category.id] = node }} className="toolkit-panel" hidden={!pinned && active !== category.id} aria-labelledby={`skill-title-${category.id}`}><div className="toolkit-panel-heading"><h3 id={`skill-title-${category.id}`}><span className="toolkit-category-number">0{categoryIndex + 1} /</span>{category.title}</h3><span>{category.skills.length} TECHNOLOGIES</span></div>
            <div className="toolkit-grid">{category.skills.map((skill, index) => {
              const Icon = skill.icon
              return <motion.div key={`${category.id}-${skill.name}`} className="toolkit-skill" {...chipMotion(index)}><Icon size={27} /><span>{skill.name}</span><ArrowUpRight size={13} /></motion.div>
            })}</div>
          </section>)}<p className="toolkit-footnote"><span className="status-dot" /> Always adding something new to the stack.</p></div>
        </div>
      </div>
    </section>
  )
}
