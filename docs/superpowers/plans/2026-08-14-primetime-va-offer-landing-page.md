# Primetime VA Offer Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, local, three-file (HTML/CSS/JS) mockup of a "50% off first month" offer landing page for Primetime VA, in `primetime-va/` at the repo root.

**Architecture:** Plain static site, no build step, no external dependencies (no CDN fonts/scripts/frameworks). `index.html` holds semantic markup for all 8 spec sections, `styles.css` holds all layout/visual styling with a mobile breakpoint, `script.js` handles CTA smooth-scroll and client-side form validation/submit simulation (console.log only, no network call).

**Tech Stack:** HTML5, vanilla CSS (custom properties), vanilla JS (no frameworks, no build tools).

## Global Constraints

- No external dependencies: no CDN scripts, fonts, or icon libraries — everything must work opening `index.html` directly from disk with no network access.
- No real backend/email delivery — form submit is simulated client-side only (validate → console.log → show success panel).
- No copied text/images/trademarks from any third-party site — all copy is original to Primetime VA.
- No fabricated numeric stats/claims — trust-strip copy is qualitative only.
- Placeholder contact info must read as obviously placeholder (`.example` email domain, `555` phone number).
- Mobile-first responsive; single-column stacking below ~768px.
- Files live at `primetime-va/index.html`, `primetime-va/styles.css`, `primetime-va/script.js`.

---

### Task 1: Scaffold folder and full HTML markup

**Files:**
- Create: `primetime-va/index.html`

**Interfaces:**
- Produces: DOM hooks that Task 2 (CSS) and Task 3 (JS) depend on:
  - Class names: `.site-header`, `.header-inner`, `.logo`, `.logo-accent`, `.hero`, `.hero-inner`, `.hero-sub`, `.fine-print`, `.trust-strip`, `.trust-grid`, `.trust-item`, `.how-it-works`, `.steps-grid`, `.step`, `.step-number`, `.testimonials`, `.testimonial-grid`, `.testimonial`, `.offer-terms`, `.lead-form-section`, `.form-intro`, `.form-row`, `.optional`, `.field-error`, `.form-success`, `.site-footer`, `.footer-inner`, `.footer-contact`, `.copyright`, `.btn`, `.btn-primary`, `.btn-small`, `.btn-large`, `.container`
  - IDs: `offer-terms`, `lead-form`, `offer-form`, `full-name`, `email`, `phone`, `needs`, `form-success`
  - Data attributes: `data-scroll-to="lead-form"` on both CTA buttons, `data-error-for="full-name|email|needs"` on the three error spans

- [ ] **Step 1: Create the folder and `index.html`**

