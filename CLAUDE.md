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
- `public/keybase.txt` (Keybase identity proof) must stay — the proof is lost without it.
- Pages **Source must be set to "GitHub Actions"** (`build_type: workflow`). On the legacy "deploy from a branch" setting GitHub ignores this workflow's artifact and runs its own Jekyll builder, which fails on `.astro` files and takes the site down.
- The custom domain lives in the repo's Pages settings, not in the repo. Under Actions-based deploys a `CNAME` file in the artifact does **not** set it; `gh api -X PUT repos/:owner/:repo/pages -f cname=www.jameszhu.io` does. `public/CNAME` is kept only as a redundant marker.
