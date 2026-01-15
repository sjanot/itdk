# Open Graph Image Guide

Tento obrázok sa zobrazí keď niekto zdieľa it-dk.sk na Facebooku, LinkedIne, atď.

## 📐 Rozmery

- **Šírka:** 1200px
- **Výška:** 630px
- **Formát:** JPG alebo PNG
- **Názov súboru:** `og-image.jpg`

## 🎨 Vytvorenie v Canva

### 1. Vytvor nový design
```
Custom size: 1200 x 630 px
```

### 2. Design layout

```
┌─────────────────────────────────────────────┐
│                                             │
│           IT-DK.sk                          │
│                                             │
│     🤖 AI PROGRAMÁTOR                       │
│                                             │
│   Automatizácia • Odoo ERP                  │
│   Webové aplikácie na mieru                 │
│                                             │
│   ✓ 10+ rokov skúseností                    │
│   ✓ Konzultácia ZADARMO                     │
│   ✓ 25€/hod                                 │
│                                             │
│   50+ spokojných klientov                   │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. Prvky:

**Pozadie:**
- Gradient: Fialová (#7C3AED) → Modrá (#3B82F6)
- Alebo: Svetlé pozadie s jemným gradientom

**Logo/Brand:**
- "IT-DK.sk" v ľavom hornom rohu
- Font: Inter Bold, 48px
- Farba: White

**Hlavný nadpis:**
- "🤖 AI PROGRAMÁTOR"
- Font: Inter Bold, 72px
- Farba: White
- Center aligned

**Služby:**
- "Automatizácia • Odoo ERP"
- "Webové aplikácie na mieru"
- Font: Inter Medium, 36px
- Farba: White/Light

**Benefity (checkmarky):**
- ✓ 10+ rokov skúseností
- ✓ Konzultácia ZADARMO
- ✓ 25€/hod
- Font: Inter Regular, 28px
- Icons: ✓ alebo použiť Canva checkmarks

**Social Proof:**
- "50+ spokojných klientov"
- "100+ úspešných projektov"
- Font: Inter Semibold, 24px
- Bottom area

### 4. Export
```
File → Download
Format: JPG (pre menší file size)
Quality: High
```

### 5. Umiestni súbor
```
Ulož ako: og-image.jpg
Umiestni do: frontend/public/og-image.jpg
```

## 🔍 Testovanie

### Facebook Sharing Debugger:
1. Otvor: https://developers.facebook.com/tools/debug/
2. Zadaj URL: https://it-dk.sk
3. Klikni "Debug"
4. Skontroluj náhľad
5. Ak je obrázok starý: Klikni "Scrape Again"

### LinkedIn Post Inspector:
1. Otvor: https://www.linkedin.com/post-inspector/
2. Zadaj URL: https://it-dk.sk
3. Skontroluj náhľad

### Twitter Card Validator:
1. Otvor: https://cards-dev.twitter.com/validator
2. Zadaj URL: https://it-dk.sk
3. Preview card

## 📋 Checklist

- [ ] Image je 1200x630px
- [ ] Text je čitateľný (nie príliš malý)
- [ ] Logo/brand je viditeľné
- [ ] Farby sú konzistentné s branddnom
- [ ] Žiadne pixelované elementy
- [ ] File size < 5MB (ideálne < 1MB)
- [ ] Názov súboru: og-image.jpg
- [ ] Umiestnený v public/ folder
- [ ] Tested vo Facebook Debugger

## 🚀 Quick Template

Ak nemáš čas vytvárať vlastný:

1. Otvor Canva
2. Hľadaj template: "Facebook Link Preview"
3. Vyber moderný template
4. Zmeň farby na fialová/modrá
5. Zmeň text na IT-DK.sk copy
6. Export → Done!

---

Po uploadnutí obrázka spusti rebuild aplikácie a otestuj na Facebook Debugger!
