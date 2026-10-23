import { FaGithub as Github } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, ArrowUpRight, Check, Layers, ShieldCheck } from 'lucide-react'

export default function ProjectModal({ selectedProject: project, setSelectedProject, modalRef, closeButtonRef }) {
  if (!project) return null
  return createPortal(<motion.div className="case-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedProject(null)}>
    <motion.div ref={modalRef} className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-lenis-prevent onClick={event => event.stopPropagation()} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <header className="case-top"><span>PROJECT NOTES / {project.year}</span><button ref={closeButtonRef} onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={20} /></button></header>
      <div className="case-body"><span className="eyebrow">{project.subtitle}</span><h2 id="project-modal-title">{project.title}</h2><p className="case-overview">{project.longDescription || project.description}</p><div className="case-links"><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> Source code <ArrowUpRight size={15} /></a>{project.live && project.live !== project.github && <a href={project.live} target="_blank" rel="noopener noreferrer">Visit project <ArrowUpRight size={15} /></a>}</div>
        <div className="case-detail-block"><h3><Check size={17} /> What it does</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
        {project.architecture && <div className="case-detail-block"><h3><Layers size={17} /> How it’s built</h3><p>{project.architecture}</p></div>}
        {project.challenges && <div className="case-detail-block"><h3><ShieldCheck size={17} /> Engineering considerations</h3><p>{project.challenges}</p></div>}
        <div className="case-detail-block"><h3>The stack</h3><div className="work-tags">{(project.techStack || project.tags).map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </div>
    </motion.div>
  </motion.div>, document.body)
}
