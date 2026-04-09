/**
 * Services — Dashboard-layout high-ticket service cards.
 * Each card has a neon-glow pulsing icon, mouse-tracked border glow,
 * and an animated entrance.
 */
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Target, LayoutDashboard } from 'lucide-react'
import useInView from '../hooks/useInView'

const SERVICES = [
  {
    id:    's1',
    num:   '01',
    icon:  Smartphone,
    color: 'blue',
    title: 'Secure Mobile App Development',
    desc:  'End-to-end Flutter & Firebase applications hardened with AES-256 encryption, secure auth flows, and production-ready CI/CD pipelines.',
    tags:  ['Flutter', 'Firebase', 'Dart', 'AES-256', 'CI/CD'],
  },
  {
    id:    's2',
    num:   '02',
    icon:  Target,
    color: 'blue',
    title: 'Penetration Testing & Vulnerability Assessment',
    desc:  'Systematic offensive testing of your mobile, web, and API surfaces. Detailed CVE-mapped reporting with remediation roadmaps.',
    tags:  ['OWASP', 'Burp Suite', 'Python', 'Kali Linux', 'CVE Reports'],
  },
  {
    id:    's3',
    num:   '03',
    icon:  LayoutDashboard,
    color: 'gold',
    title: 'UI/UX Design for Fintech & Trading Platforms',
    desc:  'Institutional-grade dashboards designed for speed, clarity, and trust. Dark-mode-first, data-dense, beautiful. Figma → Flutter, pixel-perfect.',
    tags:  ['Figma', 'Flutter Web', 'Glassmorphism', 'Trading UX', 'Dark Mode'],
  },
]

/* Individual service card with border-glow tracking */
function ServiceCard({ service, index, inView }) {
  const cardRef = useRef(null)
  const Icon    = service.icon

  const onMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1)
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1)
    card.style.setProperty('--glow-x', `${x}%`)
    card.style.setProperty('--glow-y', `${y}%`)
    const accent = service.color === 'gold'
      ? 'rgba(212,175,55,0.4)'
      : 'rgba(0,122,255,0.4)'
    card.style.borderColor = accent
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.borderColor = ''
    card.style.transition  = 'border-color 0.4s'
  }

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      id={service.id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'border-color 0.3s, transform 0.3s' }}
    >
      {/* Mouse-tracked radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        background: service.color === 'gold'
          ? 'radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(212,175,55,0.07) 0%, transparent 60%)'
          : 'radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(0,122,255,0.07) 0%, transparent 60%)',
      }} />

      {/* Background number watermark */}
      <div className="service-card-number">{service.num}</div>

      {/* Icon with neon pulse */}
      <div className={`service-icon-wrap ${service.color}`}>
        <Icon size={22} />
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>

      {/* Tech tags */}
      <div className="service-meta">
        {service.tags.map(tag => (
          <span key={tag} className="service-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="services" className="section">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">High-Ticket Services</div>
          <h2 className="section-title">
            What I Build for{' '}
            <span className="text-gradient-gold">Serious Clients</span>
          </h2>
          <p className="section-subtitle">
            Three specialisations. One obsession: building systems that are fast,
            secure, and impossible to ignore.
          </p>
        </motion.div>

        {/* Dashboard grid */}
        <div className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
