# CLAUDE.md

Guidance for Claude Code working in this repo.

## Build

James Zhu's personal site (www.jameszhu.io). Astro 7 static site, deployed to GitHub Pages via `.github/workflows/deploy.yml` (push to `master`).

- `npm install` / `npm run dev` (localhost:4321) / `npm run build` -> `dist/`
- Node pinned in `.nvmrc`; CI uses `npm ci`, so keep `package-lock.json` in sync.
- No tests. Verify with `npm run build` and inspect `dist/`.
- Before pushing, `npm ci --dry-run && npm run build` reproduces CI exactly (the
  first catches lockfile drift, the second catches build errors). Only the Pages
  artifact upload needs GitHub.

## Layout

- `src/layouts/Base.astro` is the single shared layout (`title`, optional `description`).
- Tailwind v4 via `@tailwindcss/vite`; theme in `src/styles/global.css` (`@theme` block). No `tailwind.config.js`.
- `src/pages/` has one file per route. Blog posts in `src/content/blog/` (schema in `src/content.config.ts`); photos drop into `src/assets/photos/` and render via `astro:assets`.
- Redirects in `astro.config.mjs`.
- `compressHTML` defaults to `'jsx'`: use `{" "}` at line breaks around inline tags or the spaces vanish.

## Don't break

- Pages Source must stay **"GitHub Actions"**. On "deploy from a branch" GitHub runs its own Jekyll build instead, which fails on `.astro` and takes the site down.
- Keep `public/keybase.txt`. The identity proof is unrecoverable if deleted.
