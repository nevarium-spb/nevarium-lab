import { useRef, useState, type FormEvent } from 'react'
import { sendPdRequest, type PdKind } from '../lib/leads'

// Форма запроса по персональным данным для страницы политики (152-ФЗ, п.7).
// Раньше единственным способом была почта: человек писал письмо, и оно могло
// потеряться в ящике, а срок исполнения (10 рабочих дней) шёл с момента обращения.
// Через форму запрос сразу попадает в CRM с посчитанным сроком.
//
// Почта из политики никуда не девается и остаётся запасным каналом — в том числе
// на случай, если CRM недоступна: обещать исполнение и потерять запрос нельзя.

const EMAIL = 'nevarium-lab@yandex.com'

const KINDS: { value: PdKind; label: string }[] = [
  { value: 'access', label: 'Узнать, какие мои данные у вас есть' },
  { value: 'correct', label: 'Исправить неточные данные' },
  { value: 'delete', label: 'Отозвать согласие и удалить данные' },
  { value: 'stop', label: 'Прекратить обработку' },
]

export default function PdRequestForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const sendingRef = useRef(false) // синхронный флаг: state обновится только на следующий рендер

  const kindRef = useRef<HTMLSelectElement>(null)
  const contactRef = useRef<HTMLInputElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const consentRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Личные поля намеренно без name — см. пояснение в ContactForm.tsx:
    // form.submit() в обход React игнорирует и onSubmit, и constraint
    // validation, и ушёл бы нативным GET с полями формы в query-строке.
    if (sendingRef.current || !consentRef.current?.checked) return
    sendingRef.current = true
    setStatus('sending')
    try {
      await sendPdRequest({
        contact: contactRef.current?.value || '',
        kind: (kindRef.current?.value || 'delete') as PdKind,
        note: noteRef.current?.value || '',
        website: websiteRef.current?.value || '', // ловушка для ботов
        consent: true,
      })
      setStatus('sent')
    } catch {
      // Экран успеха тут был бы прямым обманом: человек будет ждать ответа
      // в срок, которого никто не получил. Показываем почту.
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  if (status === 'sent') {
    return (
      <div className="form" role="status">
        <p style={{ margin: 0 }}>
          <strong>Запрос принят.</strong> Мы исполним его в течение 10 рабочих дней и ответим
          на указанный вами контакт. Если ответа не будет — напишите на{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="pd-kind">Что сделать с вашими данными *</label>
        <select id="pd-kind" ref={kindRef} defaultValue="delete">
          {KINDS.map((k) => (
            <option key={k.value} value={k.value}>
              {k.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="pd-contact">Почта или телефон, которые вы нам оставляли *</label>
        <input
          id="pd-contact"
          ref={contactRef}
          required
          maxLength={254}
          placeholder="ivan@example.ru или +7 900 000-00-00"
          autoComplete="email"
        />
        <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: '0.4rem 0 0' }}>
          Нужны, чтобы найти вашу заявку в базе и ответить вам. Если оставляли другой контакт —
          укажите тот, старый.
        </p>
      </div>
      <div>
        <label htmlFor="pd-note">Пояснение, если нужно</label>
        <textarea
          id="pd-note"
          ref={noteRef}
          rows={3}
          maxLength={2000}
          placeholder="Например: какие именно данные исправить"
        />
      </div>
      {/* Ловушка для ботов: человек это поле не видит, автозаполнение выключено.
          name оставлен намеренно — см. пояснение в ContactForm.tsx. */}
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
      <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Отправить запрос'}
      </button>
      {status === 'error' && (
        <p role="alert" style={{ fontSize: '0.9rem', color: '#fca5a5' }}>
          Не получилось отправить — похоже, пропала связь. Напишите на{' '}
          <a href={`mailto:${EMAIL}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
            {EMAIL}
          </a>
          : это тот же самый запрос, и срок исполнения тот же.
        </p>
      )}
    </form>
  )
}
