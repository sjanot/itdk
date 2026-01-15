# Facebook Ads Manager - Setup Guide

Kompletný návod ako nastaviť a spustiť FB reklamy pre IT-DK.sk.

---

## 📋 PRÍPRAVA (pred spustením)

### 1. Facebook Business Manager
- [ ] Vytvor Business Manager account (business.facebook.com)
- [ ] Pridaj FB stránku IT-DK.sk
- [ ] Pridaj reklamný účet (Ad Account)
- [ ] Nastav platobné údaje (kreditná karta)

### 2. Meta Pixel (tracking)
- [ ] Vytvor Meta Pixel v Business Manager
- [ ] Nainštaluj pixel na it-dk.sk
- [ ] Otestuj že pixel funguje (Facebook Pixel Helper extension)

### 3. Conversion tracking
- [ ] Event: "Contact" (vyplnenie formulára)
- [ ] Event: "Lead" (kliknutie na CTA)
- [ ] Event: "PageView" (návšteva stránky)

---

## 🎯 KAMPANE - SETUP POSTUP

## KAMPAŇ 1: "AI & Automatizácia" (Main)

### KROK 1: Vytvor Kampaň
```
Campaigns → Create → Guided Creation

Campaign Objective: "Traffic" alebo "Engagement"
(Ak máš conversion tracking: "Conversions")

Campaign Name: "IT-DK - AI Automatizacia - Traffic"

Special Ad Category: Nevyber nič
(nie je housing/employment/credit)

Budget: Campaign budget optimization
Daily Budget: 30-50€ (na začiatok)
```

### KROK 2: Ad Set (Cieľová skupina)
```
Ad Set Name: "SK - Business Owners - 30-55"

Conversion Event: "Contact" alebo "PageView"

AUDIENCE:
Location: Slovakia
  - Include: Entire country
  - Alebo: Bratislava, Košice, Žilina (custom locations)

Age: 30-55
Gender: All

Detailed Targeting → INCLUDE:
  Interests:
  - Small business
  - Entrepreneurship
  - Business management
  - Enterprise software
  - ERP systems
  
  Job Titles:
  - Business owner
  - CEO
  - Managing Director
  - Operations Manager
  - IT Manager

Audience Size: Aim for 500K - 2M (zelená zóna)

PLACEMENTS:
- Advantage+ placements (automatické)
- Alebo Manual:
  ✓ Facebook Feed
  ✓ Instagram Feed  
  ✓ Facebook Stories
  ✓ Instagram Stories
  ✗ Audience Network (vypni)
  ✗ Messenger (zatiaľ vypni)

Optimization: 
- Link Clicks (alebo Landing Page Views ak máš pixel)

Budget: 10€/day (na začiatok)
Schedule: Continuous (alebo set end date)
```

### KROK 3: Vytvor Reklamu
```
Ad Name: "AI Automatizacia - Variant A"

Identity: IT-DK.sk Facebook Page

Format: Single Image or Video

CREATIVE:
- Upload image (z Canva)
- Aspect ratio: 1:1 (square) alebo 4:5

PRIMARY TEXT: (copy z AD_COPY_READY.txt)
[Vlož text pre Reklamu #1]

HEADLINE:
🤖 AI Programátor | Automatizujte svoj biznis

DESCRIPTION:
AI integrácie • Odoo ERP • Webové aplikácie

WEBSITE URL:
https://it-dk.sk

CALL TO ACTION:
"Napíšte nám" alebo "Zistiť viac"

Tracking:
URL Parameter: utm_source=facebook&utm_medium=paid&utm_campaign=ai_automation
```

### KROK 4: Review & Publish
```
- Skontroluj preview (mobile + desktop)
- Check for policy violations
- Publish
- Počkaj 10-30 minút na approval
```

---

## 🔄 DUPLICATE PRE VARIANTY

### Pre rýchle testovanie:

1. **Duplicate Ad Set:**
   - Ad Sets → Duplicate
   - Zmeň názov: "SK - IT Managers - 35-60"
   - Zmeň targeting (iní decision makers)

2. **Duplicate Ad:**
   - Ads → Duplicate
   - Zmeň názov: "AI Automatizacia - Variant B"
   - Zmeň text/creative

