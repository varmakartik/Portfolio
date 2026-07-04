import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { Sparkles, Terminal, Activity, Server, Cpu, Database, Cloud, Hammer, Globe, Layers } from 'lucide-react'
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

// Category theme colors mapping for the 4-color palette
const categoryColors = {
  all: '#2563EB',       // Electric Blue
  frontend: '#2563EB',  // Electric Blue
  backend: '#38BDF8',   // Deep Violet
  database: '#10B981',  // Mint Green
  languages: '#38BDF8', // Coral Red
  cloud: '#0284C7',     // Sky Blue
  tools: '#F59E0B',     // Amber
  aiml: '#2563EB',      // Electric Blue
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
// Apply color overrides to all categories
const categoriesList = rawCategoriesList.map(cat => ({
  ...cat,
  color: categoryColors[cat.id] || '#2563EB',
}))

export default function TechStack() {
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null)

  const activeCategory = categoriesList.find(c => c.id === activeCategoryId) || allCategory
  const CategoryIcon = categoryIcons[activeCategory.id] || Cpu

  return (
    <section id="skills" className="relative section-padding bg-transparent overflow-visible">
      {/* Background aurora glow light */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-xs font-grotesk text-[#2563EB] mb-4"
          >
            <Sparkles size={12} /> Technology Metrics
          </motion.div>

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
            Select a pipeline node on the control console to output diagnostic library specifications.
          </motion.p>
        </div>

        {/* Dashboard Control Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">

          {/* Left Column: Command Console Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="text-[10px] font-bold font-grotesk tracking-widest text-[#475569] uppercase mb-2 flex items-center gap-2 px-1">
              <Terminal size={12} className="text-[#2563EB]" /> PIPELINE NODES
            </div>

            {categoriesList.map((category) => {
              const Icon = categoryIcons[category.id] || Cpu
              const isActive = activeCategoryId === category.id
              const isHovered = hoveredCategoryId === category.id

              return (
                <div key={category.id}>
                  <button
                    onClick={() =>
                      setActiveCategoryId(isActive ? "" : category.id)
                    }
                    onMouseEnter={() => setHoveredCategoryId(category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    className="w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden shadow-sm"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, ${category.color}0a 0%, rgba(255,255,255,0.95) 100%)`
                        : "rgba(255,255,255,0.7)",
                      borderColor: isActive
                        ? `${category.color}50`
                        : isHovered
                          ? "rgba(15,23,42,0.15)"
                          : "rgba(15,23,42,0.06)",
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                      style={{
                        backgroundColor: category.color,
                        opacity: isActive ? 1 : isHovered ? 0.4 : 0,
                      }}
                    />

                    <div className="flex items-center gap-3 pl-1">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center border"
                        style={{
                          background: isActive
                            ? `${category.color}15`
                            : "rgba(15,23,42,0.02)",
                          borderColor: isActive
                            ? `${category.color}30`
                            : "rgba(15,23,42,0.05)",
                          color: isActive ? category.color : "#475569",
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
                      className="font-grotesk text-[9px] font-bold px-2 py-0.5 rounded border"
                      style={{
                        borderColor: isActive
                          ? `${category.color}30`
                          : "rgba(15,23,42,0.05)",
                        color: isActive ? category.color : "#475569",
                      }}
                    >
                      {category.skills.length} LIBS
                    </span>
                  </button>

                  {/* Mobile Expand */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:hidden overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: 20 }}
                          className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-lg p-5"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <h3 className="font-sora text-xl font-bold text-slate-900">
                              {category.title} Diagnostic
                            </h3>

                            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500">
                              TELEMETRY CODE : {category.id.toUpperCase()}_0X9A
                            </span>
                          </div>

                          <div className="h-px bg-slate-200 my-5" />

                          {/* Skills */}
                          <div className="grid grid-cols-2 gap-4">
                            {category.skills.map((skill, index) => {
                              const SkillIcon = skill.icon;

                              return (
                                <motion.div
                                  key={skill.name}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: index * 0.05,
                                  }}
                                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <SkillIcon
                                      size={24}
                                      style={{ color: skill.color }}
                                    />

                                    <div>
                                      <h4 className="font-semibold text-slate-900 text-sm">
                                        {skill.name}
                                      </h4>

                                      <p className="uppercase tracking-widest text-[10px] text-slate-500">
                                        VERIFIED
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mt-4 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: "85%" }}
                                      transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                      }}
                                      className="h-full rounded-full"
                                      style={{
                                        background: category.color,
                                      }}
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="mt-6 border-t pt-5 border-slate-200 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                Telemetry Load
                              </p>

                              <h4 className="font-bold text-lg">
                                🟢 100% Sync
                              </h4>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                Active Deployments
                              </p>

                              <h4 className="font-bold text-lg">
                                {category.skills.length} Production
                              </h4>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                Category Priority
                              </p>

                              <span
                                className="inline-block mt-2 px-3 py-1 rounded-md text-white text-xs font-bold"
                                style={{
                                  background: category.color,
                                }}
                              >
                                Critical Core
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right Column: Holographic Tech Schematic Output (Flows with natural scroll height) */}
          <div className="hidden lg:block lg:col-span-8">
            <GlowCard
              glowColor={activeCategory.color}
              className="p-6 sm:p-8 flex flex-col justify-between h-full bg-white/90 border border-slate-200/80 shadow-md relative"
              tilt={false}
            >
              {/* Top structural tech tags */}
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

              {/* Grid Output of Libs (No inner scrollbar, expands naturally in height) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <AnimatePresence mode="popLayout">
                  {activeCategory.skills.map((skill, index) => {
                    const SkillIcon = skill.icon
                    const skillColor = categoryColors[activeCategoryId] || skill.color || '#2563EB'

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.3) }}
                        className="p-3.5 rounded-xl border border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between h-24 text-left relative group overflow-hidden shadow-sm"
                      >
                        {/* Glow highlight inside card */}
                        <div className="absolute top-0 right-0 w-8 h-8 rounded-full opacity-[0.08] blur-md pointer-events-none group-hover:scale-150 transition-transform duration-500"
                          style={{ backgroundColor: skillColor }}
                        />

                        <div className="flex items-center gap-3">
                          <div className="text-xl shrink-0" style={{ color: skillColor }}>
                            <SkillIcon />
                          </div>
                          <div>
                            <span className="font-grotesk text-xs font-extrabold text-[#0F172A] block">
                              {skill.name}
                            </span>
                            <span className="text-[8px] font-grotesk tracking-widest text-[#475569] uppercase block mt-0.5">
                              Verified
                            </span>
                          </div>
                        </div>

                        {/* Miniature progress bar */}
                        <div className="w-full">
                          <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '85%' }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: skillColor }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Bottom statistics panel */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
                <div>
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase block">
                    Telemetry Load
                  </span>
                  <span className="text-sm font-extrabold text-[#0F172A] font-sora mt-0.5 block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    100% Sync
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase block">
                    Active Deployments
                  </span>
                  <span className="text-sm font-extrabold text-[#0F172A] font-sora mt-0.5 block">
                    8 Production
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-bold font-grotesk text-[#475569] uppercase block">
                    Category Priority
                  </span>
                  <span className="text-sm font-extrabold text-white font-sora mt-0.5 block px-2.5 py-0.5 rounded text-center w-max text-xs" style={{ backgroundColor: activeCategory.color }}>
                    Critical Core
                  </span>
                </div>
              </div>
            </GlowCard>
          </div>

        </div>
      </div>
    </section>
  )
}
