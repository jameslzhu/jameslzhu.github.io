# CLAUDE.md

Guidance for Claude Code working in this repo.

## Build

James Zhu's personal site (www.jameszhu.io). Astro 7 static site, deployed to GitHub Pages via `.github/workflows/deploy.yml` (push to `master`).

- `npm install` / `npm run dev` (localhost:4321) / `npm run build` -> `dist/`
- Node pinned in `.nvmrc`; CI uses `npm ci`, so keep `package-lock.json` in sync.
- No tests. Verify with `npm run build` and inspect `dist/`.
- `npm run verify` reproduces CI: lockfile drift check plus build. A
  `simple-git-hooks` pre-push hook runs it automatically, installed by the
  `prepare` script on `npm install`. Bypass with `git push --no-verify`.

## Layout

- `src/layouts/Base.astro` is the single shared layout (`title`, optional `description`).
- Tailwind v4 via `@tailwindcss/vite`; tokens and shared utilities in
  `src/styles/global.css`. No `tailwind.config.js`.
- All colour goes through tokens: `bg-ink`, `text-fg`, `text-muted`, `border-rule`.
  Do not reintroduce raw `text-white` / `border-white/30` in pages.
- Shared patterns are `@utility` classes: `nav-link` (plain link, dims on hover)
  and `section-rule` (hairline divider).
- `src/pages/` has one file per route. Homepage copy lives in the `index.astro`
  frontmatter block, not the markup. Blog posts in `src/content/blog/` (schema in
  `src/content.config.ts`); photos drop into `src/assets/photos/` and render via
  `astro:assets`.
- Redirects in `astro.config.mjs`.
- `compressHTML: false` is set deliberately: output stays readable in view-source,
  and prose wrapping an inline `<a>` keeps its spaces without `{" "}`. Do not
  remove it or restore the Astro 7 `'jsx'` default.

## Don't break

- Pages Source must stay **"GitHub Actions"**. On "deploy from a branch" GitHub runs its own Jekyll build instead, which fails on `.astro` and takes the site down.
- Keep `public/keybase.txt`. The identity proof is unrecoverable if deleted.
