import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { plans, faqs } from '../data/content'

export default function Pricing() {
  usePageMeta(
    'Тарифы — Невариум ЛАБ ИИ',
    'Три формата работы: Старт от 39 000 ₽, Система — комплексное внедрение, Партнёр — ИИ-директор на аутсорсе. Метрика фиксируется до старта.',
  )
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Тарифы</span>
            <h1 className="h1">
              Честные цены <span className="text-grad">за измеримый результат</span>
            </h1>
            <p className="lead">
              Платите за решённую задачу, а не за часы команды. До старта фиксируем метрику
              успеха — чтобы вы и мы одинаково понимали, что считается результатом.
              Работаем по NDA.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="pricing-grid">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className={`glass plan ${p.featured ? 'plan--featured' : ''}`} style={{ height: '100%' }}>
                  {p.featured && <span className="plan__tag">Оптимальный баланс</span>}
                  <h2 className="h3">{p.name}</h2>
                  <div className="plan__price">
                    {p.price} <small>{p.period}</small>
                  </div>
                  <p className="plan__desc">{p.desc}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`btn ${p.featured ? 'btn--primary' : 'btn--ghost'}`}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Частые вопросы">
        <div className="container">
          <SectionHead
            eyebrow="FAQ"
            title="Частые вопросы"
            lead="Здесь — то, что спрашивают до старта чаще всего. Не нашли свой вопрос — спросите Неву в чате справа внизу."
          />
          <div className="faq">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={`glass faq__item ${openFaq === i ? 'is-open' : ''}`}>
                  <button
                    className="faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {f.q}
                    <i aria-hidden="true" />
                  </button>
                  <div className="faq__a">
                    <div className="faq__a-inner">{f.a}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
