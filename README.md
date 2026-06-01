# Shaun Leishman — UX/UI Portfolio

A research-led UX/UI portfolio built with Next.js, styled after [ljubomir.design](https://www.ljubomir.design), with visitor analytics and a Markdown blog for LinkedIn sharing.

## Features

- **Portfolio** — Case studies migrated from Notion (OMRON, NHS 111, Arbnco)
- **Blog** — Markdown posts in `src/content/blog/` for LinkedIn-friendly sharing
- **Analytics** — Private dashboard at `/admin` tracking pageviews, scroll depth, section attention, and exit pages
- **Accessibility** — Semantic HTML, skip links, ARIA accordions/tabs, focus states, reduced-motion support
- **Responsive** — Fluid typography scale and mobile-first layout

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Blog posts

Add a new `.md` file to `src/content/blog/`:

```markdown
---
title: "Your post title"
description: "Short summary for SEO and LinkedIn"
date: "2026-06-01"
published: true
tags: ["UX", "Research"]
---

Your content here...
```

## Analytics

Set `ADMIN_PASSWORD` in `.env.local`, then visit `/admin`.

Tracked events:
- Page views and unique sessions
- Scroll depth (25%, 50%, 75%, 100%)
- Section visibility (hero, featured work, skills, etc.)
- Exit pages

## Deploy

Recommended: [Vercel](https://vercel.com) connected to your GitHub repo. Set `ADMIN_PASSWORD` in environment variables.

> **Note:** File-based analytics storage works locally. For production, consider upgrading to a database (Turso, Supabase, etc.).

## Content to add

- [x] Profile photo (`/public/images/profile.png`)
- [x] Project screenshots and illustrations
- [x] CV page at `/cv`
- [x] LinkedIn URL (update `linkedIn` in `src/content/projects.ts`)
- [x] Email address (update `email` in `src/content/projects.ts`)
