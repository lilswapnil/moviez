# Moviez

Moviez is a Next.js application that surfaces curated film, TV, anime, and cartoon data from TMDB. It combines editorially featured content with drill-down discovery flows, genre-based browsing, and chart previews that load live metadata from the API.

## Highlights
- Featured banner that swaps between movies and TV shows with on-demand trailer playback.
- Library view with horizontally scrollable chart sections, section-level pagination, and preview cards.
- Dynamic genre routes for movies, shows, anime, and cartoons backed by server-side pagination APIs.
- Modular data-fetch layer in `lib/tmdb.ts` that consolidates all TMDB requests and image helpers.

## Tech Stack
- Next.js 16 (App Router, Server Components, Turbopack in dev)
- React 18 with TypeScript
- Tailwind CSS for layout and styling
- TMDB REST API for content data

## Prerequisites
- Node.js 18+ (project tested with the version shipped by `create-next-app`)
- npm (or pnpm/yarn if you prefer)
- TMDB API key with read access

## Local Setup
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

## Available Scripts
- `npm run dev` – start Turbopack dev server with hot reloading.
- `npm run build` – create an optimized production bundle.
- `npm run start` – serve the production build.
- `npm run lint` – run ESLint against the codebase.

## Current Project Structure
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

## TMDB Usage
- All outbound requests originate from server components or API route handlers so the API key stays server-side.
- `lib/tmdb.ts` exposes helpers such as `getMovieTrailers`, `getTrendingMovies`, `getPopularAnimeShows`, and more.
- Client components rely on internal API routes (e.g., `/api/trailers`) when a client-side fetch is unavoidable.

## Testing & Quality
- `npm run lint` should pass cleanly before opening a PR.
- TypeScript types are enforced across server and client modules.

## Deployment Notes
- Provide `TMDB_API_KEY` within your hosting provider's environment variables.
- Run `npm run build` and `npm run start` (or deploy via Vercel) to host the production bundle.

---

# 🏗️ CODEBASE REFACTORING & RESTRUCTURING PLAN

> ⚠️ **NOTE**: This is a comprehensive refactoring plan document. No code changes have been made yet.

This document outlines a comprehensive refactoring strategy to restructure the Moviez application according to industry-standard best practices and modern Next.js architecture patterns.

## 📊 Current State Analysis

### ✅ Strengths
- Uses Next.js 16 with App Router (modern architecture)
- Server components for data fetching (performance-conscious)
- TypeScript for type safety
- Clear separation of data fetching (lib/) from UI (components/)
- Environment variable management for API keys
- Dynamic routing patterns

### ⚠️ Areas for Improvement
1. **File Organization**: Mixed concerns in components and lib folders
2. **Naming Inconsistencies**: JSX files lack .tsx extension (Navbar.jsx exists alongside Navbar.tsx)
3. **No Feature-Based Structure**: Components scattered without domain grouping
4. **Missing Layer Separation**: API logic, business logic, and UI concerns could be better isolated
5. **Utility Functions**: Types and helpers not organized by domain
6. **Missing Constants & Config**: Magic strings and configuration values scattered
7. **No Clear Dependency Direction**: Circular imports possible due to flat structure
8. **Missing Hooks Organization**: Custom hooks not in dedicated directory
9. **Testing Structure**: No test directory established
10. **Documentation**: No component documentation or JSDoc comments

---

## 🎯 Proposed Architecture Structure

### 1. New Directory Structure

