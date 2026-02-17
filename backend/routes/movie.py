"""Single movie/title endpoints."""
from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter()
TMDB_BASE = "https://api.themoviedb.org/3"
API_KEY = os.getenv("TMDB_API_KEY")


@router.get("/movie/{movie_id}")
async def get_movie(movie_id: int):
    """Fetch a single movie by ID from TMDB."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/movie/{movie_id}",
            params={"api_key": API_KEY},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()


@router.get("/tv/{tv_id}")
async def get_tv(tv_id: int):
    """Fetch a single TV show by ID from TMDB."""
    if not API_KEY:
        raise HTTPException(status_code=500, detail="TMDB_API_KEY not configured")
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TMDB_BASE}/tv/{tv_id}",
            params={"api_key": API_KEY},
        )
        if r.status_code != 200:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        return r.json()
