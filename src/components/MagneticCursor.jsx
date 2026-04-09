/**
 * MagneticCursor — Custom cursor that magnetically snaps
 * toward interactive elements (buttons, cards, links).
 */
import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId  = null

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    // Expand ring on magnetic targets
    const onMouseEnter = () => ring.classList.add('expanded')
    const onMouseLeave = () => ring.classList.remove('expanded')

    const magnetTargets = document.querySelectorAll(
      'button, a, .proof-card, .service-card, .hotspot, [data-magnetic]'
    )
    magnetTargets.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      magnetTargets.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
