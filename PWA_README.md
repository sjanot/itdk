# Progressive Web App (PWA) - IT-DK.sk

Web je teraz PWA - dá sa nainštalovať ako aplikácia na mobile aj desktop! 📱💻

---

## ✅ ČO JE IMPLEMENTOVANÉ

### 1. **PWA Manifest** (`manifest.json`)
   - Názov aplikácie: "IT-DK.sk - AI Programátor"
   - Ikony pre všetky zariadenia
   - Farby a téma
   - Standalone display mode

### 2. **Service Worker** (`sw.js`)
   - Offline caching
   - Rýchlejšie načítavanie
   - Background sync ready

### 3. **Install Prompt**
   - Automatický popup na mobile
   - "Add to Home screen" tlačidlo
   - Smart dismiss (7 dní)

### 4. **Meta Tagy**
   - Apple Touch Icons
   - Theme color
   - Mobile web app capable
   - Status bar styling

---

## 📱 FUNKCIONALITA

### Pre používateľov:

**Android Chrome:**
1. Otvor it-dk.sk
2. Popup: "Nainštalovať aplikáciu?"
3. Klikni "Nainštalovať"
4. Ikona sa pridá na home screen
5. Otvor ako app (fullscreen)

**iOS Safari:**
1. Otvor it-dk.sk
2. Tap Share button
3. "Add to Home Screen"
4. Ikona sa pridá na home screen

**Desktop (Chrome/Edge):**
1. Otvor it-dk.sk
2. Ikona v adresnom riadku (➕)
3. "Install IT-DK.sk"
4. Aplikácia v app drawer

### Výhody:
- ✅ Rýchlejšie načítavanie (caching)
- ✅ Funguje offline (základné stránky)
- ✅ Vyzerá ako natívna app
- ✅ Vlastná ikona na home screen
- ✅ Fullscreen experience
- ✅ Push notifications (ready)

---

## 🎨 IKONY - ČO JE POTREBNÉ

**Aktuálne chýbajú ikony!** Musíte ich vytvoriť.

### Quick setup:

1. **Vytvor master ikonu (512x512):**
   ```
   Canva → 512x512 px
   - Fialové pozadie (#7C3AED)
   - Biely text "IT-DK" (bold, centered)
   - Export ako PNG
   ```

2. **Generuj všetky veľkosti:**
   - Otvor: https://www.pwabuilder.com/imageGenerator
   - Upload master ikonu
   - Download all sizes
   - Unzip

3. **Upload do projektu:**
   ```bash
   # Skopíruj do:
   frontend/public/
   
   # Potrebné súbory:
   icon-16x16.png
   icon-32x32.png
   icon-72x72.png
   icon-96x96.png
   icon-128x128.png
   icon-144x144.png
   icon-152x152.png
   icon-192x192.png
   icon-384x384.png
   icon-512x512.png
   ```

**Detailný návod:** `frontend/public/PWA_ICONS_GUIDE.md`

---

## 🧪 TESTOVANIE

### 1. Lokálny test:
```bash
cd frontend
npm run build
npm run preview

# Otvor: http://localhost:4173
```

### 2. Chrome DevTools:
```
F12 → Application tab
→ Manifest: Check všetko načítané ✓
→ Service Workers: Check registered ✓
→ Storage: Check caching funguje ✓
```

### 3. Lighthouse Audit:
```
F12 → Lighthouse
→ Progressive Web App
→ Generate report

Target: 90+ score
```

### 4. Mobile test:
```
Android:
- Otvor it-dk.sk na mobile
- Mal by sa zobraziť install prompt
- Nainštaluj a otvor ako app

iOS:
- Safari → Share → Add to Home Screen
- Otvor z home screen
```

---

## 🚀 DEPLOYMENT

### Krok 1: Vytvor ikony
```bash
# Použiť PWA Icon Generator alebo Canva
# Upload všetkých 10 veľkostí do frontend/public/
```

### Krok 2: Commit & Push
```bash
git add frontend/
git commit -m "Add PWA icons"
git push
```

### Krok 3: Deploy na server
```bash
./deploy.sh 'portainer_password'
```

### Krok 4: Verify
```
1. Otvor https://it-dk.sk na mobile
2. Should see install prompt
3. Install a test!
```

---

## 📊 PWA CHECKLIST

