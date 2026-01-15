import { Building2, Factory, ShoppingCart, Users, Calculator, Truck, FileText, BarChart3 } from 'lucide-react'

const solutions = [
  {
    category: 'Odoo ERP',
    title: 'Odoo ERP Implementácie',
    description: 'Kompletné nasadenie a prispôsobenie Odoo ERP systému pre rôzne odvetvia.',
    icon: Building2,
    color: 'from-purple-500 to-primary-600',
    items: ['CRM a predaj', 'Nákup a sklad', 'Výroba', 'Účtovníctvo', 'Projekty', 'HR a dochádzka'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
  {
    category: 'Stavebníctvo',
    title: 'Stavebný denník & Rozpočty',
    description: 'Digitálny stavebný denník s evidenciou počasia, dochádzky, fotiek. Rozpočty stavby s RTS import.',
    icon: Factory,
    color: 'from-primary-500 to-violet-600',
    items: ['Stavebný denník', 'Rozpočty s RTS', 'Gantt diagramy', 'Dochádzka na stavbe', 'Dokumenty projektu', 'Portál pre zákazníkov'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  },
  {
    category: 'Výroba & Logistika',
    title: 'Výroba a skladové hospodárstvo',
    description: 'Riadenie výroby, WMS systém, etikety, tablet pre výrobu.',
    icon: Truck,
    color: 'from-violet-500 to-purple-600',
    items: ['Výrobné príkazy', 'WMS sklad', 'Tlač etikiet', 'Tablet rozhranie', 'Rezervácie skladu', 'Dodacie listy'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    category: 'Predaj & CRM',
    title: 'Predaj a zákaznícky servis',
    description: 'CRM systém, cenové ponuky, objednávky, fakturácia.',
    icon: Users,
    color: 'from-fuchsia-500 to-primary-600',
    items: ['CRM pipeline', 'Cenové ponuky', 'Predajné objednávky', 'Sales dashboard', 'Email integrácia', 'ChatGPT asistent'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    category: 'Financie',
    title: 'Účtovníctvo a financie',
    description: 'Daňová evidencia, rodinný rozpočet, správa osobných financií.',
    icon: Calculator,
    color: 'from-primary-600 to-purple-500',
    items: ['Daňová evidencia', 'Paušálne dane', 'Rodinný rozpočet', 'Import z Excel', 'Mesačné prehľady', 'Kategórie výdavkov'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
  },
  {
    category: 'E-commerce',
    title: 'Webové stránky a e-shopy',
    description: 'Multi-website riešenia, produktový katalóg, online predaj.',
    icon: ShoppingCart,
    color: 'from-purple-600 to-violet-500',
    items: ['E-shop', 'Multi-website', 'Produktový katalóg', 'Online platby', 'QR kódy', 'Responzívny dizajn'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    category: 'Projekty',
    title: 'Projektový manažment',
    description: 'Riadenie projektov, časové sledovanie, Kanban, prepojenie s predajom.',
    icon: BarChart3,
    color: 'from-violet-600 to-primary-500',
    items: ['Kanban board', 'Clockify integrácia', 'TODO úlohy', 'Rozpočty projektu', 'Dashboard', 'Prepojenie so sales'],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop',
  },
  {
    category: 'HR',
    title: 'Dochádzka a HR',
    description: 'Kiosk pre dochádzku, výber projektu/stavby, mzdy.',
    icon: FileText,
    color: 'from-primary-500 to-fuchsia-500',
    items: ['Kiosk dochádzka', 'Webkamera foto', 'Výber projektu', 'Mzdy', 'HR evidencia', 'Prehľady dochádzky'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Portfólio</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Riešenia s ktorými mám skúsenosti
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Prehľad oblastí a modulov, ktoré som implementoval pre rôznych klientov.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group relative rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${solution.color} px-3 py-1 text-sm font-medium text-white`}>
                    <solution.icon className="h-4 w-4" />
                    {solution.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {solution.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies used */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
            Technológie ktoré používam
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Odoo 16/17/18/19',
              'Python',
              'JavaScript',
              'TypeScript',
              'React',
              'PostgreSQL',
              'XML/QWeb',
              'OWL Framework',
              'REST API',
              'Docker',
              'Linux',
              'Git',
              'AI/ML',
              'Gemini/ChatGPT',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white shadow-sm ring-1 ring-gray-200 text-sm font-medium text-gray-700 hover:ring-primary-300 hover:text-primary-700 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
