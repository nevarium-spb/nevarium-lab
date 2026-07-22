import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import { services } from '../data/content'

export default function Services() {
  usePageMeta(
    'Услуги — Невариум ЛАБ ИИ',
    'GPT-ассистенты, чат-боты, ИИ-контент, автоматизация в таблицах, визуал, обучение команд и разработка сайтов. Под ключ и по NDA.',
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Услуги</span>
            <h1 className="h1">
              Семь точек, где ИИ <span className="text-grad">окупается быстрее всего</span>
            </h1>
            <p className="lead">
              Каждая услуга — законченное решение: настройка под ваш процесс, тестирование
              на ваших данных, обучение команды и передача под ключ. Всё под NDA.
              Никаких «дальше разберётесь сами».
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {services.map((s) => (
            <Reveal key={s.id} delay={0.05}>
              <article className="glass card" id={s.id}>
                <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div className="card__icon">{s.icon}</div>
                    <h2 className="h3">{s.title}</h2>
                    <p>{s.full}</p>
                    <div
                      className="glass"
                      style={{ padding: '1rem 1.2rem', borderRadius: 14, fontSize: '0.94rem' }}
                    >
                      <strong className="text-grad">Результат:</strong>{' '}
                      <span style={{ color: 'var(--ink-soft)' }}>{s.result}</span>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--ink-faint)',
                        marginBottom: '0.9rem',
                      }}
                    >
                      Что входит
                    </div>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {s.includes.map((item) => (
                        <li key={item} style={{ display: 'flex', gap: '0.6rem', color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                          <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn btn--ghost" style={{ marginTop: '1.4rem' }}>
                      Обсудить задачу <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

    </>
  )
}
