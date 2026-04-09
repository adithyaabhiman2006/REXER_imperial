/**
 * TiltCard — Wraps children in a perspective-enabled div
 * that tilts in 3D based on mouse position over the card.
 * On mobile (touch) the effect is disabled for performance.
 */
import { useRef } from 'react'

export default function TiltCard({ children, className = '' }) {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect    = card.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    const deltaX  = (e.clientX - centerX) / (rect.width  / 2)
    const deltaY  = (e.clientY - centerY) / (rect.height / 2)

    // Max ±10° tilt
    const rotateX = -(deltaY * 10).toFixed(2)
    const rotateY =  (deltaX * 10).toFixed(2)

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`

    // Border glow follows mouse
    const glowX = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1)
    const glowY = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1)
    card.style.setProperty('--glow-x', `${glowX}%`)
    card.style.setProperty('--glow-y', `${glowY}%`)
    card.style.borderColor = 'rgba(0,122,255,0.4)'
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform  = ''
    card.style.borderColor = ''
    card.style.transition  = 'transform 0.5s ease, border-color 0.3s'
  }

  const onMouseEnter = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transition = 'border-color 0.3s'
  }

  return (
    <div
      ref={cardRef}
      className={`glass-card proof-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ transition: 'transform 0.5s ease, border-color 0.3s', willChange: 'transform' }}
    >
      {/* Mouse-tracked border glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,122,255,0.08) 0%, transparent 60%)',
        }}
      />
      {children}
    </div>
  )
}
