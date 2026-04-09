/**
 * Hero — Full-screen hero with headline, sub-copy, CTA row,
 * and at-a-glance stats.
 */
import { motion } from 'framer-motion'
import { ArrowRight, Play, ShieldCheck } from 'lucide-react'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow badge */}
        <motion.div variants={item} className="hero-eyebrow">
          <ShieldCheck size={12} />
          Institutional · Cybersecurity · Fintech
        </motion.div>

        {/* Main headline */}
        <motion.h1 variants={item} className="hero-title">
          REXER: Building{' '}
          <span className="text-gradient-blue">Secure</span>{' '}
          Digital{' '}
          <span className="text-gradient-gold">Empires.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={item} className="hero-sub">
          Expert Flutter Development &nbsp;|&nbsp; Cybersecurity &nbsp;|&nbsp; Institutional Market Logic.
          <br />
          Crafting systems that are fast, fortified &amp; built to last.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={item} className="hero-cta-row">
          <a
            id="cta-proof"
            href="#proof"
            className="btn-primary"
            data-magnetic
          >
            View My Proof (60k+ on YouTube)
            <ArrowRight size={16} />
          </a>
          <a
            id="cta-services"
            href="#services"
            className="btn-outline"
            data-magnetic
          >
            <Play size={14} />
            Explore Services
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="hero-stats-row">
          <div className="hero-stat">
            <div className="hero-stat-number">60K<span style={{ color: 'var(--clr-blue)' }}>+</span></div>
            <div className="hero-stat-label">YouTube Subscribers</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">3<span style={{ color: 'var(--clr-gold)' }}>+</span></div>
            <div className="hero-stat-label">Years Experience</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">AES<span style={{ color: 'var(--clr-blue)' }}>-256</span></div>
            <div className="hero-stat-label">Grade Security</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-number">∞</div>
            <div className="hero-stat-label">Ambition</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
