## Moviez

Moviez is a Next.js application that surfaces curated film, TV, anime, and cartoon data from TMDB. It combines editorially featured content with drill-down discovery flows, genre-based browsing, and chart previews that load live metadata from the API.

### Highlights
- Featured banner that swaps between movies and TV shows with on-demand trailer playback.
- Library view with horizontally scrollable chart sections, section-level pagination, and preview cards.
- Dynamic genre routes for movies, shows, anime, and cartoons backed by server-side pagination APIs.
- Modular data-fetch layer in `lib/tmdb.ts` that consolidates all TMDB requests and image helpers.

### Tech Stack
- Next.js 16 (App Router, Server Components, Turbopack in dev)
- React 18 with TypeScript
- Tailwind CSS for layout and styling
- TMDB REST API for content data

### Prerequisites
- Node.js 18+ (project tested with the version shipped by `create-next-app`)
- npm (or pnpm/yarn if you prefer)
- TMDB API key with read access

### Local Setup
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Create `.env.local` in the project root and provide your TMDB key:
	 ```bash
	 TMDB_API_KEY=your_tmdb_api_key
	 ```
3. Start the development server:
	 ```bash
	 npm run dev
	 ```
4. Navigate to http://localhost:3000.

### Available Scripts
- `npm run dev` – start Turbopack dev server with hot reloading.
- `npm run build` – create an optimized production bundle.
- `npm run start` – serve the production build.
- `npm run lint` – run ESLint against the codebase.

### Project Structure (abridged)
```
app/
	components/        // Reusable UI building blocks (charts, featured banner, etc.)
	library/           // Library page with chart sections and pagination
	api/               // Next.js route handlers for data, genres, trailers
	genres/[type]/     // Dynamic genre browsing per content type
lib/
	tmdb.ts            // TMDB data-fetch utilities and types
	category.ts        // Category metadata and mappings
public/
	logo.svg           // Branding assets
```

### TMDB Usage
- All outbound requests originate from server components or API route handlers so the API key stays server-side.
- `lib/tmdb.ts` exposes helpers such as `getMovieTrailers`, `getTrendingMovies`, `getPopularAnimeShows`, and more.
- Client components rely on internal API routes (e.g., `/api/trailers`) when a client-side fetch is unavoidable.

### Testing & Quality
- `npm run lint` should pass cleanly before opening a PR.
- TypeScript types are enforced across server and client modules.

### Deployment Notes
- Provide `TMDB_API_KEY` within your hosting provider's environment variables.
- Run `npm run build` and `npm run start` (or deploy via Vercel) to host the production bundle.
