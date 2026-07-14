import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { IconSearch, IconMap, IconShield, IconChart } from '../data/icons'

const values = [
  {
    icon: <IconChart />,
    title: 'Метрика вместо магии',
    text: 'Каждый проект начинается с цифры, которую хотим изменить: часы, конверсия, стоимость задачи. Если эффект нельзя измерить — мы за него не берёмся.',
  },
  {
    icon: <IconSearch />,
    title: 'Системный подход',
    text: 'Не «настроили и забыли», а карта внедрения: какие процессы автоматизируем, в каком порядке и что это даст на каждом шаге.',
  },
  {
    icon: <IconMap />,
    title: 'Готовые методологии',
    text: 'Библиотека GPT-ассистентов и шаблонов для 15+ ниш: от HR-скрининга до карточек маркетплейсов. Вы не платите за изобретение велосипеда.',
  },
  {
    icon: <IconShield />,
    title: 'Работа без посредников',
    text: 'Лаборатория — это эксперт, а не конвейер агентства. Вы общаетесь напрямую с тем, кто делает вашу задачу, — по NDA и с поддержкой после сдачи.',
  },
]

const stack = [
  'ChatGPT / GPT-4o',
  'Claude',
  'DeepSeek',
  'Midjourney',
  'Flux',
  'Kandinsky',
  'Kling / Luma / Pika',
  'GPT Sheets',
  'SendPulse',
  'Google Workspace',
]

const expertise = [
  'Архитектура языковых моделей: GPT и MoE, пайплайн pre-training → post-training → RL',
  '16 техник промпт-инжиниринга: ролевые, каскадные, цепочки промптов',
  'Создание GPT-ассистентов: системные инструкции, tone of voice, работа с файлами',
  'Библиотека ассистентов: маркетинг, продажи, HR, юристы, e-commerce, поддержка',
  'Каскады в GPT Sheets: шаблоны из 10–100 промптов для 15+ ниш',
  'Генерация изображений и видео: Midjourney, Flux, Kandinsky, Kling',
]

export default function About() {
  usePageMeta(
    'Лаборатория — Невариум ЛАБ ИИ',
    'Методология и принципы лаборатории: метрики вместо магии, системный подход, библиотека решений для 15+ ниш.',
  )

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Лаборатория</span>
            <h1 className="h1">
              Почему <span className="text-grad">«лаборатория»</span>, а не агентство
            </h1>
            <p className="lead">
              Потому что мы не продаём часы команды. Мы исследуем ваш процесс, собираем решение
              из проверенных методологий и передаём его так, чтобы оно работало без нас.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }} aria-label="Принципы">
        <div className="container">
          <div className="values-list">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.1}>
                <div className="glass glass--hover card" style={{ height: '100%' }}>
                  <div className="card__icon">{v.icon}</div>
                  <h2 className="h3">{v.title}</h2>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Экспертиза">
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
            <div>
              <SectionHead
                eyebrow="Экспертиза"
                title="Что внутри лаборатории"
                lead="Фундамент — системная подготовка по работе с языковыми моделями: от устройства архитектур до прикладных методологий."
              />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {expertise.map((e, i) => (
                  <Reveal key={e} delay={i * 0.05} as="li">
                    <div style={{ display: 'flex', gap: '0.7rem', color: 'var(--ink-soft)' }}>
                      <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>✓</span>
                      {e}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal delay={0.15}>
              <div className="glass card">
                <h2 className="h3">Рабочий стек</h2>
                <p>Инструменты подбираем под задачу, а не наоборот — поэтому в стеке и западные, и российские модели.</p>
                <div className="chips">
                  {stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  className="glass"
                  style={{ padding: '1.1rem 1.3rem', borderRadius: 14, marginTop: '0.6rem', fontSize: '0.94rem', color: 'var(--ink-soft)' }}
                >
                  <strong className="text-grad">Принцип выбора:</strong> если задачу решает более простой
                  и дешёвый инструмент — берём его. Ваш бюджет не должен кормить хайп.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
