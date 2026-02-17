/**
 * Server-side TMDB fetcher. Uses TMDB_API_KEY or TMDB_BEARER_TOKEN.
 * Only use in API routes and RSC - never import in client components.
 */
const TMDB_BASE = 'https://api.themoviedb.org/3';
const token = process.env.TMDB_BEARER_TOKEN;
const apiKey = process.env.TMDB_API_KEY;

if (!token && !apiKey) {
  console.warn('[tmdb-server] TMDB_BEARER_TOKEN or TMDB_API_KEY not set. TMDB requests will fail.');
}

function getAuthHeaders(): HeadersInit {
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

function buildParams(extra: Record<string, string | number> = {}): URLSearchParams {
  const p = new URLSearchParams();
  if (!token && apiKey) p.set('api_key', apiKey);
  p.set('language', 'en-US');
  Object.entries(extra).forEach(([k, v]) => p.set(k, String(v)));
  return p;
}

async function tmdbGet(path: string, params: Record<string, string | number> = {}): Promise<unknown> {
  const p = buildParams(params);
  const url = `${TMDB_BASE}${path.startsWith('/') ? path : `/${path}`}${p.toString() ? `?${p}` : ''}`;
  const r = await fetch(url, { headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`TMDB ${r.status}: ${await r.text()}`);
  return r.json();
}

async function getResults(path: string, params: Record<string, string | number> = {}): Promise<unknown[]> {
  const data = (await tmdbGet(path, params)) as { results?: unknown[] };
  return data.results ?? [];
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

// Movies
export async function getNowPlaying(page = 1) {
  return getResults('/movie/now_playing', { page });
}
export async function getTrendingMovies(page = 1) {
  return getResults('/trending/movie/week', { page });
}
export async function getTopRatedMovies(page = 1) {
  return getResults('/movie/top_rated', { page });
}
export async function getPopularMovies(page = 1) {
  return getResults('/movie/popular', { page });
}
export async function getUpcomingMovies(page = 1) {
  const data = (await tmdbGet('/movie/upcoming', { region: 'US', page })) as { results?: { release_date?: string }[] };
  const results = data.results ?? [];
  const today = fmt(new Date());
  return results.filter((m) => ((m.release_date as string) ?? '') >= today);
}

// TV
export async function getPopularTV(page = 1) {
  return getResults('/tv/popular', { page });
}
export async function getTrendingTV(page = 1) {
  return getResults('/trending/tv/week', { page });
}
export async function getTopRatedTV(page = 1) {
  return getResults('/tv/top_rated', { page });
}
export async function getTVAiringToday(page = 1) {
  return getResults('/tv/airing_today', { page });
}
export async function getTVOnTheAir(page = 1) {
  return getResults('/tv/on_the_air', { page });
}
export async function getUpcomingTV(page = 1) {
  const today = fmt(new Date());
  const future = fmt(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
  return getResults('/discover/tv', {
    sort_by: 'first_air_date.desc',
    'first_air_date.gte': today,
    'first_air_date.lte': future,
    page,
    include_adult: 'false',
    include_null_first_air_dates: 'false',
  });
}

// Animation (anime, cartoon, kdrama)
function animationParams(chart: string, lang: string, includeKids: boolean, page: number): Record<string, string | number> {
  const params: Record<string, string | number> = {
    sort_by: 'popularity.desc',
    with_genres: includeKids ? '16,10762' : '16',
    with_original_language: lang,
    page,
    include_adult: 'false',
    include_null_first_air_dates: 'false',
  };
  const today = fmt(new Date());
  const yearAgo = fmt(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  if (chart === 'topRated') {
    params.sort_by = 'vote_average.desc';
    params['vote_count.gte'] = '200';
  } else if (chart === 'popular') {
    params.sort_by = 'popularity.desc';
  } else if (chart === 'airingNow') {
    params['first_air_date.lte'] = today;
    params['first_air_date.gte'] = yearAgo;
  } else if (chart === 'upcoming') {
    params['first_air_date.gte'] = today;
  } else if (chart === 'classics') {
    params.sort_by = 'vote_average.desc';
    params['vote_count.gte'] = '500';
    params['first_air_date.lte'] = fmt(new Date(Date.now() - 3650 * 24 * 60 * 60 * 1000));
  } else if (chart === 'family') {
    params.sort_by = 'vote_average.desc';
    params['vote_count.gte'] = '100';
  } else if (chart === 'kids') {
    params.sort_by = 'popularity.desc';
    params['vote_count.gte'] = '50';
  }
  return params;
}

async function getAnimationShows(chart: string, lang: string, includeKids: boolean, page = 1) {
  const params = animationParams(chart, lang, includeKids, page);
  return getResults('/discover/tv', params);
}

export async function getAnime(chart: string, page = 1) {
  return getAnimationShows(chart, 'ja', false, page);
}
export async function getCartoon(chart: string, page = 1) {
  return getAnimationShows(chart, 'en', true, page);
}
export async function getKDrama(chart: string, page = 1) {
  const today = fmt(new Date());
  const yearAgo = fmt(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
  const params: Record<string, string | number> = {
    with_genres: '18',
    with_origin_country: 'KR',
    include_adult: 'false',
    include_null_first_air_dates: 'false',
    page,
  };
  if (chart === 'topRated') {
    params.sort_by = 'vote_average.desc';
    params['vote_count.gte'] = '100';
  } else if (chart === 'upcoming') {
    params.sort_by = 'first_air_date.desc';
    params['first_air_date.gte'] = today;
  } else if (chart === 'airingNow') {
    params.sort_by = 'first_air_date.desc';
    params['first_air_date.lte'] = today;
    params['first_air_date.gte'] = yearAgo;
  }
  return getResults('/discover/tv', params);
}

// Search
export async function searchMulti(query: string, page = 1) {
  const data = (await tmdbGet('/search/multi', { query, page, include_adult: 'false' })) as { results?: { media_type?: string; title?: string; name?: string }[] };
  const results = data.results ?? [];
  return results.filter((r) => ['movie', 'tv'].includes(r.media_type ?? '') && (r.title || r.name));
}

// Details, credits, similar, etc.
export async function getMovieDetails(movieId: number) {
  try {
    return (await tmdbGet(`/movie/${movieId}`)) as Record<string, unknown>;
  } catch {
    return null;
  }
}
export async function getTVDetails(tvId: number) {
  try {
    return (await tmdbGet(`/tv/${tvId}`)) as Record<string, unknown>;
  } catch {
    return null;
  }
}
export async function getMovieCredits(movieId: number) {
  const data = (await tmdbGet(`/movie/${movieId}/credits`)) as { cast?: unknown[] };
  return data.cast ?? [];
}
export async function getTVCredits(tvId: number) {
  const data = (await tmdbGet(`/tv/${tvId}/credits`)) as { cast?: unknown[] };
  return data.cast ?? [];
}
export async function getMovieVideos(movieId: number) {
  const data = (await tmdbGet(`/movie/${movieId}/videos`)) as { results?: { site?: string; type?: string; name?: string }[] };
  const videos = data.results ?? [];
  const youtube = videos.filter((v) => v.site === 'YouTube');
  const teasers = youtube.filter((v) => v.type === 'Teaser' || (v.name ?? '').toLowerCase().includes('teaser'));
  return teasers.length ? teasers : youtube;
}
export async function getTVVideos(tvId: number) {
  const data = (await tmdbGet(`/tv/${tvId}/videos`)) as { results?: { site?: string; type?: string; name?: string }[] };
  const videos = data.results ?? [];
  const youtube = videos.filter((v) => v.site === 'YouTube');
  const teasers = youtube.filter((v) => v.type === 'Teaser' || (v.name ?? '').toLowerCase().includes('teaser'));
  return teasers.length ? teasers : youtube;
}
export async function getMoviesByGenre(genreId: number, page = 1) {
  return getResults('/discover/movie', { with_genres: genreId, page });
}
export async function getTVByGenre(genreId: number, page = 1) {
  return getResults('/discover/tv', { with_genres: genreId, page });
}
export async function getSeason(tvId: number, seasonNumber: number) {
  try {
    return (await tmdbGet(`/tv/${tvId}/season/${seasonNumber}`)) as Record<string, unknown>;
  } catch {
    return null;
  }
}
export async function getMovieSimilar(movieId: number, page = 1) {
  const data = (await tmdbGet(`/movie/${movieId}/similar`, { page })) as { results?: unknown[] };
  return data.results ?? [];
}
export async function getTVSimilar(tvId: number, page = 1) {
  const data = (await tmdbGet(`/tv/${tvId}/similar`, { page })) as { results?: unknown[] };
  return data.results ?? [];
}
export async function getCollection(collectionId: number) {
  try {
    return (await tmdbGet(`/collection/${collectionId}`)) as Record<string, unknown>;
  } catch {
    return null;
  }
}
export async function getMovieWatchProviders(movieId: number, country = 'US') {
  const data = (await tmdbGet(`/movie/${movieId}/watch/providers`)) as { results?: Record<string, unknown> };
  return (data.results as Record<string, unknown>)?.[country] ?? null;
}
export async function getTVWatchProviders(tvId: number, country = 'US') {
  const data = (await tmdbGet(`/tv/${tvId}/watch/providers`)) as { results?: Record<string, unknown> };
  return (data.results as Record<string, unknown>)?.[country] ?? null;
}
