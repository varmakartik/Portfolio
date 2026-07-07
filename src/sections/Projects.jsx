import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import { skillCategories } from '../data/skills'
import GlowCard from '../components/ui/GlowCard'
import { ExternalLink, X, Check, Server, Shield, LayoutGrid, Layers, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { modalVariants, overlayVariants, staggerContainer, staggerItem } from '../animations/variants'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiSupabase,
  SiMysql, SiSqlite,
} from 'react-icons/si'
import { FaUserShield, FaServer } from 'react-icons/fa'
import { Cpu } from 'lucide-react'

const techMeta = {
  'React': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#0F172A' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#475569' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'SQLite': { icon: SiSqlite, color: '#003B57' },
  'Supabase': { icon: SiSupabase, color: '#3ECF8E' },
  'Clerk API': { icon: FaUserShield, color: '#6C47FF' },
  'Clerk Auth': { icon: FaUserShield, color: '#6C47FF' },
  'Gemini SDK': { icon: Cpu, color: '#2563EB' },
  'Gemini AI': { icon: Cpu, color: '#2563EB' },
  'JWT': { icon: FaUserShield, color: '#D97706' },
  'Recharts': { icon: Cpu, color: '#E11D48' },
  'Realtime DB': { icon: SiSupabase, color: '#3ECF8E' },
  'Realtime Sync': { icon: SiSupabase, color: '#3ECF8E' },
  'Render': { icon: FaServer, color: '#46E3B7' },
}

// Build filter groups from project techStacks
const allProjectTechs = Array.from(new Set(projects.flatMap(p => p.techStack || p.tags)))

const filterGroups = [
  {
    id: 'all',
    label: 'All Projects',
    icon: Layers,
    color: '#2563EB',
    techs: null, // null means no tech filter, show all
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: SiReact,
    color: '#2563EB',
    techs: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: SiNodedotjs,
    color: '#339933',
    techs: ['Node.js', 'Express.js', 'JWT'],
  },
  {
    id: 'database',
    label: 'Database',
    icon: SiMongodb,
    color: '#47A248',
    techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Supabase'],
  },
  {
    id: 'services',
    label: 'Services',
    icon: FaUserShield,
    color: '#6C47FF',
    techs: ['Clerk API', 'Clerk Auth', 'Gemini SDK', 'Gemini AI', 'Recharts', 'Realtime DB', 'Realtime Sync'],
  },
]

