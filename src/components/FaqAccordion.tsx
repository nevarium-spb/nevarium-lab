import { useState } from 'react'
import type { Faq } from '../data/content'

/**
 * Аккордеон FAQ на странице «Тарифы». Вынесен в отдельный остров: интерактивно
 * только раскрытие вопросов, остальная часть страницы (тарифы) статична.
 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="faq">
      {faqs.map((f, i) => (
        // Обёртка reveal — отдельный узел с НЕИЗМЕННЫМ className (не зависит
        // от openFaq). Если 'is-visible' (добавляет внешний скрипт-наблюдатель
        // в Base.astro) и 'is-open' (переключает React) жить на одном узле,
        // клик по любому вопросу пересчитает className этого узла и сотрёт
        // 'is-visible' — карточка мигнёт и станет прозрачной в момент клика.
        <div key={f.q} className="reveal" style={{ '--reveal-delay': `${i * 0.05}s` } as React.CSSProperties}>
          <div className={`glass faq__item ${openFaq === i ? 'is-open' : ''}`}>
            <button
              className="faq__q"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
            >
              {f.q}
              <i aria-hidden="true" />
            </button>
            <div className="faq__a">
              <div className="faq__a-inner">{f.a}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
