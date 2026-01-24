# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT-DK.sk is a full-stack marketing website for an IT services company. The project consists of:
- **Frontend**: React TypeScript SPA with Vite build tool, Tailwind CSS, and Nginx reverse proxy
- **Backend**: Flask REST API with Gemini AI chatbot integration, visitor tracking, and email notifications
- **Deployment**: Docker Compose orchestration with Portainer-managed stack on VPS (188.245.222.156:2222)
- **Language**: Slovak (website content, AI chatbot prompts, user-facing text)

## Development Commands

### Frontend Development
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                 # Vite dev server on localhost:5173 (proxies /api to backend)
npm run build               # TypeScript compilation + Vite production bundle
npm run lint                # ESLint type checking
npm run preview             # Preview production build locally
```

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py               # Runs on localhost:5000 with debug=True
```

### Docker Development
```bash
docker-compose up --build   # Build and start both services
docker-compose down         # Stop and remove containers
docker-compose logs -f      # Follow container logs
docker-compose exec backend /bin/bash  # Access backend container shell
```

### Deployment
```bash
./deploy.sh                 # Automated deployment script (uses Portainer API)
```

**Note**: Deployment requires Portainer authentication. See DEPLOYMENT.md for comprehensive deployment guide.

## Architecture

### Request Flow
1. Browser → Nginx (frontend container port 3080)
2. `/api/*` requests → Nginx reverse proxy → Backend Flask app (port 5000)
3. Static assets (HTML/CSS/JS) → Served directly by Nginx with 1-year cache
4. Backend → External services (Gemini API, SMTP, ip-api.com for geolocation)

### Docker Network
- Custom bridge network: `itdk-network`
- Backend container: `itdk-backend` (internal port 5000)
- Frontend container: `itdk-frontend` (external port 3080:80)
- Inter-container communication via service names

### Key Backend Endpoints
- `GET /api/health` - Health check (returns `{"status": "ok"}`)
- `POST /api/track` - Visitor tracking with geolocation + email notification
- `POST /api/contact` - Contact form submission
- `GET /api/services` - Service listing (hardcoded JSON)
- `POST /api/chat` - AI chatbot using Gemini 2.0 Flash model

### Frontend Components Structure
All components in `frontend/src/components/`:
- **Header.tsx** - Navigation with mobile menu
- **Contact.tsx** - Contact form with phone/email/WhatsApp (phone: +421 911 085 838, name: Štefan Janoťák, location: Dolný Kubín)
- **AiChat.tsx** - Floating Gemini AI chatbot widget with conversation history
- **Services.tsx** - 8 service cards (Odoo ERP, web apps, AI integration, etc.)
- **Portfolio.tsx** - Project showcase with featured SZCO banner
- **CookieConsent.tsx** - GDPR cookie consent banner
- **InstallPWA.tsx** - PWA installation prompt

## Environment Variables

Create `.env` file in `backend/` directory:

```env
GEMINI_API_KEY=your_key_here           # Required - Google Generative AI API key
MAIL_SERVER=wes1-smtp.wedos.net        # Default SMTP server
MAIL_PORT=587                          # TLS port
MAIL_USERNAME=info@it-dk.sk            # Email account
MAIL_PASSWORD=your_password            # Email password
TRACKING_EMAIL=info@it-dk.sk           # Receives visitor tracking notifications
```

**Security Note**: Never commit API keys. Use environment variables in docker-compose.yml.

## Deployment Infrastructure

### Server Details
- **Host**: stef_user@188.245.222.156 (SSH port 2222)
- **Portainer**: http://localhost:9000 (accessed via SSH tunnel)
- **Stack ID**: 28 (EndpointId: 2)
- **Code Location**: /tmp/itdk (git repository cloned on server)
- **Public URL**: https://it-dk.sk

