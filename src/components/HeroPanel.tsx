// Дашборд-панель героя «Индиго Лайв»: метрики + анимированный график внедрения
export default function HeroPanel() {
  return (
    <div className="glass hero-panel">
      <div className="hero-panel__head">
        <div className="hero-panel__title">Панель внедрения</div>
        <span className="hero-panel__tag">
          <i aria-hidden="true" /> в работе
        </span>
      </div>
      <div className="hero-panel__metrics">
        <div className="hero-panel__metric">
          <div className="v">70%</div>
          <div className="l">рутины автоматизировано</div>
        </div>
        <div className="hero-panel__metric">
          <div className="v">+38%</div>
          <div className="l">конверсия в заявку</div>
        </div>
      </div>
      <div className="hero-panel__chart">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" role="img" aria-label="Рост показателей после внедрения ИИ">
          <defs>
            <linearGradient id="hp-line" x1="0" x2="1">
              <stop offset="0" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="hp-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6366f1" stopOpacity="0.28" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,80 50,68 100,72 150,45 200,50 250,25 300,14 300,100 0,100" fill="url(#hp-fill)" />
          <polyline
            className="hero-panel__spark"
            points="0,80 50,68 100,72 150,45 200,50 250,25 300,14"
            fill="none"
            stroke="url(#hp-line)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="300" cy="14" r="4" fill="#38bdf8" />
        </svg>
      </div>
    </div>
  )
}
