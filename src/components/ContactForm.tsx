import { useRef, useState, type FormEvent } from 'react'
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
  const sendingRef = useRef(false) // синхронный флаг: state обновится только на следующий рендер

  const nameRef = useRef<HTMLInputElement>(null)
  const contactRef = useRef<HTMLInputElement>(null)
  const topicRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Личные поля намеренно без name — обычный <input> без React серьёзно
    // отличается от form.submit(): последний игнорирует onSubmit и constraint
    // validation целиком и уходит нативным GET на текущий URL с полями формы
    // в query-строке (это и есть уязвимость, а не типографика). Без name эти
    // поля не попадут в такую подстановку, даже если submit() вызвать в обход
    // React напрямую из консоли/чужого скрипта.
    if (sendingRef.current || !consentRef.current?.checked) return
    sendingRef.current = true
    setStatus('sending')
    try {
      await sendLead({
        name: nameRef.current?.value || '',
        contact: contactRef.current?.value || '',
        task: topicRef.current?.value || '',
        note: messageRef.current?.value || '',
        source: 'form',
        website: websiteRef.current?.value || '', // ловушка для ботов
        consent: true,
      })
      setStatus('sent')
    } catch {
      // Экран успеха здесь был бы обманом: заявка не дошла. Показываем прямой
      // способ связи, чтобы человек не ушёл ни с чем.
      setStatus('error')
    } finally {
      sendingRef.current = false
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
            ref={nameRef}
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
            ref={contactRef}
            required
            maxLength={254}
            placeholder="+7 900 000-00-00 или ник в Max"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-topic">Что хотите автоматизировать?</label>
        <select id="cf-topic" ref={topicRef} defaultValue="">
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
          ref={messageRef}
          rows={4}
          maxLength={2000}
          placeholder="Например: менеджеры отвечают на одни и те же вопросы клиентов…"
        />
      </div>
      {/* Ловушка для ботов: человек это поле не видит, автозаполнение выключено.
          name оставлен намеренно — анти-спам библиотеки ищут поля по типовым
          именам вроде "website"; сам он всегда пуст, значения человека не несёт. */}
      <input
        type="text"
        name="website"
        ref={websiteRef}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <label
        style={{
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-start',
          fontSize: '0.85rem',
          color: 'var(--ink-faint)',
          cursor: 'pointer',
        }}
      >
        <input type="checkbox" ref={consentRef} required style={{ marginTop: '0.2rem', flexShrink: 0 }} />
        <span>
          Даю согласие на{' '}
          <a href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
            обработку персональных данных
          </a>
        </span>
      </label>
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
        Всё, что вы расскажете о своих процессах, остаётся между нами — работаем по NDA.
      </p>
    </form>
  )
}
