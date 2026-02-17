# Moviez Backend

Python FastAPI backend for the Moviez streaming discovery platform. Proxies TMDB API and provides movie/TV endpoints.

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

API docs: http://localhost:8000/docs

## Endpoints

| Path | Description |
|------|-------------|
| `GET /health` | Health check |
| `GET /api/v1/movie/{id}` | Single movie details |
| `GET /api/v1/tv/{id}` | Single TV show details |
| `GET /api/v1/movies/popular` | Popular movies |
| `GET /api/v1/movies/top_rated` | Top rated movies |
| `GET /api/v1/movies/upcoming` | Upcoming movies |
| `GET /api/v1/tv/popular` | Popular TV shows |
| `GET /api/v1/tv/top_rated` | Top rated TV shows |
| `GET /api/v1/search?q=...` | Search (multi/movie/tv) |
| `GET /api/v1/trending/{type}/{window}` | Trending content |
