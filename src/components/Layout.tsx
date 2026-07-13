import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ThemeProvider } from '../theme'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'
import LiveBackground from './LiveBackground'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <LiveBackground />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </ThemeProvider>
  )
}
