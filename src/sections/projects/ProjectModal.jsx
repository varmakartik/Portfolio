import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Server, Shield, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { techMeta } from "./techMeta"

/**
 * ProjectModal — full detail overlay for a selected project.
 * Props: selectedProject, setSelectedProject, modalRef, closeButtonRef
 */
export default function ProjectModal({ selectedProject, setSelectedProject, modalRef, closeButtonRef }) {
  if (!selectedProject) return null
  const accent = selectedProject.accentColor || "#2563EB"
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          style={{ background: "rgba(15, 23, 42, 0.25)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-[0_24px_60px_-15px_rgba(30,41,59,0.18)] overflow-hidden"
          >
            <div className="h-1 w-full rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent}, #38BDF8)` }} />
            <div data-lenis-prevent className="overflow-y-auto flex-1 modal-scroll-container" style={{ maxHeight: "calc(90vh - 4px)" }}>
              <div className="px-6 sm:px-7 pt-7 pb-5 relative" style={{ background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${accent}0a 0%, transparent 70%)` }}>
                <button ref={closeButtonRef} onClick={() => setSelectedProject(null)} aria-label="Close project details"
                  className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all cursor-pointer">
                  <X size={16} />
                </button>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-grotesk font-bold tracking-widest uppercase mb-3"
                  style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}20` }}>
                  {selectedProject.year} &bull; {selectedProject.status}
                </span>
                <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-black font-sora text-[#1E293B] leading-tight mb-1">{selectedProject.title}</h2>
                <p className="text-sm font-grotesk font-medium mb-5" style={{ color: accent }}>{selectedProject.subtitle}</p>
                <div className="flex gap-3">
                  {selectedProject.github && (<a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-grotesk font-bold text-[#1E293B] bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer"><FaGithub size={13} /> Repository</a>)}
                  {selectedProject.live && (<a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-grotesk font-bold text-white transition-all cursor-pointer" style={{ background: `linear-gradient(135deg, ${accent}, #38BDF8)` }}><ExternalLink size={13} /> Live Demo</a>)}
                </div>
              </div>
              <div className="h-px mx-6 sm:mx-7 bg-slate-200/60" />
              <div className="px-6 sm:px-7 py-6 space-y-6">
                <div>
                  <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-slate-400 mb-2">Overview</p>
                  <p className="text-sm font-grotesk text-[#475569] leading-relaxed">{selectedProject.longDescription || selectedProject.description}</p>
                </div>
                {(selectedProject.features || selectedProject.architecture) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedProject.features && (<div className="rounded-xl p-4 bg-slate-50/50 border border-slate-200/60"><p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-[#475569] mb-3 flex items-center gap-1.5"><Check size={11} className="text-[#2563EB]" /> Key Features</p><ul className="space-y-2">{selectedProject.features.map((feat, i) => (<li key={i} className="flex items-start gap-2 text-[12px] font-grotesk text-[#475569]"><span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />{feat}</li>))}</ul></div>)}
                    {selectedProject.architecture && (<div className="rounded-xl p-4 bg-slate-50/50 border border-slate-200/60"><p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-[#475569] mb-3 flex items-center gap-1.5"><Server size={11} className="text-[#38BDF8]" /> System Architecture</p><p className="text-[12px] font-grotesk text-[#475569] leading-relaxed">{selectedProject.architecture}</p></div>)}
                  </div>
                )}
                {selectedProject.challenges && (<div className="rounded-xl p-4 bg-red-50/30 border border-red-200/50"><p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-red-500 mb-2 flex items-center gap-1.5"><Shield size={11} /> Engineering Challenges</p><p className="text-[12px] font-grotesk text-[#475569] leading-relaxed">{selectedProject.challenges}</p></div>)}
                <div>
                  <p className="text-[10px] font-grotesk font-bold tracking-widest uppercase text-slate-400 mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProject.techStack || selectedProject.tags).map((tech, i) => {
                      const meta = techMeta[tech]
                      return (<span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-grotesk text-[11px] font-semibold" style={{ background: meta ? `${meta.color}0f` : "rgba(30,41,59,0.04)", border: `1px solid ${meta ? `${meta.color}25` : "rgba(30,41,59,0.08)"}`, color: meta ? meta.color : "#475569" }}>{tech}</span>)
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
