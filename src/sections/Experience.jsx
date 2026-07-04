import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { experiences } from '../data/experience'
import GlowCard from '../components/ui/GlowCard'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

export default function Experience() {
  const containerRef = useRef(null)
  
  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Apply spring smoothing to the raw scroll progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  // Map the smoothed spring progress to the visual line height
  const lineHeight = useTransform(smoothProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="experience" ref={containerRef} className="relative section-padding overflow-hidden">
      {/* Aurora glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      
      <div className="container-custom relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-[#1E293B] mb-4"
          >
            My <span className="gradient-text-purple">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 font-grotesk text-base sm:text-lg max-w-xl"
          >
            A chronological timeline of my professional career, milestones, and technological growth.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200/50 -translate-x-1/2" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[21px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#38BDF8] to-[#10B981] shadow-[0_0_15px_#2563EB] -translate-x-1/2 origin-top"
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={exp.id} className={`flex flex-col md:flex-row items-stretch gap-8 relative ${isEven ? '' : 'md:flex-row-reverse'}`}>
                  {/* Indicator Icon */}
                  <div className="absolute left-0 md:left-1/2 w-11 h-11 rounded-full border-4 border-[#F8FAFC] bg-[#FFFFFF] flex items-center justify-center -translate-x-[2px] md:-translate-x-1/2 z-10"
                      style={{ borderColor: exp.color || '#2563EB' }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: exp.color || '#2563EB', boxShadow: `0 0 10px ${exp.color || '#2563EB'}` }}
                    />
                  </div>

                  {/* Spacer (for desktop structure) */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Card Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    className="w-full md:w-1/2"
                  >
                    <GlowCard 
                      glowColor={exp.color}
                      className="p-6 md:p-8 flex flex-col h-full border border-slate-200/50 bg-[#FFFFFF]/40 backdrop-blur-xl relative"
                      tilt={true}
                    >
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-grotesk text-slate-600">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/50 bg-slate-100/70">
                          <Calendar size={12} className="text-[#2563EB]" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200/50 bg-slate-100/70">
                          <MapPin size={12} className="text-[#38BDF8]" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-4 mb-5">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border border-slate-200"
                          style={{ 
                            color: exp.color || '#2563EB', 
                            backgroundColor: `${exp.color || '#2563EB'}08`
                          }}
                        >
                          {exp.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold font-sora text-slate-800">{exp.role}</h3>
                          <a 
                            href={exp.companyUrl || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm font-grotesk font-semibold hover:text-[#2563EB] transition-colors"
                            style={{ color: exp.companyUrl ? (exp.color || '#2563EB') : '#9CA3AF' }}
                          >
                            {exp.company}
                          </a>
                        </div>
                      </div>

                      {/* Body Description */}
                      <p className="font-grotesk text-sm text-slate-600 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      {exp.highlights && (
                        <ul className="mb-6 space-y-2 text-xs font-grotesk text-slate-600 list-disc list-inside">
                          {exp.highlights.map((item, key) => (
                            <li key={key} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {exp.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="px-2.5 py-1 rounded-lg border border-slate-200/50 bg-white/[0.02] font-grotesk text-[10px] font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
