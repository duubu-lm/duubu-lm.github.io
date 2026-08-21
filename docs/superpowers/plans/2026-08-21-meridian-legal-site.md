# Meridian Legal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, single-file marketing site for the fictional test client "Meridian Legal" (personal injury law firm) at `meridian-legal/index.html`, with the client's real GoHighLevel intake-form embed wired into the contact section.

**Architecture:** One self-contained HTML file — semantic markup, inline `<style>`, no JS beyond native CSS smooth-scroll and the client-supplied GHL embed script. No build step, no external dependencies except the GHL embed's own domain.

**Tech Stack:** HTML5, vanilla CSS (custom properties, CSS Grid/Flexbox), no JS framework.

**Spec:** `docs/superpowers/specs/2026-08-21-meridian-legal-site-design.md`

**Scope addendum (agreed after spec approval):** the user also wants a card
for this project added to the live portfolio homepage (`index.html` at the
repo root — this is the actual `duubu-lm.github.io` site), in the same
simple-card style already used for `LawyerFirm`, `Doctor`, `DuubuAgency`,
etc. (not the more detailed Automations-tab `acard-row` style, since there's
no separate automation workflow behind this project to describe). Task 4
covers this; it's a small, independent, easily-reversible addition (delete
the one `<div class="card">` block to remove it).

## Global Constraints

