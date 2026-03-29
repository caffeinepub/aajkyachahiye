# AajKyaChahiye

## Current State
New project. Empty Motoko backend actor. No frontend implemented yet.

## Requested Changes (Diff)

### Add
- Full landing page replicating the provided HTML design faithfully in React/TypeScript
- Backend: store demand submissions (name, phone, location, need, timing, budget, timestamp)
- Backend: store provider registrations (businessName, phone, city, categories, serviceAreas, timestamp)
- Frontend: sticky top trust bar (100% Free, 24x7 Support, Fast local leads)
- Frontend: header with logo, nav links, CTA buttons
- Frontend: hero section with headline, CTAs, mini value chips, mobile mockup card showing trending items
- Frontend: category ticker animation
- Frontend: demand post form (name, phone+91, location+GPS, need textarea with chip suggestions, timing radio, budget, consent checkbox)
- Frontend: live demands section with stat tiles and demand cards
- Frontend: WhatsApp CTA section
- Frontend: service provider section with feature cards and registration form
- Frontend: how it works 3-step section
- Frontend: footer with city tags, contact info, links
- Frontend: sticky mobile bottom CTA bar
- Form validation (phone regex, required fields)
- WhatsApp deep link integration with prefilled message
- Geolocation for location field
- Character counter for need textarea
- Quick-fill chips for need textarea

### Modify
Nothing (new project)

### Remove
Nothing

## Implementation Plan
1. Generate Motoko backend with postDemand and registerProvider query/update methods
2. Build React frontend matching the provided HTML design pixel-closely
3. Wire demand form and provider form to backend actors
4. Implement all JS interactions: char counter, chips, geolocation, WhatsApp links, form validation
