import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-primary pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-30rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-primary-100 ring-1 ring-primary-400/30 hover:ring-primary-400/50 transition-all">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Programátor pre vaše podnikanie
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Digitalizácia <br />
            <span className="text-primary-200">vášho biznisu</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
            Vytváram moderné podnikové aplikácie, implementujem Odoo ERP systémy
            a automatizujem firemné procesy pomocou najnovších technológií a AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-all hover:scale-105"
            >
              Začnime spoluprácu
            </a>
            <a
              href="#sluzby"
              className="group flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white ring-2 ring-white/20 hover:ring-white/40 transition-all"
            >
              Pozrite si služby
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { label: 'Rokov skúseností', value: '10+' },
            { label: 'Spokojných klientov', value: '50+' },
            { label: 'Projektov', value: '100+' },
            { label: 'Odoo implementácií', value: '20+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
              <div className="mt-2 text-sm text-primary-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 sm:h-24 text-gray-50"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24C240 74 480 74 720 49C960 24 1200 24 1440 49V74H0V24Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
