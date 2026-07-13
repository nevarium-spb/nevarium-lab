import { useTheme } from '../theme'
import { IconSun, IconMoon } from '../data/icons'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      role="switch"
      aria-checked={theme === 'light'}
      aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
      title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
    >
      <span className="theme-toggle__thumb">
        {theme === 'light' ? <IconSun size={13} /> : <IconMoon size={13} />}
      </span>
    </button>
  )
}