```
moviez/
├── src/                                    # Source code root (NEW)
│   ├── app/                               # Next.js App Router
│   │   ├── layout.tsx                     # Root layout
│   │   ├── page.tsx                       # Home page
│   │   ├── not-found.tsx                  # 404 page
│   │   ├── error.tsx                      # Global error boundary (NEW)
│   │   ├── loading.tsx                    # Global loading state (NEW)
│   │   ├── globals.css                    # Global styles
│   │   │
│   │   ├── (auth)/                        # Route group for auth pages (NEW)
│   │   │   └── account/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (browse)/                      # Route group for content browsing (NEW)
│   │   │   ├── library/
│   │   │   │   └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   └── genres/
│   │   │       └── [type]/
│   │   │           └── [genre]/
│   │   │               └── page.tsx
│   │   │
│   │   ├── (details)/                     # Route group for detail pages (NEW)
│   │   │   └── title/
│   │   │       └── [type]/
│   │   │           └── [id]/
│   │   │               └── page.tsx
│   │   │
│   │   └── api/
│   │       ├── v1/                        # API versioning (NEW)
│   │       │   ├── search/
│   │       │   ├── charts/
│   │       │   ├── genres/
│   │       │   ├── trailers/
│   │       │   └── data/
│   │       └── health/                    # Health check endpoint (NEW)
│   │
│   ├── components/                        # Reusable UI components (presentational)
│   │   ├── common/                        # Common/utility components (NEW)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── layout/                        # Layout components (NEW)
│   │   │   ├── MainLayout.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── media/                         # Media-related components (NEW)
│   │   │   ├── FeaturedBanner.tsx         # Renamed from Featured.tsx
│   │   │   ├── MediaCard.tsx              # New component
│   │   │   ├── MediaGrid.tsx              # New component
│   │   │   ├── TrailerPlayer.tsx          # Extracted from FeaturedBanner
│   │   │   └── MediaCarousel.tsx
│   │   │
│   │   ├── sections/                      # Page section components (NEW)
│   │   │   ├── ChartSection.tsx
│   │   │   ├── DataSection.tsx
│   │   │   ├── GenreContent.tsx
│   │   │   ├── TitleHero.tsx
│   │   │   ├── TitleCastSection.tsx
│   │   │   └── SimilarTitles.tsx
│   │   │
│   │   └── search/                        # Search-specific components (NEW)
│   │       ├── SearchBar.tsx              # Extracted from Navbar
│   │       └── SearchResultsContent.tsx
│   │
│   ├── features/                          # Feature modules (domain-driven) (NEW)
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── HomeHero.tsx
│   │   │   │   └── HomeCharts.tsx         # From HomeCards.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useHomeData.ts
│   │   │   ├── types/
│   │   │   │   └── home.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── library/
│   │   │   ├── components/
│   │   │   │   ├── ChartPreviewRow.tsx
│   │   │   │   └── LibraryGrid.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useLibraryData.ts
│   │   │   ├── types/
│   │   │   │   └── library.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── search/
│   │   │   ├── components/
│   │   │   │   └── SearchFilters.tsx      # New component
│   │   │   ├── hooks/
│   │   │   │   └── useSearch.ts
│   │   │   ├── types/
│   │   │   │   └── search.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── genre/
│   │   │   ├── components/
│   │   │   │   └── GenreGrid.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useGenreData.ts
│   │   │   ├── types/
│   │   │   │   └── genre.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── title/
│   │   │   ├── components/
│   │   │   │   ├── TitleDetails.tsx
│   │   │   │   └── CastList.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useTitleDetails.ts
│   │   │   ├── types/
│   │   │   │   └── title.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── account/
│   │       ├── components/
│   │       │   └── AccountSettings.tsx
│   │       ├── hooks/
│   │       │   └── useAccount.ts
│   │       ├── types/
│   │       │   └── account.types.ts
│   │       └── index.ts
│   │
│   ├── lib/                               # Shared utilities and helpers
│   │   ├── api/                           # API integration layer (NEW)
│   │   │   ├── tmdb-client.ts             # Refactored from tmdb.ts
│   │   │   ├── tmdb-types.ts              # Types from tmdb.ts
│   │   │   ├── tmdb-transformers.ts       # Data transformation
│   │   │   └── api-error.ts               # Error handling
│   │   │
│   │   ├── hooks/                         # Shared custom hooks (NEW)
│   │   │   ├── usePagination.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── constants/                     # Application constants (NEW)
│   │   │   ├── genres.const.ts            # From category.ts
│   │   │   ├── charts.const.ts            # From charts.ts
│   │   │   ├── api.const.ts
│   │   │   └── app.const.ts
│   │   │
│   │   ├── types/                         # Shared type definitions (NEW)
│   │   │   ├── common.ts
│   │   │   ├── media.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── utils/                         # Utility functions (NEW)
│   │   │   ├── image.ts                   # From tmdb.ts
│   │   │   ├── formatting.ts
│   │   │   ├── validation.ts
│   │   │   ├── date.ts
│   │   │   ├── charts-mapping.ts          # From charts.ts
│   │   │   └── chart-slugs.ts             # From chartSlugs.ts
│   │   │
│   │   ├── services/                      # Business logic services (NEW)
│   │   │   ├── search.service.ts
│   │   │   ├── chart.service.ts
│   │   │   ├── genre.service.ts
│   │   │   └── recommendation.service.ts
│   │   │
│   │   └── config/                        # Configuration files (NEW)
│   │       ├── tmdb.config.ts
│   │       ├── app.config.ts
│   │       └── environment.ts
│   │
│   └── styles/                            # Global and shared styles (NEW)
│       ├── globals.css
│       ├── variables.css
│       └── animations.css
│
├── public/
│   ├── logo.svg
│   ├── icons/                             # Icon assets (NEW)
│   └── images/                            # Image assets (NEW)
│
├── tests/                                 # Test files (NEW)
│   ├── unit/
│   │   ├── utils/
│   │   ├── services/
│   │   └── hooks/
│   ├── integration/
│   └── e2e/
│
├── .env.example                           # Example environment file (NEW)
├── .env.local                             # Local environment (GITIGNORED)
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📝 File Renaming Strategy

### Components Directory
| Current | New | Reason |
|---------|-----|--------|
| `Navbar.jsx` | `components/common/Navbar.tsx` | Consolidate JSX duplicate, use .tsx |
| `Navbar.tsx` | ❌ Remove | Eliminate duplicate |
| `Featured.tsx` | `components/media/FeaturedBanner.tsx` | More descriptive, organized by domain |
| `DataSection.tsx` | `components/sections/DataSection.tsx` | Organize by component type |
| `ChartSection.tsx` | `components/sections/ChartSection.tsx` | Organize by component type |
| `ChartPreviewRow.tsx` | `features/library/components/ChartPreviewRow.tsx` | Move to feature module |
| `GenreContent.tsx` | `components/sections/GenreContent.tsx` | Organize by component type |
| `HomeCards.tsx` | `features/home/components/HomeCharts.tsx` | Rename & move to feature |
| `TitleHero.tsx` | `components/sections/TitleHero.tsx` | Organize by component type |
| `TitleCastSection.tsx` | `components/sections/TitleCastSection.tsx` | Organize by component type |
| `SimilarTitles.tsx` | `components/sections/SimilarTitles.tsx` | Organize by component type |
| `SearchResultsContent.tsx` | `features/search/components/SearchResultsContent.tsx` | Move to feature module |

### Lib Directory
| Current | New | Reason |
|---------|-----|--------|
| `tmdb.ts` | `lib/api/tmdb-client.ts` + `lib/api/tmdb-types.ts` | Separate types from impl |
| `category.ts` | `lib/constants/genres.const.ts` | More specific naming |
| `charts.ts` | Split into `lib/utils/charts-mapping.ts` + `lib/constants/charts.const.ts` + `lib/services/chart.service.ts` | Split by concerns |
| `chartSlugs.ts` | `lib/utils/chart-slugs.ts` | Organize in utils |

### API Routes
| Current | New | Reason |
|---------|-----|--------|
| `api/charts/route.ts` | `api/v1/charts/route.ts` | Add API versioning |
| `api/data/route.ts` | `api/v1/data/route.ts` | Add API versioning |
| `api/genres/route.ts` | `api/v1/genres/route.ts` | Add API versioning |
| `api/search/route.ts` | `api/v1/search/route.ts` | Add API versioning |
| `api/trailers/route.ts` | `api/v1/trailers/route.ts` | Add API versioning |
| (NEW) | `api/health/route.ts` | Health check endpoint |

---

## 🏛️ Code Organization Principles

### Feature-Based Structure
- Each major feature (home, search, library, etc.) is self-contained in `features/`
- Each feature has: components, hooks, types, and index file
- Features export a public API via index.ts

### Layered Architecture
```
Presentation Layer (components/)
    ↓
