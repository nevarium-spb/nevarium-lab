import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="footer__about">
              Лаборатория внедрения искусственного интеллекта в малый и средний бизнес.
              Ассистенты, автоматизация, контент — с измеримым результатом.
            </p>
          </div>
          <div className="footer__col">
            <div className="footer__title">Навигация</div>
            <Link to="/services">Услуги</Link>
            <Link to="/cases">Кейсы</Link>
            <Link to="/pricing">Тарифы</Link>
            <Link to="/about">Лаборатория</Link>
          </div>
          <div className="footer__col">
            <div className="footer__title">Услуги</div>
            <Link to="/services">GPT-ассистенты</Link>
            <Link to="/services">Чат-боты</Link>
            <Link to="/services">ИИ-контент</Link>
            <Link to="/services">Обучение команд</Link>
          </div>
          <div className="footer__col">
            <div className="footer__title">Связь</div>
            <a href="mailto:hello@nevarium.ai">hello@nevarium.ai</a>
            <a href="https://t.me/nevarium" target="_blank" rel="noreferrer">
              Telegram
            </a>
            <Link to="/contact">Оставить заявку</Link>
          </div>
        </div>
        <div className="footer__bottom">
          <span>ИП Макеева Марина Александровна</span>
          <span style={{ textAlign: 'center', flex: 1 }}>© {new Date().getFullYear()} Nevarium AI LAB. All rights reserved.</span>
          <span>Сделано с ИИ — как и всё, что мы делаем.</span>
        </div>
      </div>
    </footer>
  )
}
