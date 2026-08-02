import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'

export default function NotFound() {
  usePageMeta('Страница не найдена — Невариум ЛАБ ИИ')

  return (
    <section className="section" style={{ paddingTop: 'calc(var(--header-h) + 6rem)', minHeight: '70vh' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <Reveal>
          <div
            className="h1 text-grad"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 3rem + 8vw, 8rem)', fontWeight: 700 }}
          >
            404
          </div>
          <h1 className="h2" style={{ marginTop: '1rem' }}>
            Такой страницы нет
          </h1>
          <p className="lead" style={{ marginInline: 'auto', marginTop: '1rem' }}>
            Даже нейросеть иногда галлюцинирует ссылками. Вернёмся на главную?
          </p>
          <Link to="/" className="btn btn--primary btn--lg" style={{ marginTop: '2rem' }}>
            На главную
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
