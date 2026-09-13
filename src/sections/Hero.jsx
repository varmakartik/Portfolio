import { motion } from 'framer-motion'
import { FileText, ArrowRight } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import { personalInfo } from '../data/personalInfo'
import MagneticButton from '../components/ui/MagneticButton'
import HeroProfileCard from './hero/HeroProfileCard'
import HeroTerminal from './hero/HeroTerminal'

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  youtube: FaYoutube,
  instagram: FaInstagram,
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* Background radial overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[10%] left-[20%] w-[550px] h-[550px] rounded-full opacity-[0.12] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[110px]"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

        {/* Left Side: Identity Info */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 text-xs font-grotesk text-[#2563EB] mb-6 select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
            </span>
            {personalInfo.availability}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl font-black font-sora tracking-tight text-[#1E293B] mb-6 select-none leading-none"
          >
            I'm <span className="gradient-text">{personalInfo.firstName}</span>
            <br />
            <span className="font-extralight gradient-text">{personalInfo.lastName}</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl md:text-2xl font-grotesk font-medium text-slate-600 mb-8 h-9 sm:h-10"
          >
            A{' '}
            <span className="text-[#1E293B] border-b-2 border-[#2563EB] pb-1">
              <TypeAnimation
                sequence={[...personalInfo.roles.flatMap(role => [role, 2000])]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Short intro bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base font-grotesk text-slate-600 max-w-xl mb-10 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 w-full sm:w-auto"
          >
            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Contact Me
              <ArrowRight size={16} />
            </MagneticButton>

            <a
              href={personalInfo.resumeUrl}
              download="Kartik_Varma_Resume.pdf"
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-slate-200 bg-slate-100/70 text-[#1E293B] hover:bg-slate-100/90 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {Object.entries(personalInfo.socials).map(([platform, url]) => {
              const Icon = socialIcons[platform] || FaGithub
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200/50 bg-slate-100/70 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-300"
                  aria-label={platform}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Right Side: Profile Card + Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="lg:col-span-6 w-full flex flex-col gap-5"
        >
          <HeroProfileCard />
          <HeroTerminal />
        </motion.div>

      </div>
    </section>
  )
}