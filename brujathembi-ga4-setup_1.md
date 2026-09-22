# Bruja Thembi — GA4 Implementation Brief

**For:** Claude Code, working in the `brujathembi.com` repo
**Stack:** Angular 21 standalone SPA, SCSS, Netlify, no backend
**Goal:** Install GA4 and track leads, so a client dashboard can be built on the GA4 Data API afterwards.

> Supersedes the earlier draft of this file, which wrongly assumed Cal.com. **There is no Cal.com, no payment gateway and no calendar integration in this codebase.** Ignore any instruction mentioning them.

---

## Known values

| Thing | Value |
|---|---|
| Measurement ID | `G-SWVTT8DJ7S` |
| Stream ID | `15822911391` |
| Stream URL | `https://brujathembi.com` |
| Property ID (numeric) | **TBC** — only needed for the Data API stage, not this task |

GA4 property exists, enhanced measurement is ON, no data flowing yet.

---

## The one constraint that shapes everything

Every lead leaves the site. WhatsApp (`wa.me/27793574091`), Google Forms, and EFT to Capitec. Nothing comes back.

**So a completed booking is not trackable from this site, and no amount of code will change that.** The furthest we can measure is *intent* — someone clicked through to WhatsApp or opened a booking form. Do not invent a `booking_complete` event; it would always read zero and would make the dashboard lie.

Design the events around intent, and name them so nobody mistakes them for confirmed sales.

---

## Task 1 — Install the Google tag

In `src/index.html`, inside `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SWVTT8DJ7S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SWVTT8DJ7S', { send_page_view: false });
</script>
```

`send_page_view: false` is deliberate — see Task 2. Without it every route change double-counts.

Check first that no `gtag` / `googletagmanager` / `G-` / `UA-` string already exists anywhere in the repo.

---

## Task 2 — Pageviews on route change

Angular Router swaps views without a document load, so GA sees exactly one pageview per session unless we send them ourselves.

Create `src/app/services/analytics.ts` as an injectable service:

- `inject(Router)`, filter events to `NavigationEnd`
- on each, call `gtag('event', 'page_view', { page_path, page_location, page_title })`
- also send the first one on init, since `send_page_view` is off

Initialise it once in the root app component (or via an `provideAppInitializer` in `app.config.ts`) — **not** per page. The existing per-page `ScrollRevealService.init()` pattern is the wrong model to copy here; this must run exactly once.

Set `page_title` from the route rather than leaving it as the static `index.html` title, or every page reports the same name and the "top pages" report is worthless.

TypeScript will complain about `gtag`. Add a declaration file rather than casting to `any` everywhere:

```ts
// src/types/gtag.d.ts
declare function gtag(...args: unknown[]): void;
```

---

## Task 3 — Lead events

### Schema

Exact names — the dashboard queries by name.

| Event | Fires when | Parameters |
|---|---|---|
| `whatsapp_click` | Any `wa.me` / `api.whatsapp.com` link opened | `location`, `intent` |
| `booking_form_open` | A Google Form link opened | `form_name`, `location` |
| `contact_submit` | Contact page form submitted (which opens WhatsApp) | `service` |
| `email_click` | `mailto:` link clicked | `location` |
| `phone_click` | `tel:` link clicked, **if** the number is a real `tel:` link — check, it may be plain text | `location` |
| `banking_details_view` | Banking section scrolled into view on `/contact` | — |

`location` = where on the site the click happened (`footer`, `hero`, `apothecary-capsules`).
`intent` = what they were after (`booking`, `astral-gym`, `broadcast-list`, `general`).
`form_name` = `session-booking`, `dream-vault`, `aura-care-order`.

`banking_details_view` is the closest proxy the site has to purchase intent — someone looking at where to send money is further down the funnel than someone clicking WhatsApp. Worth having.

### Drop context

`src/app/shared/booking-links.ts` holds `DROP.open`. Attach it as a **user property** so every event can be segmented by whether the drop was open:

