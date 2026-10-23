import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Briefcase, GraduationCap, Plus, Minus } from 'lucide-react'
import { experiences } from '../data/experience'
import { educationList } from '../data/education'
import { personalInfo } from '../data/personalInfo'

const milestones = [
  ...experiences.map(item => ({ ...item, key: `work-${item.id}`, category: 'Work', current: item.endDate === 'Present' })),
  ...educationList.map(item => ({ key: `education-${item.id}`, category: 'Education', company: item.institution, role: item.degree, duration: item.duration, description: item.details, highlights: [item.university, `GPA: ${item.gpa}`], skills: ['Computer Science', 'Algorithms', 'Data Structures'], location: 'Mumbai, India', type: 'Bachelor’s degree' })),
]

function Milestone({ item, index, expanded, onToggle, reduced }) {
  const Icon = item.category === 'Education' ? GraduationCap : Briefcase
  return (
    <motion.li layout={!reduced} className={`milestone ${expanded ? 'is-expanded' : ''} ${item.current ? 'is-current' : ''}`}
      initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.5 }}>
      <span className="milestone-node" aria-hidden="true" />
      <div className="milestone-topline"><span>{item.duration}</span>{item.current ? <span className="current-badge"><span className="status-dot" /> CURRENT CHAPTER</span> : <span>{item.type}</span>}</div>
      <button className="milestone-trigger" onClick={onToggle} aria-expanded={expanded} aria-controls={`details-${item.key}`}>
        <span className="milestone-icon"><Icon size={21} /></span>
        <span className="milestone-heading"><span className="milestone-company">{item.company}</span><span className="milestone-role">{item.role}</span><span className="milestone-location">{item.location}</span></span>
        <span className="milestone-toggle">{expanded ? <Minus size={18} /> : <Plus size={18} />}</span>
      </button>
      <p className="milestone-description">{item.description}</p>
      <AnimatePresence initial={false}>
        {expanded && <motion.div key="details" id={`details-${item.key}`} className="milestone-details"
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <div className="milestone-details-inner"><span className="milestone-label">WHAT I WORKED ON</span>
            <ul>{item.highlights.map(highlight => <li key={highlight}><ArrowUpRight size={14} /><span>{highlight}</span></li>)}</ul>
            {item.companyUrl && <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">Visit {item.company} <ArrowUpRight size={14} /></a>}
          </div>
        </motion.div>}
      </AnimatePresence>
      <div className="milestone-footer"><div className="milestone-tags">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div><span className="chapter-index">{String(index + 1).padStart(2, '0')}</span></div>
    </motion.li>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState('All chapters')
  const [expanded, setExpanded] = useState('work-1')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const visible = milestones.filter(item => filter === 'All chapters' || item.category === filter)

  return (
    <section id="experience" ref={ref} className="journey-section">
      <div className="container-custom">
        <div data-section-heading className="journey-topline"><span className="eyebrow">01 / THE PATH SO FAR</span><span>MOST RECENT FIRST · ALWAYS MOVING FORWARD</span></div>
        <div className="journey-layout">
          <div className="journey-intro">
            <span className="journey-asterisk" aria-hidden="true">✳</span>
            <h2>My journey<span>is just<br />getting started.</span></h2>
            <p>From my first line of code to building real-world applications. Every chapter brings a new challenge, a new skill, and a little more perspective.</p>
            <div className="journey-summary"><div><strong>{String(experiences.length).padStart(2, '0')}</strong><span>Professional chapters</span></div><div><strong>2023</strong><span>Where it all began</span></div></div>
            <a href={personalInfo.resumeUrl} download="Kartik_Varma_Resume.pdf" className="journey-resume">The full story, on paper <ArrowUpRight size={17} /></a>
            <div className="journey-progress-label"><span>KEEP EXPLORING</span><ArrowDown size={16} /></div>
          </div>
          <div className="journey-timeline">
            <div className="journey-filters" role="group" aria-label="Filter journey">
              {['All chapters', 'Work', 'Education'].map(label => <button key={label} aria-pressed={filter === label} onClick={() => { setFilter(label); setExpanded(label === 'Education' ? 'education-1' : 'work-1') }}>
                {filter === label && <motion.span className="journey-filter-active" layoutId="journey-filter" transition={{ type: 'spring', stiffness: 350, damping: 32 }} />}
                <span>{label}</span><small>{label === 'All chapters' ? milestones.length : milestones.filter(item => item.category === label).length}</small>
              </button>)}
            </div>
            <div className="timeline-body">
              <div className="journey-rail" aria-hidden="true"><motion.div style={{ scaleY: reduced ? 1 : progress }} /></div>
              <ol aria-label={`${filter} timeline`}>
                {visible.map((item, index) => <Milestone key={item.key} item={item} index={index} expanded={expanded === item.key} onToggle={() => setExpanded(expanded === item.key ? null : item.key)} reduced={reduced} />)}
              </ol>
            </div>
            <div className="journey-next"><span className="status-dot" /><span>The next chapter? <a href="#contact">Let’s build it together <ArrowUpRight size={15} /></a></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
