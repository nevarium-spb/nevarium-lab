import { useEffect, useRef } from 'react'
import { useTheme } from '../theme'

/**
 * Живой фон «Индиго Лайв»: индиго-свечения + конический sweep (CSS)
 * и холст-созвездие из узлов, соединённых линиями, с лёгкой
 * реакцией на курсор. Уважает prefers-reduced-motion.
 */
export default function LiveBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const light = theme === 'light'
    // Цвета линий/точек под тему
    const dot = light ? '79, 70, 229' : '129, 140, 248'
    const link = light ? '79, 70, 229' : '99, 102, 241'

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    type Node = { x: number; y: number; vx: number; vy: number }
    let nodes: Node[] = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(70, Math.floor((w * h) / 22000))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }))
    }
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        // мягкое притяжение к курсору
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < 26000) {
          n.vx += (dx / (d2 + 400)) * 0.6
          n.vy += (dy / (d2 + 400)) * 0.6
        }
        // ограничение скорости
        n.vx = Math.max(-0.7, Math.min(0.7, n.vx))
        n.vy = Math.max(-0.7, Math.min(0.7, n.vy))
      }
      // связи
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            ctx.strokeStyle = `rgba(${link}, ${(1 - dist / 130) * (light ? 0.22 : 0.28)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // узлы
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${dot}, ${light ? 0.5 : 0.7})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }

    if (reduce) {
      draw() // один статичный кадр
    } else {
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('resize', resize)
    if (!reduce) {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseout', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [theme])

  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__sweep" />
      <div className="aurora__grid" />
      <div className="orb orb--cyan" />
      <div className="orb orb--violet" />
      <div className="orb orb--magenta" />
      <canvas className="aurora__canvas" ref={canvasRef} />
    </div>
  )
}
