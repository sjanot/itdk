import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted PWA install')
    }
    
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  const handleDismiss = () => {
    setShowInstall(false)
    // Hide for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // Check if dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      if (Date.now() - parseInt(dismissed) < sevenDays) {
        setShowInstall(false)
      }
    }
  }, [])

  if (!showInstall || !deferredPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-start gap-3 pr-6">
          <div className="flex-shrink-0 rounded-xl bg-primary-600 p-2.5">
            <Download className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              Nainštalovať aplikáciu?
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Pridajte IT-DK.sk na hlavnú obrazovku pre rýchly prístup
            </p>
            
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
              >
                Nainštalovať
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Neskôr
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
