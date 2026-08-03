import { useSyncExternalStore } from 'react'

/**
 * Тема оформления.
 *
 * Источник правды — атрибут data-theme на <html>: его выставляет inline-скрипт
 * в Base.astro ещё до первой отрисовки, и по нему работает весь CSS.
 *
 * Раньше тему держал React-контекст (ThemeProvider оборачивал всё приложение).
 * В Astro так нельзя: шапка, живой фон и чат — независимые «острова», то есть
 * отдельные React-приложения, и общий контекст между ними не передаётся.
 * Поэтому острова подписываются на сам атрибут через событие.
 */

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'nevarium-theme'
const EVENT = 'nevarium-theme-change'

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/** На сервере выбора нет — тёмная, как и в inline-скрипте по умолчанию. */
function getServerSnapshot(): Theme {
  return 'dark'
}

export function setTheme(theme: Theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = theme === 'light' ? '#eef1fb' : '#0d1030'
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* приватный режим */
  }
  // Будит все острова разом — и переключатель в шапке, и живой фон.
  window.dispatchEvent(new Event(EVENT))
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
