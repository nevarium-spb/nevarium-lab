// Логотип: знак-картинка + адаптивный HTML-текст рядом (не картинка, чтобы
// корректно смотрелся и в тёмной, и в светлой теме).
//
// Остаётся React-компонентом, потому что нужен внутри острова-шапки. В подвале
// Astro отрисовывает его на сервере без client:-директивы — то есть чистым
// HTML, без единого килобайта JS. Один источник правды на оба места.
export default function Logo() {
  return (
    <a href="/" className="logo" aria-label="Невариум ЛАБ ИИ — на главную">
      <img className="logo__mark" src="/logo-mark.png" width={36} height={36} alt="" aria-hidden="true" />
      <span>
        Невариум
        <small>ЛАБ ИИ</small>
      </span>
    </a>
  )
}
