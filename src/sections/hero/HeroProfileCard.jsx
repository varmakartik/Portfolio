import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { personalInfo } from "../../data/personalInfo"

/**
 * HeroProfileCard
 * The 3D flip card showing the developer photo (front) and brief bio (back).
 * Only enables flipping on non-mobile screens.
 */
export default function HeroProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div
      className={`relative select-none ${isMobile ? "" : "cursor-pointer"}`}
      style={{ perspective: "1100px" }}
      onClick={() => { if (!isMobile) setIsFlipped(f => !f) }}
      title={isMobile ? personalInfo.name : (isFlipped ? "Tap to flip back" : "Tap to learn about me")}
    >
      <motion.div
        animate={{ rotateY: isMobile ? 0 : (isFlipped ? 180 : 0) }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", width: "100%", position: "relative", minHeight: "130px" }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(37,99,235,0.10),0_1px_4px_rgba(0,0,0,0.04)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div aria-hidden="true" className="absolute -left-10 -top-10 w-44 h-44 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)" }} />
          <div aria-hidden="true" className="absolute top-3 right-12 grid grid-cols-4 gap-[5px] opacity-[0.15]">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#2563EB]" />
            ))}
          </div>
          <div className="relative flex items-center gap-4 p-5 z-10">
            <div className="relative flex-shrink-0 animate-float-slow z-50">
              <div className="rounded-full p-[3px]"
                style={{ background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)", boxShadow: "0 0 20px rgba(37,99,235,0.28)" }}>
                <div className="rounded-full p-[2px] bg-white">
                  <img src={personalInfo.avatar} alt={personalInfo.name}
                    className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full object-cover object-top block" />
                </div>
              </div>
              <span className="absolute bottom-[4px] right-[2px] flex items-center justify-center w-[12px] h-[12px] rounded-full bg-white shadow">
                <span className="relative flex w-[8px] h-[8px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-[8px] h-[8px] bg-emerald-500" />
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-1 text-left z-10 flex-1 min-w-0">
              <p className="text-[9px] font-grotesk font-extrabold text-[#2563EB] uppercase tracking-[0.15em]">Full-Stack Developer</p>
              <h2 className="text-[16px] sm:text-[18px] font-black font-sora text-[#0F172A] leading-tight">{personalInfo.name}</h2>
              <p className="text-[11px] font-grotesk text-slate-500">📍 {personalInfo.location}</p>
            </div>
          </div>
          {!isMobile && (
            <div className="absolute bottom-2.5 right-3 text-[9px] font-grotesk font-bold text-slate-400 tracking-wider flex items-center gap-1 z-20">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
              tap to flip
            </div>
          )}
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center"
          style={{
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)", background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            border: "1px solid rgba(37,99,235,0.25)", boxShadow: "0 0 0 1px rgba(37,99,235,0.15), 0 8px 32px rgba(0,0,0,0.3)",
            display: isMobile ? "none" : "flex",
          }}>
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: "linear-gradient(to bottom, #2563EB, #38BDF8)" }} />
          <div className="pl-6 pr-5 py-5 flex flex-col justify-center gap-2 w-full">
            <p className="text-[9px] font-grotesk font-extrabold text-[#38BDF8] uppercase tracking-[0.18em] mb-0.5">About Me</p>
            <p className="text-[12px] sm:text-[12.5px] font-grotesk text-slate-300 leading-relaxed">
              Passionate <span className="text-white font-bold">Full-Stack Developer</span> from Mumbai, building scalable web products. Specializing in React, Node.js &amp; AI-integrated systems.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              <span className="text-[10px] font-grotesk text-slate-400">🎓 B.Sc CS • GPA 8.35</span>
              <span className="text-[10px] font-grotesk text-slate-400">🚀 5+ Projects Shipped</span>
            </div>
          </div>
          <div className="absolute bottom-2.5 right-3 text-[9px] font-grotesk font-bold text-slate-500 tracking-wider flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            tap to flip back
          </div>
        </div>
      </motion.div>
      <div style={{ minHeight: "130px" }} aria-hidden="true" />
    </div>
  )
}
