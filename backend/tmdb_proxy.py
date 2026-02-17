"""TMDB API proxy - all endpoints used by the frontend."""
import os
from datetime import datetime, timedelta
from urllib.parse import urlencode

import httpx

TMDB_BASE = "https://api.themoviedb.org/3"
API_KEY = os.getenv("TMDB_API_KEY")


def _fmt(d: datetime) -> str:
    return d.strftime("%Y-%m-%d")


async def _get(path: str, params: dict | None = None) -> dict | list:
    p = dict(params or {})
    p["api_key"] = API_KEY
    p.setdefault("language", "en-US")
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{TMDB_BASE}{path}", params=p)
        if r.status_code != 200:
            raise httpx.HTTPStatusError(f"TMDB error: {r.status_code}", request=r.request, response=r)
        return r.json()


async def _discover_tv(params: dict) -> list:
    p = {"include_adult": "false", "include_null_first_air_dates": "false", **params}
    data = await _get("/discover/tv", p)
    return data.get("results", [])


async def get_now_playing(page: int = 1) -> list:
    data = await _get("/movie/now_playing", {"page": page})
    return data.get("results", [])


async def get_trending_movies(page: int = 1) -> list:
    data = await _get("/trending/movie/week", {"page": page})
    return data.get("results", [])


async def get_top_rated_movies(page: int = 1) -> list:
    data = await _get("/movie/top_rated", {"page": page})
    return data.get("results", [])


async def get_popular_movies(page: int = 1) -> list:
    data = await _get("/movie/popular", {"page": page})
    return data.get("results", [])


async def get_upcoming_movies(page: int = 1) -> list:
    data = await _get("/movie/upcoming", {"region": "US", "page": page})
    today = _fmt(datetime.now())
    results = data.get("results", [])
    return [m for m in results if m.get("release_date", "") >= today]


async def get_popular_tv(page: int = 1) -> list:
    data = await _get("/tv/popular", {"page": page})
    return data.get("results", [])


async def get_trending_tv(page: int = 1) -> list:
    data = await _get("/trending/tv/week", {"page": page})
    return data.get("results", [])


async def get_top_rated_tv(page: int = 1) -> list:
    data = await _get("/tv/top_rated", {"page": page})
    return data.get("results", [])


async def get_tv_airing_today(page: int = 1) -> list:
    data = await _get("/tv/airing_today", {"page": page})
    return data.get("results", [])


async def get_tv_on_the_air(page: int = 1) -> list:
    data = await _get("/tv/on_the_air", {"page": page})
    return data.get("results", [])


async def get_upcoming_tv(page: int = 1) -> list:
    today = _fmt(datetime.now())
    future = _fmt(datetime.now() + timedelta(days=365))
    return await _discover_tv({
        "sort_by": "first_air_date.desc",
        "first_air_date.gte": today,
        "first_air_date.lte": future,
        "page": page,
    })


def _animation_chart(chart: str, lang: str, include_kids: bool, page: int) -> dict:
    params = {
        "sort_by": "popularity.desc",
        "with_genres": "16,10762" if include_kids else "16",
        "with_original_language": lang,
        "page": page,
    }
    today = _fmt(datetime.now())
    year_ago = _fmt(datetime.now() - timedelta(days=365))
    if chart == "popular":
        params["sort_by"] = "popularity.desc"
    elif chart == "topRated":
        params["sort_by"] = "vote_average.desc"
        params["vote_count.gte"] = "200"
    elif chart == "airingNow":
        params["first_air_date.lte"] = today
        params["first_air_date.gte"] = year_ago
    elif chart == "upcoming":
        params["first_air_date.gte"] = today
    elif chart == "classics":
        params["sort_by"] = "vote_average.desc"
        params["vote_count.gte"] = "500"
        params["first_air_date.lte"] = _fmt(datetime.now() - timedelta(days=3650))
    elif chart == "family":
        params["sort_by"] = "vote_average.desc"
        params["vote_count.gte"] = "100"
    elif chart == "kids":
        params["sort_by"] = "popularity.desc"
        params["vote_count.gte"] = "50"
    return params


