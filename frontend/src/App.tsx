import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Offer from './components/Offer'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AiChat from './components/AiChat'
import CookieConsent from './components/CookieConsent'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track page visit
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        await fetch(`${apiUrl}/api/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || 'Direct',
          }),
        })
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.log('Tracking failed:', error)
      }
    }

    trackVisit()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Offer />
        <About />
        <Contact />
      </main>
      <Footer />
      <AiChat />
      <CookieConsent />
    </div>
  )
}

export default App
