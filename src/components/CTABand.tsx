import { Link } from 'react-router-dom'
import Reveal from './Reveal'

type Props = {
  title?: string
  lead?: string
  button?: string
}

export default function CTABand({
  title = 'Готовы начать?',
  lead = 'Обсудим вашу задачу и найдём лучший способ её решить с помощью ИИ.',
  button = 'Оставить заявку',
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
