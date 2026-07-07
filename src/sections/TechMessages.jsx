import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, RefreshCw, ArrowLeft, Cpu } from 'lucide-react'

// Array of 50 tech-related quotes and developer wisdom
const techQuotes = [
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "Simplicity is the soul of efficiency. — Austin Freeman",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Computers are good at following instructions, but not at reading your mind.",
  "If at first you don't succeed, call it version 1.0.",
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Clean code always looks like it was written by someone who cares. — Michael Feathers",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "It's not a bug – it's an undocumented feature.",
  "Software is a great combination between artistry and engineering. — Bill Gates",
  "Hardware is where the code meets the real world.",
  "Premature optimization is the root of all evil. — Donald Knuth",
  "Before software can be reusable it first has to be usable. — Ralph Johnson",
  "Programming is the art of telling another human what you want the computer to do. — Donald Knuth",
  "One man's constant is another man's variable. — Alan Perlis",
  "Make it work, make it right, make it fast. — Kent Beck",
  "The best error message is the one that never shows up.",
  "In order to understand recursion, one must first understand recursion.",
  "Deleted code is debugged code. — Jeff Sickel",
  "Code is like humor. When you have to explain it, it’s bad. — Cory House",
  "Fix the cause, not the symptom. — Steve Maguire",
  "Strive for simplicity, but avoid simplistic solutions.",
  "A user interface is like a joke. If you have to explain it, it’s not that good.",
  "Refactoring is like cleaning the kitchen as you cook.",
  "Java is to JavaScript what car is to carpet.",
  "Every great developer you know got there by solving problems they were unqualified to solve.",
  "The function of good software is to make the complex appear simple. — Grady Booch",
  "Debugging is twice as hard as writing the code in the first place. — Brian Kernighan",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight. — Bill Gates",
  "Don't repeat yourself (DRY) is a principle, not a law.",
  "Good code is its own best documentation. — Steve McConnell",
  "The best way to predict the future is to invent it. — Alan Kay",
  "It is not enough for code to work. — Robert C. Martin",
  "Software design is a constant battle against complexity.",
  "You can't have great software without great collaboration.",
  "Automation is not about replacing humans, but about empowering them.",
  "Git commit often, push early.",
  "A computer lets you make more mistakes faster than any other invention, with the possible exception of handguns and tequila. — Mitch Radcliffe",
  "A language that doesn't affect your way of thinking about programming is not worth knowing. — Alan Perlis",
  "Code never lies, comments sometimes do. — Ron Jeffries",
  "The most important property of a program is whether it accomplishes the user's intent.",
  "Optimize for readability. Computers can compile anything, but humans have to read it.",
  "Testing leads to failure, and failure leads to understanding.",
  "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
  "Software undergoes beta testing shortly before it's released. Beta is Latin for 'still doesn't work'.",
  "No code is faster than no code. — Merb core motto",
  "The code you write today is the technical debt you pay tomorrow.",
  "To code is to explore the limits of logic.",
  "Great software is built by people who refuse to accept mediocrity.",
  "Every programmer is an author, and every line of code is a sentence in a story."
]

export default function TechMessages() {
  const [index, setIndex] = useState(0)

  // Initialize with a random index on mount
  useEffect(() => {
    setIndex(Math.floor(Math.random() * techQuotes.length))
  }, [])

  // Auto-rotate quotes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => {
        let nextIndex
        do {
          nextIndex = Math.floor(Math.random() * techQuotes.length)
        } while (nextIndex === prevIndex && techQuotes.length > 1)
        return nextIndex
      })
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  // Handle manual trigger
  const handleRandomize = () => {
    setIndex((prevIndex) => {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * techQuotes.length)
      } while (nextIndex === prevIndex && techQuotes.length > 1)
      return nextIndex
    })
  }

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-[#E2E8F0] font-grotesk flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background terminal matrix lines and grids */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(18,24,38,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none bg-gradient-to-br from-[#2563EB] to-[#38BDF8]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[120px] pointer-events-none bg-gradient-to-br from-[#38BDF8] to-[#10B981]" />

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 pt-4">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'portfolio' }))}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group cursor-none bg-transparent border-none"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HUB
        </button>
        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
          <Cpu size={12} className="text-[#2563EB] animate-pulse" />
          STATUS: ONLINE_0x9F
        </div>
      </header>

      {/* Main viewport */}
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-2xl border border-slate-800 bg-[#0F172A]/80 backdrop-blur-xl p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] text-center relative overflow-hidden"
        >
          {/* Terminal warning banner */}
          <div className="flex items-center justify-center gap-2 mb-8 text-[#38BDF8]">
            <Terminal size={16} className="animate-pulse" />
            <span className="font-mono text-xs tracking-widest font-extrabold uppercase">Tech Telemetry Oracle</span>
          </div>

          {/* Quote display viewport */}
          <div className="min-h-[120px] flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-lg sm:text-xl font-bold font-sora leading-relaxed text-[#F1F5F9]"
              >
                "{techQuotes[index]}"
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Diagnostic controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-800/80 pt-8">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRandomize}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 font-bold text-xs text-white transition-colors cursor-none"
            >
              <RefreshCw size={12} className="text-[#38BDF8]" />
              Next Broadcast
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'portfolio' }))}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-[#090D16] cursor-none"
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)',
              }}
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>

        {/* Counter indicator */}
        <div className="mt-6 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Signal {index + 1} of {techQuotes.length}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto flex items-center justify-between z-10 text-[9px] font-mono text-slate-600">
        <span>© 2026 KARTIK RAMESH VARMA</span>
        <span>NODE_ID: BROADCAST_ROUTER_V1</span>
      </footer>
    </div>
  )
}
