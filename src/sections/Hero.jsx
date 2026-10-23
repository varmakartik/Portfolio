import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, FileText, Code2, MapPin, MessageCircle } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { personalInfo } from '../data/personalInfo'

const icons = { github: FaGithub, linkedin: FaLinkedin, youtube: FaYoutube, instagram: FaInstagram }
const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(y, { stiffness: 130, damping: 22 })
  const rotateY = useSpring(x, { stiffness: 130, damping: 22 })
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease },
  })

  return (
    <section id="hero" className="studio-hero">
      <div className="container-custom">
        <motion.div className="hero-eyebrow" {...reveal()}>
          <span><span className="status-dot" /> {personalInfo.availability}</span>
          <span className="hero-location"><MapPin size={13} /> {personalInfo.location}</span>
        </motion.div>
        <div className="hero-composition">
          <div className="hero-copy">
            <motion.p className="eyebrow" {...reveal(0.08)}>FULL-STACK DEVELOPMENT / SOFTWARE ENGINEERING</motion.p>
            <motion.h1 {...reveal(0.16)}>Kartik<span className="hero-surname">Varma<span className="name-period">.</span></span></motion.h1>
            <motion.div className="hero-intro" {...reveal(0.25)}>
              <span className="intro-rule" />
              <div><h2>Turning ideas into<br /><em>things that work.</em></h2>
                <p>Full-stack developer crafting thoughtful interfaces, reliable systems, and everything in between.</p>
              </div>
            </motion.div>
            <motion.div className="hero-actions" {...reveal(0.34)}>
              <a href="#projects" className="studio-button primary">Explore my work <ArrowUpRight size={18} /></a>
              <a href={personalInfo.resumeUrl} download="Kartik_Varma_Resume.pdf" className="studio-button secondary"><FileText size={16} /> Download Resume</a>
            </motion.div>
            <motion.div className="hero-socials" {...reveal(0.42)}>
              <span>FIND ME ON</span>
              {Object.entries(personalInfo.socials).filter(([key, url]) => icons[key] && url !== '/').map(([key, url]) => {
                const Icon = icons[key]
                return <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}><Icon size={17} /></a>
              })}
            </motion.div>
          </div>
          <motion.div className="portrait-stage" {...reveal(0.25)}>
            <span className="portrait-orbit" aria-hidden="true" />
            <span className="portrait-cross" aria-hidden="true">✳</span>
            <motion.div className="portrait-frame"
              style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
              onPointerMove={(event) => {
                if (reduced || event.pointerType !== 'mouse') return
                const box = event.currentTarget.getBoundingClientRect()
                x.set(((event.clientX - box.left) / box.width - 0.5) * 9)
                y.set(((event.clientY - box.top) / box.height - 0.5) * -9)
              }}
              onPointerLeave={() => { x.set(0); y.set(0) }}>
              <img src={personalInfo.avatar} alt="Kartik Varma" fetchPriority="high" width="1553" height="1553" />
              <div className="portrait-shade" />
              <div className="portrait-caption"><span>HELLO, WORLD.</span><span>That’s me <ArrowUpRight size={16} /></span></div>
            </motion.div>
            <div className="floating-note"><Code2 size={23} /><div><strong>From frontend to backend.</strong><span>I connect the dots.</span></div><span className="note-dot" /></div>
            <div className="portrait-index">BASED IN MUMBAI · BUILDING FOR THE WEB</div>
          </motion.div>
        </div>
        <div className="hero-bottom"><a href="#experience"><span className="scroll-circle"><ArrowDown size={17} /></span> The story so far</a><span>GOOD DESIGN. CLEAN CODE. REAL IMPACT.</span></div>
        <button className="hero-chat-invite" onClick={() => window.dispatchEvent(new Event('open-portfolio-chat'))}><MessageCircle size={17} /><span>Curious about the person behind the code?</span><strong>Let’s chat <ArrowUpRight size={15} /></strong></button>
      </div>
    </section>
  )
}
