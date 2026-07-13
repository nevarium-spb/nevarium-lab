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

    const LINK = 150 // радиус связей точка-точка
    const MOUSE_R = 230 // радиус влияния курсора
    const PUSH = 55 // макс. смещение точки от курсора, px

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
      const count = Math.min(105, Math.max(40, Math.floor((w * h) / 15000)))
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

      // Линии между точками — приглушённый ambient-слой
      ctx.lineWidth = 1
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
            const alpha = (1 - dist / LINK) * (light ? 0.3 : 0.34)
            ctx.strokeStyle = `rgba(${cLink}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.stroke()
          }
        }
      }

      // Линии от курсора к ближним точкам (только у указателя — контенту не мешают)
      if (mouse.on) {
        ctx.lineWidth = 1.5
        for (const p of ps) {
          const d = Math.hypot(p.x + p.ox - mouse.x, p.y + p.oy - mouse.y)
          if (d < MOUSE_R) {
            ctx.strokeStyle = `rgba(${cMouse}, ${(1 - d / MOUSE_R) * 0.7})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x + p.ox, p.y + p.oy)
            ctx.stroke()
          }
        }
      }

      // Узлы — лёгкое свечение только у курсора
      for (const p of ps) {
        const px = p.x + p.ox
        const py = p.y + p.oy
        const near = mouse.on && Math.hypot(px - mouse.x, py - mouse.y) < MOUSE_R
        if (near) {
          ctx.shadowColor = `rgba(${cMouse}, 0.8)`
          ctx.shadowBlur = 6
        } else {
          ctx.shadowBlur = 0
        }
        ctx.beginPath()
        ctx.arc(px, py, near ? 2.6 : 1.9, 0, Math.PI * 2)
        ctx.fillStyle = near ? `rgba(${cMouse}, 0.95)` : `rgba(${cNode}, ${light ? 0.52 : 0.62})`
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Узелок под самим курсором
      if (mouse.on) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cMouse}, 0.85)`
        ctx.fill()
      }
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
    // Пауза анимации в скрытой вкладке — не жжём CPU/батарею
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!reduce && !raf) {
        raf = requestAnimationFrame(loop)
      }
    }
    window.addEventListener('resize', build)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      // mouseleave на документе — надёжный сигнал «курсор ушёл со страницы»
      // (в отличие от pointerout, который срабатывает на границах элементов)
      document.addEventListener('mouseleave', onLeave)
      window.addEventListener('blur', onLeave)
      document.addEventListener('visibilitychange', onVisibility)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
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