### Deployment Workflow
1. Commit changes locally and push to GitHub (sjanot/itdk)
2. Run `./deploy.sh` which:
   - Authenticates with Portainer API via admin password
   - Stops existing stack (ID: 28)
   - Pulls latest code from GitHub to /tmp/itdk
   - Rebuilds Docker images (frontend via multi-stage Node build, backend via pip install)
   - Starts stack with ForceRecreate flag
   - Waits 90 seconds for containers to initialize
   - Verifies deployment via health check and frontend HTTP status

### Deployment Verification
```bash
# Test backend health
curl http://127.0.0.1:5001/api/health

# Test frontend
curl -I http://127.0.0.1:3080

# View logs on server
ssh -p 2222 stef_user@188.245.222.156
docker logs itdk-backend
docker logs itdk-frontend
```

## Frontend Build Process

The frontend uses a **multi-stage Docker build**:

1. **Build stage** (node:20-alpine):
   - Copies package.json and package-lock.json
   - Runs `npm ci` (clean install)
   - Copies all source files
   - Runs `npm run build` → outputs to `/app/dist`

2. **Production stage** (nginx:alpine):
   - Copies nginx.conf for reverse proxy configuration
   - Copies built assets from build stage to `/usr/share/nginx/html`
   - Exposes port 80
   - Serves SPA with fallback to `/index.html` for client-side routing

### Nginx Configuration
- Reverse proxy: `/api/*` → `http://backend:5000/api/*`
- Static files: 1-year cache (`expires 1y`)
- Gzip compression: On for CSS/JS/JSON
- SPA routing: All unmatched routes → `/index.html`

## Important Code Patterns

