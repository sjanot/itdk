import { Check, Gift, Euro, Shield } from 'lucide-react'

const benefits = [
  'Úvodná konzultácia zadarmo',
  'Transparentné sledovanie času',
  'Možnosť ukončiť kedykoľvek',
  'Pravidelné reporty o postupe',
  'Podpora aj po dokončení',
]

export default function Offer() {
  return (
    <section id="ponuka" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Moja ponuka</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Férová spolupráca bez rizika
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Žiadne dlhodobé záväzky, žiadne skryté poplatky. Platíte len za to, čo skutočne dostanete.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free consultation */}
          <div className="relative rounded-3xl bg-gradient-to-br from-primary-50 to-purple-50 p-8 ring-1 ring-primary-100">
            <div className="inline-flex rounded-2xl bg-primary-600 p-3">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Úvodná konzultácia</h3>
            <p className="mt-2 text-3xl font-bold text-primary-600">Zadarmo</p>
            <p className="mt-4 text-gray-600">
              Preberieme vaše potreby, navrhneme riešenie a odhadneme náklady. Bez záväzkov.
            </p>
          </div>

          {/* Trial period */}
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-50 to-violet-50 p-8 ring-1 ring-purple-100">
            <div className="inline-flex rounded-2xl bg-purple-600 p-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">3 dni na skúšku</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">Bez rizika</p>
            <p className="mt-4 text-gray-600">
              Spolupráca na skúšku s možnosťou ukončenia do 3 dní bez udania dôvodu.
            </p>
          </div>

          {/* Hourly rate */}
          <div className="relative rounded-3xl bg-gradient-to-br from-violet-50 to-fuchsia-50 p-8 ring-1 ring-violet-100">
            <div className="inline-flex rounded-2xl bg-violet-600 p-3">
              <Euro className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Transparentné ceny</h3>
            <p className="mt-2 text-3xl font-bold text-violet-600">25€ / hod</p>
            <p className="mt-4 text-gray-600">
              Hodinová sadzba s presným sledovaním času, alebo fixná cena po dohode.
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-3xl bg-gradient-primary p-8 sm:p-12">
            <h3 className="text-center text-2xl font-bold text-white mb-8">
              Čo získate pri spolupráci
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-full bg-white/20 p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process timeline */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-12">
            Ako prebieha spolupráca
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Konzultácia', desc: 'Preberieme vaše potreby a ciele' },
              { step: '2', title: 'Návrh', desc: 'Pripravím riešenie a cenovú ponuku' },
              { step: '3', title: 'Realizácia', desc: 'Implementácia s pravidelnými reportmi' },
              { step: '4', title: 'Podpora', desc: 'Odovzdanie a dlhodobá podpora' },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                {index < 3 && (
                  <div className="hidden sm:block absolute top-6 left-full w-full h-0.5 bg-primary-200 -translate-y-1/2" />
                )}
                <h4 className="mt-4 font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
