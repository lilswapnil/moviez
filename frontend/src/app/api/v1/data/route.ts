import { NextRequest, NextResponse } from "next/server";
import {
  tmdbNowPlaying,
  tmdbTrendingMovies,
  tmdbTopRatedMovies,
  tmdbUpcomingMovies,
  tmdbPopularMovies,
  tmdbPopularTv,
  tmdbTrendingTv,
  tmdbTopRatedTv,
  tmdbTvAiringToday,
  tmdbTvOnTheAir,
  tmdbUpcomingTv,
  tmdbAnime,
  tmdbCartoon,
  tmdbKdrama,
} from "@/lib/api/tmdb-server";

const DATA_MAP: Record<string, (p: number) => Promise<unknown[]>> = {
  "movies,top": tmdbTopRatedMovies,
  "movies,trending": tmdbTrendingMovies,
  "movies,upcoming": tmdbUpcomingMovies,
  "movies,on_air": tmdbNowPlaying,
  "movies,international": tmdbPopularMovies,
  "movies,popular": tmdbPopularMovies,
  "shows,top": tmdbTopRatedTv,
  "shows,popular": tmdbPopularTv,
  "shows,trending": tmdbTrendingTv,
  "shows,airing_today": tmdbTvAiringToday,
  "shows,upcoming": tmdbUpcomingTv,
  "shows,on_air": tmdbTvOnTheAir,
  "shows,anime_top": (p) => tmdbAnime("topRated", p),
  "shows,anime_upcoming": (p) => tmdbAnime("upcoming", p),
  "shows,anime_on_air": (p) => tmdbAnime("airingNow", p),
  "shows,cartoon_top": (p) => tmdbCartoon("topRated", p),
  "shows,cartoon_upcoming": (p) => tmdbCartoon("upcoming", p),
  "shows,cartoon_on_air": (p) => tmdbCartoon("airingNow", p),
  "shows,kdrama_top": (p) => tmdbKdrama("topRated", p),
  "shows,kdrama_upcoming": (p) => tmdbKdrama("upcoming", p),
  "shows,kdrama_on_air": (p) => tmdbKdrama("airingNow", p),
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const key = type && category ? `${type},${category}` : "";
  const fetcher = DATA_MAP[key];
  if (!fetcher) return NextResponse.json([]);

  try {
    const data = await fetcher(page);
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (e) {
    console.error("API data error:", e);
    return NextResponse.json({ error: "TMDB_API_KEY required" }, { status: 503 });
  }
}
