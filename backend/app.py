from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import google.generativeai as genai
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Gemini API configuration
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# System prompt for AI assistant
SYSTEM_PROMPT = """Si AI asistent pre IT-DK.sk - firmu zameranú na vývoj podnikových aplikácií, Odoo ERP implementácie a digitalizáciu procesov.

O firme:
- Zameriavame sa na podnikové aplikácie, Odoo ERP, webové stránky a AI integrácie
- Ponúkame bezplatnú úvodnú konzultáciu
- 3 dni spolupráce na skúšku bez záväzkov
- Hodinová sadzba 25€/hod s transparentným sledovaním času
- Kontakt: +421 911 085 838 - Štefan Janoťák, Dolný Kubín
- Web: www.it-dk.sk
- Pracovná doba: Pondelok – Piatok, 8:30 – 16:00

Služby:
- Odoo ERP implementácia a customizácia
- Vývoj podnikových aplikácií na mieru
- Webové stránky a e-shopy
- AI integrácie a automatizácia
- CRM systémy a predajné nástroje
- Sklad, výroba, digitalizácia procesov
- IT konzultácie

Odpovedaj profesionálne, stručne a v slovenčine. Pomáhaj návštevníkom s otázkami o službách a nasmeruj ich na kontakt pre konkrétne projekty."""

# Mail configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'wes1-smtp.wedos.net')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'info@it-dk.sk')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = ('IT-DK.sk', 'info@it-dk.sk')

mail = Mail(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

def get_location_from_ip(ip):
    """Get location information from IP address using free API"""
    try:
        # Skip for local IPs
        if ip in ['127.0.0.1', 'localhost', '::1']:
            return {
                'country': 'Local',
                'city': 'Local',
                'region': 'Local'
            }
        
        # Use ip-api.com free service (no API key needed, 45 req/min limit)
        response = requests.get(f'http://ip-api.com/json/{ip}?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query', timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'success':
                return {
                    'country': data.get('country', 'Unknown'),
                    'country_code': data.get('countryCode', ''),
                    'region': data.get('regionName', 'Unknown'),
                    'city': data.get('city', 'Unknown'),
                    'zip': data.get('zip', ''),
                    'lat': data.get('lat', 0),
                    'lon': data.get('lon', 0),
                    'timezone': data.get('timezone', ''),
                    'isp': data.get('isp', 'Unknown'),
                    'org': data.get('org', ''),
                }
    except Exception as e:
        print(f'Geolocation error: {e}')
    
    return {
        'country': 'Unknown',
        'city': 'Unknown',
        'region': 'Unknown'
    }

@app.route('/api/track', methods=['POST'])
def track_visit():
    """Track page visits and send email notification"""
    try:
        data = request.json or {}
        
        # Get visitor information
        ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
        if ',' in ip_address:
            ip_address = ip_address.split(',')[0].strip()
        
        user_agent = request.headers.get('User-Agent', 'Unknown')
        referrer = data.get('referrer', 'Direct')
        page = data.get('page', '/')
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Get location from IP
        location = get_location_from_ip(ip_address)
        
        # Prepare email content
        email_subject = f'[IT-DK.sk] Nová návšteva stránky'
        email_body = f'''Nová návšteva na IT-DK.sk

Čas: {timestamp}
Stránka: {page}

NÁVŠTEVNÍK:
IP adresa: {ip_address}
Krajina: {location.get('country', 'Unknown')}
Región: {location.get('region', 'Unknown')}
Mesto: {location.get('city', 'Unknown')}
ISP: {location.get('isp', 'Unknown')}

TECHNICKÉ INFORMÁCIE:
Referrer: {referrer if referrer != 'Direct' else 'Priamy vstup (žiadny referrer)'}
User Agent: {user_agent}

---
IT-DK.sk Tracking System
'''
        
        # Send email notification
        try:
            msg = Message(
                subject=email_subject,
                recipients=[os.environ.get('TRACKING_EMAIL', 'info@it-dk.sk')],
                body=email_body
            )
            mail.send(msg)
        except Exception as e:
            print(f'Email send error: {e}')
            # Don't fail the request if email fails
        
        return jsonify({
            'success': True,
            'message': 'Visit tracked'
        })
    
    except Exception as e:
        print(f'Tracking error: {e}')
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not all([name, email, message]):
        return jsonify({'error': 'Všetky polia sú povinné'}), 400

    try:
        msg = Message(
            subject=f'[IT-DK.sk] Nová správa od {name}',
            recipients=['info@it-dk.sk'],
            reply_to=email,
            body=f'Nová správa z kontaktného formulára na it-dk.sk\n\n'
                 f'Meno: {name}\n'
                 f'Email: {email}\n\n'
                 f'Správa:\n{message}'
        )
        mail.send(msg)
    except Exception as e:
        print(f'Email error: {e}')
        return jsonify({'error': 'Nepodarilo sa odoslať správu'}), 500

    return jsonify({'success': True, 'message': 'Správa bola úspešne odoslaná'})

@app.route('/api/services', methods=['GET'])
def services():
    services_list = [
        {
            'id': 1,
            'title': 'Podnikové aplikácie',
            'description': 'Vývoj custom riešení na mieru pre váš biznis - od CRM po komplexné ERP systémy.',
            'icon': 'building'
        },
        {
            'id': 2,
            'title': 'Odoo implementácia',
            'description': 'Kompletná implementácia a customizácia Odoo ERP systému pre vaše podnikanie.',
            'icon': 'cog'
        },
        {
            'id': 3,
            'title': 'Webové aplikácie',
            'description': 'Moderné webové aplikácie postavené na najnovších technológiách.',
            'icon': 'globe'
        },
        {
            'id': 4,
            'title': 'AI riešenia',
            'description': 'Integrácia umelej inteligencie do vašich procesov a aplikácií.',
            'icon': 'robot'
        },
        {
            'id': 5,
            'title': 'Digitalizácia procesov',
            'description': 'Automatizácia a digitalizácia firemných procesov pre vyššiu efektivitu.',
            'icon': 'chart'
        },
        {
            'id': 6,
            'title': 'Konzultácie',
            'description': 'IT konzultácie a poradenstvo pre optimálne technologické riešenia.',
            'icon': 'lightbulb'
        }
    ]
    return jsonify(services_list)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    conversation_history = data.get('history', [])

    if not user_message:
        return jsonify({'error': 'Správa je povinná'}), 400

    if not GEMINI_API_KEY:
        return jsonify({
            'response': 'AI asistent momentálne nie je k dispozícii. Kontaktujte nás prosím telefonicky na +421 911 085 838.',
            'error': 'API key not configured'
        })

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')

        # Build conversation with system prompt
        messages = [{'role': 'user', 'parts': [SYSTEM_PROMPT + '\n\nPoužívateľ: Ahoj']},
                   {'role': 'model', 'parts': ['Dobrý deň! Vitajte na IT-DK.sk. Som tu, aby som vám pomohol s otázkami o našich službách. Ako vám môžem pomôcť?']}]

        # Add conversation history
        for msg in conversation_history:
            messages.append({
                'role': 'user' if msg['role'] == 'user' else 'model',
                'parts': [msg['content']]
            })

        # Add current message
        messages.append({'role': 'user', 'parts': [user_message]})

        chat_session = model.start_chat(history=messages[:-1])
        response = chat_session.send_message(user_message)

        return jsonify({
            'response': response.text,
            'success': True
        })
    except Exception as e:
        return jsonify({
            'response': 'Prepáčte, nastala chyba. Skúste to prosím znova alebo nás kontaktujte telefonicky.',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
