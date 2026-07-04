import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function GlowCard({ children, className = '', glowColor = '#2563EB', activePress = true }) {
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Relative coordinates inside the card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setCoords({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={activePress ? { scale: 0.98, y: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`relative rounded-2xl border border-slate-200/90 bg-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden group transition-all duration-300 ${className}`}
    >
      {/* Background Spotlight Radial Glow */}
      <div
        className="absolute pointer-events-none -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, ${glowColor}10, transparent 80%)`,
          border: `1px solid ${glowColor}20`
        }}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}
