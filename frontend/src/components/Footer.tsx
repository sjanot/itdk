import { Facebook, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white">IT-DK.sk</span>
            <p className="mt-4 text-gray-400 max-w-md">
              AI Programátor pre váš biznis. Podnikové aplikácie, Odoo ERP, webové stránky
              a digitalizácia firemných procesov.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Navigácia</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'Služby', href: '#sluzby' },
                { name: 'Moja ponuka', href: '#ponuka' },
                { name: 'O mne', href: '#o-mne' },
                { name: 'Kontakt', href: '#kontakt' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Služby</h3>
            <ul className="mt-4 space-y-3">
              {[
                'Odoo ERP',
                'Podnikové aplikácie',
                'Webové stránky',
                'AI integrácie',
                'Digitalizácia',
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} IT-DK.sk. Všetky práva vyhradené.
            </p>
            <p className="text-gray-500 text-sm">
              Vytvorené s React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
