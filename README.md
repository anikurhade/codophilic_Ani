# Anirudha Kurhade — Portfolio

The personal portfolio of Anirudha Kurhade, a Software Development Engineer focused on Generative AI, data engineering, backend architecture, and reliable enterprise systems.

The site uses an Obsidian and Sunset Amber visual system with motion-led interactions, a responsive skills grid, an interactive TransUnion experience timeline, a local AI profile assistant, project case studies, a Tech & Life blog, and a creative space for photography and writing.

## Stack

- Next.js 15 App Router with static export
- React 19 and TypeScript
- Tailwind CSS v4 through PostCSS
- Framer Motion for transitions, scroll reveals, and interaction
- Lenis for smooth scrolling
- Lucide React for interface icons
- MDX configuration and content sources for the blog architecture

## Project structure

```text
app/
  layout.tsx              Root layout, fonts, metadata, and smooth scrolling
  page.tsx                Homepage composition
  globals.css             Obsidian/Sunset design system and responsive styles
  blog/                   Blog index and statically generated article routes
  icon.svg                Portfolio favicon
components/
  Hero.tsx                Animated hero and interactive terminal visual
  PromptChallengeTerminal.tsx Resume authorization sandbox
  Bento.tsx               About, education, credentials, and principles
  SkillsGrid.tsx          Categorized technical skills
  ExperienceTimeline.tsx  TransUnion enterprise initiatives
  ProjectsBento.tsx       Architecture showcase cards
  AIChatDrawer.tsx        Slide-over Agentic Twin interface
  MediumInsights.tsx      Medium-style blog insight cards
  CreativeSpace.tsx       Photography, poetry, and running progress
  Navigation.tsx          Responsive site navigation
  SmoothScroll.tsx        Lenis client wrapper
content/
  *.mdx                   Blog content sources
public/img/
  Portfolio media and recognition assets
```

## Getting started

### Requirements

- Node.js 20 or newer
- npm

### Install and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # Start the local development server
npm run build     # Create and validate the static production export
npm run typecheck # Run TypeScript without emitting files
```

The production build writes the static export to `out/`.

## Content updates

- Homepage copy and section composition live in `app/page.tsx` and the component files under `components/`.
- Blog index metadata is in `app/blog/page.tsx`.
- Article route content is currently represented by structured article data in `app/blog/[slug]/page.tsx`; the `.mdx` files in `content/` are retained as the content source architecture for future MDX rendering.
- Images must be placed under `public/img/` and referenced with a root-relative path such as `/img/picture1.JPG`.

## Deployment

The project is configured with `output: "export"` in `next.config.ts`, so it can be hosted on GitHub Pages or any static hosting provider.

```bash
npm run build
```

Deploy the generated `out/` directory. For GitHub Pages, configure the repository’s deployment workflow or Pages source to publish that directory.

## Design tokens

The core palette is defined in `app/globals.css` and mirrored in `tailwind.config.ts`:

| Token | Value | Use |
| --- | --- | --- |
| Obsidian | `#09090b` | Page background |
| Matte Slate | `#18181b` | Cards and surfaces |
| Sunset Amber | `#f97316` | Primary interaction and emphasis |
| Soft Gold | `#fbbf24` | Technical highlights and secondary accents |

Inter is used for body copy and JetBrains Mono is used for technical labels, tags, and terminal details.

## Notes

- The AI assistant is currently a deterministic client-side profile assistant. It is a UI-ready shell for a future RAG or API integration; no external model request is made by the portfolio.
- Generated directories such as `.next/` and `out/` are intentionally ignored.
- Resume files and other personal documents are kept separate from the active application source.
