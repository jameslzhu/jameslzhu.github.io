# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

James Zhu's personal website (www.jameszhu.io), an Astro 5 static site deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, push to `master`).

## Commands

- `npm install` — install dependencies (npm is the package manager; the lockfile is `package-lock.json`)
- `npm run dev` — dev server at http://localhost:4321
- `npm run build` — build to `dist/`

Node version is pinned in `.nvmrc` (`nvm use`); CI reads the same file via `setup-node`'s `node-version-file`.

CI uses `npm ci`, which requires `package-lock.json` to stay in sync with `package.json`.

No test suite; verify changes with `npm run build` and inspection of `dist/`.

## Architecture

- Tailwind CSS v4 via `@tailwindcss/vite` — theme lives in `src/styles/global.css` (`@theme` block), there is no `tailwind.config.js`.
- `src/layouts/Base.astro` is the single shared layout (props: `title`, optional `description`).
- Blog: Markdown content collection in `src/content/blog/` (schema in `src/content.config.ts`), rendered by `src/pages/blog/`.
- Photography: drop images into `src/assets/photos/` — `src/pages/photos.astro` auto-renders them via `astro:assets`.
- `/feedback` redirect to a Google Form is configured in `astro.config.mjs` `redirects`.
- `public/CNAME` (custom domain) and `public/keybase.txt` (Keybase identity proof) must stay — the site breaks or the proof is lost without them.