**Výsledok:** 2-3 ad sety, každý s 2-3 ad variantmi = 6-9 ads celkovo

---

## 🎯 TARGETING EXAMPLES

### Audience 1: "Small Business Owners"
```
Location: Slovakia
Age: 30-55

Interests:
- Small business
- Entrepreneurship
- Business development

Behaviors:
- Small business owners
```

### Audience 2: "IT Decision Makers"
```
Location: Slovakia  
Age: 35-60

Job Titles:
- CTO
- IT Manager
- Chief Technology Officer

Interests:
- Information technology
- Business software
- Cloud computing
```

### Audience 3: "E-commerce & Retail"
```
Location: Slovakia
Age: 28-55

Interests:
- E-commerce
- Online shopping
- Retail
- Inventory management

Behaviors:
- Business Page Admins
```

### Audience 4: "Manufacturing & Wholesale"
```
Location: Slovakia
Age: 35-65

Interests:
- Manufacturing
- Supply chain management
- Wholesale
- Warehouse management

Industry:
- Manufacturing
- Wholesale trade
```

---

## 📊 BUDGET STRATÉGIA

### Week 1: Testing Phase
```
Total: 50-100€

Campaign 1 (AI Automation): 30€
- Ad Set 1: Small Business: 10€
- Ad Set 2: IT Managers: 10€  
- Ad Set 3: E-commerce: 10€

Campaign 2 (Odoo ERP): 30€
- Ad Set 1: Manufacturing: 15€
- Ad Set 2: Wholesale: 15€

Daily: ~10€
```

### Week 2: Optimization
```
Total: 100-150€

- Vypni underperforming (CTR < 1.5%)
- 2x budget na best performing
- Pridaj 2 nové creative varianty
```

### Week 3+: Scale
```
Total: 200-500€/month

- Focus na winning combinations
- Create lookalike audiences
- Add retargeting campaigns
```

---

## 🎨 CREATIVE UPLOAD CHECKLIST

Pred uploadom do Ads Manager:

Image specs:
- [ ] Ratio: 1:1 (1080x1080) alebo 4:5 (1080x1350)
- [ ] Format: JPG alebo PNG
- [ ] Size: < 30MB (ideálne < 5MB)
- [ ] Resolution: Min 1080px wide

Text overlay:
- [ ] Text covers < 20% of image (starý rule, už nie strict)
- [ ] Ale stále: menej textu = lepšie delivery

Quality:
- [ ] Sharp, nie pixelated
- [ ] High contrast
- [ ] Mobile-friendly (test na mobile preview!)

---

## 🔍 RETARGETING SETUP

### Custom Audience 1: Website Visitors
```
Audiences → Create Audience → Custom Audience

Source: Website
Pixel: IT-DK.sk Pixel

Include people who:
- Visited any page
- In the last 30 days

Exclude:
- Contact form submitters (already converted)

Audience name: "Website Visitors 30d"
```

### Custom Audience 2: Engaged Users
```
Source: Facebook Page

Include people who:
- Engaged with Page
- In the last 90 days

Types:
✓ Page likes
✓ Post reactions
✓ Comments
✓ Shares

Audience name: "FB Page Engaged 90d"
```

### Lookalike Audience
```
Based on: Website Visitors 30d
Location: Slovakia
Audience size: 1% (najkvalitnejší)

Audience name: "LAL - Website Visitors 1%"
```

### Retargeting Campaign Setup
```
Campaign Name: "IT-DK - Retargeting - Warm"
Objective: Conversions

Ad Set:
- Audience: Website Visitors 30d
- Budget: 5-10€/day
- Optimization: Contact

Ad:
- Use Reklama #5 (3 dni na skúšku offer)
- Messaging: softer, remind benefits
```

---

## 📱 MESSENGER ADS (Optional)

### Setup:
```
Campaign Objective: Messages

Ad Set:
- Same targeting ako main campaign
- Budget: 5€/day

Ad Format:
- Click to Messenger
- Automated greeting: "Ahoj! Ako vám môžem pomôcť?"

Response:
- Setup quick replies:
  1. "Chcem konzultáciu"
  2. "Otázka o cenách"
  3. "Viac o Odoo ERP"
```

