import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const followerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [glowColor, setGlowColor] = useState('rgba(37, 99, 235, 0.4)') // default blue/cyan

  useEffect(() => {
    const follower = followerRef.current
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0
    let raf

    const updateCursor = () => {
      // Smooth interpolation for the trailing effect
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15

      if (follower) {
        // Offset slightly to tail behind the standard OS cursor arrow tip
        follower.style.transform = `translate(${followerX + 12}px, ${followerY + 20}px)`
      }

      raf = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check custom hover colors for interactive components
    const detectHoverColor = () => {
      const elements = document.querySelectorAll('[data-cursor-color]')
      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const color = el.getAttribute('data-cursor-color')
          if (color) setGlowColor(color)
        })
        el.addEventListener('mouseleave', () => {
          setGlowColor('rgba(37, 99, 235, 0.4)')
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    raf = requestAnimationFrame(updateCursor)
    detectHoverColor()

    // Monitor additions of interactive components to dynamically register listeners
    const observer = new MutationObserver(detectHoverColor)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [isVisible])

  // Disable on mobile/touch interfaces
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998] transition-opacity duration-300"
      style={{
        backgroundColor: glowColor,
        boxShadow: `0 0 12px 2px ${glowColor}`,
        opacity: isVisible ? 0.75 : 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
