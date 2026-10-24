import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { skillCategories } from '../data/skills'
import { getNavigationInset, scrollToSection } from '../utils/sectionNavigation'

export default function TechStack() {
  const [active, setActive] = useState('frontend')
  const reduced = useReducedMotion()
  const panels = useRef({})
  useEffect(() => {
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
  }, [])

  return (
    <section id="skills" className="toolkit-section section-padding">
      <div className="container-custom">
        <div className="toolkit-layout toolkit-scroll-layout" data-section-heading>
          <aside className="toolkit-sidebar">
            <div className="studio-section-heading toolkit-intro"><div><span className="eyebrow">02 / TOOLS OF THE TRADE</span><h2>A curious mind.<br /><span>A versatile toolkit.</span></h2></div><p>The technologies I reach for to turn a good idea into a great experience.</p></div>
            <div className="toolkit-tabs" role="group" aria-label="Technology categories">{skillCategories.map((item, index) => <button key={item.id} aria-pressed={active === item.id} aria-controls={`skill-group-${item.id}`} onClick={() => { setActive(item.id); scrollToSection(`skill-group-${item.id}`, { updateHistory: false }) }}><span className="toolkit-tab-index">0{index + 1}</span>{item.title}<ArrowUpRight size={17} /></button>)}</div>
          </aside>
          <div className="toolkit-panels">{skillCategories.map((category, categoryIndex) => <section key={category.id} id={`skill-group-${category.id}`} ref={node => { panels.current[category.id] = node }} className="toolkit-panel" aria-labelledby={`skill-title-${category.id}`}><div className="toolkit-panel-heading"><h3 id={`skill-title-${category.id}`}><span className="toolkit-category-number">0{categoryIndex + 1} /</span>{category.title}</h3><span>{category.skills.length} TECHNOLOGIES</span></div>
            <div className="toolkit-grid">{category.skills.map((skill, index) => {
              const Icon = skill.icon
              return <motion.div key={`${category.id}-${skill.name}`} className="toolkit-skill" initial={{ opacity: 0, y: reduced ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.025 }}><Icon size={27} /><span>{skill.name}</span><ArrowUpRight size={13} /></motion.div>
            })}</div>
          </section>)}<p className="toolkit-footnote"><span className="status-dot" /> Always adding something new to the stack.</p></div>
        </div>
      </div>
    </section>
  )
}
