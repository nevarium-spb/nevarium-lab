import { useEffect, useRef, useState, type ReactNode } from 'react'
import { botNodes, routeFreeText } from '../data/bot'
import { sendLead } from '../lib/leads'
import { normalizePhone } from '../shared/phone.js'
import { CONSENT_PARTS, consentSnapshot } from '../shared/privacy-policy.js'
import { IconBot, IconChat, IconClose, IconSend } from '../data/icons'

type Message = { from: 'bot' | 'user'; text: string }

/**
 * В тексте согласия (узел lead_confirm, bot.ts) название политики делаем
 * ссылкой. Слова не меняем — человек видит ровно CONSENT_TEXT, который потом
 * уходит в CRM как доказательство.
 */
const POLICY_LINK_TEXT = CONSENT_PARTS[1]

function renderMessage(text: string): ReactNode {
  const parts = text.split(POLICY_LINK_TEXT)
  if (parts.length === 1) return text
  const nodes: ReactNode[] = []
  parts.forEach((part, i) => {
    nodes.push(part)
    if (i < parts.length - 1) {
      nodes.push(
        <a key={i} href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>
          {POLICY_LINK_TEXT}
        </a>,
      )
    }
  })
  return nodes
}

const STORAGE_KEY = 'nevarium-chat'

type ChatState = {
  messages: Message[]
  nodeId: string
  leadName: string
  pendingContact: string
}

function loadState(): ChatState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ChatState) : null
  } catch {
    return null
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const saved = useRef(loadState())
  const [messages, setMessages] = useState<Message[]>(saved.current?.messages ?? [])
  const [nodeId, setNodeId] = useState(saved.current?.nodeId ?? 'start')
  const [leadName, setLeadName] = useState(saved.current?.leadName ?? '')
  const [pendingContact, setPendingContact] = useState(saved.current?.pendingContact ?? '')
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const sendingRef = useRef(false) // синхронный флаг: state обновится только на следующий рендер

  const node = botNodes[nodeId] ?? botNodes.start

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, nodeId, leadName, pendingContact }))
    } catch {
      /* приватный режим — молча пропускаем */
    }
  }, [messages, nodeId, leadName, pendingContact])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, typing, open])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // vars переопределяет {name}/{contact} свежим значением из места вызова —
  // не читает leadName/pendingContact из state напрямую, потому что React
  // обновляет state асинхронно: сразу после setPendingContact(text) в этом же
  // рендере state ещё старый, и подстановка показала бы предыдущий контакт.
  const speak = (id: string, vars: Record<string, string> = {}) => {
    const next = botNodes[id] ?? botNodes.fallback
    const merged = { name: leadName, contact: pendingContact, ...vars }
    setTyping(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setTyping(false)
      let text = next.text
      for (const [k, v] of Object.entries(merged)) text = text.replaceAll(`{${k}}`, v)
      setMessages((m) => [...m, { from: 'bot', text }])
      setNodeId(next.id)
    }, 600 + Math.min(next.text.length * 6, 900))
  }

  const openChat = () => {
    setOpen(true)
    if (messages.length === 0) speak('start')
  }

  const pickQuick = (label: string, next: string) => {
    setMessages((m) => [...m, { from: 'user', text: label }])
    // Явное согласие получено этим кликом — только теперь заявка уходит в CRM,
    // а не в момент, когда контакт был просто напечатан.
    if (next === 'lead_send') {
      if (sendingRef.current) return
      sendingRef.current = true
      setSending(true)
      sendLead({ name: leadName, contact: pendingContact, source: 'chat', consent: consentSnapshot() })
        .then(() => speak('lead_done'))
        .catch(() => speak('lead_failed'))
        .finally(() => {
          sendingRef.current = false
          setSending(false)
          setPendingContact('') // контакт использован (или отклонён CRM) — не переносить в новую попытку
        })
      return
    }
    // «Отмена» ведёт назад на lead_phone — старый непринятый контакт не должен
    // тихо всплыть, если человек передумает и снова дойдёт до подтверждения.
    if (next === 'lead_phone') setPendingContact('')
    speak(next)
  }

  const send = () => {
    const text = input.trim()
    if (!text || typing || sendingRef.current) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text }])

    if (node.input === 'name') {
      setLeadName(text)
      speak('lead_phone', { name: text })
      return
    }
    if (node.input === 'phone') {
      // Телефон обязателен (общая политика ПДн) — без него заявку не принимаем.
      const phone = normalizePhone(text)
      if (!phone) {
        speak('lead_phone_invalid')
        return
      }
      // Контакт напечатан, но в CRM пока не уходит — сперва нужно явное
      // согласие отдельным действием (кнопка в lead_confirm), а не сам факт
      // ввода контакта. Показываем сам номер в подтверждении, чтобы человек
      // видел, что именно согласится отправить — а не подписывался вслепую.
      setPendingContact(phone)
      speak('lead_confirm', { contact: phone })
      return
    }
    speak(routeFreeText(text))
  }

  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Чат с ассистентом Нева">
          <div className="chat__head">
            <div className="chat__avatar">
              <IconBot />
            </div>
            <div>
              <div className="chat__title">Нева · ИИ-ассистент</div>
              <div className="chat__status">онлайн, отвечает мгновенно</div>
            </div>
            <button className="chat__close" onClick={() => setOpen(false)} aria-label="Закрыть чат">
              <IconClose size={18} />
            </button>
          </div>

          <div className="chat__body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg msg--${m.from}`}>
                {renderMessage(m.text)}
              </div>
            ))}
            {typing && (
              <div className="msg msg--bot msg--typing" aria-label="Нева печатает">
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          {!typing && !sending && node.quick && (
            <div className="chat__quick">
              {node.quick.map((q) => (
                <button key={q.next + q.label} onClick={() => pickQuick(q.label, q.next)}>
                  {q.label}
                </button>
              ))}
              {nodeId === 'lead_done' && (
                <a
                  href="https://max.ru/@nevarium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat__quick-link"
                  style={{
                    display: 'block',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    background: 'linear-gradient(100deg, #4f46e5, #4338ca)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    marginTop: '0.5rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Продолжить в Max →
                </a>
              )}
            </div>
          )}

          <div className="chat__input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              disabled={sending}
              placeholder={
                sending
                  ? 'Отправляем…'
                  : node.input === 'name'
                    ? 'Ваше имя…'
                    : node.input === 'phone'
                      ? '+7 900 000-00-00'
                      : 'Напишите вопрос…'
              }
              aria-label="Сообщение для ассистента"
            />
            <button
              className="chat__send"
              onClick={send}
              disabled={!input.trim() || typing || sending}
              aria-label="Отправить сообщение"
            >
              <IconSend size={18} />
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button className="chat-fab" onClick={openChat} aria-label="Открыть чат с ИИ-ассистентом">
          <IconChat />
          <span className="chat-fab__dot" aria-hidden="true" />
        </button>
      )}
    </>
  )
}
