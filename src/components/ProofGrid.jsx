/**
 * ProofGrid — The "Proof" section showcasing 3 pillars:
 *   1. Development (Vello Fintech App — with Hotspot)
 *   2. Security (Ethical Hacking Certs — with cert badges)
 *   3. Authority (60k+ YouTube — with animated counter)
 *
 * Each card uses TiltCard (3D tilt + border glow).
 * Counter fires once when the section scrolls into view.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, ShieldCheck, Video } from 'lucide-react'
import TiltCard     from './TiltCard'
import useInView    from '../hooks/useInView'
import useCountUp   from '../hooks/useCountUp'

/* ------------------------------------------------------------------ */
/* Vello Card — with interactive Hotspot                               */
/* ------------------------------------------------------------------ */
const HOTSPOTS = [
  { id: 'hs1', top: '30%', left: '25%', label: 'AES-256 Encryption' },
  { id: 'hs2', top: '55%', left: '60%', label: 'Real-time Budget AI' },
  { id: 'hs3', top: '75%', left: '40%', label: 'Firebase Auth Layer'  },
]

function VelloCard({ inView }) {
  const [activeHotspot, setActiveHotspot] = useState(null)

  return (
    <TiltCard>
      <div className="proof-icon-wrap blue">
        <Code2 size={22} />
      </div>
      <span className="proof-tag blue">Development</span>
      <h3 className="proof-title">Vello — Fintech App</h3>
      <p className="proof-desc">
        A full-stack personal finance manager built with Flutter &amp; Firebase.
        Engineered for security-first UX and institutional-grade data handling.
      </p>

      {/* App screenshot placeholder with hotspots */}
      <div className="vello-hotspot-wrap">
        <div className="vello-app-img" role="img" aria-label="Vello app mockup">
          <span style={{ position: 'relative', zIndex: 1, letterSpacing: '0.1em' }}>VELLO · Finance OS</span>

          {/* Interactive hotspots */}
          {HOTSPOTS.map(hs => (
            <div
              key={hs.id}
              className="hotspot"
              style={{ top: hs.top, left: hs.left }}
              onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
              aria-label={`Feature: ${hs.label}`}
            >
              <div className="hotspot-pulse" />
              <span style={{ fontSize: '8px', color: 'var(--clr-blue)', fontWeight: 700 }}>+</span>
              {activeHotspot === hs.id && (
                <motion.div
                  className="hotspot-tooltip"
                  initial={{ opacity: 0, scale: 0.8, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {hs.label}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.68rem', color: 'var(--clr-text-dim)', marginTop: '6px', letterSpacing: '0.08em' }}>
          ↑ Tap the + hotspots to explore features
        </p>
      </div>
    </TiltCard>
  )
}

/* ------------------------------------------------------------------ */
/* Security Card — cert badges                                         */
/* ------------------------------------------------------------------ */
const CERTS = [
  { name: 'Ethical Hacking',   issuer: 'EC-Council' },
  { name: 'Python Security',   issuer: 'Coursera'   },
  { name: 'Web Penetration',   issuer: 'TCM Sec'    },
]

function SecurityCard() {
  return (
    <TiltCard>
      <div className="proof-icon-wrap blue">
        <ShieldCheck size={22} />
      </div>
      <span className="proof-tag blue">Security</span>
      <h3 className="proof-title">Ethical Hacking & Python Security</h3>
      <p className="proof-desc">
        Certified in offensive security, vulnerability assessment, and
        Python-based penetration testing. Defence starts with understanding attacks.
      </p>

      {/* Cert badges */}
      <div style={{ marginTop: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {CERTS.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'var(--clr-bg-2)',
              border: '1px solid var(--clr-border)',
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--clr-blue)', boxShadow: '0 0 6px var(--clr-blue)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--clr-text)' }}>{cert.name}</span>
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--clr-text-muted)', textTransform: 'uppercase' }}>{cert.issuer}</span>
          </motion.div>
        ))}
      </div>
    </TiltCard>
  )
}

/* ------------------------------------------------------------------ */
/* Authority Card — animated counter                                   */
/* ------------------------------------------------------------------ */
function AuthorityCard({ inView }) {
  const count = useCountUp(60000, 2400, inView)

  return (
    <TiltCard>
      <div className="proof-icon-wrap gold">
        <Video size={22} />
      </div>
      <span className="proof-tag gold">Authority</span>
      <h3 className="proof-title">60,000+ YouTube Subscribers</h3>
      <p className="proof-desc">
        Teaching Flutter, Cybersecurity &amp; Fintech development to a growing
        global community. Proof that real knowledge scales.
      </p>

      {/* Animated counter */}
      <div style={{ marginTop: 'var(--sp-6)' }}>
        <div className="counter-display">
          {count.toLocaleString()}<span style={{ color: 'var(--clr-text-muted)', fontSize: '1.5rem' }}>+</span>
        </div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--clr-text-muted)', marginTop: '4px' }}>
          Subscribers &amp; Growing
        </div>

        {/* Channel stat pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'var(--sp-4)' }}>
          {['Flutter Dev', 'Cybersecurity', 'Fintech UI'].map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem', fontWeight: 600, padding: '4px 10px',
              background: 'var(--clr-gold-dim)', border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '4px', color: 'var(--clr-gold)', letterSpacing: '0.08em'
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </TiltCard>
  )
}

/* ------------------------------------------------------------------ */
/* ProofGrid wrapper                                                   */
/* ------------------------------------------------------------------ */
const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

export default function ProofGrid() {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section id="proof" className="section">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <div className="section-label">Verified Proof</div>
          <h2 className="section-title">
            Three Pillars of{' '}
            <span className="text-gradient-blue">Undeniable Authority</span>
          </h2>
          <p className="section-subtitle">
            Not claims. Not promises. Verifiable proof — built in public, reviewed by thousands.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="proof-grid" style={{ marginTop: 'var(--sp-12)' }}>
          {[
            <VelloCard    key="vello"    inView={inView} />,
            <SecurityCard key="security" />,
            <AuthorityCard key="authority" inView={inView} />,
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
            >
              {card}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
