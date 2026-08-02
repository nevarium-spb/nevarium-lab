import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import { cases } from '../data/content'

export default function Cases() {
  usePageMeta(
    'Кейсы — Невариум ЛАБ ИИ',
    'Типовые сценарии внедрения ИИ по нишам: e-commerce, онлайн-школы, B2B, HR, розница, личный бренд.',
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Сценарии</span>
            <h1 className="h1">
              Типовые сценарии <span className="text-grad">внедрения по нишам</span>
            </h1>
            <p className="lead">
              Ниже — модельные сценарии: ситуация, решение и ориентир по эффекту. Это не отчёты
              клиентов, а отработанные методологии. Узнаёте свою ситуацию — значит, под неё
              уже есть готовый план.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="grid-2">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1}>
                <article className="glass glass--hover card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
                    <span className="case-card__niche">{c.niche}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div className="case-card__metric">{c.metric}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>{c.metricLabel}</div>
                    </div>
                  </div>
                  <h2 className="h3">{c.title}</h2>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Ситуация:</strong> {c.problem}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--ink)' }}>Решение:</strong> {c.solution}
                  </p>
                  <div className="chips" style={{ marginTop: 'auto' }}>
                    {c.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
