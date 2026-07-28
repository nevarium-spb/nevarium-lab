// Отправка заявок в Невариум CRM (crm-nevarium.ru).
// Единственное место, которое знает адрес CRM и название проекта: и форма,
// и чат-бот шлют заявки через него.
//
// Важно: молча «делать вид, что отправилось» нельзя — потерянная заявка не
// восстановится. Если запрос не прошёл, вызывающий код обязан показать
// человеку запасной способ связи, а не экран успеха.

const API = import.meta.env.VITE_CRM_API || 'https://crm-nevarium.ru'

/** Slug проекта в CRM — по нему заявка попадает в нужный инбокс. */
const PROJECT = 'nevarium1'

const TIMEOUT_MS = 10_000

export type Lead = {
  /** Имя. Для заявок из чата может отсутствовать — подставится контакт. */
  name?: string
  /** Телефон, почта или ник — как оставил человек. */
  contact: string
  /** Что нужно: направление из формы или вопрос из чата. */
  task?: string
  /** Масштаб/объём из формы, если выбран. */
  scale?: string
  /** Комментарий из формы. */
  note?: string
  /** Подробности из чата. */
  detail?: string
  /** 'chat' — заявка из диалога с Невой; иначе считается формой. */
  source?: 'form' | 'chat'
  /** Ловушка для ботов: люди это поле не видят и не заполняют. */
  website?: string
}

export async function sendLead(lead: Lead): Promise<void> {
  const res = await fetch(`${API}/api/leads`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...lead, project: PROJECT }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`CRM ответила ${res.status}`)
}
