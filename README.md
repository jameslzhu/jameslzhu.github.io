# jameszhu.io

Personal site. Astro 7 + Tailwind 4, static, deployed to GitHub Pages on push to `master`.

## Quick start

```sh
nvm use          # Node version from .nvmrc
npm install      # also installs the git pre-push hook
npm run dev      # http://localhost:4321
```

Edits hot-reload. Colour, type, and copy changes appear without a restart.

## Dev server is a background daemon

`npm run dev` returns immediately instead of streaming logs. Errors will not
appear in your terminal, so use:

```sh
npx astro dev logs      # output and build errors
npx astro dev status
npx astro dev stop
```

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run verify` | Reproduce CI: lockfile drift check plus build |

## Edit things

**Colour and type.** Change the tokens in `src/styles/global.css`. Every page
follows.

| Token | Use |
| --- | --- |
| `--color-ink` | Page background (`bg-ink`) |
| `--color-fg` | Primary text (`text-fg`) |
| `--color-muted` | Dates, captions (`text-muted`) |
| `--color-rule` | Hairline dividers (`border-rule`) |
| `--font-sans` / `--font-serif` / `--font-mono` | Body / headings / code |

Do not hardcode `text-white` or `border-white/30` in pages. Add a token instead.

**Repeated styles.** `nav-link` and `section-rule` are `@utility` classes in
`global.css`. Restyle every link or divider from there.

**Homepage copy.** Edit the frontmatter block at the top of
`src/pages/index.astro` (`name`, `socials`, `intro`, `teaching`,
`underConstruction`). Leave the markup below it alone. Intro paragraphs accept
inline HTML, so links go inline with the prose.

**Blog posts.** Add Markdown to `src/content/blog/`. Frontmatter needs `title`
and `date`; `description` is optional. Schema lives in `src/content.config.ts`.

**Photos.** Drop images into `src/assets/photos/`. `photos.astro` picks them up
and generates responsive WebP automatically.

**Redirects.** Add to `redirects` in `astro.config.mjs`.

## Before you push

The pre-push hook runs `npm run verify` and blocks the push if it fails. Bypass
with `git push --no-verify`.

If the hook ever goes missing, reinstall it:

```sh
npm run prepare
```

## Gotchas

- `compressHTML: false` is deliberate. It keeps output HTML readable and stops
  Astro from eating spaces around inline links. Leave it set.
- Pages Source must stay **GitHub Actions**. On "deploy from a branch" GitHub
  runs its own Jekyll build, which fails on `.astro` and takes the site down.
- Keep `public/keybase.txt`. The identity proof cannot be recovered.
- The custom domain lives in the repo's Pages settings, not in a `CNAME` file.
