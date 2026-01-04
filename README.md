# 🎬 Moviez

A modern streaming discovery platform built with Next.js that surfaces curated film, TV, anime, and cartoon content with live metadata from TMDB.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)

## ✨ Features

- **Featured Content**: Hero banner with trailer playback for new releases
- **Smart Discovery**: Browse content by genre, chart rankings, and trending popularity
- **Library View**: Horizontally scrollable chart sections with live pagination
- **Dynamic Routing**: Genre-based content discovery backed by server-side pagination APIs
- **Guest Mode**: Continue browsing without authentication
- **Responsive Design**: Beautiful glass-morphism UI that works on all devices
- **Fast Loading**: Server-side rendering with optimized Next.js patterns

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design system
- **Data Fetching**: TMDB REST API (server-side)
- **Build Tool**: Turbopack for fast dev/prod builds

## 📋 Prerequisites

- Node.js 18+ (tested with latest LTS)
- npm/pnpm/yarn
- TMDB API key (get it free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/lilswapnil/moviez.git
cd moviez
npm install
```

### 2. Configure Environment
Create `.env.local` in the project root:
```bash
TMDB_API_KEY=your_tmdb_api_key_here
```

See `.env.example` for all available options.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or [http://localhost:3005](http://localhost:3005) if port is in use)

## 📖 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Turbopack dev server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint checks |

## 📁 Project Structure

```
moviez/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth pages (account, login)
│   ├── (browse)/                # Content browsing (library, search, genres)
│   ├── (details)/               # Title detail pages
│   ├── api/v1/                  # Versioned API routes
│   └── globals.css              # Global styles
├── components/                  # Reusable UI components
│   ├── common/                  # Common components (Navbar, Footer)
│   ├── media/                   # Media-related components
│   ├── sections/                # Page sections (ChartSection, DataSection)
│   └── layout/                  # Layout wrappers
├── lib/                         # Shared utilities
│   ├── api/                     # TMDB API client
│   ├── constants/               # App constants (genres, charts)
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   └── services/                # Business logic services
├── public/                      # Static assets
└── package.json
```

## 🔌 API Usage

All TMDB requests are made server-side to keep your API key secure:

```typescript
// Server Component
import { getTopRatedMovies } from '@/lib/api/tmdb-client';

export default async function Library() {
  const movies = await getTopRatedMovies(1);
  return <MovieGrid movies={movies} />;
}

// Client-side via internal API routes
const response = await fetch('/api/v1/search?query=avatar');
const results = await response.json();
```

### Available Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/v1/data` | Fetch curated content charts |
| `/api/v1/search` | Search movies/shows |
| `/api/v1/genres` | Get available genres |
| `/api/v1/trailers` | Fetch trailer metadata |
| `/api/v1/charts` | Get chart previews |

## 🎨 Styling

The app uses Tailwind CSS v4 with a custom dark theme featuring:
- Glass-morphism effects
- Red accent colors
- Smooth animations and transitions
- Responsive grid layouts

Customize colors and variables in `app/globals.css`.

## 🔐 Environment Variables

```bash
# Required
TMDB_API_KEY=your_tmdb_api_key

# Optional
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_APP_NAME=Moviez
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t moviez .
docker run -p 3000:3000 -e TMDB_API_KEY=your_key moviez
```

### Manual (Node)
```bash
npm run build
npm run start
```

Set `TMDB_API_KEY` in your hosting provider's environment variables.

## 📊 Performance

- ⚡ Server-side rendering for fast initial load
- 🔄 Incremental static regeneration (ISR)
- 📦 Optimized bundle with code splitting
- 🖼️ Next.js Image optimization
- 🎯 Core Web Vitals optimized

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Community for feedback and contributions

## 📞 Support

- 📖 [Documentation](./docs)
- 🐛 [Report Issues](../../issues)
- 💬 [Discussions](../../discussions)
- 📧 [Email Support](mailto:support@moviez.local)

---

<div align="center">
  Made with ❤️ by the Moviez team | Discover your next favorite movie
</div>
