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
    text: 'Менеджеры по восемь часов в день отвечают на одни и те же вопросы. На то, чтобы дожимать заявки, времени уже не остаётся.',
    name: 'Онлайн-школы',
    role: 'Продажи и приёмная комиссия',
    initials: 'ОШ',
    tag: 'Ситуация',
  },
  {
    text: 'Контент-менеджер тратит рабочий день на то, что должно занимать полчаса. Ассортимент растёт быстрее, чем команда успевает его описывать.',
    name: 'E-commerce',
    role: 'Карточки товаров и контент',
    initials: 'EC',
    tag: 'Ситуация',
  },
  {
    text: 'Мы понимаем, что ИИ уже пора внедрять. Не понимаем другого: с чего начать и где он реально окупится, а где это дорогая игрушка.',
    name: 'B2B и услуги',
    role: 'Собственники и руководители',
    initials: 'B2B',
    tag: 'Ситуация',
  },
]

export default function Home() {
  usePageMeta(
    'Невариум ЛАБ ИИ — внедряем ИИ в бизнес. Измеримо.',
    'GPT-ассистенты, чат-боты, автоматизация в таблицах и обучение команд. Метрику фиксируем до старта, работаем по NDA.',
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
                Внедрять ИИ — уже не&nbsp;выбор.{' '}
                <span className="text-grad">Вопрос — как.</span>
              </h1>
              <p className="lead">
                Он уже пришёл в вашу отрасль. Вопрос в том, спроектируете вы его под свои
                процессы — или будете догонять тех, кто это сделал. Мы проектируем: ассистенты,
                боты и автоматизация, эффект которых считается в часах и деньгах.
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
                <span>Метрика — до старта</span>
                <span>Обучение команды</span>
                <span>Работаем по NDA</span>
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
              <Stat value={70} prefix="до " suffix="%" label="рутины процесса закрывает ассистент" />
              <Stat value={38} prefix="до +" suffix="%" label="к конверсии в заявку с чат-ботом" />
              <Stat value={15} suffix="+" label="ниш с готовыми методологиями" />
              <Stat value={5} prefix="до " suffix=" ч" label="в неделю возвращает обученный сотрудник" />
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
            lead="Не технологии ради технологий. Сначала считаем, где процесс теряет часы и деньги, — и только потом решаем, нужен ли там ИИ."
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
            lead="Прозрачный процесс: вы всегда знаете, что происходит, что получите и когда. Все данные и материалы — под NDA."
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

      {/* СИТУАЦИИ */}
      <section className="section" aria-label="Ситуации клиентов">
        <div className="container">
          <SectionHead
            eyebrow="Ситуации"
            title="С чем к нам приходят чаще всего"
          />
          <div className="grid-3">
            {quotes.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.1}>
                <figure className="glass quote" style={{ height: '100%', margin: 0 }}>
                  <div className="quote__stars">{q.tag}</div>
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
