import { motion } from 'framer-motion'
import { educationList, certifications, languagesList } from '../data/education'
import GlowCard from '../components/ui/GlowCard'
import { GraduationCap, Award, BookOpen, Globe } from 'lucide-react'

export default function Research() {
  return (
    <section id="research" className="relative section-padding overflow-hidden bg-transparent">
      {/* Background radial spotlight */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[110px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="container-custom relative z-10">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold font-sora tracking-tight text-[#1E293B] mb-4"
          >
            Education & <span className="gradient-text-cyan">Credentials</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 font-grotesk text-base sm:text-lg max-w-xl"
          >
            My academic foundation in Computer Science and professional tech certifications.
          </motion.p>
        </div>

        {/* Education & Credentials Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left panel: Education degree */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="text-xl font-bold font-sora text-[#1E293B] flex items-center gap-2 mb-2">
              <GraduationCap size={20} className="text-[#2563EB]" />
              Academic Background
            </h3>

            {educationList.map((edu) => (
              <GlowCard
                key={edu.id}
                glowColor={edu.color}
                className="p-6 md:p-8 flex flex-col justify-between h-full relative"
                tilt={false}
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-grotesk font-bold border border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB] uppercase tracking-wider whitespace-nowrap">
                      GPA: {edu.gpa}
                    </span>
                    <span className="text-xs font-grotesk text-slate-400">
                      {edu.duration}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold font-sora text-[#1E293B] mb-2 leading-snug">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-grotesk text-slate-800 font-semibold mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs font-grotesk text-slate-600 mb-5 flex items-center gap-1">
                    <BookOpen size={12} /> {edu.university}
                  </p>

                  <p className="text-xs sm:text-sm font-grotesk text-slate-600 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Right panel: Certifications & Languages */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Certifications Card */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-sora text-[#1E293B] flex items-center gap-2 mb-2">
                <Award size={20} className="text-[#38BDF8]" />
                Certifications
              </h3>

              {certifications.map((cert) => (
                <GlowCard
                  key={cert.id}
                  glowColor={cert.color}
                  className="p-6 relative"
                  tilt={false}
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h4 className="text-lg font-bold font-sora text-[#1E293B]">
                      {cert.title}
                    </h4>
                    <span className="text-xs font-grotesk text-slate-400">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-xs font-grotesk text-[#10B981] font-semibold mb-3">
                    Issuer: {cert.issuer}
                  </p>
                  <p className="text-xs font-grotesk text-slate-600 leading-relaxed">
                    {cert.skills}
                  </p>
                </GlowCard>
              ))}
            </div>

            {/* Languages Card */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-sora text-[#1E293B] flex items-center gap-2 mb-2">
                <Globe size={18} className="text-[#10B981]" />
                Languages Spoken
              </h3>

              <GlowCard
                glowColor="#10B981"
                className="p-6"
                tilt={false}
              >
                <div className="grid grid-cols-3 gap-4">
                  {languagesList.map((lang, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-grotesk text-sm font-bold text-[#1E293B]">
                        {lang.name}
                      </span>
                      <span className="font-grotesk text-[10px] text-slate-600 mt-0.5">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
