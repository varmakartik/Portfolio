import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram } from 'react-icons/fa'
import { personalInfo } from '../../data/personalInfo'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    dribbble: FaDribbble,
    instagram: FaInstagram,
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-slate-200/50 bg-[#F8FAFC] py-12 md:py-16 overflow-hidden">
      {/* Glow highlight */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #2563EB 50%, transparent 100%)'
        }}
      />
      
      <div className="container-custom relative flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-sora border border-[#2563EB]/30 bg-[#2563EB]/5 text-[#2563EB]">
              KV
            </div>
            <span className="font-grotesk font-semibold tracking-wide text-[#1E293B]">
              {personalInfo.name}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-grotesk mt-1 text-center md:text-left">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-grotesk text-slate-600">
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="hover:text-[#2563EB] transition-colors">Home</a>
          <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="hover:text-[#2563EB] transition-colors">Skills</a>
          <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="hover:text-[#2563EB] transition-colors">Experience</a>
          <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="hover:text-[#2563EB] transition-colors">Projects</a>
          <a href="#research" onClick={(e) => handleLinkClick(e, '#research')} className="hover:text-[#2563EB] transition-colors">Research</a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-[#2563EB] transition-colors">Contact</a>
        </div>

        {/* Socials & Back To Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {Object.entries(personalInfo.socials).map(([platform, url]) => {
              const Icon = socialIcons[platform] || Github
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-200/50 bg-slate-100/70 text-slate-600 hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-all duration-300"
                  aria-label={platform}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] hover:bg-[#2563EB]/10 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
