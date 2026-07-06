# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

James Zhu's personal website (www.jameszhu.io), an Astro 5 static site deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, push to `master`).

## Commands

- `bun install` — install dependencies (bun is the package manager; do not use npm, the lockfile is `bun.lock`)
- `bun run dev` — dev server at http://localhost:4321
- `bun run build` — build to `dist/`

No test suite; verify changes with `bun run build` and inspection of `dist/`.

## Architecture

- Tailwind CSS v4 via `@tailwindcss/vite` — theme lives in `src/styles/global.css` (`@theme` block), there is no `tailwind.config.js`.
- `src/layouts/Base.astro` is the single shared layout (props: `title`, optional `description`).
- Blog: Markdown content collection in `src/content/blog/` (schema in `src/content.config.ts`), rendered by `src/pages/blog/`.
- Photography: drop images into `src/assets/photos/` — `src/pages/photos.astro` auto-renders them via `astro:assets`.
- `/feedback` redirect to a Google Form is configured in `astro.config.mjs` `redirects`.
- `public/CNAME` (custom domain) and `public/keybase.txt` (Keybase identity proof) must stay — the site breaks or the proof is lost without them.
