# Primetime VA — 50% Off Offer Landing Page

## Purpose

A standalone local mockup of a promotional offer landing page for Primetime VA
(a virtual assistant / staffing service). The layout pattern is inspired by
typical discount-offer landing pages (hero offer + CTA, "how it works" steps,
social proof, terms block, lead form) but all copy, branding, and assets are
original to Primetime VA — nothing is copied from any third-party site.

Not in scope: real backend/email delivery, real logo/brand assets, a CMS or
build tooling, deployment. This is a local-only mockup the user can open in a
browser and iterate on before wiring it up for real.

## Location

New top-level folder at the repo root, matching the existing convention used
by sibling project folders (`care-coordinator/`, `claims-intake/`, etc.):

```
primetime-va/
├── index.html
├── styles.css
└── script.js
```

## Page sections (in order)

1. **Header** — "Primetime VA" text logo + "Claim 50% Off" button that
   scrolls to the lead form.
2. **Hero** — Headline "50% Off Your First Month with Primetime VA",
   supporting subtext, primary CTA button (scrolls to lead form), small
   fine-print line under the button referencing the terms section.
3. **Trust strip** — 3 short qualitative value props (e.g. hand-vetted VAs,
   fast matching, no long-term contract). No fabricated stats or numeric
   claims, since these aren't backed by real data.
4. **How It Works** — 3-step explainer: Tell us what you need → Get matched
   with a VA → Start delegating.
5. **Testimonials** — 3 client-quote cards with clearly placeholder names/
   quotes (e.g. "— Placeholder, Business Owner"), meant to be swapped for
   real quotes before going live.
6. **Offer terms** — small-print terms & conditions written fresh for this
   offer (new clients only, limited-time, one per customer, etc.).
7. **Lead capture form** — Name, Email, Phone, Business need (textarea),
   Submit. Client-side only: validates required fields, prevents default
   submit, shows a "Thanks — we'll be in touch" success state in place of
   the form, and logs the captured values to the console. No network call,
   no backend.
8. **Footer** — Primetime VA name + placeholder contact links (email/phone
   placeholders, no real data).

## Visual style

- Deep navy/indigo primary color, warm amber/gold accent, off-white
  background.
- System/Inter-style sans-serif font stack (no external font CDN, to keep
  the mockup fully offline-capable).
- Mobile-first responsive layout; single-column stacking below ~640px.
- No external dependencies (no CDN scripts/fonts/icons) — plain HTML/CSS/JS
  only, so it opens directly from disk with no build step and no network
  access required.

## Error handling / edge cases

- Form: required-field validation (name, email format, business need) shown
  inline; submit button disabled until valid on interaction, but page still
  usable with JS disabled (form just won't validate/animate).
- No console errors on load; no external requests to fail against.

## Out of scope / explicit non-goals

- No real logo file or brand asset — text-based logo only.
- No backend integration, analytics, or real email capture.
- No copying of any text, images, or trademarked material from any
  third-party site.
