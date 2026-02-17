"""Charts endpoint - matches frontend /api/v1/charts."""
from fastapi import APIRouter, HTTPException, Query

from tmdb_proxy import (
    get_trending_movies,
    get_top_rated_movies,
    get_upcoming_movies,
    get_now_playing,
    get_popular_movies,
    get_trending_tv,
    get_top_rated_tv,
    get_tv_airing_today,
    get_tv_on_the_air,
    get_popular_tv,
    get_anime,
    get_cartoon,
)

router = APIRouter()

# Slug -> fetcher (returns list of movie/tv items)
CHART_FETCHERS = {
    "trending-movies": get_trending_movies,
    "top-rated-movies": get_top_rated_movies,
    "upcoming-movies": get_upcoming_movies,
    "now-playing-movies": get_now_playing,
    "popular-movies": get_popular_movies,
    "trending-tv-shows": get_trending_tv,
    "top-rated-tv-shows": get_top_rated_tv,
    "airing-today": get_tv_airing_today,
    "on-the-air": get_tv_on_the_air,
    "popular-tv-shows": get_popular_tv,
    "popular-international-tv-shows": get_popular_tv,
    "top-rated-international-tv-shows": get_top_rated_tv,
    "upcoming-international-tv-shows": get_tv_on_the_air,
    "popular-anime": lambda p: get_anime("popular", p),
    "top-rated-anime": lambda p: get_anime("topRated", p),
    "airing-now": lambda p: get_anime("airingNow", p),
    "upcoming-anime": lambda p: get_anime("upcoming", p),
    "all-time-classics": lambda p: get_anime("classics", p),
    "popular-international-anime": lambda p: get_anime("popular", p),
    "top-rated-international-anime": lambda p: get_anime("topRated", p),
    "upcoming-international-anime": lambda p: get_anime("upcoming", p),
    "popular-cartoons": lambda p: get_cartoon("popular", p),
    "top-rated-cartoons": lambda p: get_cartoon("topRated", p),
    "kids-favorites": lambda p: get_cartoon("kids", p),
    "family-friendly": lambda p: get_cartoon("family", p),
    "popular-international-cartoons": lambda p: get_cartoon("popular", p),
    "top-international-cartoons": lambda p: get_cartoon("topRated", p),
    "upcoming-international": lambda p: get_cartoon("upcoming", p),
    "popular-international-movies": get_popular_movies,
    "top-rated-international-movies": get_top_rated_movies,
    "upcoming-international-movies": get_upcoming_movies,
}


def _normalize_item(item: dict, fallback: str) -> dict:
    title = item.get("title") or item.get("name") or "Untitled"
    date_val = item.get("release_date") or item.get("first_air_date")
    year = int(date_val[:4]) if date_val and len(date_val) >= 4 else None
    media = "movie" if "title" in item and item.get("title") else fallback
    return {
        "id": item.get("id"),
        "title": title,
        "overview": item.get("overview", "") or "",
        "posterPath": item.get("poster_path"),
        "year": year,
        "voteAverage": item.get("vote_average") or 0,
        "mediaType": media,
    }


def _get_category(slug: str) -> str:
    if "movie" in slug:
        return "movie"
    if any(x in slug for x in ["anime", "cartoon", "tv"]):
        return "tv"
    return "movie"


@router.get("/charts")
async def get_charts(
    slug: str = Query(...),
    page: int = Query(1, ge=1),
):
    fetcher = CHART_FETCHERS.get(slug)
    if not fetcher:
        raise HTTPException(status_code=404, detail="Unknown chart")
    try:
        results = await fetcher(page)
        category = _get_category(slug)
        items = [_normalize_item(r, category) for r in results]
        return {"items": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
