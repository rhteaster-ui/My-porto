# Testing the My-porto portfolio site

When to use: any change to the portfolio site (Vite + React 19 + TS + Tailwind v3 + Framer Motion).

## Quick start

```bash
cd ~/repos/My-porto
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Then open `http://localhost:5173/`. No env vars / no auth required — pure static SPA.

## Devin secrets needed

None. The site is fully static, no API keys, no auth.

## Source-of-truth content

All user-facing content originates from `data data portofolio.txt` at the repo root. The brief there is authoritative for:

- Name (`R_hmt ofc`), avatar URL (`https://j.top4top.io/p_376952pby0.png`), and channel logo.
- Social links (GitHub, Instagram, TikTok, Telegram, WhatsApp Channel, Facebook).
- Design constraints — these are MUST-have assertions:
  - **No emoji as icons** (use SVGs only).
  - Avatar must NOT be a circle (rounded rectangle).
  - Glassmorphism cards, layered gradient bg, cool monochrome palette.
  - Cool accent that is NOT plain blue.

The site reads from `src/data/profile.ts`, `src/data/projects.ts`, and `src/data/stack.ts`. Update copy there, not in components.

## Programmatic DOM inspection (preferred)

The `computer` tool's `console` action sometimes fails with "Chrome is not in the foreground". A more reliable path is Playwright over Chrome's CDP endpoint at `http://localhost:29229`:

```js
import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://localhost:29229');
const page = browser.contexts()[0].pages().find(p => p.url().includes('localhost:5173'));
const data = await page.evaluate(() => { /* DOM checks */ });
```

Install once: `cd /tmp && npm i playwright`.

Mobile emulation via the same CDP session:

```js
const session = await page.context().newCDPSession(page);
await session.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
```

## Canonical assertions

1. **Hero**: `section#top span.heading-eyebrow` text matches `Portfolio · YYYY`; `section#top h1 innerText` contains `Halo, saya` and `R_hmt ofc`; the avatar img's parent frame `border-radius` is `26px` (NOT 50%).
2. **Hero socials**: `section#top ul a[aria-label]` has 5 entries, each containing an `<svg>`, with hrefs matching the brief.
3. **Tech Stack**: `section#stack .glass` produces 4 group cards with labels `Frontend` (8 tiles), `Backend & Data` (2), `Deploy` (2), `Tooling` (1). Every tile contains an `<svg>`, never an emoji glyph.
4. **Contact**: `section#contact ul a` rows match the brief URLs exactly. Facebook intentionally points to the IG URL per the brief.
5. **Hover spotlight + tilt**: hover a project card, then read the parent `.group` element's inline style — `--mx`, `--my`, `--rx`, `--ry` should change as the cursor moves. Note: in Playwright, `page.mouse.move` triggers React's `onMouseMove`. The CSS vars are set on the OUTER `.group` div (the `motion.div` ref), not on the inner `.glass` element.
6. **Anchor nav**: clicking nav `Projects` / `Stack` / `Contact` updates `location.hash` and scrolls smoothly.
7. **Console clean**: `page.on('pageerror')` and `requestfailed` should produce zero entries during a full reload + scroll cycle.

## Animation gotcha

The Reveal component uses Framer Motion `whileInView` with `once: true`. Anchor-jumping into a section sometimes leaves elements still in their initial blurred state for ~1s. Wait `1000–1500ms` after a nav click before sampling the DOM or taking visual screenshots — otherwise content reads as "empty".

## Build / lint commands

- `npm run lint` — eslint, must be clean.
- `npm run build` — `tsc -b && vite build`, must produce `dist/`.
- `npm run preview` — preview the built `dist/`.

## Recording tips

- Maximize the Chrome window before recording: `xdotool windowactivate $(xdotool search --name 'R_hmt' | head -1)` (this VM does not have `wmctrl`).
- Annotate setup, each `It should …` test_start, and per-test pass/fail assertions.
- Tilt/spotlight effects are subtle — DOM inspection (CSS var values changing) is more reliable evidence than a still screenshot.

## Out of scope

- No deployed preview yet. If/when Vercel or Netlify is connected, re-run the same checks against the preview URL.
- No Lighthouse / a11y / SEO audits in the standard test plan.
