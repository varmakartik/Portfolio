import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, currentProgress)))

      // Update CSS variable for scroll bar width
      document.documentElement.style.setProperty(
        '--scroll-progress',
        `${currentProgress}%`
      )
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
