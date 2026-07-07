import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { Sparkles, Terminal, Activity, Server, Cpu, Database, Cloud, Hammer, Globe, Layers, ChevronDown } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard'

const categoryIcons = {
  all: Layers,
  frontend: Globe,
  backend: Server,
  database: Database,
  languages: Cpu,
  cloud: Cloud,
  tools: Hammer,
  aiml: Activity,
}

const categoryColors = {
  all: '#2563EB',
  frontend: '#2563EB',
  backend: '#38BDF8',
  database: '#10B981',
  languages: '#38BDF8',
  cloud: '#0284C7',
  tools: '#F59E0B',
  aiml: '#2563EB',
}

// Extract all unique skills across all categories
const uniqueSkillsMap = new Map()
skillCategories.forEach(cat => {
  cat.skills.forEach(skill => {
    if (!uniqueSkillsMap.has(skill.name)) {
      uniqueSkillsMap.set(skill.name, skill)
    }
  })
})
const allSkillsList = Array.from(uniqueSkillsMap.values())

const allCategory = {
  id: 'all',
  title: 'All Technologies',
  color: '#2563EB',
  skills: allSkillsList,
}

const rawCategoriesList = [allCategory, ...skillCategories]
const categoriesList = rawCategoriesList.map(cat => ({
  ...cat,
  color: categoryColors[cat.id] || '#2563EB',
}))

