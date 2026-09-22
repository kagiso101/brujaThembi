# Bruja Thembi — Project Overview

Marketing and booking website for **Bruja Thembi** (Ms. T.E. Molaba, trading as Yogi Bruja), a South African card reader, breathwork facilitator and herbalist. Live at **https://brujathembi.com**. Built by RogueTech as a client site.

Tagline: *"Old Knowledge. Real Solutions."* / *"Bridging the Clinical with the Celestial."*

The site is a static single-page application. It has no backend, no database and no authentication. Every lead goes out through WhatsApp or a Google Form, and every payment is a manual bank transfer.

---

## What the site does

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, service strip with starting prices, embedded YouTube "how it works" video |
| `/about` | About | Thembi's story (Credo Mutwa lineage, reading since 2018) |
| `/corporate` | For Teams | Corporate wellness offering with event photos and testimonials |
| `/services` | Services | Tabbed pricing: readings, breathwork, card-reading mentorship, Astral Gym |
| `/apothecary` | Somatic Apothecary | Herbal capsules, steam blends, serums, the Aura Care Box |
| `/bulletin` | The Bulletin | YouTube video grid, articles, WhatsApp broadcast and social channels |
| `/contact` | Book Now | Contact form (opens WhatsApp), booking steps, banking details, terms |

Any unknown path redirects to home.

### Services and pricing (as coded)

| Service | Price |
|---|---|
| 5-Question Recorded Reading | R500 |
| 8-Question Recorded Reading | R600 |
| 60-Minute Live Consultation | R800 |
| 60-Minute Breathwork Reset | R600 |
| Guided Audio, single element | R350 |
| Full 40-Minute Reset Link | R600 |
| 6-Week Somatic Breathwork Container | R5,000 |
| Card Reading Container, 26 weeks | R1,500 / month |
| Astral Gym monthly membership | alumni only, sign-up via WhatsApp |
| Capsules | R80 (30) / R180 (90) |
| Steam blend | R469 per bag |
| Aura Care Box | R1,000 incl. courier |
| Courier for single orders | R150 |

### The Drop

Readings are sold in a twice-monthly "drop" (25 slots per drop, 50 per month). The open/closed state, next drop date and slot counts live in one file, `src/app/shared/booking-links.ts`, which is the only file that needs editing for the routine fortnightly update.

### Booking and payment flow

1. Client sends a WhatsApp or submits the contact form. The form does not post anywhere. It builds a pre-filled message and opens `wa.me` in a new tab.
2. Client fills in the Google Form for the relevant service.
3. Client pays by EFT to Capitec Bank (account holder Ms. T.E. Molaba) and sends proof of payment on WhatsApp.
4. Recorded readings are returned within 48 hours. Live sessions are scheduled on WhatsApp.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Angular 21 (standalone components, signals, new control flow) | Generated with Angular CLI 21.0.4 |
| Language | TypeScript 5.9 | |
| Styling | SCSS, hand-written | No component library. Global tokens in `src/styles.scss` |
| Routing | Angular Router with view transitions and scroll-to-top | |
| Forms | Angular `FormsModule` (template-driven, `ngModel`) | Contact page only |
| Tests | Vitest 4 with jsdom | One default spec; no real coverage |
| Build | `@angular/build` (esbuild-based) | Output: `dist/brujaThembi/browser` |
| Package manager | npm 11.6 | |
| Node | 20 (pinned in `netlify.toml`) | |
| Formatting | Prettier (100 cols, single quotes, Angular HTML parser) | Config in `package.json` |

Runtime dependencies are only the Angular packages, RxJS and tslib. There are no other npm libraries.

### In-repo services

- `ScrollRevealService`: an `IntersectionObserver` that adds `.visible` to any `.reveal` element as it scrolls into view. Each page calls `init()` after view init.
- `ImagesService`: empty placeholder, unused.

### Project layout

```
public/                 static assets (copied verbatim to the build)
  _redirects            Netlify SPA fallback
  assets/images/        bulletin, corporate, portraits, products
  brujaFavicon.png
src/
  index.html            <head>, meta description, favicon
  styles.scss           global tokens, typography, shared classes
  app/
    app.routes.ts       route table
    app.config.ts       router + global error listeners
    pages/              one folder per route (about, apothecary, bulletin, contact, corporate, home, services)
    shared/             nav, footer, booking-links.ts
    services/           scroll-reveal, images (unused)
netlify.toml            build command, publish dir, SPA redirect
angular.json            CLI config; SCSS default, 500 kB / 1 MB bundle budgets
```

---

## Third parties

### Hosting and delivery

| Service | Role | Where configured |
|---|---|---|
| **Netlify** | Static hosting and CI build (`npm run build`, publish `dist/brujaThembi/browser`) | `netlify.toml`, `public/_redirects` |
| **Domain** | `brujathembi.com` | DNS not in repo |

### Lead capture and booking

| Service | Role | Where used |
|---|---|---|
| **WhatsApp** (`wa.me/27793574091`, displayed as 079-357-4091) | Primary contact channel, contact-form target, Astral Gym sign-up, broadcast list | Contact, footer, bulletin, about, apothecary, `booking-links.ts` |
| **Google Forms** | Session Booking Sheet, Dream Unpacking Vault (container students), Aura Care Order Form | `booking-links.ts`, linked from services, contact, apothecary |
| **Email** `bookings@brujathembi.com` | Secondary contact | Footer |
| **Capitec Bank** EFT | All payments, manual reconciliation | Contact page banking section (a footer copy is commented out) |

There is no payment gateway, no CRM and no calendar integration in the code. The GA4 brief below mentions Cal.com as the booking provider, but the codebase does not use it.

### Content and media

| Service | Role | Where used |
|---|---|---|
| **YouTube** (`@brujathemedicine`) | Home page hero video via `youtube-nocookie.com`; bulletin video grid via `youtube.com/embed` with autoplay; thumbnails from `i.ytimg.com` | Home, Bulletin |
| **Instagram** (`@bruja_themedicine`) | Social link | Bulletin |
| **Google Fonts** | Cormorant Garamond (display) and Jost (body), loaded via `@import` in `styles.scss` | Global |

### Analytics

**Google Analytics 4 is planned but not installed.** An untracked brief, `brujathembi-ga4-setup.md`, holds the details:

- Measurement ID `G-SWVTT8DJ7S`, stream ID `15822911391`
- Events wanted: `booking_start`, `booking_complete`, `whatsapp_click`, `email_click`, `phone_click`, `contact_submit`
- Constraints: one tag only, no personal data in parameters, manual `page_view` on SPA route change, POPIA compliance
- Follow-up: a client dashboard on the GA4 Data API

No `gtag`, Tag Manager or cookie consent banner exists in the source today.

---

## Working on it

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # production build to dist/
npm test           # vitest
```

Routine content edits:

- **Open or close a drop**: flip `DROP.open` and `DROP.nextDropDate` in `src/app/shared/booking-links.ts`.
- **Swap a Google Form**: change the URL constant in the same file.
- **Add a bulletin video**: add an entry with its YouTube ID to the `videos` array in `src/app/pages/bulletin/bulletin.ts`.
- **Change prices**: they are hard-coded in the page templates (services, contact, home, apothecary) and must be updated in each.

---

## Known gaps

- Prices are duplicated across four templates with no single source.
- The contact form has no server; if WhatsApp is unavailable the lead is lost.
- Banking details are published in plain HTML.
- Fonts load from Google's CDN at render time, so the site is not self-contained.
- No analytics, no consent banner, no e2e tests.
- `ImagesService` is dead code.
