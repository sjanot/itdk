# Deployment Guide - IT-DK.sk

Kompletný návod na deployment aplikácie na VPS server cez Portainer.

## Prehľad

- **Server:** VPS na 188.245.222.156
- **Deployment tool:** Portainer (port 9000)
- **Git repo:** https://github.com/sjanot/itdk
- **Stack name:** itdk
- **Prístup:** SSH na porte 2222

## Základný deployment workflow

### 1. Lokálny development a commit

```bash
# V lokálnom projekte
cd /path/to/itdk

# Urob zmeny v kóde
# ...

# Commit a push na GitHub
git add .
git commit -m "Popis zmien"
git push origin main
```

### 2. Deployment na server

#### Možnosť A: Cez Portainer UI (jednoduchšie)

1. Otvor Portainer: http://188.245.222.156:9000
2. Prihlás sa (admin / heslo)
3. **Stacks** → **itdk**
4. Klikni **"Pull and redeploy"** alebo **"Update the stack"**

⚠️ **DÔLEŽITÉ:** Toto často **nerebuiluje Docker images**! Ak máš zmeny v Dockerfile alebo zdrojovom kóde, images sa neaktualizujú.

#### Možnosť B: Cez Portainer API (odporúčané pre rebuild)

**Krok 1: Prihlásenie**
```bash
ssh -p 2222 stef_user@188.245.222.156

# Získaj JWT token
TOKEN=$(curl -X POST 'http://localhost:9000/api/auth' \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"HESLO"}' \
  2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin)['jwt'])")
```

**Krok 2: Force rebuild (ak sú zmeny v kóde)**
```bash
# Zastav stack
curl -X POST "http://localhost:9000/api/stacks/28/stop?endpointId=2" \
  -H "Authorization: Bearer $TOKEN"

# Vymaž staré Docker images (DÔLEŽITÉ!)
curl -X DELETE "http://localhost:9000/api/endpoints/2/docker/images/itdk-backend?force=true" \
  -H "Authorization: Bearer $TOKEN"

curl -X DELETE "http://localhost:9000/api/endpoints/2/docker/images/itdk-frontend?force=true" \
  -H "Authorization: Bearer $TOKEN"

# Redeploy z GitHubu (vybuduje nové images)
curl -X PUT "http://localhost:9000/api/stacks/28/git/redeploy?endpointId=2" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pullImage":false}'

# Počkaj na build (trvá ~2 minúty)
sleep 120
```

## Riešenie častých problémov

### Problém 1: Portainer nerebuiluje images

**Symptóm:** Po "Pull and redeploy" sa kód neaktualizoval, stále beží stará verzia.

**Príčina:** Portainer len reštartuje kontajnery so starými cached images.

**Riešenie:**
```bash
# 1. Zastav stack
# 2. Vymaž staré images (príkazy vyššie)
# 3. Spusti git redeploy
```

### Problém 2: Build error (exit code 2)

**Symptóm:** `npm run build` alebo podobný príkaz zlyhá pri builde.

**Riešenie:**
1. **Otestuj build lokálne:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Skontroluj linter chyby:**
   ```bash
   npm run lint
   ```

3. **Časté problémy:**
   - TypeScript chyby (napr. `import.meta.env` bez type definitions)
   - ESLint chyby
   - Chýbajúce dependencies

### Problém 3: 404 na nových endpointoch

**Symptóm:** Nový endpoint vracia 404, aj keď je v kóde.

**Riešenie:** Backend beží stále so starým kódom. Vymaž images a rebuild (viď Problém 1).

### Problém 4: 502 Bad Gateway

**Symptóm:** API vracia 502 error.

**Možné príčiny:**
- Backend kontajner sa ešte builuje
- Backend zlyhal pri štarte
- Chyba v kóde

**Riešenie:**
```bash
# Skontroluj backend logy
TOKEN="..."  # z prihlásenia
curl -X GET "http://localhost:9000/api/endpoints/2/docker/containers/itdk-backend/logs?stdout=1&stderr=1&tail=100" \
  -H "Authorization: Bearer $TOKEN"
```

