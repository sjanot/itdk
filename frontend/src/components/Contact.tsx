import { useState } from 'react'
import { Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Kontakt</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Poďme sa porozprávať
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Máte projekt na mysli? Napíšte mi alebo zavolajte. Rád prediskutujem vaše potreby.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-primary-100 p-3">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefón</h3>
                  <a
                    href="tel:+421911085838"
                    className="mt-1 text-lg text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    +421 911 085 838
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-primary-100 p-3">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Web</h3>
                  <a
                    href="https://it-dk.sk"
                    className="mt-1 text-lg text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    www.it-dk.sk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-xl bg-primary-100 p-3">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pracovná doba</h3>
                  <p className="mt-1 text-gray-600">
                    Pondelok – Piatok<br />
                    8:30 – 16:00
                  </p>
                </div>
              </div>
            </div>

            {/* CTA box */}
            <div className="mt-12 rounded-2xl bg-gradient-primary p-8">
              <h3 className="text-xl font-bold text-white">Bezplatná konzultácia</h3>
              <p className="mt-2 text-primary-100">
                Zavolajte mi a preberieme vaše potreby. Úvodná konzultácia je vždy zadarmo a bez záväzkov.
              </p>
              <a
                href="tel:+421911085838"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Zavolať teraz
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Napíšte mi správu</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Meno
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="Vaše meno"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                  placeholder="vas@email.sk"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Správa
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors resize-none"
                  placeholder="Opíšte váš projekt alebo otázku..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-primary-600 px-6 py-4 font-semibold text-white shadow-lg hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  'Odosielam...'
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Odoslať správu
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl p-4">
                  <CheckCircle className="h-5 w-5" />
                  <span>Správa bola úspešne odoslaná!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4">
                  <AlertCircle className="h-5 w-5" />
                  <span>Nastala chyba. Skúste to znova alebo zavolajte.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
