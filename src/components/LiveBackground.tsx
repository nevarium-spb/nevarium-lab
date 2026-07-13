import { useEffect, useRef } from 'react'
import { useTheme } from '../theme'

/**
 * Живой фон «Индиго Лайв»: индиго-свечения + конический sweep (CSS)
 * и холст-созвездие. Точки дрейфуют, соединяются линиями и заметно
 * реагируют на курсор: под мышью «паутина» расступается, а от курсора
 * к ближним точкам тянутся яркие линии. Уважает prefers-reduced-motion.
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

    // Цвета под тему (r,g,b)
    const cNode = light ? '79, 70, 229' : '150, 160, 255'
    const cLink = light ? '79, 70, 229' : '124, 138, 255'
    const cMouse = light ? '37, 99, 235' : '56, 189, 248'

    const LINK = 165 // радиус связей точка-точка
    const MOUSE_R = 240 // радиус влияния курсора
    const PUSH = 72 // макс. смещение точки от курсора, px

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    type P = { x: number; y: number; vx: number; vy: number; ox: number; oy: number }
    let ps: P[] = []
    const mouse = { x: -9999, y: -9999, on: false }

    const build = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(150, Math.max(50, Math.floor((w * h) / 11000)))
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        ox: 0,
        oy: 0,
      }))
    }
    build()

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Обновляем позиции + смещение от курсора (render-offset, без накопления)
      for (const p of ps) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        let tox = 0
        let toy = 0
        if (mouse.on) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < MOUSE_R) {
            const force = (1 - dist / MOUSE_R) * PUSH
            tox = (dx / dist) * force
            toy = (dy / dist) * force
          }
        }
        p.ox += (tox - p.ox) * 0.12
        p.oy += (toy - p.oy) * 0.12
      }

      // Линии между точками
      ctx.lineWidth = 1.3
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i]
        const ax = a.x + a.ox
        const ay = a.y + a.oy
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j]
          const bx = b.x + b.ox
          const by = b.y + b.oy
          const dist = Math.hypot(ax - bx, ay - by)
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * (light ? 0.5 : 0.62)
            ctx.strokeStyle = `rgba(${cLink}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.stroke()
          }
        }
      }

      // Яркие линии от курсора к ближним точкам
      if (mouse.on) {
        ctx.lineWidth = 2
        for (const p of ps) {
          const d = Math.hypot(p.x + p.ox - mouse.x, p.y + p.oy - mouse.y)
          if (d < MOUSE_R) {
            ctx.strokeStyle = `rgba(${cMouse}, ${(1 - d / MOUSE_R) * 0.95})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x + p.ox, p.y + p.oy)
            ctx.stroke()
          }
        }
      }

      // Узлы со свечением
      ctx.shadowBlur = light ? 4 : 9
      for (const p of ps) {
        const px = p.x + p.ox
        const py = p.y + p.oy
        const near = mouse.on && Math.hypot(px - mouse.x, py - mouse.y) < MOUSE_R
        ctx.shadowColor = near ? `rgba(${cMouse}, 0.9)` : `rgba(${cNode}, 0.7)`
        ctx.beginPath()
        ctx.arc(px, py, near ? 3.4 : 2.4, 0, Math.PI * 2)
        ctx.fillStyle = near ? `rgba(${cMouse}, 1)` : `rgba(${cNode}, ${light ? 0.8 : 1})`
        ctx.fill()
      }

      // Узелок под самим курсором
      if (mouse.on) {
        ctx.shadowColor = `rgba(${cMouse}, 1)`
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cMouse}, 1)`
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    let raf = 0
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    if (reduce) draw()
    else raf = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.on = true
    }
    const onLeave = () => {
      mouse.on = false
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('resize', build)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerout', onLeave)
      window.addEventListener('blur', onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onLeave)
      window.removeEventListener('blur', onLeave)
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
