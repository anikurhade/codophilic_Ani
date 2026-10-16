# Anirudha Kurhade — Portfolio

The personal portfolio of Anirudha Kurhade, a Java, Spring Boot, and distributed systems engineer focused on enterprise modernization, high-volume data pipelines, and practical AI tools.

The site uses an Obsidian and Sunset Amber visual system with motion-led interactions, a responsive skills grid, a reversibly filtered TransUnion experience timeline, an LLM-backed Agentic Twin, project case studies, a Tech & Life blog, and a creative space for photography and writing.

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
  ExperienceTimeline.tsx  Reversibly hidden TransUnion experience timeline
  ProjectsBento.tsx       Data-driven project architecture showcase
  AIChatDrawer.tsx        Slide-over Agentic Twin chat interface
  MediumInsights.tsx      Medium-style blog insight cards
  CreativeGallery.tsx     Photography, poetry, and running progress
  SpotifyWidget.tsx       Live Spotify now-playing widget
app/api/
  spotify/route.ts        Server-side Spotify now-playing integration
  Navigation.tsx          Responsive site navigation
  SmoothScroll.tsx        Lenis client wrapper
content/
  portfolio.ts            Shared identity, education, milestones, stack, and experience data
  agentic-twin.ts         Prompt/context assembled from portfolio, projects, and blog data
  fun-facts.ts            Rotating, conversation-aware Agentic Twin facts
  blogs.ts                Blog metadata and full article content
  projects.ts             Project case studies and visibility flags
  shayari.ts              Homepage verses and creative gallery poetry
supabase/
  migrations/             Supabase schema and row-level security policies
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

### Agentic Twin

Set `GROQ_API_KEY` in `.env.local` or the deployment environment to enable the streamed Agentic Twin chat. Without the key, `/api/chat` responds with an explicit configuration error. The prompt is assembled from `content/portfolio.ts`, `content/projects.ts`, and `content/blogs.ts`; update those typed data sources to keep the assistant synchronized with the site. Two randomized facts are selected for each request, with recently mentioned facts excluded where possible. The browser sends the recent conversation history so follow-up questions retain context.

### Spotify integration

Create a Spotify developer application and add these server-only environment variables to `.env.local` or your deployment provider:

```env
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
SPOTIFY_REFRESH_TOKEN=your-refresh-token
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
```

The refresh token is never exposed to the browser. The homepage footer signal bar shows the live track or recent track; without credentials, it presents a curated Mohammed Rafi and high-focus synth listening status.

For local authorization, register this exact URI in the Spotify Developer Dashboard:

```text
http://127.0.0.1:3000/api/spotify/callback
```

Then run the app locally and open `http://127.0.0.1:3000/api/spotify/login`. The OAuth setup routes are intentionally disabled in production, and the callback validates a short-lived CSRF state cookie before exchanging the authorization code. Copy the returned refresh token into the server-only `SPOTIFY_REFRESH_TOKEN` environment variable, then add it to Vercel. Never deploy the setup routes as a public token-generation mechanism.

## Content updates

- Homepage copy and section composition live in `app/page.tsx` and the component files under `components/`.
- Projects, blog metadata/article bodies, and shayari are stored in typed data files under `content/`.
- Set `visible` in `content/projects.ts` to restore the temporarily hidden Bhasha-Token or Nexus Deep-Context RAG cards. In `components/ExperienceTimeline.tsx`, each experience has its own `visible` flag; the orchestration entry is temporarily hidden while the other timeline entries remain available.
- Homepage blog cards and the blog dashboard link directly to statically generated article routes. Each article includes related posts and a comments widget.
- Images must be placed under `public/img/` and referenced with a root-relative path such as `/img/gallery-mountain-trail.jpeg`.

### Blog comments

Comments use the Supabase REST API. Create a Supabase project, run both SQL migrations in `supabase/migrations/`, and set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and a random `COMMENTS_RATE_LIMIT_SECRET` of at least 32 characters in `.env.local` and deployment settings. Keep the service-role key and rate-limit secret server-only. The API enforces five submissions per client IP per 15 minutes, limits reads to 100 approved comments, and places all new comments in moderation. The service-role key is used only server-side to submit comments; public roles can read approved comments but cannot insert or inspect pending comments. Approve a comment from the Supabase SQL editor with `update public.blog_comments set is_approved = true where id = '<comment-uuid>';`.

The AttentionLens card links to its architecture article because no public project repository or demo URL is configured.

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
