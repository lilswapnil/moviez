"""TMDB proxy/search endpoints."""
from fastapi import APIRouter, HTTPException, Query
import httpx
import os

router = APIRouter()
TMDB_BASE = "https://api.themoviedb.org/3"
API_KEY = os.getenv("TMDB_API_KEY")


@router.get("/search")
async def search(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    type: str = Query("multi", description="multi, movie, tv, person"),
):
    """Search TMDB by query."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/search/{type}",
            params={"api_key": API_KEY, "query": q, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/search/movie")
async def search_movies(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
):
    """Search movies only."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/search/movie",
            params={"api_key": API_KEY, "query": q, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/search/tv")
async def search_tv(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
):
    """Search TV shows only."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/search/tv",
            params={"api_key": API_KEY, "query": q, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/trending/{media_type}/{time_window}")
async def get_trending(
    media_type: str,
    time_window: str,
):
    """Fetch trending content from TMDB."""
    if media_type not in ("movie", "tv", "person", "all"):
        raise HTTPException(status_code=400, detail="media_type must be movie, tv, person, or all")
    if time_window not in ("day", "week"):
        raise HTTPException(status_code=400, detail="time_window must be day or week")
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/trending/{media_type}/{time_window}",
            params={"api_key": API_KEY},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/genre/{media_type}/list")
async def get_genres(media_type: str):
    """Fetch genre list for movies or tv."""
    if media_type not in ("movie", "tv"):
        raise HTTPException(status_code=400, detail="media_type must be movie or tv")
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/genre/{media_type}/list",
            params={"api_key": API_KEY},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()
