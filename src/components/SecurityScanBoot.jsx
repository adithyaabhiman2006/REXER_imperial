/**
 * SecurityScanBoot — "System Initialization" boot sequence.
 * A blue scan line sweeps top→bottom while status messages
 * tick through. Lasts ~2.2 s then fades out.
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATUS_MESSAGES = [
  'INITIALIZING SECURE BOOT…',
  'VERIFYING INTEGRITY CHECKSUMS…',
  'ESTABLISHING ENCRYPTED TUNNEL…',
  'REXER SYSTEM SECURE ✓',
]

export default function SecurityScanBoot({ onComplete }) {
  const [msgIndex,  setMsgIndex]  = useState(0)
  const [progress,  setProgress]  = useState(0)
  const [visible,   setVisible]   = useState(true)

  useEffect(() => {
    let prog = 0
    const interval = setInterval(() => {
      prog += 2
      setProgress(prog)

      // Step through messages at 25 / 60 / 85 / 100 %
      if (prog === 25)  setMsgIndex(1)
      if (prog === 60)  setMsgIndex(2)
      if (prog === 85)  setMsgIndex(3)
      if (prog >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 600)
        }, 400)
      }
    }, 20) // 100 steps × 20 ms = 2 000 ms

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scan-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-label="System initialization"
          role="status"
        >
          {/* Scanning line */}
          <motion.div
            className="scan-line"
            initial={{ top: 0 }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.6, ease: 'linear' }}
          />

          {/* Logo */}
          <motion.div
            className="scan-logo"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            REXER
          </motion.div>

          {/* Status message that cycles */}
          <motion.div
            key={msgIndex}
            className="scan-status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {STATUS_MESSAGES[msgIndex]}
          </motion.div>

          {/* Progress bar */}
          <div className="scan-bar-wrap">
            <motion.div
              className="scan-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