Create `primetime-va/index.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Primetime VA — 50% Off Your First Month</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <span class="logo">Primetime<span class="logo-accent">VA</span></span>
      <button class="btn btn-primary btn-small" data-scroll-to="lead-form">Claim 50% Off</button>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-inner">
        <h1>50% Off Your First Month with Primetime&nbsp;VA</h1>
        <p class="hero-sub">Delegate the busywork to a hand-vetted virtual assistant and get your first month at half price. Claim your offer below — spots are limited.</p>
        <button class="btn btn-primary btn-large" data-scroll-to="lead-form">Claim My 50% Off</button>
        <p class="fine-print">*See <a href="#offer-terms">offer terms</a> below.</p>
      </div>
    </section>

    <section class="trust-strip">
      <div class="container trust-grid">
        <div class="trust-item">
          <h3>Hand-Vetted VAs</h3>
          <p>Every assistant is interviewed, background-checked, and skills-tested before we ever introduce you.</p>
        </div>
        <div class="trust-item">
          <h3>Matched Fast</h3>
          <p>Tell us what you need and we'll match you with the right VA — no lengthy hiring process.</p>
        </div>
        <div class="trust-item">
          <h3>No Long-Term Contracts</h3>
          <p>Scale up, scale down, or cancel anytime. You're never locked in.</p>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <div class="container">
        <h2>How Primetime VA Works</h2>
        <div class="steps-grid">
          <div class="step">
            <span class="step-number">1</span>
            <h3>Tell Us What You Need</h3>
            <p>Fill out a short form about your business and the tasks you want off your plate.</p>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <h3>Get Matched With a VA</h3>
            <p>We pair you with a vetted assistant suited to your industry and workload.</p>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <h3>Start Delegating</h3>
            <p>Your VA gets to work — you get your time back.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sample testimonials below — replace with real client quotes before this page goes live. -->
    <section class="testimonials">
      <div class="container">
        <h2>What Clients Say</h2>
        <div class="testimonial-grid">
          <blockquote class="testimonial">
            <p>"My Primetime VA handles my inbox and scheduling so I can actually focus on clients."</p>
            <cite>— Placeholder Name, Business Owner</cite>
          </blockquote>
          <blockquote class="testimonial">
            <p>"Onboarding took a day. Within a week I couldn't imagine running my business without this."</p>
            <cite>— Placeholder Name, Founder</cite>
          </blockquote>
          <blockquote class="testimonial">
            <p>"Cut my admin time in half and the quality of work has been consistently great."</p>
            <cite>— Placeholder Name, Agency Owner</cite>
          </blockquote>
        </div>
      </div>
    </section>

    <section id="offer-terms" class="offer-terms">
      <div class="container">
        <h2>Offer Terms</h2>
        <ul>
          <li>Offer valid for new Primetime VA clients only.</li>
          <li>50% discount applies to your first month of service only; standard pricing applies thereafter.</li>
          <li>Limited-time offer — while placement availability lasts.</li>
          <li>Cannot be combined with any other discount or promotional offer.</li>
          <li>Discount applied at time of first invoice; no cash value.</li>
          <li>Primetime VA reserves the right to modify or end this offer at any time.</li>
        </ul>
      </div>
    </section>

    <section id="lead-form" class="lead-form-section">
      <div class="container">
        <h2>Claim Your 50% Off</h2>
        <p class="form-intro">Tell us a bit about your business and we'll reach out to get your VA matched.</p>

        <form id="offer-form" novalidate>
          <div class="form-row">
            <label for="full-name">Full Name</label>
            <input type="text" id="full-name" name="fullName" required>
            <span class="field-error" data-error-for="full-name"></span>
          </div>

          <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <span class="field-error" data-error-for="email"></span>
          </div>

          <div class="form-row">
            <label for="phone">Phone <span class="optional">(optional)</span></label>
            <input type="tel" id="phone" name="phone">
          </div>

          <div class="form-row">
            <label for="needs">What do you need help with?</label>
            <textarea id="needs" name="needs" rows="4" required></textarea>
            <span class="field-error" data-error-for="needs"></span>
          </div>

          <button type="submit" class="btn btn-primary btn-large">Get My 50% Off</button>
        </form>

        <div id="form-success" class="form-success" hidden>
          <h3>Thanks — you're in!</h3>
          <p>We'll be in touch within one business day to get your VA matched.</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <span class="logo">Primetime<span class="logo-accent">VA</span></span>
      <ul class="footer-contact">
        <li><a href="mailto:hello@primetimeva.example">hello@primetimeva.example</a></li>
        <li>(555) 010-0100</li>
      </ul>
      <p class="copyright">&copy; 2026 Primetime VA. All rights reserved.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify markup in a browser**

Open `primetime-va/index.html` directly in a browser (double-click, or `file://` path).

Expected (unstyled but structurally correct):
- Page title tab reads "Primetime VA — 50% Off Your First Month"
- All 8 sections render in order: header, hero, trust strip, how it works, testimonials, offer terms, lead form, footer
- Browser dev tools console shows no errors (styles.css/script.js 404s are expected at this point — not created yet)

- [ ] **Step 3: Commit**

```bash
git add primetime-va/index.html
git commit -m "Add Primetime VA offer page markup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Full CSS styling

**Files:**
- Create: `primetime-va/styles.css`

**Interfaces:**
- Consumes: class names and structure produced by Task 1 (listed above)
- Produces: nothing consumed by later tasks (JS in Task 3 does not depend on any CSS class)

- [ ] **Step 1: Create `styles.css`**

Create `primetime-va/styles.css` with this exact content:

```css
:root {
  --color-primary: #1b2a4a;
  --color-primary-light: #2c3e66;
  --color-accent: #e0a836;
  --color-accent-dark: #c78f22;
  --color-bg: #faf9f6;
  --color-surface: #ffffff;
  --color-text: #1f2430;
  --color-text-muted: #5b6272;
  --color-border: #e4e1d8;
  --color-error: #c0392b;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --radius: 8px;
  --max-width: 1080px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.5;
}

