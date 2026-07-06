# Astro Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Jekyll site in this repo with an Astro 5 + Tailwind 4 static site (homepage, blog, photography page) deployed to GitHub Pages via GitHub Actions, preserving the `www.jameszhu.io` custom domain.

**Architecture:** Astro static output at repo root, file-based routing under `src/pages/`, blog as a Markdown content collection, one shared `Base.astro` layout. Tailwind v4 via the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`). Build runs in GitHub Actions with bun for installs; deploys via `actions/deploy-pages`. The Jekyll toolchain is deleted in the final task.

**Tech Stack:** Astro ^5, Tailwind CSS ^4 (`@tailwindcss/vite`), bun (package manager), GitHub Actions + GitHub Pages.

## Global Constraints

- Work on branch `feat/new` in this repo (`~/Documents/repos/jameslzhu/jameslzhu.github.io`). Do NOT create a worktree; this session works in place.
- Package manager is **bun** (`bun install`, `bun run build`). Never run `npm install` — the lockfile must be `bun.lock`.
- **Do not touch** these root files: `.bash_profile`, `.bashrc`, `.gitconfig`, `.gitmodules`, `.profile`, `.ripgreprc`, `.zprofile`, `.zshrc`, `.idea/`, `.vscode/`, `.claude/`, `.mcp.json`, `LICENSE`. They are unrelated to the site.
- The custom domain is `www.jameszhu.io` (current `CNAME` content, verbatim, no trailing newline requirements). It must end up in `public/CNAME` so Astro copies it into `dist/`.
- `keybase.txt` is a Keybase identity proof; it must remain reachable at `https://www.jameszhu.io/keybase.txt` (i.e. live in `public/`).
- The `/feedback` URL currently redirects to `https://forms.gle/chB5ePuX2FkVuaaL9` and must keep doing so.
- Port homepage copy **verbatim** (including the outdated "senior undergraduate" bio) — copy edits are the owner's call, not this plan's.
- No test framework (YAGNI for a static site). Verification for every task = `bun run build` succeeds + `grep`/`ls` assertions on `dist/` output, exactly as written in each task.
- Visual design here is a clean, dark baseline (`#1b1c29` background carried over from the old site). Heavy custom design is an explicit follow-up phase after this plan, using the frontend-design skill — do not attempt it here.
- Commit at the end of every task with the message given in the task.

---

