import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import HeroPanel from '../components/HeroPanel'
import Stat from '../components/Stat'
import { services, processSteps } from '../data/content'

const marqueeItems = [
  'GPT-ассистенты',
  'Чат-боты 24/7',
  'ИИ-контент',
  'Каскадные промпты',
  'GPT Sheets',
  'Midjourney',
  'Автоматизация продаж',
  'Обучение команд',
]

const quotes = [
  {
    text: 'Думали, ИИ — это дорого и «для больших». Оказалось, наш бот окупился за первый месяц: менеджеры перестали отвечать на одни и те же вопросы.',
    name: 'Марина К.',
    role: 'Владелица онлайн-школы',
    initials: 'МК',
  },
  {
    text: 'Таблица с промптами делает за 15 минут то, на что контент-менеджер тратил день. Причём тексты стали даже ровнее по качеству.',
    name: 'Дмитрий С.',
    role: 'Руководитель e-commerce проекта',
    initials: 'ДС',
  },
  {
    text: 'Понравился подход: сначала аудит и метрики, потом работа. Никакой магии и обещаний — просто рутину сняли с людей, цифры выросли.',
    name: 'Алексей В.',
    role: 'Директор агентства недвижимости',
    initials: 'АВ',
  },
]

export default function Home() {
  usePageMeta(
    'Невариум ЛАБ ИИ — внедряем ИИ в бизнес. Измеримо.',
    'GPT-ассистенты под ключ, чат-боты для продаж, ИИ-контент и автоматизация в таблицах.',
  )

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <Reveal>
            <div>
              <span className="hero__badge">
                <i aria-hidden="true" />
                Лаборатория внедрения ИИ для бизнеса
              </span>
              <h1 className="h1">
                Внедряем ИИ в&nbsp;бизнес.{' '}
                <span className="text-grad">Измеримо.</span>
              </h1>
              <p className="lead">
                Снимаем рутину с вашей команды: GPT-ассистенты, чат-боты и автоматизация,
                которые экономят часы и повышают конверсию — без найма программистов.
              </p>
              <div className="hero__actions">
                <Link to="/contact" className="btn btn--primary btn--lg">
                  Обсудить проект
                </Link>
                <Link to="/cases" className="btn btn--ghost btn--lg">
                  Смотреть кейсы
                </Link>
              </div>
              <div className="trust">
                <span>Метрика в договоре</span>
                <span>Обучение команды</span>
                <span>Поддержка после сдачи</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="hero__visual">
            <HeroPanel />
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__item" key={copy}>
              {marqueeItems.map((item) => (
                <span key={item} className="marquee__item">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* СТАТИСТИКА */}
      <section className="section" aria-label="Результаты в цифрах">
        <div className="container">
          <Reveal>
            <div className="stats">
              <Stat value={70} suffix="%" label="рутинных задач закрывает ассистент" />
              <Stat value={38} prefix="+" suffix="%" label="к конверсии с чат-ботом продаж" />
              <Stat value={15} suffix="+" label="ниш с готовыми ИИ-шаблонами" />
              <Stat value={5} suffix=" ч" label="в неделю экономит каждый обученный сотрудник" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section className="section" aria-label="Услуги">
        <div className="container">
          <SectionHead
            eyebrow="Что мы делаем"
            title={
              <>
                ИИ-решения под задачи <span className="text-grad">вашего бизнеса</span>
              </>
            }
            lead="Не технологии ради технологий: каждое решение привязано к метрике — времени, конверсии или деньгам."
          />
          <div className="grid-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.1}>
                <article className="glass glass--hover card" style={{ height: '100%' }}>
                  <div className="card__icon">{s.icon}</div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.short}</p>
                  <Link to="/services" className="card__link">
                    Подробнее <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОЦЕСС */}
      <section className="section" aria-label="Как мы работаем">
        <div className="container">
          <SectionHead
            eyebrow="Как мы работаем"
            title="От аудита до работающего решения — 4 шага"
            lead="Прозрачный процесс: вы всегда знаете, что происходит, что получите и когда."
          />
          <div className="steps">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="glass step" style={{ height: '100%' }}>
                  <div className="step__num">0{i + 1}</div>
                  <h3 className="h3" style={{ marginBottom: '0.6rem' }}>
                    {s.title}
                  </h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="section" aria-label="Отзывы клиентов">
        <div className="container">
          <SectionHead
            eyebrow="Отзывы"
            title="Что говорят те, кто уже внедрил"
          />
          <div className="grid-3">
            {quotes.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.1}>
                <figure className="glass quote" style={{ height: '100%', margin: 0 }}>
                  <div className="quote__stars" aria-label="Оценка 5 из 5">★★★★★</div>
                  <blockquote className="quote__text" style={{ margin: 0 }}>
                    «{q.text}»
                  </blockquote>
                  <figcaption className="quote__author">
                    <div className="quote__avatar" aria-hidden="true">
                      {q.initials}
                    </div>
                    <div>
                      <div className="quote__name">{q.name}</div>
                      <div className="quote__role">{q.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
