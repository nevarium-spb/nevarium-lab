import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Невариум ЛАБ ИИ — на главную">
      <img className="logo__mark" src="/logo-mark.png" width={36} height={36} alt="" aria-hidden="true" />
      <span>
        Невариум
        <small>ЛАБ ИИ</small>
      </span>
    </Link>
  )
}
