import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Offer from './components/Offer'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AiChat from './components/AiChat'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    </div>
  )
}

export default App
