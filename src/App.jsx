/**
 * App.jsx — Root component that orchestrates:
 *   1. SecurityScanBoot (shown once on first load)
 *   2. MagneticCursor
 *   3. DataStreamBackground (canvas)
 *   4. Navbar
 *   5. Main page sections: Hero → ProofGrid → Services → Footer
 */
import { useState, useCallback } from 'react'
import SecurityScanBoot    from './components/SecurityScanBoot'
import MagneticCursor      from './components/MagneticCursor'
import DataStreamBackground from './components/DataStreamBackground'
import Navbar              from './components/Navbar'
import Hero                from './components/Hero'
import ProofGrid           from './components/ProofGrid'
import Services            from './components/Services'
import Footer              from './components/Footer'

export default function App() {
  const [booting, setBooting] = useState(true)

  const handleBootComplete = useCallback(() => {
    setBooting(false)
  }, [])

  return (
    <>
      {/* ── Custom magnetic cursor (always rendered) ── */}
      <MagneticCursor />

      {/* ── Boot sequence overlay ── */}
      {booting && <SecurityScanBoot onComplete={handleBootComplete} />}

      {/* ── Main site (rendered beneath boot, appears after) ── */}
      {!booting && (
        <>
          {/* Persistent canvas background */}
          <DataStreamBackground />

          {/* Navigation */}
          <Navbar />

          {/* Page content */}
          <main className="main-content">
            <Hero />

            <div className="section-divider" />

            <ProofGrid />

            <div className="section-divider" />

            <Services />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  )
}