Feature Layer (features/)
    ↓
Business Logic Layer (lib/services/)
    ↓
Data Access Layer (lib/api/)
    ↓
External Services (TMDB API)
```

### Separation of Concerns
- **Components**: Presentational, reusable UI elements
- **Features**: Feature-specific logic and components
- **Services**: Business logic and data orchestration
- **API**: External API integration
- **Utils**: Pure utility functions
- **Constants**: Configuration and constant values

### File Naming Conventions
- React Components: `PascalCase.tsx` (e.g., `FeaturedBanner.tsx`)
- Custom Hooks: `camelCase.ts` with `use` prefix (e.g., `useHomeData.ts`)
- Utilities/Services: `camelCase.ts` (e.g., `image.ts`, `search.service.ts`)
- Constants: `camelCase.const.ts` (e.g., `genres.const.ts`)
- Types: `camelCase.ts` (e.g., `home.types.ts`) or `camelCase.d.ts`

### Index Files
- Each feature and major directory exports public API via `index.ts`
- Improves IDE autocomplete and clarity of public interfaces

---

## 🔤 Type System Improvements

### Centralized Type Definitions
```typescript
// lib/types/media.ts
export interface BaseMedia {
  id: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
}

export interface Movie extends BaseMedia {
  title: string;
  release_date: string;
  runtime?: number;
}

