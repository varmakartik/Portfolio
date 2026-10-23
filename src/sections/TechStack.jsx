import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { skillCategories } from '../data/skills'

export default function TechStack() {
  const [active, setActive] = useState('frontend')
  const reduced = useReducedMotion()
  const category = skillCategories.find(item => item.id === active) || skillCategories[0]
  return (
    <section id="skills" className="toolkit-section section-padding">
      <div className="container-custom">
        <div className="studio-section-heading" data-section-heading><div><span className="eyebrow">02 / TOOLS OF THE TRADE</span><h2>A curious mind.<br /><span>A versatile toolkit.</span></h2></div><p>The technologies I reach for to turn a good idea into a great experience.</p></div>
        <div className="toolkit-layout">
          <div className="toolkit-tabs" role="group" aria-label="Technology categories">{skillCategories.map((item, index) => <button key={item.id} aria-pressed={active === item.id} onClick={() => setActive(item.id)}><span className="toolkit-tab-index">0{index + 1}</span>{item.title}<ArrowUpRight size={17} /></button>)}</div>
          <div className="toolkit-panel"><div className="toolkit-panel-heading"><h3>{category.title}</h3><span>{category.skills.length} TECHNOLOGIES</span></div>
            <div className="toolkit-grid">{category.skills.map((skill, index) => {
              const Icon = skill.icon
              return <motion.div key={`${category.id}-${skill.name}`} className="toolkit-skill" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.025 }}><Icon size={27} /><span>{skill.name}</span><ArrowUpRight size={13} /></motion.div>
            })}</div>
            <p className="toolkit-footnote"><span className="status-dot" /> Always adding something new to the stack.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
