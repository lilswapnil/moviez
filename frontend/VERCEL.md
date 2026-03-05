# Vercel Deployment

## Setup

1. **Set Root Directory to `frontend`** (Project Settings → General).

2. **Deploy the backend separately** on [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io), then set:

   | Variable | Value |
   |----------|-------|
   | `BACKEND_URL` | Your backend URL (e.g. `https://moviez-api.railway.app`) |
   | `NEXT_PUBLIC_BACKEND_URL` | Same as `BACKEND_URL` |

3. Set `TMDB_API_KEY` in your backend's platform (not in Vercel).

## Note

Running the Python backend as Vercel serverless functions exceeds the Lambda bundle size limit (~250 MB). Deploy the backend as a separate service instead.
