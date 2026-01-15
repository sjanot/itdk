# PWA Icons Guide

Návod na vytvorenie ikon pre Progressive Web App.

---

## 📐 POTREBNÉ IKONY

Musíte vytvoriť nasledujúce ikony:

| Veľkosť | Názov súboru | Použitie |
|---------|-------------|----------|
| 16x16 | icon-16x16.png | Browser favicon |
| 32x32 | icon-32x32.png | Browser favicon |
| 72x72 | icon-72x72.png | Android |
| 96x96 | icon-96x96.png | Android |
| 128x128 | icon-128x128.png | Android, Chrome |
| 144x144 | icon-144x144.png | Android |
| 152x152 | icon-152x152.png | iOS Safari |
| 192x192 | icon-192x192.png | Android, Chrome (standard) |
| 384x384 | icon-384x384.png | Android |
| 512x512 | icon-512x512.png | Android, Chrome (splash) |

---

## 🎨 DIZAJN IKONY

### Koncept:
```
┌──────────────┐
│              │
│    IT-DK     │  ← Logo/Text
│              │
│      🤖      │  ← AI Icon (optional)
│              │
└──────────────┘
```

### Farby:
- **Pozadie:** Fialová gradient (#7C3AED)
- **Text:** Biely (#FFFFFF)
- **Alternatíva:** Biely text na fialovom pozadí

### Typography:
- Font: Inter Black alebo Montserrat Bold
- Text: "IT" alebo "IT-DK"

---

## 🚀 RÝCHLE VYTVORENIE

### Možnosť 1: Canva (Najjednoduchšie)

1. **Vytvor master ikonu (512x512):**
   ```
   Canva → Custom size: 512 x 512 px
   
   Dizajn:
   - Fialové pozadie (#7C3AED)
   - Biely text "IT-DK" (bold, centered)
   - Alebo logo ak máš
   ```

2. **Export všetkých veľkostí:**
   ```
   File → Resize
   - 512x512 ✓
   - 384x384 ✓
   - 192x192 ✓
   atď...
   
   Bulk download
   ```

3. **Premenovanie:**
   ```bash
   # V priečinku s ikonami
   mv itdk-512.png icon-512x512.png
   mv itdk-384.png icon-384x384.png
   atď...
   ```

### Možnosť 2: Online nástroj (1 klik)

**PWA Icon Generator:**
https://www.pwabuilder.com/imageGenerator

1. Upload master image (512x512 alebo väčší)
2. Download všetky veľkosti naraz
3. Unzip do `frontend/public/`

**Favicon Generator:**
https://realfavicongenerator.net/

1. Upload master image
2. Generate all icons
3. Download package

### Možnosť 3: Photoshop/Figma

1. **Vytvor 512x512 master:**
   - Artboard: 512x512px
   - Export ako PNG
   - 72 DPI

2. **Batch resize:**
   ```
   Photoshop:
   File → Automate → Batch
   
   Figma:
   Export settings → Multiple sizes
   0.25x = 128px
   0.5x = 256px
   1x = 512px
   ```

---

## 🖼️ JEDNODUCHÝ TEMPLATE

### Minimalistický design:

**512x512 master icon:**
```
Background: #7C3AED (solid)
Shape: Rounded square (corner radius: 20%)

Text: "IT"
Font: Inter Black, 280px
Color: White
Position: Center
Shadow: Subtle (0, 4px, 8px, rgba(0,0,0,0.2))
```

**V Canva:**
1. 512x512 canvas
2. Rounded rectangle (fialová)
3. Text "IT" (biely, bold, centered)
4. Export as PNG

---

## 📋 KONTROLNÝ ZOZNAM

### Pred uploadom:

- [ ] Všetky ikony sú PNG formát
- [ ] Správne pomenovanie (icon-WxH.png)
- [ ] Pozadie je opaque (nie transparentné)
- [ ] Ikony sú sharp, nie pixelované
- [ ] Správne rozmery (512x512, 192x192, atď.)
- [ ] File size < 50KB každá (ideálne < 20KB)
- [ ] Všetky ikony majú rovnaký dizajn

### Upload:
```bash
# Skopíruj všetky ikony do:
frontend/public/

# Súbory:
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

---

## 🧪 TESTOVANIE PWA

### 1. Localhost test:
```bash
cd frontend
npm run build
npm run preview

# Otvor: http://localhost:4173
# DevTools → Application → Manifest
# Skontroluj že ikony sa načítajú
```

### 2. Chrome DevTools:
```
F12 → Application tab
→ Manifest (check icons)
→ Service Workers (check registered)
```

### 3. Lighthouse Audit:
```
F12 → Lighthouse tab
→ Progressive Web App
→ Generate report

Target score: > 90/100
```

### 4. Mobile test:
```
Android Chrome:
- Otvor it-dk.sk
- Menu → "Add to Home screen"
- Skontroluj ikonu na home screen

iOS Safari:
- Otvor it-dk.sk
- Share → "Add to Home Screen"
- Skontroluj ikonu
```

---

## 🎯 POKROČILÉ: Maskable Icons

Pre Android 13+ potrebuješ "maskable" ikony s padding.

**Safe zone:**
```
512x512 image
- Content area: 406x406 (centered)
- Padding: 53px všade
```

**Canva template:**
1. Canvas: 512x512
2. Inner guide: 406x406 (centered)
3. Dizajn iba v inner guide
4. Export

Alebo použiť:
https://maskable.app/editor

---

## 🚀 QUICK START (5 minút)

1. **Otvor PWA Builder Icon Generator:**
   https://www.pwabuilder.com/imageGenerator

2. **Upload logo alebo vytvor quick icon v Canva:**
   - 512x512, fialové pozadie, "IT-DK" text

3. **Generate & Download**

4. **Unzip a upload do `frontend/public/`**

5. **Test:** `npm run build && npm run preview`

6. **Deploy!**

---

## 📱 VÝSLEDOK

Po nasadení:

✅ Používateľ uvidí "Add to Home screen" prompt
✅ Ikona na home screen
✅ Splash screen pri otvorení
✅ Fullscreen app experience
✅ Offline capability (základná)

**Web bude vyzerať ako natívna app!** 🎉

---

Potrebuješ pomoc? Môžem generovať jednoduchú ikonu! 🎨
