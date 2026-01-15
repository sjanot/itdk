import { Code2, Brain, Rocket, Heart } from 'lucide-react'

const skills = [
  { name: 'Python', level: 95 },
  { name: 'Odoo', level: 90 },
  { name: 'React / TypeScript', level: 85 },
  { name: 'AI / Machine Learning', level: 80 },
  { name: 'PostgreSQL', level: 85 },
  { name: 'DevOps / Linux', level: 80 },
]

const values = [
  {
    icon: Code2,
    title: 'Čistý kód',
    description: 'Píšem prehľadný a udržiavateľný kód, ktorý bude slúžiť roky.',
  },
  {
    icon: Brain,
    title: 'AI-first prístup',
    description: 'Využívam najnovšie AI technológie pre efektívnejšie riešenia.',
  },
  {
    icon: Rocket,
    title: 'Rýchle dodanie',
    description: 'Agilný prístup s pravidelnými dodávkami funkčných riešení.',
  },
  {
    icon: Heart,
    title: 'Dlhodobý partner',
    description: 'Nie som len dodávateľ, ale partner pre váš digitálny rast.',
  },
]

export default function About() {
  return (
    <section id="o-mne" className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <div>
            <h2 className="text-base font-semibold leading-7 text-primary-600">O mne</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AI Programátor pre váš biznis
            </p>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Som IT profesionál so zameraním na vývoj podnikových aplikácií a digitalizáciu firemných procesov.
              Špecializujem sa na implementáciu <strong>Odoo ERP</strong> systémov a vývoj custom riešení na mieru.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Využívam najmodernejšie technológie vrátane <strong>umelej inteligencie</strong> pre automatizáciu
              a optimalizáciu vašich procesov. Či už potrebujete webovú stránku, e-shop, CRM systém alebo
              komplexné ERP riešenie - vytvorím to pre vás.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Mojím cieľom je dodať riešenie, ktoré vám <strong>ušetrí čas a peniaze</strong> a pomôže
              vášmu podnikaniu rásť.
            </p>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg bg-primary-100 p-2">
                    <value.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Skills */}
          <div className="relative">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Technické zručnosti</h3>
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-primary-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 mb-4">TECHNOLÓGIE</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Odoo', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Linux', 'AI/ML', 'Flask', 'FastAPI'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-medium text-primary-700 bg-primary-50 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-primary-200 to-purple-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
