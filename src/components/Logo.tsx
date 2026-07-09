import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Невариум ЛАБ ИИ — на главную">
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="17" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
        <path
          d="M20 44V20l24 24V20"
          stroke="url(#logo-g)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span>
        Невариум
        <small>ЛАБ ИИ</small>
      </span>
    </Link>
  )
}
