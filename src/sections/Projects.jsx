import { FaGithub as Github } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { personalInfo } from '../data/personalInfo'
import { getLenis } from '../hooks/useLenis'
import ProjectVisual from './projects/ProjectVisual'
import { projectPresentation } from '../data/projectPresentation'
import ProjectModal from './projects/ProjectModal'

const categories = ['All work', 'Full-stack apps', 'AI-powered', 'Backend systems']
const technologies = [...new Set(projects.flatMap(project => project.techStack || project.tags))].sort()

export default function Projects() {
  const [category, setCategory] = useState('All work')
  const [technology, setTechnology] = useState('All technologies')
  const [selectedProject, setSelectedProject] = useState(null)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)
  const reduced = useReducedMotion()
  const visible = projects.filter(project => (category === 'All work' || projectPresentation[project.id].category === category) && (technology === 'All technologies' || (project.techStack || project.tags).includes(technology)))

  useEffect(() => {
    if (!selectedProject) return
    const previousOverflow = document.body.style.overflow
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const root = document.getElementById('root')
    const wasInert = root?.inert
    if (root) root.inert = true
    const handleKey = event => {
      if (event.key === 'Escape') { setSelectedProject(null); return }
      if (event.key !== 'Tab') return
      const items = modalRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
      if (!items?.length) return
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      if (root) root.inert = wasInert
      lenis?.start()
      document.removeEventListener('keydown', handleKey)
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [selectedProject])

  return <section id="projects" className="selected-work section-padding">
    <div className="container-custom">
      <div data-section-heading className="studio-section-heading work-heading"><div><span className="eyebrow">03 / SELECTED ENGINEERING</span><h2>Thoughtfully built.<br /><span>Made to work.</span></h2></div><div className="work-heading-aside"><p>From secure authentication to AI-powered products. A closer look at the systems I design and build.</p><a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer">Explore my GitHub <ArrowUpRight size={16} /></a></div></div>
      <div className="work-toolbar"><div className="work-filters" role="group" aria-label="Project category">{categories.map(label => <button key={label} aria-pressed={category === label} onClick={() => setCategory(label)}>{label}<span>{label === 'All work' ? projects.length : projects.filter(project => projectPresentation[project.id].category === label).length}</span></button>)}</div><label className="work-tech-filter"><span className="sr-only">Filter by technology</span><select value={technology} onChange={event => setTechnology(event.target.value)}><option>All technologies</option>{technologies.map(tech => <option key={tech}>{tech}</option>)}</select></label></div>
      <p className="work-result-count" role="status">{String(visible.length).padStart(2, '0')} projects selected{(category !== 'All work' || technology !== 'All technologies') && <button onClick={() => { setCategory('All work'); setTechnology('All technologies') }}>Reset filters ↗</button>}</p>
      <div className="work-grid">
        {visible.map(project => <motion.article key={project.id} className={`work-card ${project.id === 1 ? 'work-featured' : ''}`} initial={{ opacity: 0, y: reduced ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.5 }}>
          <ProjectVisual project={project} />
          <div className="work-content"><div className="work-meta"><span>{projectPresentation[project.id].category}</span><span>{project.year} <i /> {String(project.id).padStart(2, '0')}</span></div><h3>{project.title}</h3><p className="work-description">{project.description}</p><div className="work-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="work-actions"><button aria-label={`Read ${project.title} case study`} onClick={event => { triggerRef.current = event.currentTarget; setSelectedProject(project) }}>View case study <ArrowRight size={16} /></button><div><a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} title="Source code"><Github size={17} /></a>{project.live && project.live !== project.github && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`} title="Visit project"><ArrowUpRight size={20} /></a>}</div></div></div>
        </motion.article>)}
      </div>
      {!visible.length && <div className="work-empty"><h3>No projects in this combination yet.</h3><p>Try another technology or explore all the work.</p><button onClick={() => { setCategory('All work'); setTechnology('All technologies') }}>Show all projects <ArrowUpRight size={15} /></button></div>}
    </div>
    <ProjectModal selectedProject={selectedProject} setSelectedProject={setSelectedProject} modalRef={modalRef} closeButtonRef={closeButtonRef} />
  </section>
}
