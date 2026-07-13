import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/services', label: 'Услуги' },
  { to: '/cases', label: 'Кейсы' },
  { to: '/pricing', label: 'Тарифы' },
  { to: '/about', label: 'Лаборатория' },
  { to: '/contact', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="topbar">
          Первый аудит — <b>бесплатно</b>: находим 2–3 точки, где ИИ окупится в первый месяц
        </div>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Основная навигация">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <Link to="/contact" className="btn btn--primary header__cta">
              Обсудить проект
            </Link>
          </div>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="drawer__nav container" aria-label="Мобильная навигация">
          {[{ to: '/', label: 'Главная' }, ...links].map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`}
              style={{ '--i': i } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="drawer__foot">
            <ThemeToggle />
            <Link to="/contact" className="btn btn--primary" tabIndex={open ? 0 : -1}>
              Обсудить проект
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
