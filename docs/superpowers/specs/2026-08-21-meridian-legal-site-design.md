# Meridian Legal — Personal Injury Firm Website

## Purpose

A single-page marketing website for "Meridian Legal," a fictional test-client
personal injury law firm, built to match an existing GoHighLevel (GHL) email
system already created for this client (navy `#1a2b4c` / gold `#b8860b`
brand). The site drives visitors toward a GHL-hosted intake form embed. All
content is original placeholder copy — no real attorney names, credentials,
testimonials, or case-result figures.

## Location

New folder at the repo root, matching the kebab-case convention used by the
most recent demo sites (`care-coordinator/`, `claims-intake/`):

```
meridian-legal/
└── index.html
```

Single self-contained file (inline `<style>` and `<script>`), matching the
convention already used by `LawyerFirm/`, `DuubuAgency/`, `Doctor/`, and
`Onboarding/` in this repo. No external dependencies (no CDN fonts, icon
libraries, or JS frameworks) except the one explicitly required exception:
the GoHighLevel form embed's own `<iframe>` and
`https://link.msgsndr.com/js/form_embed.js` script, which the client
provided directly and which must load from GHL's real domain to function.

## Page sections (in order)

1. **Header (sticky)** — "Meridian Legal" wordmark (gold accent), anchor nav
   (Home / Practice Areas / About / Contact), placeholder phone number, and
   a "Free Case Review" button that smooth-scrolls to the intake section.

2. **Hero** — Headline "Injured? You Deserve Strong Legal Representation.",
   subhead referencing all four practice areas by name, primary CTA button
   "Get My Free Case Review" (scrolls to intake), small trust line
   ("Confidential consultation. No obligation."). Background treatment is
   an abstract navy/gold geometric accent (CSS/SVG shapes) — no photography.

3. **Practice Areas** — 4 cards, each a custom inline SVG line icon +
   heading + 1-2 sentence description. Headings must exactly match the
   intake form's case-type wording:
   - **Auto Accident**
   - **Slip and Fall**
   - **Medical Malpractice**
   - **Workplace Injury**

4. **About / Why Choose Us** — Firm-background paragraph written in
   institutional voice ("our team," "our firm") with no named attorneys, no
   invented degrees/bar credentials/years-of-experience figures. Followed
   by 3-4 qualitative trust points (e.g. Focused Experience, Personal
   Attention, Clear Communication, Accessible When You Need Us) — no
   fabricated statistics, settlement dollar figures, or client
   testimonials.

5. **Intake/Contact** — Heading ("Get Your Free Case Review") + one line of
   supporting copy, then the actual GoHighLevel embed the client supplied,
   wrapped in a clearly commented container:

   ```html
   <!-- GHL FORM EMBED: Meridian Legal - Free Case Review Intake -->
   <div class="ghl-form-container">
     <iframe
       src="https://api.leadconnectorhq.com/widget/form/25X2CwiU0YNEZbdGNZ4I"
       style="width:100%;height:100%;border:none;border-radius:8px"
       id="inline-25X2CwiU0YNEZbdGNZ4I"
       data-layout="{'id':'INLINE'}"
       data-trigger-type="alwaysShow"
       data-trigger-value=""
       data-activation-type="alwaysActivated"
       data-activation-value=""
       data-deactivation-type="neverDeactivate"
       data-deactivation-value=""
       data-form-name="Meridian Legal - Free Case Review Intake"
       data-height="956"
       data-layout-iframe-id="inline-25X2CwiU0YNEZbdGNZ4I"
       data-form-id="25X2CwiU0YNEZbdGNZ4I"
       title="Meridian Legal - Free Case Review Intake"
     ></iframe>
   </div>
   <script src="https://link.msgsndr.com/js/form_embed.js"></script>
   ```

   No custom/competing contact form is built. The container is sized
   (`min-height` matched to the embed's `data-height="956"`, scaled down on
   mobile) so the layout doesn't jump once the iframe loads.

6. **Footer** — Firm name, placeholder contact info (`.example` email,
   `555` phone number, generic placeholder mailing address), practice-area
   quick links (same 4 case types), a standard attorney-advertising
   disclaimer line ("Attorney advertising. Prior results do not guarantee a
   similar outcome. This website is for informational purposes only and
   does not constitute legal advice."), and a copyright line.

## Visual style

- Colors: `--navy: #1a2b4c`, `--gold: #b8860b` (exact values from the
  client's existing brand), plus supporting neutrals (off-white background,
  dark text, light borders) derived from those two.
- Typography: serif headings via a system font stack (e.g. Georgia, "Times
  New Roman", serif — no external font CDN), clean sans-serif system stack
  for body copy.
- Iconography: hand-drawn inline SVG line icons only (car, stairs, medical
  cross, hard hat for the four practice areas) — no photography, no
  external icon library.
- Mobile-first responsive; single-column stacking below ~768px; sticky
  header collapses to a simplified mobile layout (logo + CTA button,
  nav links hidden or condensed).
- No external dependencies besides the client-supplied GHL embed script.

## Error handling / edge cases

- If the GHL iframe is slow to load, the reserved container height (from
  `data-height`) prevents layout shift.
- Anchor-nav links must resolve to real section `id`s (`#practice-areas`,
  `#about`, `#contact`) — verified by clicking each nav link.
- No console errors on load other than any the GHL script itself may emit
  (outside this site's control).

## Out of scope / explicit non-goals

- No real attorney names, headshots, bar numbers, or years-of-experience
  claims.
- No testimonials, reviews, or "$X recovered" case-result figures.
- No custom-built contact form competing with the GHL embed.
- No multi-page routing — single scrolling page only.
- No analytics/tracking scripts beyond what the GHL embed itself loads.
