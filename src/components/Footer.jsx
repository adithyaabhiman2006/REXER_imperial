/**
 * Footer — Professional contact + brand handle @RexerLK.
 */
import { motion } from 'framer-motion'
import { Video, Globe, AtSign, Mail } from 'lucide-react'

const SOCIALS = [
  { icon: Video,   href: 'https://youtube.com/@RexerLK',  label: 'YouTube'  },
  { icon: Globe,   href: 'https://github.com/RexerLK',    label: 'GitHub'   },
  { icon: AtSign,  href: 'https://twitter.com/RexerLK',   label: 'Twitter'  },
  { icon: Mail,    href: 'mailto:rexerlk@gmail.com',      label: 'Email'    },
]

export default function Footer() {
  return (
    <footer id="contact">
      {/* Divider */}
      <div className="section-divider" />

      <div className="footer">
        {/* Left — Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-brand">
            REX<span>ER</span>
          </div>
          <div className="footer-tagline">
            Building Secure Digital Empires · @RexerLK
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Rexer Studio. All rights reserved.
          </div>
        </motion.div>

        {/* Center — Nav links */}
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <a href="#hero">Home</a>
          <a href="#proof">Work</a>
          <a href="#services">Services</a>
        </motion.div>

        {/* Right — Social icons + handle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--sp-4)' }}
        >
          {/* Social icon row */}
          <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
            {SOCIALS.map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: 38, height: 38,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--clr-surface)',
                  border: '1px solid var(--clr-border)',
                  borderRadius: '8px',
                  color: 'var(--clr-text-muted)',
                  transition: 'color 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color        = 'var(--clr-blue)'
                  e.currentTarget.style.borderColor  = 'rgba(0,122,255,0.4)'
                  e.currentTarget.style.boxShadow    = '0 0 16px rgba(0,122,255,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color        = ''
                  e.currentTarget.style.borderColor  = ''
                  e.currentTarget.style.boxShadow    = ''
                }}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          {/* Brand handle badge */}
          <a
            href="https://youtube.com/@RexerLK"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-handle"
          >
            @RexerLK
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
