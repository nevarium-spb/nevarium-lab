import { Link } from 'react-router-dom'
import Reveal from './Reveal'

type Props = {
  title?: string
  lead?: string
  button?: string
}

export default function CTABand({
  title = 'Найдём, где ИИ окупится у вас быстрее всего',
  lead = 'Бесплатный аудит на 30 минут: разберём ваши процессы и покажем 2–3 точки, где автоматизация даст эффект уже в первый месяц.',
  button = 'Записаться на бесплатный аудит',
}: Props) {
  return (
    <section className="section" aria-label="Призыв к действию">
      <div className="container">
        <Reveal>
          <div className="glass cta-band">
            <h2 className="h2">{title}</h2>
            <p className="lead">{lead}</p>
            <Link to="/contact" className="btn btn--primary btn--lg">
              {button}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
