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

## Inštalácia a spustenie

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
