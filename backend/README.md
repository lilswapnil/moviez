# Moviez Backend

Python FastAPI backend that proxies all TMDB API calls. The frontend proxies `/api/v1/*` to this backend so the TMDB API key stays secure server-side.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # or: .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and add your TMDB API key.

## Run

```bash
uvicorn main:app --reload --port 8000
```

**Required:** The frontend must have the backend running. Set `BACKEND_URL=http://localhost:8000` in the frontend `.env.local` (or it defaults to that).

API docs: http://localhost:8000/docs

## Endpoints (matching frontend /api/v1/*)

| Path | Description |
|------|-------------|
| `GET /health` | Health check |
| `GET /api/v1/data` | Charts by type/category (movies, shows, anime, cartoons, kdrama) |
| `GET /api/v1/search` | Search (returns normalized items) |
| `GET /api/v1/trailers` | Movie/TV trailers |
| `GET /api/v1/charts` | Chart data by slug |
| `GET /api/v1/genres` | Content by genre |
| `GET /api/v1/episodes` | TV season episodes |
| `GET /api/v1/movie/{id}` | Movie details |
| `GET /api/v1/tv/{id}` | TV show details |
| `GET /api/v1/movie/{id}/credits` | Movie credits |
| `GET /api/v1/tv/{id}/credits` | TV credits |
| `GET /api/v1/movie/{id}/similar` | Similar movies |
| `GET /api/v1/tv/{id}/similar` | Similar TV shows |
| `GET /api/v1/movie/{id}/watch/providers` | Streaming providers |
| `GET /api/v1/tv/{id}/watch/providers` | Streaming providers |
| `GET /api/v1/collection/{id}` | Collection details |
| `GET /api/v1/tv/{id}/season/{n}` | Season episodes |
