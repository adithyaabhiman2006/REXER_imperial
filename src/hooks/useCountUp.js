/**
 * useCountUp — Animates a number from 0 to `target`
 * once `shouldStart` becomes true.
 */
import { useState, useEffect, useRef } from 'react'

export default function useCountUp(target, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!shouldStart) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out curve
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, shouldStart])

  return count
}
