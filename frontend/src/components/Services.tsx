import { Building2, Cog, Globe, Bot, BarChart3, Lightbulb, ShoppingCart, Users } from 'lucide-react'

const services = [
  {
    name: 'Odoo ERP',
    description: 'Kompletná implementácia a customizácia Odoo systému - od CRM, predaja, skladu až po výrobu a účtovníctvo.',
    icon: Cog,
    color: 'from-purple-500 to-primary-600',
  },
  {
    name: 'Podnikové aplikácie',
    description: 'Vývoj custom riešení na mieru pre váš biznis - firemné informačné systémy, automatizácia procesov.',
    icon: Building2,
    color: 'from-primary-500 to-violet-600',
  },
  {
    name: 'Webové stránky & E-shopy',
    description: 'Moderné responsívne webové stránky a e-shopy postavené na najnovších technológiách.',
    icon: Globe,
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'AI integrácie',
    description: 'Integrácia umelej inteligencie do vašich procesov - chatboty, automatizácia, analýza dát.',
    icon: Bot,
    color: 'from-fuchsia-500 to-primary-600',
  },
  {
    name: 'CRM & Predaj',
    description: 'Systémy pre správu zákazníkov, cenové ponuky, faktúry a kompletný predajný proces.',
    icon: Users,
    color: 'from-primary-600 to-purple-500',
  },
  {
    name: 'Sklad & Výroba',
    description: 'Riešenia pre riadenie skladu, výroby, nákupu a celého dodávateľského reťazca.',
    icon: ShoppingCart,
    color: 'from-purple-600 to-violet-500',
  },
  {
    name: 'Digitalizácia procesov',
    description: 'Analýza a automatizácia firemných procesov pre vyššiu efektivitu a úsporu nákladov.',
    icon: BarChart3,
    color: 'from-violet-600 to-primary-500',
  },
  {
    name: 'IT Konzultácie',
    description: 'Poradenstvo pri výbere technológií, architektúre riešení a digitálnej transformácii.',
    icon: Lightbulb,
    color: 'from-primary-500 to-fuchsia-500',
  },
]

export default function Services() {
  return (
    <section id="sluzby" className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Služby</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Komplexné IT riešenia pre váš biznis
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Od malých webových stránok po komplexné podnikové systémy. Všetko na jednom mieste.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="group relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-primary-200 transition-all duration-300"
            >
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${service.color} p-3 shadow-lg`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
