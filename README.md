# Anirudha Kurhade — Portfolio

The personal portfolio of Anirudha Kurhade, a Software Development Engineer focused on Generative AI, data engineering, backend architecture, and reliable enterprise systems.

The site uses an Obsidian and Sunset Amber visual system with motion-led interactions, a responsive skills grid, an interactive TransUnion experience timeline, a local AI profile assistant, project case studies, a Tech & Life blog, and a creative space for photography and writing.

## Stack

- Next.js 15 App Router with server routes
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
  CreativeGallery.tsx     Photography, poetry, and running progress
  SpotifyWidget.tsx       Live Spotify now-playing widget
app/api/
  spotify/route.ts        Server-side Spotify now-playing integration
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
npm run build     # Create and validate the production build
npm run typecheck # Run TypeScript without emitting files
```

The application now requires a server-capable Next.js deployment for live API routes.

### Spotify integration

Create a Spotify developer application and add these server-only environment variables to `.env.local` or your deployment provider:

```env
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
```

The refresh token is never exposed to the browser. If credentials are absent, invalid, or no track is playing, the widget falls back to “Last seen listening to Mohammed Rafi”.

For local authorization, register this exact URI in the Spotify Developer Dashboard:

```text
http://127.0.0.1:3000/api/spotify/callback
```

Then run the app locally and open `http://127.0.0.1:3000/api/spotify/login`. The OAuth setup routes are intentionally disabled in production, and the callback validates a short-lived CSRF state cookie before exchanging the authorization code. Copy the returned refresh token into the server-only `SPOTIFY_REFRESH_TOKEN` environment variable, then add it to Vercel. Never deploy the setup routes as a public token-generation mechanism.

## Content updates

- Homepage copy and section composition live in `app/page.tsx` and the component files under `components/`.
- Blog index metadata is in `app/blog/page.tsx`.
- Article route content is currently represented by structured article data in `app/blog/[slug]/page.tsx`; the `.mdx` files in `content/` are retained as the content source architecture for future MDX rendering.
- Images must be placed under `public/img/` and referenced with a root-relative path such as `/img/picture1.JPG`.

## Deployment

The project uses server-side Next.js routes for live Spotify data, so deploy it to Vercel, Railway, Render, or another Node-compatible host. GitHub Pages can still host a static-only version, but it cannot execute `app/api/spotify/route.ts`.

```bash
npm run build
npm run start
```

Configure the three Spotify environment variables in the deployment provider before starting the application.

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
