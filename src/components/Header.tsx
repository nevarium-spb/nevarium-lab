import { useEffect, useState, type CSSProperties } from 'react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

// Шапка. Остров: нужен JS для класса при прокрутке, мобильного меню и
// переключателя темы. Разметка и ссылки при этом отрисовываются на сервере —
// поисковики видят навигацию в готовом HTML.
//
// react-router больше нет: переходы между страницами — обычная загрузка.
// Поэтому текущий адрес приходит пропом из Astro, а меню не нужно закрывать
// при переходе (страница перезагружается сама).

const links = [
  { to: '/services', label: 'Услуги' },
  { to: '/cases', label: 'Кейсы' },
  { to: '/pricing', label: 'Тарифы' },
  { to: '/about', label: 'Лаборатория' },
  { to: '/contact', label: 'Контакты' },
]

/** Адреса сравниваем без хвостового слэша: Astro отдаёт /services/, в ссылках — /services. */
function isActive(href: string, pathname: string, exact = false) {
  const norm = (s: string) => (s.length > 1 ? s.replace(/\/$/, '') : s)
  const a = norm(href)
  const b = norm(pathname)
  return exact ? a === b : b === a || b.startsWith(a + '/')
}

export default function Header({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Основная навигация">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className={`nav__link ${isActive(l.to, pathname) ? 'is-active' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="header__actions">
            <ThemeToggle />
            <a href="/contact" className="btn btn--primary header__cta">
              Обсудить проект
            </a>
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
            <a
              key={l.to}
              href={l.to}
              className={`drawer__link ${isActive(l.to, pathname, l.to === '/') ? 'is-active' : ''}`}
              style={{ '--i': i } as CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              {l.label}
            </a>
          ))}
          <div className="drawer__foot">
            <ThemeToggle />
            <a href="/contact" className="btn btn--primary" tabIndex={open ? 0 : -1}>
              Обсудить проект
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}
