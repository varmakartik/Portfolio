import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let lenisInstance = null
export function getLenis() { return lenisInstance }

export function useLenis() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis
    const syncMotion = () => {
      lenis?.destroy()
      lenis = null
      lenisInstance = null
      if (!preference.matches) {
        lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: false, autoRaf: true })
        lenisInstance = lenis
      }
    }
    syncMotion()
    preference.addEventListener('change', syncMotion)
    return () => {
      preference.removeEventListener('change', syncMotion)
      lenis?.destroy()
      lenisInstance = null
    }
  }, [])
  return lenisInstance
}
