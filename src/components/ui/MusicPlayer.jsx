import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VolumeX, Music } from 'lucide-react'
import pSong from '../../assets/p-song.mp3'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    // Create audio instance
    const audio = new Audio()
    audio.preload = 'none'
    audio.src = pSong
    audio.loop = true
    audio.volume = 0.35 // Pleasant background volume level
    audioRef.current = audio

    // Hide tooltip after 6 seconds
    const tooltipTimeout = setTimeout(() => {
      setShowTooltip(false)
    }, 6000)

    // Cleanup on unmount
    return () => {
      clearTimeout(tooltipTimeout)

      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.error('Failed to play audio:', error)
          })
      }
    }
    setShowTooltip(false)
  }

  return (
    <>
      {/* Inline styles for custom premium soundwave animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes soundWave1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes soundWave2 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
        @keyframes soundWave3 {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
        @keyframes soundWave4 {
          0%, 100% { height: 14px; }
          50% { height: 8px; }
        }
        .wave-bar-1 { animation: soundWave1 0.8s ease-in-out infinite; }
        .wave-bar-2 { animation: soundWave2 1.0s ease-in-out infinite; }
        .wave-bar-3 { animation: soundWave3 0.7s ease-in-out infinite; }
        .wave-bar-4 { animation: soundWave4 0.9s ease-in-out infinite; }
      `}} />

      <div className="music-dock fixed bottom-6 left-6 z-[100] flex flex-row-reverse items-center gap-3">
        {/* Informative Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900/90 text-white text-[11px] font-grotesk tracking-wide px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md border border-slate-700/30 whitespace-nowrap flex items-center gap-2 pointer-events-none"
            >
              <Music size={12} className="text-[#38BDF8] animate-bounce" />
              <span>Click to {isPlaying ? 'mute' : 'play'} background music</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glassmorphic Play/Pause Trigger */}
        <motion.button
          onClick={togglePlayback}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-lg shadow-slate-900/5 hover:border-[#2563EB]/40 hover:shadow-[#2563EB]/10 transition-all duration-300 relative group cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          data-cursor-color="rgba(37, 99, 235, 0.75)"
          aria-label="Toggle background music"
        >
          {/* Animated Glow Ring when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-[#2563EB]/10 animate-ping opacity-60" />
          )}

          {isPlaying ? (
            /* Sound Wave Equalizer Icon when active */
            <div className="flex items-end gap-[3px] h-[18px] w-[18px] justify-center">
              <span className="w-[3px] rounded-full bg-[#2563EB] wave-bar-1" />
              <span className="w-[3px] rounded-full bg-[#38BDF8] wave-bar-2" />
              <span className="w-[3px] rounded-full bg-[#10B981] wave-bar-3" />
              <span className="w-[3px] rounded-full bg-[#2563EB] wave-bar-4" />
            </div>
          ) : (
            /* Silent Icon when inactive */
            <VolumeX size={18} className="text-slate-500 group-hover:text-[#2563EB] transition-colors duration-300" />
          )}
        </motion.button>
      </div>
    </>
  )
}
