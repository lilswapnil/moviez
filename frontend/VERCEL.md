# Vercel Deployment

## Project structure

For combined frontend + backend deployment, the **Root Directory** must be set to `frontend` in Vercel Project Settings.

```
moviez/
├── vercel.json          # Vercel config (read from repo root)
├── frontend/            # Root Directory for deployment
│   ├── api/             # Python serverless functions (FastAPI)
│   │   └── v1/
│   │       └── [[...path]].py   # Handles all /api/v1/* routes
│   ├── backend/         # Copied during install (from ../backend)
│   ├── requirements.txt # Python deps for serverless
│   └── ...
└── backend/             # Original FastAPI app
```

## Request flow

| Request | Handler |
|---------|---------|
| `/`, `/browse/*`, etc. | Next.js (frontend) |
| `/api/deploy-config` | Next.js (diagnostic route) |
| `/api/v1/*` | Python serverless (FastAPI backend) |

## Environment variables

- `TMDB_API_KEY` (required) – TMDB API key for movie data
- Do **not** set `BACKEND_URL` for combined deploy

## Local development

```bash
# Terminal 1: Backend
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2: Frontend (set BACKEND_URL in .env for rewrites)
cd frontend && npm run dev
```
