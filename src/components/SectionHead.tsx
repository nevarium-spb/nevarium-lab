import type { ReactNode } from 'react'
import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  center?: boolean
}

export default function SectionHead({ eyebrow, title, lead, center }: Props) {
  return (
    <Reveal className={center ? 'section-head section-head--center' : 'section-head'}>
      <div style={center ? { marginInline: 'auto', textAlign: 'center' } : undefined}>
        <span className="eyebrow" style={center ? { justifyContent: 'center' } : undefined}>
          {eyebrow}
        </span>
        <h2 className="h2">{title}</h2>
        {lead && <p className="lead" style={center ? { marginInline: 'auto' } : undefined}>{lead}</p>}
      </div>
    </Reveal>
  )
}