export interface TVShow extends BaseMedia {
  name: string;
  first_air_date: string;
  number_of_seasons?: number;
}

export type Anime = TVShow & { is_anime: true };
export type Cartoon = TVShow & { is_cartoon: true };

export type MediaType = 'movie' | 'tv' | 'anime' | 'cartoon';
export type AnyMedia = Movie | TVShow | Anime | Cartoon;
```

### Feature-Specific Types
- Each feature has its own `types/` directory
- Feature types extend or compose base types
- Local types don't leak into other features

---

## 🔧 Service Layer Architecture

### Chart Service
```typescript
// lib/services/chart.service.ts
export class ChartService {
  async getChartData(chartName: string, page: number = 1) {
    const fetcher = chartFetchers[chartName];
    if (!fetcher) throw new Error(`Unknown chart: ${chartName}`);
    
    const data = await fetcher(page);
    return normalizeChartItems(data);
  }
}

export const chartService = new ChartService();
```

### Search Service
```typescript
// lib/services/search.service.ts
export class SearchService {
  async search(query: string, filters?: SearchFilters, page: number = 1) {
    // Implementation with caching, filtering logic
  }
  
  async getSearchSuggestions(query: string) {
    // Implementation for autocomplete
  }
}

export const searchService = new SearchService();
```

### Recommendation Service
```typescript
// lib/services/recommendation.service.ts
export class RecommendationService {
  async getSimilarTitles(id: number, type: MediaType) {
    // Get similar content
  }
  
  async getRelatedGenres(genreIds: number[]) {
    // Genre relationships
  }
}

export const recommendationService = new RecommendationService();
```

---

## 📡 API Client Refactoring

### API Client Structure
```typescript
// lib/api/tmdb-client.ts
export class TMDBClient {
  private static instance: TMDBClient;
  
  static getInstance(): TMDBClient {
    if (!TMDBClient.instance) {
      TMDBClient.instance = new TMDBClient();
    }
    return TMDBClient.instance;
  }
  