---

## 🎥 VIDEO AD SETUP (Advanced)

### Video specs:
```
Length: 15-30 sekúnd (ideálne)
Ratio: Square (1:1) alebo Vertical (4:5)
Resolution: 1080x1080 min
Format: MP4 alebo MOV
Size: < 4GB

Captions: ÁNO! (väčšina pozrie bez zvuku)
```

### Jednoduchý video skript:
```
0-3s: Hook
"Stratili ste prehľad vo firme?"

3-10s: Problem
"Excel tabuľky, duplikáty, chaos..."

10-20s: Solution
"Odoo ERP dá poriadok - sklad, predaj, účtovníctvo na jednom mieste"

20-30s: CTA
"Prvá konzultácia ZADARMO → it-dk.sk"
```

---

## 📊 TRACKING & ANALYTICS

### UTM Parameters (pre každú kampaň):
```
utm_source=facebook
utm_medium=paid
utm_campaign=ai_automation (zmeň podľa kampane)
utm_content=variant_a (zmeň podľa ad variant)

Príklad URL:
https://it-dk.sk?utm_source=facebook&utm_medium=paid&utm_campaign=ai_automation&utm_content=variant_a
```

### Čo sledovať v Ads Manager:
```
Primary metrics:
- CTR (Click-Through Rate): > 2% je good
- CPC (Cost Per Click): < 0.50€ ideál
- CPM (Cost Per 1000 impressions): benchmark
- Relevance Score: > 7/10

Conversion metrics:
- Contact form fills
- Phone clicks
- Messenger conversations started
- Landing page views
```

### Google Analytics check:
```
Acquisition → All Traffic → Source/Medium
- Filter: facebook / paid
- Check:
  - Bounce rate (< 60% je OK)
  - Session duration (> 1 min je OK)
  - Pages/session (> 2 je good)
```

---

## ⚠️ COMMON MISTAKES (avoid!)

1. **Príliš široký targeting**
   ❌ Whole Slovakia, all ages
   ✅ Specific: Business owners, 30-55, interests

2. **Príliš malý budget**
   ❌ 5€/day pre 5 ad setov = 1€ každý
   ✅ Min 10€/day per ad set

3. **Veľa zmien rýchlo**
   ❌ Meniť každý deň
   ✅ Počkaj 3-5 dní pre data

4. **Ignorovanie mobile**
   ❌ Desktop-only design
   ✅ Mobile-first approach

5. **Žiadny pixel tracking**
   ❌ Nevidíš konverzie
   ✅ Install pixel + test

6. **Slabý CTA**
   ❌ "Navštíviť web"
   ✅ "Bezplatná konzultácia"

---

## 🚀 LAUNCH CHECKLIST

Pre LAUNCH DAY:

- [ ] Business Manager setup complete
- [ ] Payment method added & verified
- [ ] Facebook Page má profil photo + cover
- [ ] Meta Pixel nainštalovaný & tested
- [ ] Landing page it-dk.sk live & fast
- [ ] Contact form funguje
- [ ] Phone number +421 911 085 838 aktívny
- [ ] Messenger responses ready
- [ ] 3-5 ad creatives pripravené
- [ ] Ad copy reviewed & error-free
- [ ] UTM tracking URLs prepared
- [ ] Google Analytics working
- [ ] Campaigns created v Ads Manager
- [ ] Budget allocated
- [ ] Launch time: Utorok-Štvrtok, 9-11am (best)

---

## 📞 SUPPORT & HELP

### Facebook resources:
- Ads Manager: https://business.facebook.com/adsmanager
- Business Help Center: https://www.facebook.com/business/help
- Pixel Helper: Chrome extension

### Ak campaigns nejdú schváliť:
1. Check text pre restricted words
2. Check image pre violations
3. Request manual review (24-48h)

### Ak performance slabý:
1. Check CTR (< 1% = zlý creative)
2. Check relevance score (< 5 = zlý targeting)
3. A/B test nové varianty

---

**Hotovo! Teraz už môžeš spustiť kampane. Začni s malým budgetom (50€) a optimalizuj na základe dát.**

Potrebuješ pomoc? Opýtaj sa! 🚀
