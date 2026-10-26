import { useEffect, useState } from 'react'

// Lets a component follow the same breakpoint its stylesheet uses, so a layout
// that CSS has already collapsed does not keep running the scroll work the
// expanded version needed.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])

  return matches
}
