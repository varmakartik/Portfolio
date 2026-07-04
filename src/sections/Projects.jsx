import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import GlowCard from '../components/ui/GlowCard'
import { ExternalLink, X, Check, Server, Shield } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { modalVariants, overlayVariants, staggerContainer, staggerItem } from '../animations/variants'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Background aurora glow */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full opacity-[0.06] blur-[110px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
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
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            // Determine grid sizing based on metadata
            const isLarge = project.size === 'large'
            const isMedium = project.size === 'medium'
            
            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className={`flex flex-col ${
                  isLarge ? 'md:col-span-2 lg:col-span-2' : isMedium ? 'md:col-span-1 lg:col-span-1' : 'col-span-1'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <GlowCard 
                  glowColor={project.accentColor}
                  className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[380px] hover:border-[#2563EB]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  tilt={true}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-grotesk font-semibold text-slate-600 uppercase tracking-wider">
                        {project.year} • {project.status}
                      </span>
                      <div className="flex gap-2.5">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-600 hover:text-[#2563EB] transition-colors"
                          >
                            <FaGithub size={18} />
                          </a>
                        )}
                        {project.live && (
                          <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-slate-600 hover:text-[#2563EB] transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-2xl font-bold font-sora text-slate-800 mb-2 group-hover:text-[#2563EB] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-grotesk font-medium text-[#2563EB] mb-4">
                      {project.subtitle}
                    </p>

                    {/* Brief description */}
                    <p className="text-slate-600 font-grotesk text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Tag Panel */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 rounded-lg border border-slate-200/50 bg-white/[0.02] font-grotesk text-[10px] font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg border border-slate-200/50 bg-white/[0.02] font-grotesk text-[10px] font-semibold text-slate-600">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            >
              {/* Modal Container */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-[#FFFFFF] border border-slate-200 rounded-2xl p-6 md:p-8 my-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Visual Gradient Edge Overlay */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ background: `linear-gradient(90deg, ${selectedProject.accentColor}, #38BDF8)` }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-lg bg-slate-100/70 border border-slate-200/50 text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Content */}
                <div className="mt-4">
                  <span className="text-xs font-grotesk font-semibold text-slate-600 tracking-wide uppercase">
                    Project Showcase — {selectedProject.year}
                  </span>
                  
                  <h3 className="text-3xl font-bold font-sora text-slate-800 mt-1 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-base font-grotesk font-medium text-[#2563EB] mb-6">
                    {selectedProject.subtitle}
                  </p>

                  {/* Overview Text */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold font-sora text-slate-850 mb-2 uppercase tracking-wider">
                      Overview
                    </h4>
                    <p className="text-slate-600 font-grotesk text-sm leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {/* Key Features & Architecture Split Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {selectedProject.features && (
                      <div>
                        <h4 className="text-sm font-semibold font-sora text-slate-850 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                          <Check size={14} className="text-[#2563EB]" /> Key Features
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs font-grotesk text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.architecture && (
                      <div>
                        <h4 className="text-sm font-semibold font-sora text-slate-850 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                          <Server size={14} className="text-[#38BDF8]" /> System Architecture
                        </h4>
                        <p className="text-xs font-grotesk text-slate-600 leading-relaxed">
                          {selectedProject.architecture}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Challenges Panel */}
                  {selectedProject.challenges && (
                    <div className="mb-6 p-4 rounded-xl border border-slate-200/50 bg-slate-50/50">
                      <h4 className="text-sm font-semibold font-sora text-slate-850 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                        <Shield size={14} className="text-red-400" /> Engineering Challenges
                      </h4>
                      <p className="text-xs font-grotesk text-slate-600 leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  )}

                  {/* Technologies Panel */}
                  <div className="mb-8">
                    <h4 className="text-xs font-semibold font-sora text-slate-600 mb-3 uppercase tracking-wider">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.techStack || selectedProject.tags).map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-3 py-1.5 rounded-lg border border-slate-200/50 bg-slate-100/70 font-grotesk text-xs text-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200/50">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg border border-slate-200 bg-slate-100/70 text-slate-800 font-grotesk font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <FaGithub size={14} /> Repository
                      </a>
                    )}
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] font-grotesk font-semibold text-xs hover:bg-[#2563EB]/20 transition-all flex items-center gap-1.5"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