### Implementované: ✅
- [x] manifest.json s app metadata
- [x] Service Worker pre offline
- [x] Install prompt component
- [x] PWA meta tagy v HTML
- [x] Apple Touch Icons links
- [x] Theme color configuration
- [x] Offline fallback
- [x] HTTPS (required - máte)

### Potrebné dokončiť: 🟡
- [ ] Vytvoriť PWA ikony (10 veľkostí)
- [ ] Upload ikon do public/
- [ ] Deploy na server
- [ ] Test na mobile device

### Optional enhancements: 💡
- [ ] Push notifications
- [ ] Background sync
- [ ] Offline page s custom dizajnom
- [ ] Update notification
- [ ] Share API integration

---

## 🔧 SÚBORY

```
frontend/
├── public/
│   ├── manifest.json          ✅ PWA manifest
│   ├── sw.js                  ✅ Service worker
│   ├── PWA_ICONS_GUIDE.md     ✅ Návod na ikony
│   └── icon-*.png             🟡 POTREBNÉ VYTVORIŤ
├── src/
│   ├── main.tsx               ✅ SW registration
│   ├── components/
│   │   └── InstallPWA.tsx     ✅ Install prompt
│   └── index.css              ✅ Animations
└── index.html                 ✅ PWA meta tags
```

---

## 🎯 POUŽÍVATEĽSKÁ SKÚSENOSŤ

### Prvá návšteva (mobile):
```
1. User otvorí it-dk.sk
2. Po 3s scrolling → Install popup
3. "Nainštalovať aplikáciu?"
   [Nainštalovať] [Neskôr]
4. Ak Neskôr → hide na 7 dní
5. Ak Nainštalovať → pridá na home screen
```

### Inštalovaná app:
```
1. Ikona na home screen (vlastný dizajn)
2. Tap → otvorí fullscreen (bez browser UI)
3. Splash screen s logom
4. Rýchle načítanie (cached)
5. Funguje aj offline (základné stránky)
```

### Return visitors:
```
- Instant loading (service worker cache)
- Fresh content (cache + network)
- Smooth experience
```

---

## 📈 VÝHODY PWA

### Pre používateľov:
- 🚀 Rýchlejšie (až 3x)
- 📱 Ako natívna app
- 💾 Menej dát (caching)
- 🔌 Funguje offline
- 🏠 Ikona na home screen

### Pre biznis:
- ⬆️ Vyššia engagement (+50-300%)
- ⬆️ Vyššia conversion rate
- ⬇️ Bounce rate
- ⬆️ Return visitors
- 📊 Lepšie SEO (Google loves PWA)
- 💰 Lacnejšie ako natívna app

---

## 🐛 TROUBLESHOOTING

### Install prompt sa nezobrazí:
```
Dôvody:
1. Already installed
2. Not on HTTPS (needs https://)
3. Manifest chýba
4. Icons chýbajú
5. Service worker error

Fix:
- F12 → Console → check errors
- F12 → Application → Manifest
- Check all icons exist
```

### Service Worker sa neregistruje:
```
Fix:
1. Clear cache
2. Unregister old SW (DevTools)
3. Hard refresh (Ctrl+Shift+R)
4. Check sw.js loads (Network tab)
```

### Ikony sa nezobrazujú:
```
Fix:
1. Check file names match manifest.json
2. Check paths (/icon-192x192.png)
3. Clear cache
4. Lighthouse audit → check errors
```

---

## 🎨 FAST SETUP (10 minút)

```bash
# 1. Generate ikony
open https://www.pwabuilder.com/imageGenerator
# Upload logo → Download all

# 2. Unzip a upload
cp icons/* frontend/public/

# 3. Commit
git add frontend/public/icon-*.png
git commit -m "Add PWA icons"
git push

# 4. Deploy
./deploy.sh 'password'

# 5. Test na mobile
# Open it-dk.sk → should see install prompt!
```

---

## 📱 APP STORE? (Future)

PWA môžete aj publikovať:

**Google Play Store:**
- TWA (Trusted Web Activity)
- Tool: Bubblewrap
- Distribute cez Play Store

**Microsoft Store:**
- PWABuilder
- Submit directly

**iOS App Store:**
- Wrapped PWA
- Tool: Capacitor

---

**PWA je implementované a ready! Len vytvorte ikony a deployujte.** 🎉

Potrebujete pomoc s ikonami alebo testovaním? Napíšte! 🚀
