import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    // Enable browser-native GPU-accelerated smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return null
}