  movies = {
    trending: (page?: number) => this.fetch('/movie/trending', { page }),
    topRated: (page?: number) => this.fetch('/movie/top_rated', { page }),
    upcoming: (page?: number) => this.fetch('/movie/upcoming', { page }),
  };
  
  tvShows = {
    trending: (page?: number) => this.fetch('/tv/trending', { page }),
    topRated: (page?: number) => this.fetch('/tv/top_rated', { page }),
  };
  
  search = {
    multi: (query: string, page?: number) => 
      this.fetch('/search/multi', { query, page }),
    movies: (query: string, page?: number) => 
      this.fetch('/search/movie', { query, page }),
  };
}

export const tmdbClient = TMDBClient.getInstance();
```

---

## 🪝 Hooks Organization

### Shared Hooks
```typescript
// lib/hooks/usePagination.ts
export function usePagination(initialPage: number = 1) {
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  return { page, setPage, hasMore, setHasMore };
}

// lib/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number = 500): T {
  // Implementation
}
```

### Feature Hooks
```typescript
// features/search/hooks/useSearch.ts
export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Implementation
  return { query, setQuery, results, loading };
}
```

---

## 🎯 Constants & Configuration

### Genre Constants
```typescript
// lib/constants/genres.const.ts
export const GENRE_CONFIGS: Record<MediaType, { genres: string[]; genreIds: Record<string, number> }> = {
  movie: {
    genres: ['Action', 'Adventure', 'Animation', ...],
    genreIds: { 'Action': 28, 'Adventure': 12, ... }
  },
  tv: { ... },
  anime: { ... },
  cartoon: { ... }
};

export function getGenres(mediaType: MediaType): string[] {
  return GENRE_CONFIGS[mediaType].genres;
}
```

### API Configuration
```typescript
// lib/config/tmdb.config.ts
export const TMDB_CONFIG = {
  apiKey: process.env.TMDB_API_KEY,
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p',
  imageSizes: {
    poster: 'w342',
    backdrop: 'w1280',
    profile: 'w185'
  },
  cache: {
    defaultRevalidate: 3600
  }
} as const;
```

---

## ❌ Error Handling

### API Error Handling
```typescript
// lib/api/api-error.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'APIError';
  }
  
  isNotFound(): boolean {
    return this.statusCode === 404;
  }
  
  isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
```

### Global Error Boundary
```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <button onClick={reset}>Try again</button>
      </div>
    </div>
  );
}
```

---

## 🧪 Testing Structure

### Test Organization
```
tests/
├── unit/
│   ├── utils/
│   ├── services/
│   └── hooks/
├── integration/
│   ├── api/
│   └── features/
└── e2e/
    ├── home.e2e.test.ts
    ├── search.e2e.test.ts
    └── library.e2e.test.ts
```

### Testing Dependencies (to add)
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "vitest": "^1.0.0"
  }
}
```

---

## 📚 Documentation Standards

### Component Documentation
```typescript
/**
 * FeaturedBanner
 * 
 * A prominent banner that showcases featured content with trailer playback.
 * Automatically rotates between items and displays metadata.
 * 
 * @component
 * @example
 * const movies = await getNewReleases();
 * return <FeaturedBanner movies={movies} />
 */
export default function FeaturedBanner({ movies, shows }: FeaturedBannerProps) {
  // Implementation
}
```

---

## 🎨 CSS Organization

### CSS Variables
```css
/* styles/variables.css */
:root {
  --color-primary: #ffe8ab;
  --color-primary-hover: #ff6b6b;
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text: #ffffff;
  
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
}
```

---

## 🚀 Migration Path

### Phase 1: Foundation (Weeks 1-2)
- [ ] Create new src/ directory structure
- [ ] Set up feature modules with empty components
- [ ] Create service layer foundation
- [ ] Configure path aliases in tsconfig.json

