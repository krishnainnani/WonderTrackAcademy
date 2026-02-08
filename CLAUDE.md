# WonderTrack Academy

## Project Context

**WonderTrack Academy** is an educational platform landing page and enrollment management system for a 20-year-old institution transitioning from in-person training (15,000+ students in India) to online global cohorts.

### Tech Stack
- **Frontend:** Vanilla HTML5, CSS3 (custom properties, flexbox, grid), ES6+ JavaScript
- **Backend:** Node.js + Express.js v5
- **Data Storage:** Flat-file JSONL (`./data/join-us.jsonl`)
- **Fonts:** Google Fonts (Playfair Display, Source Sans 3)

### Key Files
- `index.html` — Landing page with hero, programs, audience targeting, timeline, and join-us modal
- `app.js` — Client-side dialog management and form submission via fetch
- `styles.css` — Responsive styling with CSS custom properties and glass-morphism effects
- `server.js` — Express backend serving static files and handling `POST /api/join`

### Programs Offered
- Abacus Mastery
- Vedic Maths
- Phonics & Reading
- Grammar & Writing
- Competitive Exams

### Enrollment Form Fields
- Student: name, age, grade, school
- Program interests (multi-select)
- Parent/Guardian: name, email, phone, city
- Notes/preferences

---

## To-Do

### 1. Cloud Database Integration
- Current JSONL flat-file storage won't persist on ephemeral hosting platforms (Vercel, Render, Heroku, etc.)
- **Options:** Firebase Firestore, MongoDB Atlas, or Supabase
- Required before going live in production

### 2. WhatsApp Messaging Integration
- Send automated messages to parents after form submission
- Form already collects `parentPhone` — foundation is in place
- **Options:** WhatsApp Cloud API (Meta) or Twilio WhatsApp API
- Use case: Welcome/confirmation message upon enrollment

### 3. Deployment Strategy
- Choose a hosting platform
- Ensure data persistence strategy aligns with the chosen platform
- Set up environment variables for API keys and configuration
