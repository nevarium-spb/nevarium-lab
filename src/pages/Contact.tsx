import { useState, type FormEvent } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import { IconMail, IconMax, IconClock, IconCheck } from '../data/icons'

export default function Contact() {
  usePageMeta(
    'Контакты — Невариум ЛАБ ИИ',
    'Оставьте заявку и обсудите вашу задачу с нашей командой.',
  )
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Демо-режим: в бою здесь запрос к бэкенду или сервису форм
    setSent(true)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Контакты</span>
            <h1 className="h1">
              Обсудим <span className="text-grad">вашу задачу</span>
            </h1>
            <p className="lead">
              Оставьте заявку — вернёмся с ответом в течение рабочего дня. Или спросите Неву
              в чате: она онлайн круглосуточно.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container contact-grid">
          <Reveal>
            <div className="glass contact-info">
              <div className="contact-info__row">
                <div className="card__icon">
                  <IconMail />
                </div>
                <div>
                  <div className="contact-info__label">Почта</div>
                  <a className="contact-info__value" href="mailto:nevarium-lab@yandex.com">
                    <svg width="200" height="28" viewBox="0 0 200 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                      <text x="0" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fill="currentColor" letterSpacing="0.5">
                        nevarium-lab@yandex.com
                      </text>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="contact-info__row">
                <div className="card__icon">
                  <IconMax />
                </div>
                <div>
                  <div className="contact-info__label">Max</div>
                  <a
                    className="contact-info__value"
                    href="https://max.ru/join/4u3kB47o-53REUPLuMBIl2uHDiMAmAFto24mxJ1wgnk"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Мы в MAX
                  </a>
                </div>
              </div>
              <div className="contact-info__row">
                <div className="card__icon">
                  <IconClock />
                </div>
                <div>
                  <div className="contact-info__label">Отвечаем</div>
                  <div className="contact-info__value">Пн–Пт, 10:00–19:00 МСК</div>
                </div>
              </div>
              <div className="contact-info__row">
                <div className="card__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="contact-info__label">Телефон</div>
                  <svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                    <text x="0" y="20" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fill="currentColor" letterSpacing="0.5">
                      +7 921 008-16-06
                    </text>
                  </svg>
                </div>
              </div>
              <div
                className="glass"
                style={{ padding: '1.1rem 1.3rem', borderRadius: 14, fontSize: '0.92rem', color: 'var(--ink-soft)' }}
              >
                <strong style={{ color: 'var(--ink)' }}>ИП Макеева Марина Александровна</strong>
                <br />
                ИНН 770878422219
                <br />
                ОГРНИП 326784700057660
                <br />
                Санкт-Петербург, Витебский проспект д. 41К3 -131
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass" style={{ padding: '2rem' }}>
              {sent ? (
                <div className="form__success" role="status">
                  <div
                    className="card__icon"
                    style={{ marginInline: 'auto', width: 64, height: 64, borderRadius: '50%', color: '#34d399' }}
                  >
                    <IconCheck size={30} />
                  </div>
                  <h2 className="h3">Заявка отправлена!</h2>
                  <p>
                    Спасибо! Свяжемся с вами в течение рабочего дня. А пока загляните в чат к Неве —
                    она расскажет о кейсах в вашей нише.
                  </p>
                </div>
              ) : (
                <form className="form" onSubmit={onSubmit}>
                  <div className="form__row">
                    <div>
                      <label htmlFor="cf-name">Ваше имя *</label>
                      <input id="cf-name" name="name" required placeholder="Как к вам обращаться" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="cf-contact">Телефон или Telegram *</label>
                      <input
                        id="cf-contact"
                        name="contact"
                        required
                        placeholder="+7 900 000-00-00 или @nick (Max/Telegram)"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-topic">Что хотите автоматизировать?</label>
                    <select id="cf-topic" name="topic" defaultValue="">
                      <option value="" disabled>
                        Выберите направление
                      </option>
                      <option>GPT-ассистент для процесса</option>
                      <option>Чат-бот для продаж или поддержки</option>
                      <option>Контент и маркетинг</option>
                      <option>Автоматизация в таблицах</option>
                      <option>Визуал и видео</option>
                      <option>Обучение команды</option>
                      <option>Пока не знаю — нужен аудит</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cf-msg">Пара слов о задаче</label>
                    <textarea
                      id="cf-msg"
                      name="message"
                      rows={4}
                      placeholder="Например: менеджеры тонут в одинаковых вопросах клиентов…"
                    />
                  </div>
                  <button type="submit" className="btn btn--primary btn--lg">
                    Отправить заявку
                  </button>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
