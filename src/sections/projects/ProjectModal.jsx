import { useRef, useState } from 'react'
import { FaGithub as Github } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import { motion, useScroll, useReducedMotion } from 'framer-motion'
import { X, ArrowUpRight, ArrowRight, Check, Layers, ShieldCheck, ArrowLeft } from 'lucide-react'
import { projects } from '../../data/projects'
import { projectPresentation } from '../../data/projectPresentation'
import ProjectVisual from './ProjectVisual'

function CaseStudyReader({ project, setSelectedProject, modalRef, closeButtonRef }) {
  const reduced = useReducedMotion()
  const headerRef = useRef(null)
  const sectionRefs = useRef({})
  const [active, setActive] = useState('overview')
  const { scrollYProgress } = useScroll({ container: modalRef })
  const presentation = projectPresentation[project.id]
  const nextProject = projects[(projects.findIndex(item => item.id === project.id) + 1) % projects.length]
  const chapters = [
    { id: 'overview', label: 'The overview' },
    { id: 'features', label: 'The experience' },
    ...(project.architecture ? [{ id: 'architecture', label: 'The architecture' }] : []),
    ...(project.challenges ? [{ id: 'challenges', label: 'The challenge' }] : []),
    { id: 'stack', label: 'The toolkit' },
  ]
  const close = () => setSelectedProject(null)
  const goToChapter = id => {
    const container = modalRef.current
    const target = sectionRefs.current[id]
    if (!container || !target) return
    const top = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - (headerRef.current?.offsetHeight || 65) - 28
    container.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'instant' : 'smooth' })
    setActive(id)
  }
  const updateChapter = () => {
    const boundary = modalRef.current.getBoundingClientRect().top + (headerRef.current?.offsetHeight || 65) + 55
    let current = 'overview'
    chapters.forEach(({ id }) => { if (sectionRefs.current[id]?.getBoundingClientRect().top <= boundary) current = id })
    setActive(current)
  }
  const sectionNumber = id => String(chapters.findIndex(chapter => chapter.id === id) + 1).padStart(2, '0')

  return <motion.div className="case-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={close}>
    <motion.div ref={modalRef} className={`case-dialog case-theme-${presentation.theme}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-lenis-prevent onClick={event => event.stopPropagation()} onScroll={updateChapter} initial={{ y: reduced ? 0 : 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : 0.35 }}>
      <header ref={headerRef} className="case-top"><div><span className="case-wordmark">kv<span>✳</span></span><span className="case-breadcrumb">SELECTED WORK <i>/</i> {String(project.id).padStart(2, '0')}</span></div><button ref={closeButtonRef} onClick={close} aria-label="Close project details"><span>Back to work</span><X size={18} /></button><motion.div className="case-reading-progress" style={{ scaleX: scrollYProgress }} /></header>
      <div className="case-hero"><div className="case-hero-copy"><span className="eyebrow">{presentation.label} / {project.year}</span><h2 id="project-modal-title">{project.title}</h2><p>{project.subtitle}</p><div className="case-links"><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> Source code <ArrowUpRight size={15} /></a>{project.live && project.live !== project.github && <a className="case-live" href={project.live} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight size={15} /></a>}</div></div><div className="case-hero-visual"><ProjectVisual project={project} /></div></div>
      <dl className="case-facts"><div><dt>DISCIPLINE</dt><dd>{presentation.category}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div><div><dt>STATUS</dt><dd><span className="status-dot" /> {project.status}</dd></div><div><dt>CORE TECHNOLOGIES</dt><dd>{project.tags.slice(0, 3).join(' / ')}</dd></div></dl>
      <div className="case-layout"><aside className="case-sidebar"><span className="eyebrow">IN THIS CASE STUDY</span><nav aria-label="Case study chapters">{chapters.map(({ id, label }, index) => <button key={id} aria-current={active === id ? 'location' : undefined} onClick={() => goToChapter(id)}><span>{String(index + 1).padStart(2, '0')}</span>{label}<ArrowUpRight size={13} /></button>)}</nav><p>A closer look at the product, the decisions, and the engineering behind it.</p></aside>
        <div className="case-sections">
          <section ref={node => { sectionRefs.current.overview = node }} className="case-chapter" aria-labelledby="case-overview-title"><span className="case-chapter-number">01 / THE OVERVIEW</span><h3 id="case-overview-title">The idea behind the build.</h3><p className="case-lead">{project.longDescription || project.description}</p></section>
          <section ref={node => { sectionRefs.current.features = node }} className="case-chapter" aria-labelledby="case-features-title"><span className="case-chapter-number">02 / THE EXPERIENCE</span><h3 id="case-features-title">Designed around real needs.</h3><ul className="case-feature-grid">{project.features.map((feature, index) => <li key={feature}><span className="case-feature-index">{String(index + 1).padStart(2, '0')}<Check size={13} /></span><p>{feature}</p></li>)}</ul></section>
          {project.architecture && <section ref={node => { sectionRefs.current.architecture = node }} className="case-chapter" aria-labelledby="case-architecture-title"><span className="case-chapter-number">{sectionNumber('architecture')} / THE ARCHITECTURE</span><h3 id="case-architecture-title">How the pieces fit together.</h3><div className="case-architecture-note"><span><Layers size={23} strokeWidth={1.4} /></span><p>{project.architecture}</p></div><div className="case-architecture-stack">{(project.techStack || project.tags).map((tech, index) => <span key={tech}><small>{String(index + 1).padStart(2, '0')}</small>{tech}</span>)}</div></section>}
          {project.challenges && <section ref={node => { sectionRefs.current.challenges = node }} className="case-chapter" aria-labelledby="case-challenges-title"><span className="case-chapter-number">{sectionNumber('challenges')} / THE CHALLENGE</span><h3 id="case-challenges-title">The details that matter.</h3><div className="case-challenge-note"><ShieldCheck size={25} strokeWidth={1.3} /><p>{project.challenges}</p></div></section>}
          <section ref={node => { sectionRefs.current.stack = node }} className="case-chapter" aria-labelledby="case-stack-title"><span className="case-chapter-number">{sectionNumber('stack')} / THE TOOLKIT</span><h3 id="case-stack-title">Built with the right tools.</h3><div className="case-toolkit">{(project.techStack || project.tags).map(tag => <span key={tag}>{tag}</span>)}</div><a className="case-repository" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={17} /> Explore the implementation <ArrowUpRight size={16} /></a></section>
        </div>
      </div>
      <div className="case-next"><button className="case-return" onClick={close}><ArrowLeft size={16} /> All selected work</button><button className="case-next-project" onClick={() => setSelectedProject(nextProject)}><span><small>CONTINUE EXPLORING / {String(nextProject.id).padStart(2, '0')}</small><strong>{nextProject.title}</strong></span><ArrowRight size={25} strokeWidth={1.3} /></button></div>
    </motion.div>
  </motion.div>
}

export default function ProjectModal({ selectedProject, ...props }) {
  if (!selectedProject) return null
  return createPortal(<CaseStudyReader key={selectedProject.id} project={selectedProject} {...props} />, document.body)
}
