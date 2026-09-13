import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Cpu, ShieldAlert, Send } from "lucide-react"

const INITIAL_HISTORY = [
  { type: "input", text: "systemctl start dev-server" },
  { type: "output", text: "➜ Initializing Kartik Varma AI module..." },
  { type: "output", text: "➜ Connecting to database: PostgreSQL (Port 5432)... OK" },
  { type: "output", text: "➜ Clerk authentication service active." },
  { type: "output", text: "➜ Developer environment ready on http://localhost:3000" },
]

/**
 * HeroTerminal
 * The tabbed console widget with AI Shell, Console Diagnostics, and System tabs.
 * All command logic is contained here; uses a custom event to navigate to TechMessages.
 */
export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState("ai")
  const [terminalHistory, setTerminalHistory] = useState(INITIAL_HISTORY)
  const [inputValue, setInputValue] = useState("")
  const terminalScrollRef = useRef(null)

  useEffect(() => {
    const terminal = terminalScrollRef.current
    if (terminal) terminal.scrollTop = terminal.scrollHeight
  }, [terminalHistory])

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    const cmd = inputValue.trim().toLowerCase()
    let response = ""

    if (cmd === "help") {
      response = "Available CLI actions: skills | projects | info | telemetry | clear"
    } else if (cmd === "skills") {
      response = "Proficiencies: React, Next.js, Node.js, Express, MongoDB, PostgreSQL, JWT, Supabase"
    } else if (cmd === "projects") {
      response = "Featured: Zero Authentication System (OIDC/OAuth2 PKCE) | Careerly (AI Platform) | FinTrack | NEXUS-HR"
    } else if (cmd === "info") {
      response = "Kartik Ramesh Varma — Full Stack Developer based in Mumbai, India. GPA: 8.35/10."
    } else if (cmd === "oracle" || cmd === "quotes" || cmd === "telemetry") {
      response = "Connecting to Tech Telemetry Oracle broadcast stream..."
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigate", { detail: "tech-messages" }))
      }, 750)
    } else if (cmd === "clear") {
      setTerminalHistory([])
      setInputValue("")
      return
    } else {
      response = `Command not recognized: "${cmd}". Type "help" to see available actions.`
    }

    setTerminalHistory(prev => [...prev, { type: "input", text: cmd }, { type: "output", text: response }])
    setInputValue("")
  }

  return (
    <div className="w-full border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(37,99,235,0.06),0_2px_8px_rgba(0,0,0,0.04)] flex flex-col">
      {/* Header: traffic lights + tabs */}
      <div className="border-b border-slate-100 bg-[#F8FAFC] flex items-center justify-between px-3 sm:px-4 py-2.5 select-none">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 border border-yellow-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 border border-green-500/40" />
        </div>
        <div className="flex items-center gap-1">
          {[
            { id: "ai", labelFull: "AI Shell", labelShort: "AI" },
            { id: "console", labelFull: "Console Diagnostics", labelShort: "Console" },
            { id: "system", labelFull: "System", labelShort: "System" },
          ].map(({ id, labelFull, labelShort }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-label={labelFull}
              aria-pressed={activeTab === id}
              className={`px-2 sm:px-3 py-1 rounded-md font-grotesk font-bold tracking-wide uppercase transition-all duration-150 ${
                activeTab === id
                  ? "bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30 text-[9px] sm:text-[10px]"
                  : "text-slate-400 hover:text-slate-600 text-[9px] sm:text-[10px]"
              }`}
            >
              <span className="hidden sm:inline">{labelFull}</span>
              <span className="sm:hidden">{labelShort}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-grotesk text-slate-400 hidden sm:inline">LIVE</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex flex-col" style={{ minHeight: "260px" }}>
        <AnimatePresence mode="wait">

          {/* Console Diagnostics */}
          {activeTab === "console" && (
            <motion.div key="console"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed text-slate-600 overflow-y-auto flex-1 text-left"
              style={{ maxHeight: "220px" }}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB" }}>bash</span>
                <span className="text-slate-800 font-semibold">~</span>
                <span className="text-slate-600">npm run start-agent-diagnostics</span>
              </div>
              <div className="text-slate-400 italic">Loading server profile dependencies...</div>
              <div key="Name" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span>Name: <span className="text-slate-800 font-semibold">Kartik Ramesh Varma</span></span>
              </div>
              <div key="Track" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span>Track: <span className="text-[#2563EB] font-semibold">Full-Stack Web Dev</span></span>
              </div>
              <div key="Stack" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span className="text-slate-600">Stack: React · Next.js · Node · Express · Mongo · Postgres</span>
              </div>
              <div key="Status" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span>Status: <span className="text-emerald-600 font-bold">ONLINE</span></span>
              </div>
              <div key="Target" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span>Target: <span>Clerk Auth sync ... </span><span className="text-emerald-600 font-bold">PASSED</span></span>
              </div>
              <div key="DBLink" className="flex gap-2">
                <span className="text-[#2563EB] font-bold">➜</span>
                <span>DB Link: <span>Supabase WebSockets ... </span><span className="text-emerald-600 font-bold">ESTABLISHED</span></span>
              </div>
              <div className="text-slate-400 italic mt-1">All subsystems at 100% efficiency. Ready for input.</div>

            </motion.div>
          )}

          {/* System */}
          {activeTab === "system" && (
            <motion.div key="system"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-3 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-slate-200/60 bg-slate-50 rounded-xl flex items-center gap-2.5">
                  <Cpu className="text-[#2563EB] shrink-0" size={16} />
                  <div className="text-left min-w-0">
                    <span className="text-[8px] font-grotesk font-bold text-slate-400 uppercase tracking-wider block">Server</span>
                    <span className="text-[11px] font-bold text-slate-800 font-grotesk">ONLINE (12ms)</span>
                  </div>
                </div>
                <div className="p-3 border border-slate-200/60 bg-slate-50 rounded-xl flex items-center gap-2.5">
                  <Terminal className="text-[#10B981] shrink-0" size={16} />
                  <div className="text-left min-w-0">
                    <span className="text-[8px] font-grotesk font-bold text-slate-400 uppercase tracking-wider block">Branch</span>
                    <span className="text-[11px] font-bold text-slate-800 font-grotesk">main (Git)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {[
                  { label: "MERN DEPLOYMENT ACCURACY", pct: "98%", from: "#2563EB", to: "#38BDF8", delay: 0.2 },
                  { label: "API ENDPOINT RELIABILITY", pct: "100%", from: "#38BDF8", to: "#10B981", delay: 0.35 },
                ].map(({ label, pct, from, to, delay }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-grotesk text-slate-600 font-bold">
                      <span>{label}</span><span className="text-slate-800">{pct}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: pct }} transition={{ duration: 1, delay }}
                        className="h-full rounded-full" style={{ background: `linear-gradient(to right, ${from}, ${to})` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[9px] font-grotesk text-slate-400 border-t border-slate-100 pt-2 flex items-center gap-1.5">
                <ShieldAlert size={11} className="text-[#2563EB]" />
                Subsystem protection protocols fully operational.
              </div>
            </motion.div>
          )}

          {/* AI Shell */}
          {activeTab === "ai" && (
            <motion.div key="ai"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-3 flex-1">
              <div ref={terminalScrollRef}
                className="flex-1 overflow-y-auto flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed text-left"
                style={{ maxHeight: "180px" }}>
                <div className="text-slate-400 italic">// Commands: help | skills | projects | info | clear</div>
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={`flex gap-1.5 ${item.type === "input" ? "text-slate-800" : "text-emerald-600"}`}>
                    {item.type === "input" && <span className="text-[#2563EB] font-bold shrink-0">guest$</span>}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommandSubmit} className="flex gap-2 border-t border-slate-100 pt-3 items-center">
                <span className="font-mono text-[11px] text-[#2563EB] font-bold shrink-0">guest$</span>
                <input
                  aria-label="AI Shell command"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent border-none text-slate-800 font-mono text-[11px] focus:outline-none placeholder-slate-300"
                />
                <button type="submit" aria-label="Run AI Shell command"
                  className="flex-shrink-0 p-1.5 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] hover:bg-[#2563EB]/20 transition-colors">
                  <Send size={11} />
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
