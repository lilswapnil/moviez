/**
 * Server-side TMDB client. Used by Next.js API routes when BACKEND_URL is not set.
 * Requires TMDB_API_KEY in environment.
 */
const TMDB_BASE = "https://api.themoviedb.org/3";

function getKey(): string | undefined {
  return process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
}

async function tmdbGet<T = unknown>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const key = getKey();
  if (!key) throw new Error("TMDB_API_KEY is not set");
  const searchParams = new URLSearchParams({
    api_key: key,
    language: "en-US",
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  const url = `${TMDB_BASE}${path}?${searchParams}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json() as Promise<T>;
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function tmdbNowPlaying(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/movie/now_playing", { page });
  return d.results || [];
}

export async function tmdbTrendingMovies(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/trending/movie/week", { page });
  return d.results || [];
}

export async function tmdbTopRatedMovies(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/movie/top_rated", { page });
  return d.results || [];
}

export async function tmdbPopularMovies(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/movie/popular", { page });
  return d.results || [];
}

export async function tmdbUpcomingMovies(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/movie/upcoming", { region: "US", page });
  const today = fmt(new Date());
  return ((d as { results?: { release_date?: string }[] }).results || []).filter(
    (m) => (m.release_date || "") >= today
  );
}

export async function tmdbPopularTv(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/tv/popular", { page });
  return d.results || [];
}

export async function tmdbTrendingTv(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/trending/tv/week", { page });
  return d.results || [];
}

export async function tmdbTopRatedTv(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/tv/top_rated", { page });
  return d.results || [];
}

export async function tmdbTvAiringToday(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/tv/airing_today", { page });
  return d.results || [];
}

export async function tmdbTvOnTheAir(page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/tv/on_the_air", { page });
  return d.results || [];
}

export async function tmdbUpcomingTv(page: number) {
  const today = fmt(new Date());
  const future = fmt(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
  const d = await tmdbGet<{ results: unknown[] }>("/discover/tv", {
    sort_by: "first_air_date.desc",
    "first_air_date.gte": today,
    "first_air_date.lte": future,
    include_adult: "false",
    include_null_first_air_dates: "false",
    page,
  });
  return (d as { results?: unknown[] }).results || [];
}

function discoverTvParams(chart: string, lang: string, includeKids: boolean, page: number): Record<string, string> {
  const today = fmt(new Date());
  const yearAgo = fmt(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const tenYearsAgo = fmt(new Date(Date.now() - 3650 * 24 * 60 * 60 * 1000));
  const params: Record<string, string> = {
    sort_by: "popularity.desc",
    with_genres: includeKids ? "16,10762" : "16",
    with_original_language: lang,
    include_adult: "false",
    include_null_first_air_dates: "false",
    page: String(page),
  };
  if (chart === "topRated" || chart === "classics") {
    params.sort_by = "vote_average.desc";
    params["vote_count.gte"] = chart === "classics" ? "500" : "200";
  }
  if (chart === "classics") params["first_air_date.lte"] = tenYearsAgo;
  else if (chart === "airingNow") {
    params["first_air_date.lte"] = today;
    params["first_air_date.gte"] = yearAgo;
  } else if (chart === "upcoming") params["first_air_date.gte"] = today;
  else if (chart === "family") {
    params.sort_by = "vote_average.desc";
    params["vote_count.gte"] = "100";
  } else if (chart === "kids") {
    params.sort_by = "popularity.desc";
    params["vote_count.gte"] = "50";
  }
  return params;
}

export async function tmdbAnime(chart: string, page: number) {
  const params = discoverTvParams(chart, "ja", false, page);
  const d = await tmdbGet<{ results: unknown[] }>("/discover/tv", params);
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbCartoon(chart: string, page: number) {
  const params = discoverTvParams(chart, "en", true, page);
  const d = await tmdbGet<{ results: unknown[] }>("/discover/tv", params);
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbKdrama(chart: string, page: number) {
  const today = fmt(new Date());
  const yearAgo = fmt(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const params: Record<string, string> = {
    with_genres: "18",
    with_origin_country: "KR",
    include_adult: "false",
    include_null_first_air_dates: "false",
    page: String(page),
  };
  if (chart === "topRated") {
    params.sort_by = "vote_average.desc";
    params["vote_count.gte"] = "100";
  } else if (chart === "upcoming") {
    params.sort_by = "first_air_date.desc";
    params["first_air_date.gte"] = today;
  } else if (chart === "airingNow") {
    params.sort_by = "first_air_date.desc";
    params["first_air_date.lte"] = today;
    params["first_air_date.gte"] = yearAgo;
  }
  const d = await tmdbGet<{ results: unknown[] }>("/discover/tv", params);
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbSearchMulti(query: string, page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/search/multi", { query, page, include_adult: "false" });
  return ((d as { results?: { media_type?: string; title?: string; name?: string }[] }).results || []).filter(
    (r) => ["movie", "tv"].includes(r.media_type || "") && (r.title || r.name)
  );
}

export async function tmdbMovieVideos(id: number) {
  const d = await tmdbGet<{ results: unknown[] }>(`/movie/${id}/videos`);
  const videos = ((d as { results?: { site?: string; type?: string; name?: string }[] }).results || []).filter(
    (v) => v.site === "YouTube"
  );
  const teasers = videos.filter((v) => v.type === "Teaser" || (v.name || "").toLowerCase().includes("teaser"));
  return teasers.length ? teasers : videos;
}

export async function tmdbTvVideos(id: number) {
  const d = await tmdbGet<{ results: unknown[] }>(`/tv/${id}/videos`);
  const videos = ((d as { results?: { site?: string; type?: string; name?: string }[] }).results || []).filter(
    (v) => v.site === "YouTube"
  );
  const teasers = videos.filter((v) => v.type === "Teaser" || (v.name || "").toLowerCase().includes("teaser"));
  return teasers.length ? teasers : videos;
}

export async function tmdbMovieImages(id: number) {
  return tmdbGet<Record<string, unknown>>(`/movie/${id}/images`, { include_image_language: "en,null" });
}

export async function tmdbTvImages(id: number) {
  return tmdbGet<Record<string, unknown>>(`/tv/${id}/images`, { include_image_language: "en,null" });
}

export async function tmdbMoviesByGenre(genreId: number, page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/discover/movie", { with_genres: genreId, page });
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbTvByGenre(genreId: number, page: number) {
  const d = await tmdbGet<{ results: unknown[] }>("/discover/tv", { with_genres: genreId, page });
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbSeason(tvId: number, seasonNumber: number) {
  return tmdbGet<{ episodes?: unknown[] }>(`/tv/${tvId}/season/${seasonNumber}`);
}

export async function tmdbMovie(id: number) {
  return tmdbGet<Record<string, unknown>>(`/movie/${id}`);
}

export async function tmdbTv(id: number) {
  return tmdbGet<Record<string, unknown>>(`/tv/${id}`);
}

export async function tmdbMovieCredits(id: number) {
  const d = await tmdbGet<{ cast: unknown[] }>(`/movie/${id}/credits`);
  return d.cast || [];
}

export async function tmdbTvCredits(id: number) {
  const d = await tmdbGet<{ cast: unknown[] }>(`/tv/${id}/credits`);
  return d.cast || [];
}

export async function tmdbMovieSimilar(id: number, page: number) {
  const d = await tmdbGet<{ results: unknown[] }>(`/movie/${id}/similar`, { page });
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbTvSimilar(id: number, page: number) {
  const d = await tmdbGet<{ results: unknown[] }>(`/tv/${id}/similar`, { page });
  return (d as { results?: unknown[] }).results || [];
}

export async function tmdbCollection(id: number) {
  return tmdbGet<Record<string, unknown>>(`/collection/${id}`);
}

export async function tmdbMovieWatchProviders(id: number, country: string) {
  const d = await tmdbGet<{ results?: Record<string, unknown> }>(`/movie/${id}/watch/providers`);
  return (d.results?.[country] as Record<string, unknown>) ?? null;
}

export async function tmdbTvWatchProviders(id: number, country: string) {
  const d = await tmdbGet<{ results?: Record<string, Record<string, unknown>> }>(`/tv/${id}/watch/providers`);
  return (d.results?.[country] as Record<string, unknown>) ?? null;
}
