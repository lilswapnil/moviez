import { NextRequest, NextResponse } from "next/server";
import {
  tmdbTrendingMovies,
  tmdbTopRatedMovies,
  tmdbUpcomingMovies,
  tmdbNowPlaying,
  tmdbPopularMovies,
  tmdbTrendingTv,
  tmdbTopRatedTv,
  tmdbTvAiringToday,
  tmdbTvOnTheAir,
  tmdbPopularTv,
  tmdbAnime,
  tmdbCartoon,
} from "@/lib/api/tmdb-server";

const CHART_MAP: Record<string, (p: number) => Promise<unknown[]>> = {
  "trending-movies": tmdbTrendingMovies,
  "top-rated-movies": tmdbTopRatedMovies,
  "upcoming-movies": tmdbUpcomingMovies,
  "now-playing-movies": tmdbNowPlaying,
  "popular-movies": tmdbPopularMovies,
  "trending-tv-shows": tmdbTrendingTv,
  "top-rated-tv-shows": tmdbTopRatedTv,
  "airing-today": tmdbTvAiringToday,
  "on-the-air": tmdbTvOnTheAir,
  "popular-tv-shows": tmdbPopularTv,
  "popular-international-tv-shows": tmdbPopularTv,
  "top-rated-international-tv-shows": tmdbTopRatedTv,
  "upcoming-international-tv-shows": tmdbTvOnTheAir,
  "popular-anime": (p) => tmdbAnime("popular", p),
  "top-rated-anime": (p) => tmdbAnime("topRated", p),
  "airing-now": (p) => tmdbAnime("airingNow", p),
  "upcoming-anime": (p) => tmdbAnime("upcoming", p),
  "all-time-classics": (p) => tmdbAnime("classics", p),
  "popular-international-anime": (p) => tmdbAnime("popular", p),
  "top-rated-international-anime": (p) => tmdbAnime("topRated", p),
  "upcoming-international-anime": (p) => tmdbAnime("upcoming", p),
  "popular-cartoons": (p) => tmdbCartoon("popular", p),
  "top-rated-cartoons": (p) => tmdbCartoon("topRated", p),
  "kids-favorites": (p) => tmdbCartoon("kids", p),
  "family-friendly": (p) => tmdbCartoon("family", p),
  "popular-international-cartoons": (p) => tmdbCartoon("popular", p),
  "top-international-cartoons": (p) => tmdbCartoon("topRated", p),
  "upcoming-international": (p) => tmdbCartoon("upcoming", p),
  "popular-international-movies": tmdbPopularMovies,
  "top-rated-international-movies": tmdbTopRatedMovies,
  "upcoming-international-movies": tmdbUpcomingMovies,
};

function normalizeItem(item: Record<string, unknown>, fallback: string) {
  const title = (item.title as string) || (item.name as string) || "Untitled";
  const dateVal = (item.release_date as string) || (item.first_air_date as string);
  const year = dateVal && dateVal.length >= 4 ? parseInt(dateVal.slice(0, 4), 10) : undefined;
  const media = item.title ? "movie" : fallback;
  return {
    id: item.id,
    title,
    overview: (item.overview as string) || "",
    posterPath: item.poster_path,
    year,
    voteAverage: (item.vote_average as number) ?? 0,
    mediaType: media,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  if (!slug || !CHART_MAP[slug]) {
    return NextResponse.json({ error: "Unknown chart" }, { status: 404 });
  }

  try {
    const results = await CHART_MAP[slug](page);
    const category = slug.includes("movie") ? "movie" : "tv";
    const items = (results as Record<string, unknown>[]).map((r) => normalizeItem(r, category));
    return NextResponse.json({ items });
  } catch (e) {
    console.error("API charts error:", e);
    return NextResponse.json({ error: "TMDB_API_KEY required" }, { status: 503 });
  }
}