// All unique techs from projects that actually exist
const availableTechs = allProjectTechs

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [poppedCardId, setPoppedCardId] = useState(null)
  const [activeGroupId, setActiveGroupId] = useState('all')
  const [activeTech, setActiveTech] = useState(null) // null = show all in group
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(false)
  const gridRef = useRef(null)

  // Collapse popped card when clicking outside the grid
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setPoppedCardId(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const activeGroup = filterGroups.find(g => g.id === activeGroupId)

  // Techs shown in the pill row = group techs intersected with what exists in projects
  const groupTechs = useMemo(() => {
    if (!activeGroup || !activeGroup.techs) return availableTechs
    return activeGroup.techs.filter(t => availableTechs.some(a => a.toLowerCase() === t.toLowerCase()))
  }, [activeGroupId])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeGroupId === 'all' && !activeTech) return projects
    const filterTech = activeTech || (activeGroup?.techs ?? null)
    if (!filterTech) return projects
    if (Array.isArray(filterTech)) {
      // group filter: show projects that have ANY of the group's techs
      return projects.filter(p =>
        (p.techStack || p.tags).some(t =>
          filterTech.some(ft => ft.toLowerCase() === t.toLowerCase())
        )
      )
    }
    return projects.filter(p =>
      (p.techStack || p.tags).some(t => t.toLowerCase() === filterTech.toLowerCase())
    )
  }, [activeGroupId, activeTech])

  const handleGroupClick = (groupId) => {
    setActiveGroupId(groupId)
    setActiveTech(null)
  }

  const handleTechClick = (tech) => {
    setActiveTech(prev => prev === tech ? null : tech)
  }

  const clearFilter = () => {
    setActiveGroupId('all')
    setActiveTech(null)
  }

  const isFiltered = activeGroupId !== 'all' || activeTech !== null

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background aurora glow */}
      <div
        className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full opacity-[0.06] blur-[110px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-[#1E293B] mb-4"
          >
            Featured <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 font-grotesk text-base sm:text-lg max-w-xl"
          >
            A collection of production-grade digital assets, creative applications, and architectural systems.
          </motion.p>

          {/* Desktop Filter Toggle Button */}
          <div className="hidden md:flex items-center gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setDesktopFilterOpen(prev => !prev)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white font-grotesk font-bold text-xs text-[#0F172A] hover:bg-slate-50 transition-colors shadow-sm"
            >
              <SlidersHorizontal size={13} className="text-[#2563EB]" />
              {desktopFilterOpen ? 'Hide Filters' : 'Filter Projects'}
              {isFiltered && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              )}
            </motion.button>
            {isFiltered && (
              <button
                onClick={clearFilter}
                className="text-[11px] font-grotesk font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* ══════ PREMIUM FILTER PANEL (DESKTOP) ══════ */}
        <AnimatePresence>
          {desktopFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: '2.5rem' }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block rounded-2xl border border-slate-200 bg-white shadow-[0_2px_20px_rgba(37,99,235,0.06),0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              {/* ── Category Tab Row ── */}
              <div className="flex items-stretch border-b border-slate-100 overflow-x-auto scrollbar-none">
                {filterGroups.map((group, idx) => {
                  const GroupIcon = group.icon
                  const isActive = activeGroupId === group.id
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleGroupClick(group.id)}
                      className="relative flex items-center gap-2 px-5 py-3.5 text-xs font-grotesk font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 group"
                      style={{
                        color: isActive ? group.color : '#64748B',
                        background: isActive ? `${group.color}08` : 'transparent',
                      }}
                    >
                      <GroupIcon
                        size={13}
                        style={{ color: isActive ? group.color : '#94A3B8' }}
                      />
                      {group.label}
                      {/* Active underline */}
                      {isActive && (
                        <motion.div
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full"
                          style={{ background: `linear-gradient(90deg, ${group.color}, ${group.color}88)` }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      {/* Hover underline */}
                      {!isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </button>
                  )
                })}

                {/* Spacer + Clear button */}
                <div className="flex-1" />
                <AnimatePresence>
                  {isFiltered && (
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={clearFilter}
                      className="flex items-center gap-1.5 px-4 text-[11px] font-grotesk font-bold text-slate-400 hover:text-red-500 transition-colors border-l border-slate-100 flex-shrink-0"
                    >
                      <X size={12} /> Reset
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Tech Pills Row ── */}
              <div className="px-5 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeGroupId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-wrap gap-2"
                  >
                    {groupTechs.map((tech) => {
                      const meta = techMeta[tech]
                      const TechIcon = meta?.icon
                      const isActive = activeTech === tech
                      return (
                        <motion.button
                          key={tech}
                          onClick={() => handleTechClick(tech)}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-grotesk font-semibold transition-all duration-200"
                          style={
                            isActive
                              ? {
                                backgroundColor: `${meta?.color || '#2563EB'}0f`,
                                borderColor: `${meta?.color || '#2563EB'}40`,
                                color: meta?.color || '#2563EB',
                              }
                              : {
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                borderColor: '#E2E8F0',
                                color: '#64748B',
                              }
                          }
                        >
                          {TechIcon && (
                            <TechIcon
                              size={12}
                              style={{ color: isActive ? (meta?.color || '#2563EB') : '#94A3B8', flexShrink: 0 }}
                            />
                          )}
                          {tech}
                          {isActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full ml-0.5"
                              style={{ background: meta?.color || '#2563EB' }}
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Result status bar ── */}
              <div
                className="px-5 py-2.5 border-t border-slate-100 flex items-center justify-between"
                style={{ background: '#F8FAFC' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-grotesk text-slate-500">
                    Showing{' '}
                    <motion.span
                      key={filteredProjects.length}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-slate-700 inline-block"
                    >
                      {filteredProjects.length}
                    </motion.span>
                    {' '}of <span className="font-bold text-slate-700">{projects.length}</span> projects
                    {activeTech && (
                      <> · filtered by <span className="font-bold" style={{ color: techMeta[activeTech]?.color || '#2563EB' }}>{activeTech}</span></>
                    )}
                    {!activeTech && activeGroupId !== 'all' && (
                      <> · <span className="font-bold" style={{ color: activeGroup?.color }}>{activeGroup?.label}</span> stack</>
                    )}
                  </span>
                </div>
                {isFiltered && (
                  <span className="text-[10px] font-grotesk text-slate-400">
                    {projects.length - filteredProjects.length} hidden
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════ PREMIUM FILTER PANEL (MOBILE DROPDOWN Selector) ══════ */}
        <div className="md:hidden relative mb-8 z-30">
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm font-grotesk text-xs font-bold text-slate-700 transition-colors hover:border-[#2563EB]/30"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-[#2563EB]" />
              {activeTech ? (
                <span>
                  Filtered by:{' '}
                  <span className="font-extrabold text-[#2563EB]">{activeTech}</span>
                </span>
              ) : activeGroupId !== 'all' ? (
                <span>
                  Group:{' '}
                  <span className="font-extrabold text-[#2563EB]">{activeGroup?.label}</span>
                </span>
              ) : (
                'All Technologies'
              )}
            </span>
            <motion.div animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}>
              <ChevronDown size={14} className="text-slate-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {mobileDropdownOpen && (
              <>
                {/* Backdrop overlay for mobile clickout */}
                <div
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setMobileDropdownOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-2 z-50 rounded-xl border border-slate-200 bg-white shadow-lg p-2.5 max-h-[300px] overflow-y-auto flex flex-col gap-1"
                >
                  {/* Reset/All Option */}
                  <button
                    onClick={() => {
                      clearFilter()
                      setMobileDropdownOpen(false)
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[11px] font-grotesk font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span>All Stack Projects</span>
                    {activeGroupId === 'all' && !activeTech && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    )}
                  </button>

                  <div className="h-px bg-slate-100 my-1" />

                  {/* Available Stack Options */}
                  {availableTechs.map((tech) => {
                    const meta = techMeta[tech]
                    const TechIcon = meta?.icon
                    const isSelected = activeTech === tech
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          handleTechClick(tech)
                          setMobileDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[11px] font-grotesk font-semibold hover:bg-slate-50 transition-colors"
                        style={{ color: isSelected ? (meta?.color || '#2563EB') : '#475569' }}
                      >
                        <span className="flex items-center gap-2">
                          {TechIcon && <TechIcon size={12} style={{ color: meta?.color || '#2563EB' }} />}
                          {tech}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta?.color || '#2563EB' }} />
                        )}
                      </button>
                    )
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ── Project Grid ── */}
        <motion.div
          ref={gridRef}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isLarge = project.size === 'large'
              const isMedium = project.size === 'medium'
              const isPopped = poppedCardId === project.id
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={isPopped
                    ? { opacity: 1, scale: 1.05, y: -14, rotate: 1.5, zIndex: 20 }
                    : { opacity: 1, scale: 1, y: 0, rotate: 0, zIndex: 1 }
                  }
                  exit={{ opacity: 0, scale: 0.90, y: 8 }}
                  whileHover={!isPopped ? { y: -6 } : {}}
                  transition={{ type: 'spring', stiffness: 340, damping: 26 }}
                  style={{ position: 'relative', zIndex: isPopped ? 20 : 1 }}
                  className={`flex flex-col ${isLarge ? 'md:col-span-2 lg:col-span-2' : isMedium ? 'md:col-span-1 lg:col-span-1' : 'col-span-1'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPoppedCardId(prev => prev === project.id ? null : project.id)
                  }}
                >
                  <GlowCard
                    glowColor={project.accentColor}
                    className={`p-6 md:p-8 flex flex-col justify-between h-full min-h-[380px] transition-all duration-300 cursor-pointer ${isPopped
                        ? 'border-[#2563EB]/50 shadow-[0_24px_60px_rgba(37,99,235,0.22),0_8px_24px_rgba(0,0,0,0.12)]'
                        : 'hover:border-[#2563EB]/40 hover:shadow-lg'
                      }`}
                    tilt={!isPopped}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                          {project.year} • {project.status}
                        </span>
                        <div className="flex gap-2.5">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-600 hover:text-[#2563EB] transition-colors">
                              <FaGithub size={18} />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-600 hover:text-[#2563EB] transition-colors">
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold font-sora text-slate-800 mb-2">{project.title}</h3>
                      <p className="text-sm font-grotesk font-medium text-[#2563EB] mb-4">{project.subtitle}</p>
                      <p className="text-slate-600 font-grotesk text-sm mb-6 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 4).map((tag, tIdx) => {
                        const isHighlighted = activeTech && tag.toLowerCase() === activeTech.toLowerCase()
                        return (
                          <span key={tIdx}
                            className="px-2.5 py-1 rounded-lg border font-grotesk text-[10px] font-semibold transition-all duration-200"
                            style={isHighlighted
                              ? { borderColor: `${techMeta[activeTech]?.color || '#2563EB'}60`, background: `${techMeta[activeTech]?.color || '#2563EB'}10`, color: techMeta[activeTech]?.color || '#2563EB' }
                              : { borderColor: 'rgba(15,23,42,0.08)', background: 'rgba(255,255,255,0.02)', color: '#475569' }
                            }
                          >{tag}</span>
                        )
                      })}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-lg border border-slate-200/50 bg-white/[0.02] font-grotesk text-[10px] font-semibold text-slate-600">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* View Details button — only visible when card is popped */}
                    <AnimatePresence>
                      {isPopped && (
                        <motion.button
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project)
                            setPoppedCardId(null)
                          }}
                          className="mt-4 self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-sora font-bold text-[11px] text-white tracking-wide cursor-none"
                          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)' }}
                        >
                          View Details
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M6 3l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </GlowCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-slate-400 font-grotesk text-base mb-4">
                No projects use <span className="font-bold text-[#2563EB]">{activeTech}</span>.
              </p>
              <button onClick={clearFilter}
                className="px-5 py-2 rounded-xl text-sm font-grotesk font-bold border border-[#2563EB]/30 text-[#2563EB] bg-[#2563EB]/5 hover:bg-[#2563EB]/10 transition-all">
                Show all projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Premium Modal Detail Overlay ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: 'rgba(15, 23, 42, 0.25)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200/80 shadow-[0_24px_60px_-15px_rgba(30,41,59,0.18)]"
            >
              {/* Accent top bar */}
              <div className="h-1 w-full rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${selectedProject.accentColor || '#2563EB'}, #38BDF8)` }}
              />

              {/* Header block */}
              <div className="px-6 sm:px-7 pt-7 pb-5 relative"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${selectedProject.accentColor || '#2563EB'}0a 0%, transparent 70%)`,
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-none"
                >
                  <X size={16} />
                </button>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-grotesk font-bold tracking-widest uppercase mb-3"
                  style={{ background: `${selectedProject.accentColor || '#2563EB'}12`, color: selectedProject.accentColor || '#2563EB', border: `1px solid ${selectedProject.accentColor || '#2563EB'}20` }}
                >
                  {selectedProject.year} &bull; {selectedProject.status}
                </span>

                <h2 className="text-2xl sm:text-3xl font-black font-sora text-[#1E293B] leading-tight mb-1">
                  {selectedProject.title}
                </h2>
                <p className="text-sm font-grotesk font-medium mb-5"
                  style={{ color: selectedProject.accentColor || '#2563EB' }}
                >
                  {selectedProject.subtitle}
                </p>

                {/* Quick action links */}
                <div className="flex gap-3">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-grotesk font-bold text-[#1E293B] bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-none"
                    >
                      <FaGithub size={13} /> Repository
                    </a>
                  )}
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-grotesk font-bold text-white transition-all cursor-none"
                      style={{ background: `linear-gradient(135deg, ${selectedProject.accentColor || '#2563EB'}, #38BDF8)` }}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mx-6 sm:mx-7 bg-slate-200/60" />

              {/* Body sections */}
              <div className="px-6 sm:px-7 py-6 space-y-6">

                {/* Overview */}
                <div>
                  <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-slate-400 mb-2">Overview</p>
                  <p className="text-sm font-grotesk text-[#475569] leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Features + Architecture */}
                {(selectedProject.features || selectedProject.architecture) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedProject.features && (
                      <div className="rounded-xl p-4 bg-slate-50/50 border border-slate-200/60">
                        <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-[#475569] mb-3 flex items-center gap-1.5">
                          <Check size={11} className="text-[#2563EB]" /> Key Features
                        </p>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-[12px] font-grotesk text-[#475569]">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ background: selectedProject.accentColor || '#2563EB' }}
                              />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProject.architecture && (
                      <div className="rounded-xl p-4 bg-slate-50/50 border border-slate-200/60">
                        <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-[#475569] mb-3 flex items-center gap-1.5">
                          <Server size={11} className="text-[#38BDF8]" /> System Architecture
                        </p>
                        <p className="text-[12px] font-grotesk text-[#475569] leading-relaxed">{selectedProject.architecture}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Engineering Challenges */}
                {selectedProject.challenges && (
                  <div className="rounded-xl p-4 bg-red-50/30 border border-red-200/50">
                    <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-red-500 mb-2 flex items-center gap-1.5">
                      <Shield size={11} /> Engineering Challenges
                    </p>
                    <p className="text-[12px] font-grotesk text-[#475569] leading-relaxed">{selectedProject.challenges}</p>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-slate-400 mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.techStack || selectedProject.tags).map((tech, tIdx) => {
                      const meta = techMeta[tech]
                      return (
                        <span key={tIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-grotesk text-[11px] font-semibold"
                          style={{
                            background: meta ? `${meta.color}0f` : 'rgba(30,41,59,0.04)',
                            border: `1px solid ${meta ? `${meta.color}25` : 'rgba(30,41,59,0.08)'}`,
                            color: meta ? meta.color : '#475569',
                          }}
                        >
                          {meta && <meta.icon size={11} />}
                          {tech}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
