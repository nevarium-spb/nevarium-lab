import { useState, type FormEvent } from 'react'
import { sendLead } from '../lib/leads'
import { IconCheck } from '../data/icons'

const MAX_LINK = 'https://max.ru/join/4u3kB47o-53REUPLuMBIl2uHDiMAmAFto24mxJ1wgnk'

/**
 * Форма заявки на странице «Контакты». Вынесена в отдельный остров из
 * Contact.tsx: остальная часть страницы (реквизиты, почта, телефон) статична,
 * и тянуть под неё React незачем — интерактивна только форма.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const sent = status === 'sent'

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return // защита от двойного клика
    const form = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      await sendLead({
        name: String(form.get('name') || ''),
        contact: String(form.get('contact') || ''),
        task: String(form.get('topic') || ''),
        note: String(form.get('message') || ''),
        source: 'form',
        website: String(form.get('website') || ''), // ловушка для ботов
      })
      setStatus('sent')
    } catch {
      // Экран успеха здесь был бы обманом: заявка не дошла. Показываем прямой
      // способ связи, чтобы человек не ушёл ни с чем.
      setStatus('error')
    }
  }

  if (sent) {
    return (
      <div className="form__success" role="status">
        <div
          className="card__icon"
          style={{ marginInline: 'auto', width: 64, height: 64, borderRadius: '50%', color: '#34d399' }}
        >
          <IconCheck size={30} />
        </div>
        <h2 className="h3">Заявка отправлена!</h2>
        <p>
          Спасибо! Свяжемся в течение рабочего дня — разберём вашу ситуацию и скажем,
          где здесь ИИ окупится быстрее всего. А пока загляните в чат к Неве: она
          покажет сценарии для вашей ниши.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <div>
          <label htmlFor="cf-name">Ваше имя *</label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={100}
            placeholder="Как к вам обращаться"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-contact">Телефон или Max *</label>
          <input
            id="cf-contact"
            name="contact"
            required
            maxLength={254}
            placeholder="+7 900 000-00-00 или ник в Max"
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
          <option>Разработка сайта</option>
          <option>Воронки продаж и лид-магниты</option>
          <option>Упаковка личного бренда</option>
          <option>Сценарии для курсов и вебинаров</option>
          <option>Пока не знаю — нужен аудит</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-msg">Пара слов о ситуации</label>
        <textarea
          id="cf-msg"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Например: менеджеры отвечают на одни и те же вопросы клиентов…"
        />
      </div>
      {/* Ловушка для ботов: человек это поле не видит, автозаполнение выключено */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
      {status === 'error' && (
        <p role="alert" style={{ fontSize: '0.9rem', color: '#fca5a5' }}>
          Не получилось отправить — похоже, пропала связь. Напишите нам напрямую:{' '}
          <a href={MAX_LINK} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            в MAX
          </a>{' '}
          или на почту с этой страницы. Ваше сообщение не потеряется.
        </p>
      )}
      <p style={{ fontSize: '0.8rem', color: 'var(--ink-faint)' }}>
        Нажимая кнопку, вы соглашаетесь на{' '}
        <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
          обработку персональных данных
        </a>
        . Всё, что вы расскажете о своих процессах, остаётся между нами — работаем по NDA.
      </p>
    </form>
  )
}
