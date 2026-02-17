"""TMDB proxy routes - trailers, search, genres, episodes, title details."""
from fastapi import APIRouter, HTTPException, Query

from tmdb_proxy import (
    search_multi,
    get_movie_videos,
    get_tv_videos,
    get_movies_by_genre,
    get_tv_by_genre,
    get_season,
    get_movie_details,
    get_tv_details,
    get_movie_credits,
    get_tv_credits,
    get_movie_similar,
    get_tv_similar,
    get_movie_watch_providers,
    get_tv_watch_providers,
    get_collection,
)

router = APIRouter()


def _normalize_search_item(item: dict) -> dict:
    title = item.get("title") or item.get("name") or "Untitled"
    date_val = item.get("release_date") or item.get("first_air_date")
    year = int(date_val[:4]) if date_val and len(date_val) >= 4 else None
    media = "movie" if item.get("media_type") == "movie" else "tv"
    return {
        "id": item.get("id"),
        "title": title,
        "overview": item.get("overview", "") or "",
        "posterPath": item.get("poster_path"),
        "year": year,
        "voteAverage": item.get("vote_average") or 0,
        "mediaType": media,
    }


@router.get("/search")
async def search(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
):
    results = await search_multi(q, page)
    items = [_normalize_search_item(r) for r in results]
    return {"items": items}


@router.get("/trailers")
async def trailers(
    type: str = Query(..., description="movie, tv, anime, or cartoon"),
    item_id: int = Query(..., alias="id"),
):
    if type == "movie":
        results = await get_movie_videos(item_id)
    else:
        results = await get_tv_videos(item_id)
    return {"results": results}


@router.get("/genres")
async def genres(
    type: str = Query(...),
    genreId: int = Query(...),
    page: int = Query(1, ge=1),
):
    if type == "movies":
        results = await get_movies_by_genre(genreId, page)
    elif type == "shows":
        results = await get_tv_by_genre(genreId, page)
    else:
        return []
    return results


@router.get("/episodes")
async def episodes(
    tvId: int = Query(...),
    seasonNumber: int = Query(...),
):
    data = await get_season(tvId, seasonNumber)
    if not data:
        return {"episodes": []}
    episodes = [
        {
            "id": ep.get("id"),
            "episode_number": ep.get("episode_number"),
            "name": ep.get("name"),
            "still_path": ep.get("still_path"),
            "overview": ep.get("overview"),
            "air_date": ep.get("air_date"),
            "vote_average": ep.get("vote_average"),
        }
        for ep in data.get("episodes", [])
    ]
    return {"episodes": episodes}


# Title details - for server-side fetching (used via fetch from Next.js or direct)
@router.get("/movie/{movie_id}")
async def movie_details(movie_id: int):
    data = await get_movie_details(movie_id)
    if not data:
        raise HTTPException(status_code=404, detail="Movie not found")
    return data


@router.get("/tv/{tv_id}")
async def tv_details(tv_id: int):
    data = await get_tv_details(tv_id)
    if not data:
        raise HTTPException(status_code=404, detail="TV show not found")
    return data


@router.get("/movie/{movie_id}/credits")
async def movie_credits(movie_id: int):
    return {"cast": await get_movie_credits(movie_id)}


@router.get("/tv/{tv_id}/credits")
async def tv_credits(tv_id: int):
    return {"cast": await get_tv_credits(tv_id)}


@router.get("/movie/{movie_id}/similar")
async def movie_similar(movie_id: int, page: int = Query(1, ge=1)):
    results = await get_movie_similar(movie_id, page)
    return {"results": results}


@router.get("/tv/{tv_id}/similar")
async def tv_similar(tv_id: int, page: int = Query(1, ge=1)):
    results = await get_tv_similar(tv_id, page)
    return {"results": results}


@router.get("/movie/{movie_id}/watch/providers")
async def movie_watch_providers(movie_id: int, country: str = Query("US")):
    data = await get_movie_watch_providers(movie_id, country)
    return {"results": {country: data} if data else {}}


@router.get("/tv/{tv_id}/watch/providers")
async def tv_watch_providers(tv_id: int, country: str = Query("US")):
    data = await get_tv_watch_providers(tv_id, country)
    return {"results": {country: data} if data else {}}


@router.get("/collection/{collection_id}")
async def collection_details(collection_id: int):
    data = await get_collection(collection_id)
    if not data:
        raise HTTPException(status_code=404, detail="Collection not found")
    return data


@router.get("/tv/{tv_id}/season/{season_number}")
async def season_details(tv_id: int, season_number: int):
    data = await get_season(tv_id, season_number)
    if not data:
        raise HTTPException(status_code=404, detail="Season not found")
    return data