```ts
gtag('set', 'user_properties', { drop_status: DROP.open ? 'open' : 'closed' });
```

This is the single most useful thing in the whole setup. It answers "do we lose people when the drop is closed?" — which is a real business question Thembi can act on.

### Implementation

One delegated listener registered by the analytics service, so new CTAs are covered without touching each template:

```ts
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href') ?? '';
  const location = (a as HTMLElement).dataset['gaLocation'] ?? 'unknown';

  if (/wa\.me|api\.whatsapp\.com/.test(href)) {
    gtag('event', 'whatsapp_click', { location, intent: (a as HTMLElement).dataset['gaIntent'] ?? 'general' });
  } else if (/docs\.google\.com\/forms|forms\.gle/.test(href)) {
    gtag('event', 'booking_form_open', { location, form_name: (a as HTMLElement).dataset['gaForm'] ?? 'unknown' });
  } else if (href.startsWith('mailto:')) {
    gtag('event', 'email_click', { location });
  } else if (href.startsWith('tel:')) {
    gtag('event', 'phone_click', { location });
  }
});
```

Then add `data-ga-location`, `data-ga-intent`, `data-ga-form` to the CTAs across the templates. Without those attributes everything reports `unknown` and the data is useless — this part is tedious and it is not optional.

The contact form opens WhatsApp via `window.open`, so the delegated listener won't catch it. Fire `contact_submit` explicitly in that submit handler, before the redirect.

---

## Task 4 — Guard rails

- **No personal data in parameters, ever.** The contact form builds a message containing the visitor's name and question — none of that goes to GA. Parameters describe the interaction, not the person. This is both Google's terms and POPIA.
- Guard every call: `if (typeof gtag !== 'function') return;`. Ad blockers remove gtag entirely, and an unguarded call throws and breaks the click handler — meaning the WhatsApp link stops working for blocker users. That would be worse than having no analytics.
- No consent banner exists. POPIA doesn't demand a GDPR-style blocking banner for basic analytics, but a short cookie notice is the right call. Out of scope here — flag it, don't build it.
- Bundle budgets are 500 kB / 1 MB. gtag loads externally so it shouldn't move the needle; confirm the build still passes.

---

## Task 5 — Verify

1. `npm run build`, then deploy to a Netlify preview
2. GA4 → **Admin → DebugView** (install the GA Debugger extension)
3. Walk it: load `/`, navigate to `/services`, `/apothecary`, `/contact` — confirm a `page_view` per route with the right `page_title`
4. Click a WhatsApp link, a Google Form link, the footer email — confirm each event with correct parameters
5. Submit the contact form — confirm `contact_submit` and that WhatsApp still opens
6. Confirm `drop_status` appears as a user property

Disable ad blockers while testing. uBlock and Brave shields block gtag and make a correct install look broken.

---

## Deliverable

Branch or PR with:

- Tag in `src/index.html`
- `src/app/services/analytics.ts` and `src/types/gtag.d.ts`
- Service initialised once at app root
- `data-ga-*` attributes across the templates
- `contact_submit` wired in the contact page handler

Summary should state: files changed, every event wired and where, anything in Task 3 that couldn't be implemented and why, and whether the phone number is a real `tel:` link.

---

## Manual GA4 steps (human, not Claude Code)

After the tag is live:

1. **Mark key events** — Admin → Key events → mark `whatsapp_click`, `booking_form_open`, `contact_submit`
2. **Exclude internal traffic** — Admin → Data streams → Configure tag settings → Define internal traffic, add Thembi's and RogueTech's IPs, then enable the Internal Traffic filter under Data settings → Data filters. Skip this and her own browsing pollutes the client's numbers.

No cross-domain configuration is needed — we can't measure WhatsApp or Google Forms regardless.

---

## Out of scope

- Google Cloud service account and Data API access
- The client dashboard
- Cookie consent banner
- Any attempt to track completed bookings or payments
