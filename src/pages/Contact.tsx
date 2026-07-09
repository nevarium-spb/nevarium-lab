import { useState, type FormEvent } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import { IconMail, IconSend, IconClock, IconCheck } from '../data/icons'

export default function Contact() {
  usePageMeta(
    'Контакты — Невариум ЛАБ ИИ',
    'Оставьте заявку на бесплатный аудит: найдём 2–3 точки, где ИИ окупится в вашем бизнесе уже в первый месяц.',
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
                  <a className="contact-info__value" href="mailto:hello@nevarium.ai">
                    hello@nevarium.ai
                  </a>
                </div>
              </div>
              <div className="contact-info__row">
                <div className="card__icon">
                  <IconSend />
                </div>
                <div>
                  <div className="contact-info__label">Telegram</div>
                  <a
                    className="contact-info__value"
                    href="https://t.me/nevarium"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @nevarium
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
              <div
                className="glass"
                style={{ padding: '1.1rem 1.3rem', borderRadius: 14, fontSize: '0.92rem', color: 'var(--ink-soft)' }}
              >
                Первый аудит — <strong style={{ color: 'var(--ink)' }}>бесплатно</strong>. 30 минут,
                онлайн, без обязательств. Уйдёте минимум со списком из 2–3 идей для своего бизнеса.
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
                        placeholder="+7 900 000-00-00 или @nick"
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
