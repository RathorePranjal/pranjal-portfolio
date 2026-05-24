# Polymath OS — Portfolio

Anti-Gravity Polymath OS resume experience built with **React**, **Vite**, **Tailwind CSS v4** (`@tailwindcss/vite`), **Framer Motion**, **Matter.js**, and **Lucide React**.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

## Architecture

| File | Role |
|------|------|
| `src/PolymathOS.tsx` | **Single-file** UI — all 7 sections, physics sandbox, browser windows, marquee, contact |
| `src/index.css` | Tailwind v4 `@theme` tokens (space black, cyan, purple) |
| `src/App.tsx` | Thin mount wrapper |

## Customize (top of `PolymathOS.tsx`)

**Video & links**
- `INTRO_VIDEO_SRC` — intro reel
- `PROJECTS[].expandRoute` — case study URLs
- `LINKEDIN_URL`, `GITHUB_URL`

**Photos** — add files under `public/images/`:

| File | Purpose |
|------|---------|
| `profile.jpg` | Hero headshot |
| `gallery-1.jpg` … `gallery-4.jpg` | Hero thumb strip |
| `moment-1.jpg` … `moment-6.jpg` | Photo gallery section |
| `hackgrounds.jpg`, … | Events section |
| `projects/npis.jpg`, `aitrust.jpg`, … | Project card screenshots |

**Per project** in `PolymathOS.tsx`: set `screenshot`, `siteUrl` (live iframe on tap), `idea`, `skills`, `achievement`.

Until images exist, placeholders show where to drop files.

**UI:** Fixed header with hover nav · Hero stacks on phone · Project/event cards expand in-place with preview + iframe.

## Build

```bash
npm run build
npm run preview
```
