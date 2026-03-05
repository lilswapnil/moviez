# Vercel Deployment

## Setup

1. **Set Root Directory to `frontend`** (Project Settings → General).

2. **Set environment variables** in Vercel:

   | Variable | Value |
   |----------|-------|
   | `TMDB_API_KEY` | Your TMDB API key ([get it free](https://www.themoviedb.org/settings/api)) |

3. **Optional – external backend**: If you deploy the Python backend (Railway, Render, etc.), add:
   - `BACKEND_URL` = your backend URL
   - `NEXT_PUBLIC_BACKEND_URL` = same value

   When set, rewrites proxy `/api/v1/*` to the backend. When unset, Next.js API routes call TMDB directly.