### Phase 2: API Layer (Week 3)
- [ ] Refactor `lib/tmdb.ts` into `lib/api/tmdb-client.ts`
- [ ] Create API error handling
- [ ] Implement API client singleton pattern
- [ ] Add backward compatibility layer

### Phase 3: Components (Week 4)
- [ ] Migrate components to new structure
- [ ] Remove duplicate files (Navbar.jsx)
- [ ] Extract shared logic into hooks
- [ ] Update import paths

### Phase 4: Services & Utils (Week 5)
- [ ] Implement service layer (chart, search, etc.)
- [ ] Organize utilities and constants
- [ ] Create feature-specific hooks
- [ ] Add JSDoc comments

### Phase 5: Testing & Polish (Week 6)
- [ ] Add unit tests for utilities and services
- [ ] Add integration tests for features
- [ ] Update documentation
- [ ] Performance optimization

### Phase 6: Deployment (Week 7)
- [ ] QA and testing
- [ ] Deploy to staging/production
- [ ] Remove old directory structure

---

## 📦 Dependencies to Add

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "vitest": "^1.0.0",
    "prettier": "^3.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0"
  },
  "dependencies": {
    "zod": "^3.22.0",
    "zustand": "^4.4.0",
    "swr": "^2.2.0"
  }
}
```

---

## ⚙️ Configuration Updates

### tsconfig.json Paths
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

### .env.example
```bash
TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_APP_NAME=Moviez
NEXT_PUBLIC_APP_DESCRIPTION=A movie discovery app
```

---

## ✅ Code Quality Standards

### ESLint Configuration
```javascript
// eslint.config.mjs
import eslintConfig from 'eslint-config-next';

export default [
  {
    ...eslintConfig,
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabeticalOrder: true,
      }],
    },
  },
];
```

---

## 📥 Import Patterns

### Do's ✅
```typescript
// Absolute imports with path aliases
import { formatDate } from '@/lib/utils/date';
import { useSearch } from '@/features/search/hooks/useSearch';
import { tmdbClient } from '@/lib/api/tmdb-client';

// Grouped imports
import { useState, useEffect } from 'react';
import Image from 'next/image';
```

### Don'ts ❌
```typescript
// Relative imports with many levels
import { formatDate } from '../../../lib/utils/date';

// Importing internals from other features
import SearchResultsContent from '@/features/search/components/SearchResultsContent';

// Circular imports
```

---

## 📋 Naming Conventions Summary

| Item | Convention | Example |
|------|-----------|---------|
| Components (React) | PascalCase | `FeaturedBanner.tsx` |
| Hooks | camelCase + `use` | `useHomeData.ts` |
| Services | camelCase + `.service.ts` | `search.service.ts` |
| Utilities | camelCase | `formatting.ts` |
| Constants | camelCase + `.const.ts` | `genres.const.ts` |
| Types | camelCase + `.types.ts` | `search.types.ts` |
| Config files | camelCase + `.config.ts` | `tmdb.config.ts` |
| Directories | kebab-case or camelCase | `components/`, `lib/api/` |
| Classes | PascalCase | `class TMDBClient {}` |

---

## 💎 Benefits

✅ **Scalability**: Feature-based structure scales with team growth
✅ **Maintainability**: Clear separation of concerns
✅ **Testability**: Service layer easier to unit test
✅ **Code Reuse**: Shared hooks and utilities reduce duplication
✅ **IDE Support**: Better autocomplete and type checking
✅ **Onboarding**: New developers understand structure quickly
✅ **Performance**: Service layer enables caching
✅ **Type Safety**: Centralized types prevent inconsistencies
✅ **Documentation**: Clear structure self-documents

---

## 🎯 Summary

This refactoring plan transforms the Moviez codebase from a flat structure to an industry-standard, scalable architecture following Next.js best practices. The migration can be done incrementally without breaking existing functionality.

The new structure supports:
- Better code organization and maintenance
- Feature-based development workflow
- Improved testing capabilities
- Clearer dependency management
- Enhanced type safety
- Easier onboarding for new team members
