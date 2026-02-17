"""Data endpoint - matches frontend /api/v1/data."""
from fastapi import APIRouter, HTTPException, Query

from tmdb_proxy import (
    get_now_playing,
    get_popular_movies,
    get_top_rated_movies,
    get_trending_movies,
    get_upcoming_movies,
    get_popular_tv,
    get_top_rated_tv,
    get_trending_tv,
    get_tv_airing_today,
    get_tv_on_the_air,
    get_upcoming_tv,
    get_anime,
    get_cartoon,
    get_kdrama,
)

router = APIRouter()

CATEGORY_MAP = {
    ("movies", "top"): lambda p: get_top_rated_movies(p),
    ("movies", "trending"): lambda p: get_trending_movies(p),
    ("movies", "upcoming"): lambda p: get_upcoming_movies(p),
    ("movies", "on_air"): lambda p: get_now_playing(p),
    ("movies", "international"): lambda p: get_popular_movies(p),
    ("movies", "popular"): lambda p: get_popular_movies(p),
    ("shows", "top"): lambda p: get_top_rated_tv(p),
    ("shows", "popular"): lambda p: get_popular_tv(p),
    ("shows", "trending"): lambda p: get_trending_tv(p),
    ("shows", "airing_today"): lambda p: get_tv_airing_today(p),
    ("shows", "upcoming"): lambda p: get_upcoming_tv(p),
    ("shows", "on_air"): lambda p: get_tv_on_the_air(p),
    ("shows", "anime_top"): lambda p: get_anime("topRated", p),
    ("shows", "anime_upcoming"): lambda p: get_anime("upcoming", p),
    ("shows", "anime_on_air"): lambda p: get_anime("airingNow", p),
    ("shows", "cartoon_top"): lambda p: get_cartoon("topRated", p),
    ("shows", "cartoon_upcoming"): lambda p: get_cartoon("upcoming", p),
    ("shows", "cartoon_on_air"): lambda p: get_cartoon("airingNow", p),
    ("shows", "kdrama_top"): lambda p: get_kdrama("topRated", p),
    ("shows", "kdrama_upcoming"): lambda p: get_kdrama("upcoming", p),
    ("shows", "kdrama_on_air"): lambda p: get_kdrama("airingNow", p),
}


@router.get("/data")
async def get_data(
    type: str = Query(...),
    category: str = Query(...),
    page: int = Query(1, ge=1),
):
    key = (type, category)
    fetcher = CATEGORY_MAP.get(key)
    if not fetcher:
        return []
    try:
        data = await fetcher(page)
        return data if isinstance(data, list) else (data.get("results", []) if isinstance(data, dict) else [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