- Colors: `--navy: #1a2b4c`, `--gold: #b8860b` exactly, per the client's existing GHL email branding.
- Practice-area headings must read exactly: "Auto Accident", "Slip and Fall", "Medical Malpractice", "Workplace Injury" (matches the downstream intake form's case types verbatim).
- No real attorney names, headshots, bar numbers, or years-of-experience claims.
- No testimonials, reviews, or "$X recovered" case-result figures.
- No custom-built contact form — the actual GHL embed the client supplied is used as-is, unmodified.
- No external dependencies besides the GHL embed's own `api.leadconnectorhq.com` iframe and `link.msgsndr.com/js/form_embed.js` script.
- Single scrolling page, single `index.html` file (matches `LawyerFirm/`, `DuubuAgency/` convention in this repo).
- Serif headings (system font stack, no external font CDN), sans-serif body.
- Mobile-first responsive; single-column stacking below ~900px/640px breakpoints.

---

### Task 1: Full HTML markup with the real GHL embed

**Files:**
- Create: `meridian-legal/index.html`

**Interfaces:**
- Produces: section `id`s (`top`, `practice-areas`, `about`, `contact`) that Task 2's CSS selectors and the nav's anchor links depend on; class names listed in Task 2's "Consumes" block.

- [ ] **Step 1: Create `meridian-legal/index.html`**

Create the file with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meridian Legal — Personal Injury Attorneys | Free Case Review</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
  </style>
</head>
<body>
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="logo" href="#top">Meridian<span class="logo-accent">Legal</span></a>
      <nav class="main-nav" aria-label="Primary">
        <a href="#top">Home</a>
        <a href="#practice-areas">Practice Areas</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="header-actions">
        <a class="phone-link" href="tel:+15550100100">(555) 010-0100</a>
        <a class="btn btn-primary btn-small" href="#contact">Free Case Review</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-accent" aria-hidden="true"></div>
      <div class="container hero-inner">
        <h1>Injured? You Deserve Strong Legal Representation.</h1>
        <p class="hero-sub">Meridian Legal helps injury victims navigate auto accidents, slip and falls, medical malpractice, and workplace injury claims — get a free, no-obligation case review.</p>
        <a class="btn btn-primary btn-large" href="#contact">Get My Free Case Review</a>
        <p class="fine-print">Confidential consultation. No obligation.</p>
      </div>
    </section>

    <section id="practice-areas" class="practice-areas">
      <div class="container">
        <h2>Practice Areas</h2>
        <p class="section-intro">We represent injury victims across four core case types.</p>
        <div class="practice-grid">
          <div class="practice-card">
            <span class="practice-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 28l3-9a4 4 0 0 1 3.8-2.7h18.4A4 4 0 0 1 35 19l3 9" />
                <rect x="4" y="28" width="40" height="10" rx="2" />
                <circle cx="14" cy="38" r="3" />
                <circle cx="34" cy="38" r="3" />
                <path d="M4 32h4M40 32h4" />
              </svg>
            </span>
            <h3>Auto Accident</h3>
            <p>Injured in a car, motorcycle, or truck accident? We help you pursue the compensation you're owed for medical bills, lost wages, and damages.</p>
          </div>
          <div class="practice-card">
            <span class="practice-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 40h8v-8h8v-8h8v-8h8" />
                <circle cx="38" cy="10" r="3" />
                <path d="M35 16l-4 6-5 2 1 6" />
              </svg>
            </span>
            <h3>Slip and Fall</h3>
            <p>Property owners have a duty to keep premises safe. If you were injured due to unsafe conditions, we can help you hold them accountable.</p>
          </div>
          <div class="practice-card">
            <span class="practice-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 4l16 6v12c0 10-7 17-16 22-9-5-16-12-16-22V10z" />
                <path d="M24 16v12M18 22h12" />
              </svg>
            </span>
            <h3>Medical Malpractice</h3>
            <p>When medical negligence causes harm, you deserve answers and accountability. We evaluate malpractice claims with care and diligence.</p>
          </div>
          <div class="practice-card">
            <span class="practice-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 30a16 16 0 0 1 32 0z" />
                <path d="M4 30h40" />
                <path d="M22 14v6M20 17h4" />
              </svg>
            </span>
            <h3>Workplace Injury</h3>
            <p>Hurt on the job? We help injured workers understand their options and pursue the benefits and compensation they're entitled to.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="container about-inner">
        <div class="about-text">
          <h2>About Meridian Legal</h2>
          <p>Meridian Legal was founded on a simple principle: injury victims deserve dedicated, compassionate representation and a clear path forward. Our practice focuses exclusively on personal injury law, so every case gets the focused attention and experience these claims require.</p>
          <p>We know that dealing with an injury is stressful enough without also navigating a legal process. Our team is here to guide you through every step, from your first case review to final resolution.</p>
        </div>
        <div class="why-us">
          <h3>Why Choose Us</h3>
          <ul class="why-us-list">
            <li><strong>Focused Experience</strong> — Our practice is built entirely around personal injury law.</li>
            <li><strong>Personal Attention</strong> — You work directly with our team, not a rotating cast of staff.</li>
            <li><strong>Clear Communication</strong> — We explain your options in plain language, every step of the way.</li>
            <li><strong>Accessible When You Need Us</strong> — Flexible consultations built around your schedule.</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container">
        <h2>Get Your Free Case Review</h2>
        <p class="section-intro">Tell us what happened. A member of our team will follow up to discuss your options — at no cost to you.</p>
        <div class="ghl-form-container">
          <!-- GHL FORM EMBED: Meridian Legal - Free Case Review Intake -->
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
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="logo">Meridian<span class="logo-accent">Legal</span></span>
        <p class="disclaimer">Attorney advertising. Prior results do not guarantee a similar outcome. This website is for informational purposes only and does not constitute legal advice.</p>
      </div>
      <div class="footer-links">
        <h4>Practice Areas</h4>
        <a href="#practice-areas">Auto Accident</a>
        <a href="#practice-areas">Slip and Fall</a>
        <a href="#practice-areas">Medical Malpractice</a>
        <a href="#practice-areas">Workplace Injury</a>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <a href="mailto:hello@meridianlegal.example">hello@meridianlegal.example</a>
        <a href="tel:+15550100100">(555) 010-0100</a>
        <p>123 Market Street, Suite 400<br>Springfield, ST 00000</p>
      </div>
    </div>
    <div class="container">
      <p class="copyright">&copy; 2026 Meridian Legal. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Verify markup in a browser**

Open `meridian-legal/index.html` directly in a browser.

Expected (unstyled but structurally correct):
- Tab title reads "Meridian Legal — Personal Injury Attorneys | Free Case Review"
- All sections render in order: header, hero, practice areas (4 cards), about, contact, footer
- The GHL iframe loads and renders the actual "Meridian Legal - Free Case Review Intake" form (requires network access — confirm it isn't blocked/blank)
- Clicking a nav link ("Practice Areas", "About", "Contact") jumps to that section
- Browser console shows no errors from this page's own markup (any errors from the GHL script itself are outside this task's control)

- [ ] **Step 3: Commit**

```bash
git add meridian-legal/index.html
git commit -m "Add Meridian Legal site markup with GHL intake form embed

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Full CSS design system

**Files:**
- Modify: `meridian-legal/index.html` (replace the `<style>` block contents)

**Interfaces:**
- Consumes: class names and IDs from Task 1 — `.site-header`, `.header-inner`, `.logo`, `.logo-accent`, `.main-nav`, `.header-actions`, `.phone-link`, `.btn`, `.btn-primary`, `.btn-small`, `.btn-large`, `.hero`, `.hero-accent`, `.hero-inner`, `.hero-sub`, `.fine-print`, `.practice-areas`, `.section-intro`, `.practice-grid`, `.practice-card`, `.practice-icon`, `.about`, `.about-inner`, `.about-text`, `.why-us`, `.why-us-list`, `.contact`, `.ghl-form-container`, `.site-footer`, `.footer-inner`, `.footer-brand`, `.disclaimer`, `.footer-links`, `.footer-contact`, `.copyright`, `.container`, `#top`, `#practice-areas`, `#about`, `#contact`.

- [ ] **Step 1: Replace the `<style>` block**

In `meridian-legal/index.html`, replace:

```html
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
  </style>
```

with:

```html
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    :root {
      --navy: #1a2b4c;
      --navy-light: #24365c;
      --gold: #b8860b;
      --gold-light: #d4a017;
      --bg: #f8f7f4;
      --surface: #ffffff;
      --text: #1c2333;
      --text-muted: #5a6274;
      --border: #e3e0d8;
      --font-serif: Georgia, "Times New Roman", Times, serif;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --radius: 6px;
      --max-width: 1120px;
    }

    body {
      font-family: var(--font-sans);
      color: var(--text);
      background: var(--bg);
      line-height: 1.6;
    }

    h1, h2, h3, h4 {
      font-family: var(--font-serif);
      color: var(--navy);
      line-height: 1.25;
      margin: 0 0 0.5em;
    }

    p { margin: 0 0 1em; color: var(--text-muted); }
    a { color: var(--navy); }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
    }

    .btn {
      display: inline-block;
      border: none;
      border-radius: var(--radius);
      font-family: var(--font-sans);
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s ease, transform 0.15s ease;
    }
    .btn-primary { background: var(--gold); color: #fff; }
    .btn-primary:hover { background: var(--gold-light); }
    .btn:active { transform: scale(0.98); }
    .btn-small { padding: 8px 18px; font-size: 0.85rem; }
    .btn-large { padding: 14px 34px; font-size: 1.05rem; }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--navy);
      padding: 14px 0;
    }
    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }
    .logo {
      font-family: var(--font-serif);
      color: #fff;
      font-size: 1.3rem;
      font-weight: 700;
      text-decoration: none;
    }
    .logo-accent { color: var(--gold-light); }
    .main-nav { display: flex; gap: 24px; }
    .main-nav a { color: #dfe3ec; text-decoration: none; font-size: 0.9rem; }
    .main-nav a:hover { color: #fff; }
    .header-actions { display: flex; align-items: center; gap: 16px; }
    .phone-link { color: #dfe3ec; text-decoration: none; font-size: 0.9rem; white-space: nowrap; }

    .hero {
      position: relative;
      background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%);
      color: #fff;
      padding: 88px 0;
      text-align: center;
      overflow: hidden;
    }
    .hero-accent {
      position: absolute;
      top: -40%;
      right: -10%;
      width: 60%;
      height: 180%;
      background: var(--gold);
      opacity: 0.08;
      transform: rotate(18deg);
    }
    .hero-inner { position: relative; }
    .hero h1 { color: #fff; font-size: 2.6rem; max-width: 780px; margin-left: auto; margin-right: auto; }
    .hero-sub { color: #d7dbe6; max-width: 620px; margin: 0 auto 32px; font-size: 1.1rem; }
    .fine-print { margin-top: 14px; font-size: 0.8rem; color: #a9b0c2; }

    .practice-areas { padding: 72px 0; background: var(--surface); text-align: center; }
    .section-intro { max-width: 560px; margin: 0 auto 40px; }
    .practice-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; text-align: left; }
    .practice-card { padding: 28px 24px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); }
    .practice-icon { display: inline-flex; width: 40px; height: 40px; color: var(--gold); margin-bottom: 14px; }
    .practice-icon svg { width: 100%; height: 100%; }
    .practice-card h3 { font-size: 1.1rem; }
    .practice-card p { font-size: 0.92rem; margin: 0; }

    .about { padding: 72px 0; }
    .about-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; }
    .why-us-list { list-style: none; }
    .why-us-list li { padding: 12px 0; border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 0.95rem; }
    .why-us-list li:last-child { border-bottom: none; }
    .why-us-list strong { color: var(--navy); }

    .contact { padding: 72px 0; background: var(--navy); color: #fff; text-align: center; }
    .contact h2 { color: #fff; }
    .contact .section-intro { color: #d7dbe6; }
    .ghl-form-container { max-width: 640px; margin: 0 auto; min-height: 956px; background: var(--surface); border-radius: var(--radius); overflow: hidden; }

    .site-footer { background: #101a30; color: #b7bdcc; padding: 48px 0 24px; }
    .footer-inner { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; margin-bottom: 32px; }
    .footer-brand .logo { display: inline-block; margin-bottom: 12px; }
    .disclaimer { font-size: 0.78rem; color: #838ba0; max-width: 340px; }
    .footer-links, .footer-contact { display: flex; flex-direction: column; gap: 8px; }
    .footer-links h4, .footer-contact h4 { color: #fff; font-family: var(--font-sans); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; }
    .footer-links a, .footer-contact a { color: #b7bdcc; text-decoration: none; font-size: 0.9rem; }
    .footer-links a:hover, .footer-contact a:hover { color: #fff; }
    .copyright { font-size: 0.8rem; color: #6b7285; border-top: 1px solid #253150; padding-top: 20px; margin: 0; }

    @media (max-width: 900px) {
      .practice-grid { grid-template-columns: repeat(2, 1fr); }
      .about-inner { grid-template-columns: 1fr; }
      .footer-inner { grid-template-columns: 1fr; }
    }

    @media (max-width: 640px) {
      .main-nav { display: none; }
      .hero h1 { font-size: 1.9rem; }
      .hero { padding: 64px 0; }
      .practice-grid { grid-template-columns: 1fr; }
      .ghl-form-container { min-height: 700px; }
      .header-actions .phone-link { display: none; }
    }
  </style>
```

- [ ] **Step 2: Verify styling in a browser**

Reload `meridian-legal/index.html`.

Expected at desktop width (~1280px):
- Navy sticky header with gold-accented logo, nav links, phone number, and gold "Free Case Review" button
- Hero: navy gradient background, white serif headline, subtle rotated gold accent shape, gold CTA button
- Practice Areas: 4 cards in a single row, each with a gold line-icon, serif heading, sans-serif description
- About: two-column layout (firm text left, "Why Choose Us" list right)
- Contact: navy background, white card containing the loaded GHL form
- Footer: dark navy-black background, 3-column layout, disclaimer text visible

Expected at mobile width (resize below 640px):
- Nav links hidden, header shows only logo + CTA button
- Practice cards, about columns, and footer columns all stack to a single column
- No horizontal scrollbar

- [ ] **Step 3: Commit**

```bash
git add meridian-legal/index.html
git commit -m "Add Meridian Legal site styling

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Final cross-check against the spec

**Files:**
- None created/modified — verification only, unless Step 1 or 2 finds an issue.

**Interfaces:**
- Consumes: the finished `meridian-legal/index.html` from Tasks 1–2.

- [ ] **Step 1: Re-open the page fresh and check every spec requirement**

Hard-refresh `meridian-legal/index.html` in a browser.

Checklist against `docs/superpowers/specs/2026-08-21-meridian-legal-site-design.md`:
- [ ] Header nav links (Home, Practice Areas, About, Contact) each scroll to the correct section
- [ ] Practice area headings read exactly: "Auto Accident", "Slip and Fall", "Medical Malpractice", "Workplace Injury"
- [ ] About section contains no named attorneys, degrees, bar numbers, or years-of-experience claims
- [ ] No testimonials or "$X recovered" figures appear anywhere on the page
- [ ] The GHL iframe (form id `25X2CwiU0YNEZbdGNZ4I`) is present and is the only form on the page — no competing custom contact form
- [ ] Footer contains the attorney-advertising disclaimer line and placeholder (`.example`/`555`) contact info
- [ ] Colors match `#1a2b4c` navy / `#b8860b` gold exactly (spot-check via browser dev tools computed styles on `.site-header` background and `.btn-primary` background)

- [ ] **Step 2: Confirm no unintended external dependencies**

Run: `grep -noE "https?://[^\"' ]+" meridian-legal/index.html`

Expected: only two URLs appear — `https://api.leadconnectorhq.com/widget/form/25X2CwiU0YNEZbdGNZ4I` (the iframe `src`) and `https://link.msgsndr.com/js/form_embed.js` (the GHL script). Any other external URL is a spec violation and must be removed.

- [ ] **Step 3: Final commit if anything was fixed**

If Steps 1–2 required any fixes, stage and commit them:

```bash
git add meridian-legal/index.html
git commit -m "Fix Meridian Legal site issues found in final review

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

If no fixes were needed, no commit is required for this task.

---

### Task 4: Add a portfolio card for Meridian Legal

**Files:**
- Modify: `index.html:167` (repo root — the live portfolio homepage, inside `<div class="grid-3">` in the `#page-work` section)

**Interfaces:**
- Consumes: `meridian-legal/index.html` (must exist and be reachable from Tasks 1-3 — this task must run after them).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Insert the new card**

In `index.html`, find this closing sequence (the last card in the `grid-3`
list, followed by the grid's closing tag):

```html
            <span class="card-tag">GHL · Sales Funnel · Email Automation</span><br />
            <a href="YukiStrategyCall/index.html" class="card-link">View Project →</a>
          </div>
        </div>
```

Replace it with (adds one new card immediately after the Yuki Strategy Call
Funnel card, before the `grid-3` closing `</div>`):

```html
            <span class="card-tag">GHL · Sales Funnel · Email Automation</span><br />
            <a href="YukiStrategyCall/index.html" class="card-link">View Project →</a>
          </div>

          <div class="card">
            <div class="card-icon">⚖️</div>
            <h3>Meridian Legal</h3>
            <p>
              A personal injury law firm site built to match an existing GoHighLevel
              brand system — practice-area breakdown across auto accident, slip and fall,
              medical malpractice, and workplace injury claims, driving straight into a
              live GHL intake form embed.
            </p>
            <span class="card-tag">GHL Form Embed · Personal Injury</span><br />
            <a href="meridian-legal/index.html" class="card-link">View Project →</a>
          </div>
        </div>
```

- [ ] **Step 2: Verify in a browser**

Open `index.html` (repo root) in a browser, navigate to the "Websites" work
(`#page-work`) view.

Expected:
- A new card titled "Meridian Legal" with a ⚖️ icon appears after "Yuki
  Strategy Call Funnel", matching the visual style of the other cards
  (same size, spacing, tag pill style)
- Clicking "View Project →" opens `meridian-legal/index.html` and loads the
  finished site from Tasks 1-3
- No console errors introduced on the homepage by this change

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Meridian Legal card to portfolio homepage

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
