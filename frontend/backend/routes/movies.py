"""Movies/list endpoints - proxying TMDB discover endpoints."""
from fastapi import APIRouter, HTTPException, Query
import httpx
import os

router = APIRouter()
TMDB_BASE = "https://api.themoviedb.org/3"
API_KEY = os.getenv("TMDB_API_KEY")


@router.get("/movies/popular")
async def get_popular_movies(page: int = Query(1, ge=1)):
    """Fetch popular movies."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/movie/popular",
            params={"api_key": API_KEY, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/movies/top_rated")
async def get_top_rated_movies(page: int = Query(1, ge=1)):
    """Fetch top rated movies."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/movie/top_rated",
            params={"api_key": API_KEY, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/movies/upcoming")
async def get_upcoming_movies(page: int = Query(1, ge=1)):
    """Fetch upcoming movies."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/movie/upcoming",
            params={"api_key": API_KEY, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/tv/popular")
async def get_popular_shows(page: int = Query(1, ge=1)):
    """Fetch popular TV shows."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/tv/popular",
            params={"api_key": API_KEY, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/tv/top_rated")
async def get_top_rated_shows(page: int = Query(1, ge=1)):
    """Fetch top rated TV shows."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/tv/top_rated",
            params={"api_key": API_KEY, "page": page},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()
