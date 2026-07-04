import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FileText, ArrowRight, Terminal, Cpu, ShieldAlert, Sparkles, Send } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { personalInfo } from '../data/personalInfo'
import MagneticButton from '../components/ui/MagneticButton'

export default function Hero() {
  const [activeTab, setActiveTab] = useState('console') // 'console' | 'system' | 'ai'
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'systemctl start dev-server' },
    { type: 'output', text: '➜ Initializing Kartik Varma AI module...' },
    { type: 'output', text: '➜ Connecting to database: PostgreSQL (Port 5432)... OK' },
    { type: 'output', text: '➜ Clerk authentication service active.' },
    { type: 'output', text: '➜ Developer environment ready on http://localhost:3000' },
  ])
  const [inputValue, setInputValue] = useState('')
  const terminalEndRef = useRef(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalHistory])

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const cmd = inputValue.trim().toLowerCase()
    let response = ''

    if (cmd === 'help') {
      response = 'Available CLI actions: skills | projects | info | clear'
    } else if (cmd === 'skills') {
      response = 'Proficiencies: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, JWT, Supabase'
    } else if (cmd === 'projects') {
      response = 'Featured: Careerly (AI Platform) | FinTrack (Finance Tracker) | NEXUS-HR'
    } else if (cmd === 'info') {
      response = 'Kartik Ramesh Varma — Full Stack Developer based in Mumbai, India. GPA: 8.35/10.'
    } else if (cmd === 'clear') {
      setTerminalHistory([])
      setInputValue('')
      return
    } else {
      response = `Command not recognized: "${cmd}". Type "help" to see available actions.`
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: response },
    ])
    setInputValue('')
  }

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-transparent"
    >
      {/* Background radial overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-[10%] left-[20%] w-[550px] h-[550px] rounded-full opacity-[0.12] blur-[130px]"
          style={{
            background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[110px]"
          style={{
            background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          }}
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
            </span>
            {personalInfo.availability}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black font-sora tracking-tight text-[#1E293B] mb-6 select-none leading-none"
          >
            I'm <span className="gradient-text">{personalInfo.firstName}</span>
            <br />
            <span className="font-extralight text-slate-800">{personalInfo.lastName}</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl md:text-2xl font-grotesk font-medium text-slate-600 mb-8 h-10"
          >
            A{' '}
            <span className="text-[#1E293B] border-b-2 border-[#2563EB] pb-1">
              <TypeAnimation
                sequence={[
                  ...personalInfo.roles.flatMap(role => [role, 2000]),
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Short introduction bio */}
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
            {/* CTA Contact */}
            <MagneticButton
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20 transition-all flex items-center justify-center gap-2 cursor-none"
            >
              Contact Me
              <ArrowRight size={16} />
            </MagneticButton>

            {/* CTA Download Resume */}
            <a
              href={personalInfo.resumeUrl}
              download="Kartik_Varma_Resume.pdf"
              className="px-6 py-3.5 rounded-xl font-grotesk font-bold text-sm border border-slate-200 bg-slate-100/70 text-[#1E293B] hover:bg-slate-100/90 transition-all flex items-center justify-center gap-2 cursor-none text-center"
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
            {Object.entries(personalInfo.socials).map(([platform, url], index) => {
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

        {/* Right Side: Unique AI Interactive Dashboard Console */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="lg:col-span-6 w-full"
        >
          {/* Console Outer Frame */}
          <div className="w-full h-[400px] border border-slate-200 bg-[#FFFFFF]/80 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col">
            
            {/* Header Tabs */}
            <div className="h-12 border-b border-slate-200/50 bg-[#F1F5F9] flex items-center justify-between px-4 select-none">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#2563EB]/40 border border-[#2563EB]/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40 border border-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/40 border border-green-500/80" />
              </div>

              {/* Tab Selector Links */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('console')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'console'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Console
                </button>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'system'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold font-grotesk tracking-wider uppercase transition-colors ${
                    activeTab === 'ai'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  AI Shell
                </button>
              </div>
            </div>

            {/* Content Switcher */}
            <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'console' && (
                  /* TAB 1: CODE OUTPUT TERMINAL */
                  <motion.div
                    key="console"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-2.5 font-mono text-[11px] sm:text-xs text-slate-600 overflow-y-auto h-[280px] text-left pr-1"
                  >
                    <div><span className="text-slate-800 font-bold">bash ~ </span> npm run start-agent-diagnostics</div>
                    <div className="text-slate-400">Loading server profile dependencies...</div>
                    <div>➜ Name: <span className="text-slate-800 font-semibold">Kartik Ramesh Varma</span></div>
                    <div>➜ Track: <span className="text-[#2563EB]">Full-Stack Web Dev</span></div>
                    <div>➜ Stack: React · Next.js · Node · Express · Mongo · Postgres</div>
                    <div>➜ Status: <span className="text-emerald-600 font-semibold">ONLINE</span></div>
                    <div>➜ Target: Clerk Auth sync check ... <span className="text-emerald-600 font-semibold">PASSED</span></div>
                    <div>➜ DB Link: Supabase WebSockets ... <span className="text-emerald-600 font-semibold">ESTABLISHED</span></div>
                    <div className="text-slate-400">All subsystems running at 100% efficiency. Ready for input.</div>
                  </motion.div>
                )}

                {activeTab === 'system' && (
                  /* TAB 2: SYSTEM DIAGNOSTIC MONITOR */
                  <motion.div
                    key="system"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-[280px] py-2"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Stat item */}
                      <div className="p-3 border border-slate-200/50 bg-[#F1F5F9] rounded-xl flex items-center gap-3">
                        <Cpu className="text-[#2563EB]" size={18} />
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">SERVER STATUS</span>
                          <span className="text-xs font-bold text-slate-800 font-grotesk">ONLINE (12ms)</span>
                        </div>
                      </div>
                      {/* Stat item */}
                      <div className="p-3 border border-slate-200/50 bg-[#F1F5F9] rounded-xl flex items-center gap-3">
                        <Terminal className="text-[#10B981]" size={18} />
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-500 uppercase block">ACTIVE BRANCH</span>
                          <span className="text-xs font-bold text-slate-800 font-grotesk">main (Git)</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bars representing mock stats */}
                    <div className="flex flex-col gap-3.5 my-3 text-left">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-grotesk text-slate-600 font-bold">
                          <span>MERN DEPLOYMENT ACCURACY</span>
                          <span className="text-slate-800">98%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100/70 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2563EB]" style={{ width: '98%' }} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-grotesk text-slate-600 font-bold">
                          <span>API ENDPOINT RELIABILITY</span>
                          <span className="text-slate-800">100%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100/70 rounded-full overflow-hidden">
                          <div className="h-full bg-[#38BDF8]" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Footer */}
                    <div className="text-[10px] font-grotesk text-slate-400 border-t border-slate-200/50 pt-2 flex items-center gap-1.5 justify-start">
                      <ShieldAlert size={12} className="text-[#2563EB]" /> Subsystem protection protocols fully operational.
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ai' && (
                  /* TAB 3: MOCK AI SHELL RUNNER */
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-[280px]"
                  >
                    {/* Command Console Print */}
                    <div className="flex-1 overflow-y-auto flex flex-col gap-2 font-mono text-[11px] sm:text-xs text-left pr-1">
                      <div className="text-white/40">// Type commands below: help | skills | projects | info</div>
                      {terminalHistory.map((item, idx) => (
                        <div key={idx} className={item.type === 'input' ? 'text-white' : 'text-[#10B981]'}>
                          {item.type === 'input' ? 'guest$ ' : ''}{item.text}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Input Field Form */}
                    <form onSubmit={handleCommandSubmit} className="flex gap-2 border-t border-slate-200/50 pt-3">
                      <span className="font-mono text-xs text-slate-700 self-center">guest$</span>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type standard command..."
                        className="flex-1 bg-transparent border-none text-white font-mono text-xs focus:outline-none placeholder-white/20"
                      />
                      <button type="submit" className="p-1 rounded bg-slate-100/70 border border-slate-200 text-slate-700 hover:text-slate-900 transition-colors">
                        <Send size={12} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
