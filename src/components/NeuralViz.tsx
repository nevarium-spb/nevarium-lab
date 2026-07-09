// Анимированный «нейрограф» для hero: стеклянная панель-дашборд с сетью узлов
export default function NeuralViz() {
  return (
    <div className="glass" style={{ padding: '1.4rem', borderRadius: 28 }}>
      <svg viewBox="0 0 520 420" role="img" aria-label="Визуализация нейросети, обрабатывающей бизнес-задачи">
        <defs>
          <linearGradient id="nv-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="nv-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
          <radialGradient id="nv-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <style>{`
            .nv-pulse { animation: nv-pulse 2.6s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
            .nv-pulse.d1 { animation-delay: .5s } .nv-pulse.d2 { animation-delay: 1s } .nv-pulse.d3 { animation-delay: 1.5s }
            @keyframes nv-pulse { 50% { transform: scale(1.35); opacity: .65 } }
            .nv-dash { stroke-dasharray: 6 8; animation: nv-dash 1.6s linear infinite; }
            @keyframes nv-dash { to { stroke-dashoffset: -14 } }
            .nv-bar { animation: nv-bar 3.2s ease-in-out infinite alternate; transform-origin: bottom; transform-box: fill-box; }
            .nv-bar.d1 { animation-delay: .4s } .nv-bar.d2 { animation-delay: .8s } .nv-bar.d3 { animation-delay: 1.2s }
            @keyframes nv-bar { from { transform: scaleY(.55) } to { transform: scaleY(1) } }
            @media (prefers-reduced-motion: reduce) { .nv-pulse, .nv-dash, .nv-bar { animation: none } }
          `}</style>
        </defs>

        <circle cx="260" cy="185" r="150" fill="url(#nv-glow)" />

        {/* связи */}
        <g stroke="url(#nv-line)" strokeWidth="1.6" fill="none">
          <path className="nv-dash" d="M80 90 C160 100, 190 150, 260 165" />
          <path className="nv-dash" d="M70 200 C150 200, 190 185, 258 180" />
          <path className="nv-dash" d="M85 305 C170 290, 200 220, 260 195" />
          <path className="nv-dash" d="M262 180 C330 160, 360 120, 435 105" />
          <path className="nv-dash" d="M262 185 C340 195, 370 240, 438 255" />
        </g>

        {/* входные узлы */}
        <g>
          <circle className="nv-pulse" cx="80" cy="90" r="9" fill="#22d3ee" />
          <circle className="nv-pulse d1" cx="70" cy="200" r="9" fill="#8b5cf6" />
          <circle className="nv-pulse d2" cx="85" cy="305" r="9" fill="#e879f9" />
          <text x="80" y="64" textAnchor="middle" fill="rgba(238,240,251,.65)" fontSize="13" fontFamily="Manrope, sans-serif">Заявки</text>
          <text x="70" y="236" textAnchor="middle" fill="rgba(238,240,251,.65)" fontSize="13" fontFamily="Manrope, sans-serif">Контент</text>
          <text x="85" y="341" textAnchor="middle" fill="rgba(238,240,251,.65)" fontSize="13" fontFamily="Manrope, sans-serif">Данные</text>
        </g>

        {/* ядро */}
        <g>
          <circle cx="260" cy="182" r="46" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.4" />
          <circle className="nv-pulse d3" cx="260" cy="182" r="26" fill="none" stroke="url(#nv-accent)" strokeWidth="2.4" />
          <path d="M248 194v-24l24 24v-24" stroke="url(#nv-accent)" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* панель-результат: график */}
        <g transform="translate(360 45)">
          <rect width="140" height="112" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
          <text x="14" y="26" fill="rgba(238,240,251,.6)" fontSize="11" fontFamily="Manrope, sans-serif">Конверсия</text>
          <text x="14" y="47" fill="#22d3ee" fontSize="18" fontWeight="700" fontFamily="Manrope, sans-serif">+38%</text>
          <g fill="url(#nv-accent)">
            <rect className="nv-bar" x="16" y="62" width="14" height="36" rx="3" />
            <rect className="nv-bar d1" x="38" y="62" width="14" height="36" rx="3" />
            <rect className="nv-bar d2" x="60" y="62" width="14" height="36" rx="3" />
            <rect className="nv-bar d3" x="82" y="62" width="14" height="36" rx="3" />
            <rect className="nv-bar d1" x="104" y="62" width="14" height="36" rx="3" />
          </g>
        </g>

        {/* панель-результат: чат */}
        <g transform="translate(365 205)">
          <rect width="135" height="110" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
          <text x="14" y="24" fill="rgba(238,240,251,.6)" fontSize="11" fontFamily="Manrope, sans-serif">Ассистент 24/7</text>
          <rect x="14" y="36" width="82" height="16" rx="8" fill="rgba(255,255,255,0.1)" />
          <rect x="39" y="60" width="82" height="16" rx="8" fill="url(#nv-accent)" opacity="0.75" />
          <rect x="14" y="84" width="60" height="16" rx="8" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* бейдж времени ответа */}
        <g transform="translate(30 368)">
          <rect width="168" height="36" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
          <circle cx="20" cy="18" r="5" fill="#34d399" />
          <text x="36" y="23" fill="rgba(238,240,251,.85)" fontSize="12.5" fontWeight="600" fontFamily="Manrope, sans-serif">Ответ за 3 секунды</text>
        </g>
      </svg>
    </div>
  )
}
