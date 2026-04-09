/**
 * DataStreamBackground — Canvas-based animated "live data stream"
 * Mimics cybersecurity code / market data flowing vertically.
 * Very low opacity so it stays non-distracting.
 */
import { useEffect, useRef } from 'react'

// Characters pulled from market data + ASCII + hex symbols
const CHARS = '01アイウエオカキクケコABCDEF0123456789$€₿%↑↓░▒│┼SECURE#@!01'

export default function DataStreamBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width, height, columns, drops

    const FONT_SIZE = 13
    const COLOR     = '#007AFF'

    const init = () => {
      width  = canvas.width  = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / FONT_SIZE)
      drops   = Array(columns).fill(1)
    }

    init()

    const draw = () => {
      // Fade trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = COLOR
      ctx.font      = `${FONT_SIZE}px monospace`

      drops.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x    = i * FONT_SIZE

        // Dim older chars, bright leading char
        ctx.globalAlpha = 0.08 + Math.random() * 0.12
        ctx.fillStyle   = '#007AFF'
        ctx.fillText(char, x, y * FONT_SIZE)

        // First char is brighter (blue-white)
        ctx.globalAlpha = 0.7
        ctx.fillStyle   = '#A0D4FF'
        ctx.fillText(char, x, y * FONT_SIZE)

        // Reset drop randomly at bottom
        if (y * FONT_SIZE > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })

      ctx.globalAlpha = 1
    }

    const interval = setInterval(draw, 60) // ~16 fps is enough for bg

    const onResize = () => { init() }
    window.addEventListener('resize', onResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="data-stream-canvas"
      aria-hidden="true"
    />
  )
}
