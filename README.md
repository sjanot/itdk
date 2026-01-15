# IT-DK.sk

Webová stránka pre IT-DK.sk - AI Programátor, podnikové aplikácie, Odoo ERP.

## Technológie

- **Backend:** Flask, Python
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **AI:** Google Gemini API

## Štruktúra projektu

```
itdk/
├── backend/
│   ├── app.py           # Flask aplikácia
│   ├── requirements.txt # Python závislosti
│   └── .env.example     # Príklad konfigurácie
└── frontend/
    ├── src/
    │   ├── components/  # React komponenty
    │   ├── App.tsx      # Hlavný komponent
    │   └── main.tsx     # Vstupný bod
    ├── package.json     # NPM závislosti
    └── tailwind.config.js
```

## Deployment na produkčný server

Pre deployment na VPS server cez Portainer, pozri **[DEPLOYMENT.md](DEPLOYMENT.md)** - kompletný návod.

**Rýchly deployment:**
```bash
./deploy.sh 'portainer_admin_heslo'
```

## Inštalácia a spustenie (lokálne)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# alebo: venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Nastaviť environment variables
cp .env.example .env
# Upravte .env a pridajte GEMINI_API_KEY

# Spustiť server
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikácia bude dostupná na:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Konfigurácia

### Gemini API

1. Získajte API kľúč z [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Pridajte do `backend/.env`:
   ```
   GEMINI_API_KEY=váš_api_kľúč
   ```

## Funkcie

- Responsívny dizajn s fialovou témou
- Sekcie: Služby, Moja ponuka, O mne, Kontakt
- AI chatbot asistent (Gemini)
- Kontaktný formulár
- Mobilné menu
- **Sledovanie návštevníkov** - automatické odosielanie emailov s informáciami o návštevách (IP, lokalita, referrer)

## Sledovanie návštevníkov

Aplikácia automaticky zaznamenáva každú návštevu stránky a posiela email s nasledujúcimi informáciami:

- **Čas návštevy** - presný dátum a čas
- **IP adresa** - IP adresa návštevníka
- **Geolokácia** - krajina, región, mesto (získané z IP adresy)
- **ISP** - poskytovateľ internetu návštevníka
- **Referrer** - odkiaľ prišiel návštevník (alebo "Priamy vstup")
- **User Agent** - prehliadač a operačný systém

### Konfigurácia tracking emailov

V `.env` súbore alebo `docker-compose.yml` nastavte:

```bash
TRACKING_EMAIL=vas-email@example.com  # Email kde chcete dostávať notifikácie
```

Ak nie je nastavené, notifikácie sa posielajú na `info@it-dk.sk`.
