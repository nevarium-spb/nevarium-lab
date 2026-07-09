import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

/** Счётчик, который анимируется от 0 при появлении во вьюпорте. */
export default function Stat({ value, prefix = '', suffix = '', label }: Props) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const t0 = performance.now()
        const dur = 1400
        const tick = (t: number) => {
          const p = Math.min((t - t0) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(value * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <div className="glass stat" ref={ref}>
      <div className="stat__value">
        {prefix}
        {display.toLocaleString('ru-RU')}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}
