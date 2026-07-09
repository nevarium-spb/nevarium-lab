import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__grid" />
      <div className="orb orb--cyan" />
      <div className="orb orb--violet" />
      <div className="orb orb--magenta" />
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <>
      <Aurora />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