## Overenie deploymentu

### 1. Skontroluj že kontajnery bežia

```bash
ssh -p 2222 stef_user@188.245.222.156

TOKEN="..."  # JWT token

# Zoznam itdk kontajnerov
curl -sX GET "http://localhost:9000/api/endpoints/2/docker/containers/json?filters=%7B%22name%22%3A%5B%22itdk%22%5D%7D" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

### 2. Test API endpointov

```bash
# Health check
curl https://it-dk.sk/api/health

# Test tracking
curl -X POST 'https://it-dk.sk/api/track' \
  -H 'Content-Type: application/json' \
  -d '{"page":"/test","referrer":"manual-test"}'
```

### 3. Test webstránky

Otvor v prehliadači: https://it-dk.sk

## Quick Reference

### Portainer Stack Info
- **Stack ID:** 28
- **Stack Name:** itdk
- **Endpoint ID:** 2
- **Project Path:** /data/compose/28
- **Git URL:** https://github.com/sjanot/itdk
- **Compose File:** docker-compose.yml

### Kontajnery
- **Frontend:** itdk-frontend (port 3080 → nginx)
- **Backend:** itdk-backend (port 5000 → nginx proxy)
- **Network:** itdk_itdk-network

### SSH prístup
```bash
ssh -p 2222 stef_user@188.245.222.156
```

### Portainer API
```bash
# Base URL
http://localhost:9000/api

# Autentifikácia
POST /api/auth
Body: {"username":"admin","password":"..."}

# Stack operácie
GET  /api/stacks/28
POST /api/stacks/28/stop?endpointId=2
POST /api/stacks/28/start?endpointId=2
PUT  /api/stacks/28/git/redeploy?endpointId=2
```

## Deployment checklist

- [ ] Kód otestovaný lokálne
- [ ] Build funguje (`npm run build` v frontend, backend beží)
- [ ] Linter bez chýb
- [ ] Commit a push na GitHub main branch
- [ ] Prihlásenie na server cez SSH
- [ ] Získanie Portainer JWT tokenu
- [ ] Stop stack
- [ ] Delete old Docker images
- [ ] Trigger git redeploy
- [ ] Počkať na build (120s)
- [ ] Overiť že kontajnery bežia
- [ ] Test API endpointov
- [ ] Test webstránky v prehliadači

## Environment premenné

V `docker-compose.yml`:

```yaml
environment:
  - GEMINI_API_KEY=${GEMINI_API_KEY}
  - MAIL_SERVER=${MAIL_SERVER:-wes1-smtp.wedos.net}
  - MAIL_PORT=${MAIL_PORT:-587}
  - MAIL_USERNAME=${MAIL_USERNAME:-info@it-dk.sk}
  - MAIL_PASSWORD=${MAIL_PASSWORD}
  - TRACKING_EMAIL=${TRACKING_EMAIL:-info@it-dk.sk}
```

## Užitočné príkazy

### Logy kontajnerov
```bash
# Cez Portainer UI
Containers → itdk-backend → Logs
Containers → itdk-frontend → Logs

# Alebo cez API (ak máš Docker prístup)
docker logs itdk-backend -f
docker logs itdk-frontend -f
```

### Reštart konkrétneho kontajnera
```bash
TOKEN="..."
CONTAINER_ID="..."

curl -X POST "http://localhost:9000/api/endpoints/2/docker/containers/$CONTAINER_ID/restart" \
  -H "Authorization: Bearer $TOKEN"
```

## Notes

- Portainer git-based stacks **NEVYŽADUJÚ** `git pull` - Portainer to robí automaticky
- Docker images **MUSIA BYŤ VYMAZANÉ** pred rebuildом, inak sa použijú cached verzie
- Build trvá ~2 minúty (frontend npm build je pomalý)
- JWT token expiruje po 8 hodinách

---

**Posledná aktualizácia:** 2026-01-15
**Autor:** Deployment dokumentácia vytvorená po úspešnom nasadení tracking systému