### Task 1: Scaffold Astro + Tailwind project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `src/pages/index.astro` (placeholder, replaced in Task 2)
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: working `bun run build` → `dist/`; `src/styles/global.css` imported by later layouts; `astro.config.mjs` with `site` and `/feedback` redirect that later tasks leave untouched.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "jameszhu.io",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.jameszhu.io',
  redirects: {
    '/feedback': 'https://forms.gle/chB5ePuX2FkVuaaL9',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Write `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-ink: #1b1c29;
  --font-sans: "Roboto", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Roboto Slab", ui-serif, serif;
  --font-mono: "Fira Mono", ui-monospace, monospace;
}
```

- [ ] **Step 5: Write placeholder `src/pages/index.astro`**

```astro
---
import '../styles/global.css';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>James Zhu</title>
  </head>
  <body class="bg-ink text-white">
    <h1 class="font-serif text-4xl">James Zhu</h1>
  </body>
</html>
```

- [ ] **Step 6: Append Astro entries to `.gitignore`**

Append these lines to the existing `.gitignore` (keep the Jekyll entries for now; they go away in Task 5):

```gitignore

### Astro ###
node_modules/
dist/
.astro/
```

- [ ] **Step 7: Install and build**

Run: `bun install && bun run build`
Expected: install completes creating `bun.lock`; build ends with a `[build] ... Complete!` line and no errors.

- [ ] **Step 8: Verify output**

Run: `ls dist/index.html dist/feedback/index.html && grep -c 'forms.gle/chB5ePuX2FkVuaaL9' dist/feedback/index.html`
Expected: both files listed; grep prints `1` or more (the redirect page contains the form URL).

- [ ] **Step 9: Commit**

```bash
git add package.json bun.lock astro.config.mjs tsconfig.json src/ .gitignore
git commit -m "feat: scaffold Astro 5 + Tailwind 4 project"
```

---

### Task 2: Base layout and homepage

**Files:**
- Create: `src/layouts/Base.astro`, `public/` (via `git mv` of static assets)
- Modify: `src/pages/index.astro` (replace placeholder)
- Move: `planet-light.svg` → `public/planet-light.svg`, `keybase.txt` → `public/keybase.txt`, `resume.pdf` → `public/resume.pdf`

**Interfaces:**
- Consumes: `src/styles/global.css` from Task 1.
- Produces: `Base.astro` layout with props `{ title: string; description?: string }` and a default `<slot />` — Tasks 3 and 4 wrap every page in it.

- [ ] **Step 1: Move static assets into `public/`**

```bash
mkdir -p public
git mv planet-light.svg keybase.txt resume.pdf public/
```

- [ ] **Step 2: Write `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Personal site of James Zhu' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,700|Fira+Mono|Roboto+Slab:700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="min-h-screen bg-ink font-sans text-white">
    <main class="mx-auto max-w-2xl px-4 leading-relaxed">
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 3: Replace `src/pages/index.astro` with the ported homepage**

Content ported verbatim from the old `index.html` (bio text unchanged; "Projects" stays a dead link as before, matching the old site's under-construction section):

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="James Zhu">
  <section class="mt-8 flex items-center gap-6 border-b border-white/30 pb-4">
    <img class="h-32 sm:h-40" src="/planet-light.svg" alt="planet" />
    <div>
      <h1 class="font-serif text-4xl sm:text-5xl">James Zhu</h1>
      <ul class="mt-2 flex gap-4 font-mono font-bold">
        <li><a class="text-white hover:opacity-70" href="https://github.com/jameslzhu">@github</a></li>
        <li><a class="text-white hover:opacity-70" href="https://keybase.io/jzhu">@keybase</a></li>
        <li><a class="text-white hover:opacity-70" href="https://www.linkedin.com/in/jameslzhu">@linkedin</a></li>
      </ul>
    </div>
  </section>

  <div class="border-b border-white/30 py-4 text-lg">
    <p>Hello! I'm a senior undergraduate at UC Berkeley, studying computer science.</p>
    <p class="mt-4">
      I am an alumni of
      <a class="underline" href="https://www.firstinspires.org/robotics/frc">FIRST Robotics</a>,
      <a class="underline" href="https://team3061.org">Team 3061</a>.
    </p>
  </div>

  <section class="border-b border-white/30 py-4">
    <h2 class="font-serif text-2xl font-bold">Teaching</h2>
    <p class="mt-2"><a class="text-lg underline" href="/feedback">CS 168 Feedback</a></p>
  </section>

  <section class="py-4">
    <h2 class="font-serif text-xl font-bold">Under construction:</h2>
    <ul class="mt-2 space-y-2 text-lg">
      <li><a class="text-white hover:opacity-70" href="/photos">Photography</a></li>
      <li><a class="text-white hover:opacity-70" href="/blog">Writing</a></li>
      <li><a class="text-white hover:opacity-70" href="/projects">Projects</a></li>
    </ul>
  </section>
</Base>
```

- [ ] **Step 4: Build and verify**

Run: `bun run build && grep -c 'James Zhu' dist/index.html && grep -c 'planet-light.svg' dist/index.html && ls dist/keybase.txt dist/resume.pdf`
Expected: build succeeds; both greps print `1` or more; both files listed.

- [ ] **Step 5: Commit**

```bash
git add -A src/ public/ planet-light.svg keybase.txt resume.pdf
git commit -m "feat: add base layout and port homepage"
```

---

### Task 3: Blog content collection

**Files:**
- Create: `src/content.config.ts`, `src/content/blog/power.md`, `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`

**Interfaces:**
- Consumes: `Base.astro` (props `{ title, description? }`) from Task 2.
- Produces: content collection `blog` with schema `{ title: string; date: Date; description?: string }`; routes `/blog/` and `/blog/<slug>/`. Entry IDs come from filenames (`power.md` → `/blog/power/`).

- [ ] **Step 1: Write `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Port the post to `src/content/blog/power.md`**

New frontmatter (drop Jekyll's `layout`/`categories`), body copied **byte-for-byte** from `_posts/power.md` lines 8–44 (do not reformat; the `$A$` math notation stays as plain text — the old site never rendered it either):

```markdown
---
title: "Systems of Power"
date: 2020-01-27
---

Inspired by Nicky Case's writings on systems, I am taking a shot at describing
power:
```

…followed by the rest of the original body, unchanged. Read `_posts/power.md` and copy everything after its frontmatter closing `---`.

- [ ] **Step 3: Write `src/pages/blog/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
---
<Base title="Writing · James Zhu">
  <h1 class="mt-8 font-serif text-4xl">Writing</h1>
  <ul class="mt-6 space-y-4">
    {posts.map((post) => (
      <li>
        <a class="text-xl underline" href={`/blog/${post.id}/`}>{post.data.title}</a>
        <p class="font-mono text-sm text-white/60">
          {post.data.date.toISOString().slice(0, 10)}
        </p>
      </li>
    ))}
  </ul>
  <p class="mt-8"><a class="underline" href="/">← Home</a></p>
</Base>
```

- [ ] **Step 4: Write `src/pages/blog/[...slug].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<Base title={`${post.data.title} · James Zhu`} description={post.data.description}>
  <article class="my-8">
    <h1 class="font-serif text-4xl">{post.data.title}</h1>
    <p class="mt-2 font-mono text-sm text-white/60">
      {post.data.date.toISOString().slice(0, 10)}
    </p>
    <div class="prose-invert mt-6 space-y-4 text-lg [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-white/40 [&_blockquote]:pl-4 [&_code]:font-mono [&_li]:ml-6 [&_li]:list-disc">
      <Content />
    </div>
  </article>
  <p class="mb-8"><a class="underline" href="/blog/">← Writing</a></p>
</Base>
```

- [ ] **Step 5: Build and verify**

Run: `bun run build && ls dist/blog/index.html dist/blog/power/index.html && grep -c 'Systems of Power' dist/blog/power/index.html`
Expected: build succeeds; both files listed; grep prints `1` or more.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/content/ src/pages/blog/
git commit -m "feat: add blog content collection and port power.md"
```

---

### Task 4: Photography page

**Files:**
- Create: `src/pages/photos.astro`, `src/assets/photos/.gitkeep`

**Interfaces:**
- Consumes: `Base.astro` from Task 2.
- Produces: `/photos/` route that auto-renders any image dropped into `src/assets/photos/` (jpg/jpeg/png/webp/avif) through `astro:assets` optimization; empty state until photos are added.

- [ ] **Step 1: Create the photos asset directory**

```bash
mkdir -p src/assets/photos && touch src/assets/photos/.gitkeep
```

- [ ] **Step 2: Write `src/pages/photos.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import Base from '../layouts/Base.astro';

const images = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    '../assets/photos/*.{jpg,jpeg,png,webp,avif}',
    { eager: true }
  )
).sort(([a], [b]) => a.localeCompare(b));
---
<Base title="Photography · James Zhu">
  <h1 class="mt-8 font-serif text-4xl">Photography</h1>
  {images.length === 0 ? (
    <p class="mt-6 text-lg text-white/60">Coming soon.</p>
  ) : (
    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map(([path, img]) => (
        <Image
          src={img.default}
          alt={path.split('/').pop()?.replace(/\.\w+$/, '') ?? 'photo'}
          widths={[480, 960]}
          sizes="(min-width: 640px) 50vw, 100vw"
          class="w-full rounded"
        />
      ))}
    </div>
  )}
  <p class="my-8"><a class="underline" href="/">← Home</a></p>
</Base>
```

- [ ] **Step 3: Build and verify**

Run: `bun run build && grep -c 'Coming soon' dist/photos/index.html`
Expected: build succeeds; grep prints `1` (empty state renders since no photos exist yet).

- [ ] **Step 4: Commit**

```bash
git add src/pages/photos.astro src/assets/
git commit -m "feat: add photography page with astro:assets grid"
```

---

### Task 5: GitHub Pages deploy workflow and Jekyll removal

**Files:**
- Create: `.github/workflows/deploy.yml`
- Move: `CNAME` → `public/CNAME`
- Delete: `404.html`, `Gemfile`, `Gemfile.lock`, `_config.yml`, `_posts/` (whole directory), `feedback.md`, `index.html`, `index.md`
- Modify: `.gitignore` (drop Jekyll section), `CLAUDE.md` (rewrite for new stack)

**Interfaces:**
- Consumes: the full working build from Tasks 1–4.
- Produces: the deployable repo state; pushing `master` builds `dist/` and publishes it to GitHub Pages.

- [ ] **Step 1: Move CNAME and delete Jekyll files**

```bash
git mv CNAME public/CNAME
git rm 404.html Gemfile Gemfile.lock _config.yml feedback.md index.html index.md
git rm -r _posts
```

- [ ] **Step 2: Replace `.gitignore` contents**

Replace the whole file with:

```gitignore
### Astro ###
node_modules/
dist/
.astro/
```

- [ ] **Step 3: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Rewrite `CLAUDE.md`**

Replace the whole file with:

```markdown
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
- Dotfiles at repo root (`.bashrc`, `.zshrc`, etc.) are unrelated to the site; leave them alone.
```

- [ ] **Step 5: Full build and final verification**

Run: `bun run build && ls dist/CNAME dist/keybase.txt dist/index.html dist/blog/power/index.html dist/photos/index.html dist/feedback/index.html && cat dist/CNAME`
Expected: build succeeds; all six paths listed; `cat` prints `www.jameszhu.io`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add GitHub Actions Pages deploy, remove Jekyll"
```

---

## Manual follow-ups (owner, not the executing agent)

1. In the GitHub repo settings → Pages, switch **Source** from "Deploy from a branch" to **"GitHub Actions"** (one-time; until then the old Jekyll build keeps serving).
2. Merge `feat/new` → `master` (via PR or directly) to trigger the first deploy; confirm https://www.jameszhu.io still resolves and https://www.jameszhu.io/keybase.txt is intact.
3. Follow-up phase (separate effort, not this plan): heavy custom visual design pass using the frontend-design skill; refreshed bio copy; real photos into `src/assets/photos/`; `/projects` page.