### Contact Information
When updating contact details, modify `frontend/src/components/Contact.tsx`:
- Phone: +421 911 085 838
- Name: Štefan Janoťák
- Location: Dolný Kubín
- Email: info@it-dk.sk
- WhatsApp: Same phone number (https://wa.me/421911085838)

Also update backend system prompt in `backend/app.py` (line ~25) to maintain consistency with AI chatbot responses.

### AI Chatbot System Prompt
The Gemini chatbot (`/api/chat`) uses a Slovak-language system prompt in `backend/app.py`:
- Represents IT-DK.sk as AI programming expert
- Includes service descriptions (Odoo ERP, web apps, etc.)
- Contains contact information
- Maintains conversation history via POST body (`messages` array)

### Visitor Tracking Flow
1. Frontend sends POST to `/api/track` with IP, User-Agent, referrer
2. Backend queries ip-api.com for geolocation (5s timeout)
3. Sends email notification to TRACKING_EMAIL with location details
4. Returns success (non-blocking - errors don't interrupt user experience)

### Error Handling Philosophy
- External API failures (geolocation, email) return graceful responses without exposing errors to users
- Health check endpoint always returns 200 OK if Flask is running
- Contact form provides user-friendly error messages
- Chatbot handles API errors with fallback messages

## Common Development Tasks

### Adding a New Service
1. Edit `backend/app.py` → `/api/services` endpoint (hardcoded list)
2. Update `frontend/src/components/Services.tsx` with new service card
3. Add corresponding Lucide React icon if needed
4. Update AI chatbot system prompt in `backend/app.py` to include new service

### Changing Email Configuration
1. Update `.env` file with new SMTP credentials
2. Test via `/api/contact` or `/api/track` endpoint
3. Check backend logs: `docker logs itdk-backend`

### PWA Icon Generation
Current status: Manifest configured, icons missing. To complete:
1. Create 512x512 master icon
2. Use PWA Builder or similar tool to generate all required sizes
3. Place icons in `frontend/public/` directory
4. Follow instructions in `frontend/public/PWA_ICONS_GUIDE.md`

### Rebuilding Docker Images
If changes aren't visible after deployment:
```bash
# SSH to server
ssh -p 2222 stef_user@188.245.222.156
cd /tmp/itdk

# Verify latest code is pulled
git pull origin main
git log -1 --oneline

# Manual rebuild (if Portainer fails)
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Verify containers are running
docker ps | grep itdk
```

## Testing

No automated test suite currently exists. Testing is manual/exploratory:

### Frontend Testing
- TypeScript compilation: `npm run build` (catches type errors)
- ESLint: `npm run lint`
- Browser testing: Visual inspection on mobile/desktop
- PWA testing: Chrome DevTools → Lighthouse → PWA audit (target: 90+ score)

### Backend Testing
- Health check: `curl http://localhost:5000/api/health`
- Service endpoints: Manual curl requests (examples in DEPLOYMENT.md)
- Email delivery: Test contact form and visitor tracking
- AI chatbot: Test conversation flow via `/api/chat`

### Deployment Verification
1. Check backend health: `curl http://127.0.0.1:5001/api/health`
2. Check frontend: `curl -I http://127.0.0.1:3080`
3. Verify HTML source includes latest changes: `curl -s http://127.0.0.1:3080 | grep "WhatsApp"`
4. Test live site: https://it-dk.sk

## Troubleshooting

### Frontend Changes Not Visible After Deployment
**Symptom**: HTML source shows old content despite git commits being on server.

**Causes**:
1. Docker image cache not invalidated
2. Nginx browser cache (1-year expires header)
3. Build process using old dist/ files

**Solutions**:
1. Force rebuild: `docker-compose build --no-cache frontend`
2. Clear browser cache or use incognito mode
3. Verify build stage is copying correct files
4. Check nginx.conf for cache headers

### Portainer API Authentication Failures
**Symptom**: "A valid authorization token is missing"

**Solution**: Use admin password authentication instead of API tokens:
```bash
JWT=$(curl -s -X POST 'http://localhost:9000/api/auth' \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['jwt'])")
```

### Email Not Sending
**Checks**:
1. Verify SMTP credentials in `.env`
2. Check backend logs: `docker logs itdk-backend`
3. Test SMTP connection: `telnet wes1-smtp.wedos.net 587`
4. Verify firewall allows outbound port 587

### Gemini API Errors
**Checks**:
1. Verify GEMINI_API_KEY in environment
2. Check API quota/limits on Google AI Studio
3. Review backend logs for error messages
4. Test API key: `curl -H "x-goog-api-key: YOUR_KEY" https://generativelanguage.googleapis.com/v1beta/models`

## Git Workflow

**Main Branch**: main (all deployments from this branch)

**Commit Message Style**: Imperative mood, concise descriptions
- Example: "Add WhatsApp contact link to contact section"
- Example: "Update contact information with name and location"

**Security**: Never commit API keys, passwords, or tokens. Use environment variables.

## External Dependencies

### Third-Party Services
- **Google Gemini API**: AI chatbot (gemini-2.0-flash-exp model)
- **ip-api.com**: Free geolocation lookup (45 requests/minute limit)
- **Wedos SMTP**: Email delivery (wes1-smtp.wedos.net:587)

### Rate Limits & Quotas
- ip-api.com: 45 requests/minute (free tier)
- Gemini API: Check Google AI Studio for quota
- SMTP: Check with Wedos hosting provider

## Design System

**Color Palette** (Tailwind custom colors in `frontend/tailwind.config.js`):
- Primary gradient: Purple/violet (#9333ea to #7c3aed)
- `primary-50` to `primary-900`: Purple scale
- Gradient class: `gradient-primary` (purple to violet)

**Typography**:
- Font: System font stack (sans-serif)
- Headings: Bold, tracking-tight
- Body: Regular weight, leading-relaxed

**Icons**: Lucide React (imported from 'lucide-react')

**Responsive Breakpoints**: Standard Tailwind (sm, md, lg, xl, 2xl)

## Documentation Files

- **README.md**: Quick start and feature overview
- **DEPLOYMENT.md**: Comprehensive 260+ line deployment guide with troubleshooting
- **PWA_README.md**: PWA setup and testing instructions
- **frontend/public/PWA_ICONS_GUIDE.md**: Icon generation guide
- **frontend/public/OG-IMAGE-GUIDE.md**: Open Graph image documentation

Refer to these files for detailed instructions on specific topics.