h1, h2, h3 { line-height: 1.2; margin: 0 0 0.5em; color: var(--color-primary); }
p { margin: 0 0 1em; color: var(--color-text-muted); }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.btn {
  display: inline-block;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary {
  background: var(--color-accent);
  color: var(--color-primary);
}
.btn-primary:hover { background: var(--color-accent-dark); }
.btn:active { transform: scale(0.98); }
.btn-small { padding: 8px 16px; font-size: 0.875rem; }
.btn-large { padding: 14px 32px; font-size: 1.05rem; }

.site-header {
  background: var(--color-primary);
  padding: 16px 0;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.logo-accent { color: var(--color-accent); }

.hero {
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: #fff;
  padding: 72px 0;
  text-align: center;
}
.hero h1 { color: #fff; font-size: 2.5rem; max-width: 760px; margin-left: auto; margin-right: auto; }
.hero-sub { color: #d9dce4; max-width: 560px; margin: 0 auto 32px; font-size: 1.1rem; }
.fine-print { margin-top: 12px; font-size: 0.8rem; color: #b7bccb; }
.fine-print a { color: var(--color-accent); }

.trust-strip { padding: 56px 0; background: var(--color-surface); }
.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.trust-item h3 { font-size: 1.05rem; }
.trust-item p { font-size: 0.95rem; margin: 0; }

.how-it-works { padding: 64px 0; text-align: center; }
.how-it-works h2 { font-size: 1.75rem; margin-bottom: 40px; }
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  text-align: left;
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-primary);
  font-weight: 700;
  margin-bottom: 12px;
}
.step h3 { font-size: 1.05rem; }
.step p { font-size: 0.95rem; }

.testimonials { padding: 64px 0; background: var(--color-surface); text-align: center; }
.testimonials h2 { font-size: 1.75rem; margin-bottom: 40px; }
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.testimonial {
  margin: 0;
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-align: left;
}
.testimonial p { color: var(--color-text); font-style: italic; }
.testimonial cite { font-style: normal; font-size: 0.85rem; color: var(--color-text-muted); }

.offer-terms { padding: 48px 0; }
.offer-terms h2 { font-size: 1.25rem; }
.offer-terms ul { color: var(--color-text-muted); font-size: 0.85rem; padding-left: 20px; }
.offer-terms li { margin-bottom: 8px; }

.lead-form-section { padding: 64px 0; background: var(--color-primary); color: #fff; text-align: center; }
.lead-form-section h2 { color: #fff; font-size: 1.75rem; }
.form-intro { color: #d9dce4; max-width: 480px; margin: 0 auto 32px; }
#offer-form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
  background: var(--color-surface);
  padding: 32px;
  border-radius: var(--radius);
}
.form-row { margin-bottom: 20px; }
.form-row label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--color-text);
  font-size: 0.9rem;
}
.form-row .optional { font-weight: 400; color: var(--color-text-muted); }
.form-row input,
.form-row textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 1rem;
}
.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}
.form-row.has-error input,
.form-row.has-error textarea {
  border-color: var(--color-error);
}
.field-error {
  display: block;
  min-height: 1.1em;
  color: var(--color-error);
  font-size: 0.8rem;
  margin-top: 4px;
}
#offer-form .btn { width: 100%; }

.form-success {
  max-width: 480px;
  margin: 0 auto;
  background: var(--color-surface);
  color: var(--color-text);
  padding: 32px;
  border-radius: var(--radius);
  text-align: center;
}
.form-success h3 { margin-top: 0; }

.site-footer { background: var(--color-primary); color: #d9dce4; padding: 32px 0; }
.footer-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.footer-contact { list-style: none; display: flex; gap: 16px; padding: 0; margin: 0; font-size: 0.9rem; }
.footer-contact a { color: #d9dce4; }
.copyright { font-size: 0.8rem; color: #9aa1b4; margin: 0; }

@media (max-width: 768px) {
  .hero h1 { font-size: 1.9rem; }
  .trust-grid, .steps-grid, .testimonial-grid { grid-template-columns: 1fr; }
  .hero { padding: 56px 0; }
}
```

- [ ] **Step 2: Verify styling in a browser**

Reload `primetime-va/index.html`.

Expected at desktop width (~1280px):
- Navy header with amber "Claim 50% Off" button, navy hero with white headline and amber CTA
- Trust strip, "How It Works" steps, and testimonials each lay out as 3 columns
- Lead form is a centered white card ~480px wide
- Console has no errors

Expected at mobile width (resize below 768px, or use dev tools device toolbar):
- Trust strip, steps, and testimonial grids stack to a single column
- Hero headline shrinks, no horizontal scrollbar

- [ ] **Step 3: Commit**

```bash
git add primetime-va/styles.css
git commit -m "Add Primetime VA offer page styling

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Form validation and CTA scroll behavior

**Files:**
- Create: `primetime-va/script.js`

**Interfaces:**
- Consumes: `data-scroll-to` attribute, `#offer-form`, `#full-name`, `#email`, `#phone`, `#needs`, `[data-error-for]`, `#form-success` from Task 1's HTML
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Create `script.js`**

Create `primetime-va/script.js` with this exact content:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-scroll-to]').forEach((el) => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('data-scroll-to');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const form = document.getElementById('offer-form');
  const successPanel = document.getElementById('form-success');

  if (!form) return;

  const validators = {
    'full-name': (value) => value.trim().length > 0 || 'Please enter your name.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Please enter a valid email address.',
    needs: (value) => value.trim().length > 0 || 'Let us know what you need help with.',
  };

  function showError(fieldId, message) {
    const row = document.getElementById(fieldId).closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${fieldId}"]`);
    row.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const row = document.getElementById(fieldId).closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${fieldId}"]`);
    row.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
  }

  function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const validate = validators[fieldId];
    if (!validate) return true;
    const result = validate(field.value);
    if (result === true) {
      clearError(fieldId);
      return true;
    }
    showError(fieldId, result);
    return false;
  }

  Object.keys(validators).forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => validateField(fieldId));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fieldIds = Object.keys(validators);
    const results = fieldIds.map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) return;

    const data = {
      fullName: document.getElementById('full-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      needs: document.getElementById('needs').value.trim(),
    };

    // No backend wired up yet — this mockup just logs the captured lead.
    console.log('Primetime VA offer form submission:', data);

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

- [ ] **Step 2: Manually verify CTA scroll**

Reload `primetime-va/index.html`. Click the header "Claim 50% Off" button, then the hero "Claim My 50% Off" button.

Expected: each click smooth-scrolls the page to the lead form section (`#lead-form`).

- [ ] **Step 3: Manually verify form validation — empty submit**

Click "Get My 50% Off" with all fields empty.

Expected:
- Full Name, Email, and What do you need help with? fields each show a red border and an inline error message ("Please enter your name.", "Please enter a valid email address.", "Let us know what you need help with.")
- Phone shows no error (it's optional)
- Form does not submit, page does not navigate, no console errors

- [ ] **Step 4: Manually verify form validation — invalid email**

Enter a name, type `not-an-email` in Email, fill in the needs textarea, submit.

Expected: only the Email field shows "Please enter a valid email address."; other fields show no error.

- [ ] **Step 5: Manually verify successful submission**

Fill Full Name, a valid Email (e.g. `test@example.com`), leave Phone blank, fill in Needs, submit.

Expected:
- The form is replaced by the success panel: "Thanks — you're in!" / "We'll be in touch within one business day to get your VA matched."
- Browser console shows a `Primetime VA offer form submission:` log with the entered `fullName`, `email`, empty `phone`, and `needs` values
- No network requests are triggered (check dev tools Network tab — there should be none beyond the initial page load)

- [ ] **Step 6: Commit**

```bash
git add primetime-va/script.js
git commit -m "Add Primetime VA offer page form validation and scroll behavior

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Final cross-check against the spec

**Files:**
- None created/modified — verification only.

**Interfaces:**
- Consumes: the finished `primetime-va/index.html`, `primetime-va/styles.css`, `primetime-va/script.js` from Tasks 1–3.

- [ ] **Step 1: Re-open the page fresh and check every spec section is present**

Open `primetime-va/index.html` in a browser (fresh load, not cached — hard refresh).

Checklist against the spec (`docs/superpowers/specs/2026-08-14-primetime-va-offer-landing-page-design.md`):
- [ ] Header has "Primetime VA" logo + "Claim 50% Off" button
- [ ] Hero has the 50%-off headline, subtext, CTA, and fine-print terms link
- [ ] Trust strip shows exactly 3 qualitative value props (no numeric stats)
- [ ] "How It Works" shows exactly 3 numbered steps
- [ ] Testimonials section shows 3 placeholder-labeled quotes
- [ ] Offer Terms section lists the 6 terms bullets
- [ ] Lead form has Name, Email, Phone (optional), Needs, Submit
- [ ] Footer shows placeholder `.example` email and `555` phone number, plus copyright line

- [ ] **Step 2: Confirm no external dependencies**

Search the three files for any external references:

Run: `grep -rn "http://\|https://\|cdn\." primetime-va/`

Expected: no output (or only the `botoxcosmetic.com`-style references are absent — there should be zero external URLs anywhere, since this page has no external links at all).

- [ ] **Step 3: Final commit if anything was fixed**

If Steps 1–2 required any fixes, stage and commit them:

```bash
git add primetime-va/
git commit -m "Fix Primetime VA offer page issues found in final review

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

If no fixes were needed, no commit is required for this task.