async def get_animation_shows(chart: str, lang: str, include_kids: bool, page: int = 1) -> list:
    params = _animation_chart(chart, lang, include_kids, page)
    return await _discover_tv(params)


async def get_anime(chart: str, page: int = 1) -> list:
    return await get_animation_shows(chart, "ja", False, page)


async def get_cartoon(chart: str, page: int = 1) -> list:
    return await get_animation_shows(chart, "en", True, page)


async def get_kdrama(chart: str, page: int = 1) -> list:
    today = _fmt(datetime.now())
    year_ago = _fmt(datetime.now() - timedelta(days=365))
    params = {
        "with_genres": "18",
        "with_origin_country": "KR",
        "include_adult": "false",
        "include_null_first_air_dates": "false",
        "page": page,
    }
    if chart == "topRated":
        params["sort_by"] = "vote_average.desc"
        params["vote_count.gte"] = "100"
    elif chart == "upcoming":
        params["sort_by"] = "first_air_date.desc"
        params["first_air_date.gte"] = today
    elif chart == "airingNow":
        params["sort_by"] = "first_air_date.desc"
        params["first_air_date.lte"] = today
        params["first_air_date.gte"] = year_ago
    return await _discover_tv(params)


async def search_multi(query: str, page: int = 1) -> list:
    data = await _get("/search/multi", {"query": query, "page": page, "include_adult": "false"})
    results = data.get("results", [])
    return [r for r in results if r.get("media_type") in ("movie", "tv") and (r.get("title") or r.get("name"))]


async def get_movie_details(movie_id: int) -> dict | None:
    try:
        return await _get(f"/movie/{movie_id}")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return None
        raise


async def get_tv_details(tv_id: int) -> dict | None:
    try:
        return await _get(f"/tv/{tv_id}")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return None
        raise


async def get_movie_credits(movie_id: int) -> list:
    data = await _get(f"/movie/{movie_id}/credits")
    return data.get("cast", [])


async def get_tv_credits(tv_id: int) -> list:
    data = await _get(f"/tv/{tv_id}/credits")
    return data.get("cast", [])


async def get_movie_similar(movie_id: int, page: int = 1) -> list:
    data = await _get(f"/movie/{movie_id}/similar", {"page": page})
    return data.get("results", [])


async def get_tv_similar(tv_id: int, page: int = 1) -> list:
    data = await _get(f"/tv/{tv_id}/similar", {"page": page})
    return data.get("results", [])


async def get_movie_watch_providers(movie_id: int, country: str = "US") -> dict | None:
    data = await _get(f"/movie/{movie_id}/watch/providers")
    return data.get("results", {}).get(country)


async def get_tv_watch_providers(tv_id: int, country: str = "US") -> dict | None:
    data = await _get(f"/tv/{tv_id}/watch/providers")
    return data.get("results", {}).get(country)


async def get_collection(collection_id: int) -> dict | None:
    try:
        return await _get(f"/collection/{collection_id}")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return None
        raise


async def get_season(tv_id: int, season_number: int) -> dict | None:
    try:
        return await _get(f"/tv/{tv_id}/season/{season_number}")
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return None
        raise


async def get_movie_videos(movie_id: int) -> list:
    data = await _get(f"/movie/{movie_id}/videos")
    videos = data.get("results", [])
    youtube = [v for v in videos if v.get("site") == "YouTube"]
    teasers = [v for v in youtube if (v.get("type") == "Teaser") or ("teaser" in (v.get("name") or "").lower())]
    return teasers if teasers else youtube


async def get_tv_videos(tv_id: int) -> list:
    data = await _get(f"/tv/{tv_id}/videos")
    videos = data.get("results", [])
    youtube = [v for v in videos if v.get("site") == "YouTube"]
    teasers = [v for v in youtube if (v.get("type") == "Teaser") or ("teaser" in (v.get("name") or "").lower())]
    return teasers if teasers else youtube


async def get_movies_by_genre(genre_id: int, page: int = 1) -> list:
    data = await _get("/discover/movie", {"with_genres": genre_id, "page": page})
    return data.get("results", [])


async def get_tv_by_genre(genre_id: int, page: int = 1) -> list:
    data = await _get("/discover/tv", {"with_genres": genre_id, "page": page})
    return data.get("results", [])
