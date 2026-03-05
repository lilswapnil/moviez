"""Recommendations endpoint - semantic search over TMDB charts using TF-IDF."""
import math
import re
from fastapi import APIRouter, HTTPException

from pydantic import BaseModel
from tmdb_proxy import (
    get_trending_movies,
    get_top_rated_movies,
    get_popular_movies,
    get_now_playing,
    get_trending_tv,
    get_top_rated_tv,
    get_tv_airing_today,
    get_upcoming_tv,
)

router = APIRouter()

STOP_WORDS = frozenset({
    "a", "an", "the", "and", "or", "but", "if", "then", "so", "because", "as",
    "of", "to", "for", "from", "in", "on", "at", "by", "with", "without",
    "is", "are", "was", "were", "be", "been", "being", "it", "this", "that",
    "these", "those", "he", "she", "they", "we", "you", "i", "me", "my",
    "our", "your", "their", "his", "her", "its",
})


def _normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9\s]+", " ", text.lower())).strip()


def _tokenize(text: str) -> list[str]:
    if not text:
        return []
    return [t for t in _normalize_text(text).split() if len(t) > 2 and t not in STOP_WORDS]


def _extract_min_vote(prompt: str) -> float | None:
    m = re.search(r"imdb:\s*(\d+(?:\.\d+)?)", prompt, re.I)
    return float(m.group(1)) if m else None


def _build_tf(tokens: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for t in tokens:
        counts[t] = counts.get(t, 0) + 1
    return counts


def _build_idf(docs: list[list[str]]) -> dict[str, float]:
    n = len(docs)
    df: dict[str, int] = {}
    for tokens in docs:
        for t in set(tokens):
            df[t] = df.get(t, 0) + 1
    return {t: math.log((n + 1) / (c + 1)) + 1 for t, c in df.items()}


def _tfidf_vector(tf: dict[str, int], idf: dict[str, float]) -> dict[str, float]:
    return {t: idf.get(t, 0) * c for t, c in tf.items() if idf.get(t, 0) * c > 0}


def _cosine_sim(a: dict[str, float], b: dict[str, float]) -> float:
    if not a or not b:
        return 0.0
    dot = sum(a.get(t, 0) * b.get(t, 0) for t in a)
    norm_a = sum(v * v for v in a.values()) ** 0.5
    norm_b = sum(v * v for v in b.values()) ** 0.5
    return dot / (norm_a * norm_b) if norm_a and norm_b else 0.0


def _build_query_text(prompt: str) -> str:
    stripped = re.sub(r"imdb:\s*\d+(?:\.\d+)?", "", prompt, flags=re.I).strip()
    quoted = " ".join(re.findall(r'"([^"]+)"', prompt))
    return f"{stripped} {quoted}".strip()


def _norm_movie(item: dict) -> dict:
    return {
        "id": item.get("id"),
        "title": item.get("title") or "Untitled",
        "overview": item.get("overview") or "",
        "poster_path": item.get("poster_path"),
        "backdrop_path": item.get("backdrop_path"),
        "vote_average": item.get("vote_average") or 0,
        "popularity": item.get("popularity") or 0,
        "score": 0,
        "kind": "movie",
    }


def _norm_show(item: dict) -> dict:
    return {
        "id": item.get("id"),
        "title": item.get("name") or item.get("title") or "Untitled",
        "overview": item.get("overview") or "",
        "poster_path": item.get("poster_path"),
        "backdrop_path": item.get("backdrop_path"),
        "vote_average": item.get("vote_average") or 0,
        "popularity": item.get("popularity") or 0,
        "score": 0,
        "kind": "show",
    }


class RecommendationRequest(BaseModel):
    prompt: str = ""
    type: str = "movie"
    limit: int = 15


@router.post("/recommendations")
async def get_recommendations(body: RecommendationRequest):
    """Semantic recommendations based on natural language prompt."""
    prompt = (body.prompt or "").strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="prompt is required")

    limit = max(1, min(50, body.limit))
    media_type = "show" if body.type == "show" else "movie"

    # Fetch candidates
    if media_type == "show":
        top, airing, upcoming = await get_top_rated_tv(1), await get_tv_airing_today(1), await get_upcoming_tv(1)
        raw = list(top) + list(airing) + list(upcoming)
        items = [_norm_show(r) for r in raw]
    else:
        trend, top, pop, now = (
            await get_trending_movies(1),
            await get_top_rated_movies(1),
            await get_popular_movies(1),
            await get_now_playing(1),
        )
        raw = list(trend) + list(top) + list(pop) + list(now)
        items = [_norm_movie(r) for r in raw]

    # Dedupe by id
    seen: set[int] = set()
    unique = []
    for x in items:
        if x["id"] and x["id"] not in seen:
            seen.add(x["id"])
            unique.append(x)

    min_vote = _extract_min_vote(prompt)
    if min_vote is not None:
        unique = [x for x in unique if (x.get("vote_average") or 0) >= min_vote]

    query_text = _build_query_text(prompt)
    query_tokens = _tokenize(query_text)

    if not query_tokens:
        unique.sort(key=lambda x: (-(x.get("vote_average") or 0), -(x.get("popularity") or 0)))
        return {
            "recommendations": unique[:limit],
            "meta": {"prompt": prompt, "type": media_type, "limit": limit},
        }

    docs = [_tokenize(f"{x.get('title', '')} {x.get('overview', '')}") for x in unique]
    idf = _build_idf(docs)
    qvec = _tfidf_vector(_build_tf(query_tokens), idf)

    scored = []
    for i, item in enumerate(unique):
        dvec = _tfidf_vector(_build_tf(docs[i]), idf)
        score = _cosine_sim(qvec, dvec)
        scored.append({**item, "score": score})

    scored = [x for x in scored if x["score"] > 0]
    scored.sort(key=lambda x: (-x["score"], -(x.get("vote_average") or 0)))

    return {
        "recommendations": scored[:limit],
        "meta": {"prompt": prompt, "type": media_type, "limit": limit},
    }
