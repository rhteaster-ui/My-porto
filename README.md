# R_hmt ofc — Portfolio

A modern, clean, and premium developer portfolio with a quiet, cool aesthetic.
Built device-only by **R_hmt ofc**.

- Multi-layered gradient background (deep black + dark blue + soft violet) with animated blobs and a subtle grain
- Glassmorphism cards (semi-transparent, backdrop blur, hairline borders)
- Animated 3D-feel tech icons (no emoji), conic glowing avatar ring, cursor glow
- Smooth Framer Motion reveals (fade + lift + blur-to-clear)
- Fully responsive, lightweight on mobile (effects simplified, reduced motion respected)

## Tech

- Vite + React 19 + TypeScript
- Tailwind CSS v3
- Framer Motion
- react-icons (Simple Icons set)

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run lint     # eslint
npm run build    # tsc -b && vite build
npm run preview  # preview the production build
```

## Structure

```
src/
  components/    Background, CursorGlow, Nav, Reveal
  sections/      Hero, About, Projects, Stack, Contact, Footer
  data/          profile.ts, projects.ts, stack.ts
  icons/         SocialIcon
```

## Deploy

The site is a static SPA. Deploy `dist/` to **Vercel**, **Netlify**, **GitHub Pages**, or any static host. No environment variables are required.

## Source content

The original brief and data live in `data data portofolio.txt`. Update copy by editing the relevant files in `src/data/`.