// Reusable skill card
function SkillCard({ skill, index, color }) {
  const SkillIcon = skill.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.25) }}
      className="p-3.5 rounded-xl border border-slate-200/60 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all duration-200 flex flex-col justify-between h-24 text-left relative group overflow-hidden shadow-sm"
    >
      <div
        className="absolute top-0 right-0 w-8 h-8 rounded-full opacity-[0.07] blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-center gap-3">
        <div className="text-xl shrink-0" style={{ color }}>
          <SkillIcon />
        </div>
        <div>
          <span className="font-grotesk text-xs font-extrabold text-[#0F172A] block">{skill.name}</span>
          <span className="text-[8px] font-grotesk tracking-widest text-[#475569] uppercase block mt-0.5">Verified</span>
        </div>
      </div>
      <div className="w-full">
        <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null)
  const [mobileOpenId, setMobileOpenId] = useState('all')

  const activeCategory = categoriesList.find(c => c.id === activeCategoryId) || allCategory
  const CategoryIcon = categoryIcons[activeCategory.id] || Cpu

  return (
    <section id="skills" className="relative section-padding bg-transparent overflow-visible">
      <div
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-[#0F172A] mb-4"
          >
            Software <span className="gradient-text">Telemetry Hub</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#475569] font-grotesk text-base sm:text-lg max-w-xl"
          >
            Select a pipeline node to explore technologies by category.
          </motion.p>
        </div>

        {/* â”€â”€ DESKTOP: Sticky left sidebar + natural-height right grid â”€â”€ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">

          {/* LEFT sticky sidebar */}
          <div
            className="lg:col-span-4 flex flex-col gap-3"
            style={{ position: 'sticky', top: '96px', alignSelf: 'flex-start' }}
          >
            <div className="text-[10px] font-bold font-grotesk tracking-widest text-[#475569] uppercase mb-2 flex items-center gap-2 px-1">
              <Terminal size={12} className="text-[#2563EB]" /> PIPELINE NODES
            </div>

            {categoriesList.map((category) => {
              const Icon = categoryIcons[category.id] || Cpu
              const isActive = activeCategoryId === category.id
              const isHovered = hoveredCategoryId === category.id

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                  onMouseLeave={() => setHoveredCategoryId(null)}
                  className="w-full text-left p-3.5 rounded-xl border transition-all duration-250 flex items-center justify-between group relative overflow-hidden shadow-sm"
                  style={{
                    background: isActive
                      ? `linear-gradient(90deg, ${category.color}0f 0%, rgba(255,255,255,0.97) 100%)`
                      : 'rgba(255,255,255,0.75)',
                    borderColor: isActive
                      ? `${category.color}50`
                      : isHovered
                        ? 'rgba(15,23,42,0.15)'
                        : 'rgba(15,23,42,0.06)',
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-300"
                    style={{ backgroundColor: category.color, opacity: isActive ? 1 : isHovered ? 0.4 : 0 }}
                  />
                  <div className="flex items-center gap-3 pl-1">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-200"
                      style={{
                        background: isActive ? `${category.color}15` : 'rgba(15,23,42,0.02)',
                        borderColor: isActive ? `${category.color}30` : 'rgba(15,23,42,0.05)',
                        color: isActive ? category.color : '#475569',
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <span className="font-sora text-xs sm:text-sm font-bold text-[#0F172A] block">
                        {category.title}
                      </span>
                      <span className="font-grotesk text-[9px] text-[#475569]">
                        Node: {category.id.toUpperCase()}_PIPELINE
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-grotesk text-[9px] font-bold px-2 py-0.5 rounded border transition-all duration-200"
                    style={{
                      borderColor: isActive ? `${category.color}30` : 'rgba(15,23,42,0.05)',
                      color: isActive ? category.color : '#475569',
                    }}
                  >
                    {category.skills.length} LIBS
                  </span>
                </button>
              )
            })}
          </div>

          {/* RIGHT: natural-height skill output panel */}
          <div className="lg:col-span-8">
            <GlowCard
              glowColor={activeCategory.color}
              className="p-6 sm:p-8 flex flex-col bg-white/90 border border-slate-200/80 shadow-md relative"
              tilt={false}
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/80 mb-6">
                <div className="flex items-center gap-2">
                  <CategoryIcon size={18} style={{ color: activeCategory.color }} />
                  <span className="font-sora text-base sm:text-lg font-extrabold text-[#0F172A]">
                    {activeCategory.title} Diagnostic
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-widest text-[#475569] uppercase">
                  Telemetry Code: {activeCategory.id}_0x9A
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <AnimatePresence mode="popLayout">
                  {activeCategory.skills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                      color={categoryColors[activeCategoryId] || skill.color || '#2563EB'}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-200/80 text-left">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase tracking-wider">Skills</span>
                  <span className="text-lg font-extrabold text-[#0F172A] font-sora">{activeCategory.skills.length}</span>
                  <span className="text-[9px] font-grotesk text-slate-400">in this category</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase tracking-wider">Categories</span>
                  <span className="text-lg font-extrabold text-[#0F172A] font-sora">{categoriesList.length}</span>
                  <span className="text-[9px] font-grotesk text-slate-400">tech groups</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase tracking-wider">Proficiency</span>
                  <span
                    className="text-xs font-extrabold font-sora mt-0.5 inline-block px-2.5 py-1 rounded-lg text-center"
                    style={{ backgroundColor: activeCategory.color, color: '#fff' }}
                  >
                    {activeCategory.id === 'frontend' || activeCategory.id === 'languages' || activeCategory.id === 'all'
                      ? 'Advanced'
                      : activeCategory.id === 'tools'
                        ? 'Proficient'
                        : 'Intermediate'}
                  </span>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>

        {/* â”€â”€ MOBILE: Smooth accordion per category â”€â”€ */}
        <div className="lg:hidden flex flex-col gap-2.5">
          <div className="text-[10px] font-bold font-grotesk tracking-widest text-[#475569] uppercase mb-1 flex items-center gap-2 px-1">
            <Terminal size={12} className="text-[#2563EB]" /> PIPELINE NODES
          </div>

          {categoriesList.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu
            const isOpen = mobileOpenId === category.id

            return (
              <div
                key={category.id}
                className="rounded-xl border overflow-hidden shadow-sm transition-all duration-200"
                style={{ borderColor: isOpen ? `${category.color}40` : 'rgba(15,23,42,0.08)' }}
              >
                {/* Toggle button */}
                <button
                  onClick={() => setMobileOpenId(isOpen ? null : category.id)}
                  className="w-full text-left p-3.5 flex items-center justify-between transition-colors duration-200 relative"
                  style={{
                    background: isOpen
                      ? `linear-gradient(90deg, ${category.color}0c 0%, rgba(255,255,255,1) 100%)`
                      : 'white',
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r transition-all duration-300"
                    style={{ backgroundColor: category.color, opacity: isOpen ? 1 : 0 }}
                  />
                  <div className="flex items-center gap-3 pl-1">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-200"
                      style={{
                        background: isOpen ? `${category.color}15` : 'rgba(15,23,42,0.02)',
                        borderColor: isOpen ? `${category.color}30` : 'rgba(15,23,42,0.05)',
                        color: isOpen ? category.color : '#475569',
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <span className="font-sora text-sm font-bold text-[#0F172A] block">{category.title}</span>
                      <span className="font-grotesk text-[9px] text-[#475569]">
                        {category.skills.length} libraries verified
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={16} className="text-slate-400" />
                  </motion.div>
                </button>

                {/* Collapsible panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="p-4 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-sora text-base font-bold text-slate-900">
                            {category.title} Diagnostic
                          </h3>
                          <span className="text-[9px] tracking-[0.15em] uppercase text-slate-400 font-grotesk">
                            {category.id.toUpperCase()}_0X9A
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {category.skills.map((skill, index) => (
                            <SkillCard
                              key={skill.name}
                              skill={skill}
                              index={index}
                              color={category.color}
                            />
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-grotesk font-bold">Category</p>
                            <p className="font-bold text-xs text-slate-800 font-sora mt-0.5">{category.title}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-grotesk font-bold">Skills</p>
                            <p className="font-bold text-sm text-slate-800 font-sora mt-0.5">{category.skills.length}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-grotesk font-bold">Proficiency</p>
                            <span
                              className="inline-block mt-0.5 px-2 py-0.5 rounded text-white text-[9px] font-bold font-grotesk text-center"
                              style={{ background: category.color }}
                            >
                              {category.id === 'frontend' || category.id === 'languages' || category.id === 'all'
                                ? 'Advanced'
                                : category.id === 'tools'
                                  ? 'Proficient'
                                  : 'Intermediate'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
