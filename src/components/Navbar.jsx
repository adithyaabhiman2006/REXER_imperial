/**
 * Navbar — Fixed, glassmorphic top navigation bar.
 */
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work',     href: '#proof'    },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      {/* Brand */}
      <a href="#hero" className="navbar-brand">
        REX<span>ER</span>
      </a>

      {/* Nav Links */}
      <ul className="navbar-links">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        <li>
          <a
            href="https://youtube.com/@RexerLK"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-badge"
          >
            60K+ YT
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
