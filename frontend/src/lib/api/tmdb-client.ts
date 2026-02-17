// --- Streaming Providers Types ---
export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
  type?: string;
  link?: string;
}

export interface WatchProvidersResult {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: {
    [country: string]: WatchProvidersResult;
  };
}

import { getApiBase } from '@/lib/constants/api.const';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

async function apiFetch(path: string, options?: RequestInit) {
  const base = getApiBase();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  return fetch(url, { next: { revalidate: 3600 }, ...options });
}

export async function getMovieWatchProviders(movieId: number, country: string = 'US'): Promise<WatchProvidersResult | null> {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return (await s.getMovieWatchProviders(movieId, country)) as WatchProvidersResult | null; } catch (e) { console.error('Error fetching movie watch providers:', e); return null; }
  }
  try { const r = await apiFetch(`/api/v1/movie/${movieId}/watch/providers?country=${country}`); if (!r.ok) return null; const d = (await r.json()) as WatchProvidersResponse; return d.results?.[country] ?? null; } catch (e) { console.error('Error fetching movie watch providers:', e); return null; }
}
export async function getTVWatchProviders(tvId: number, country: string = 'US'): Promise<WatchProvidersResult | null> {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return (await s.getTVWatchProviders(tvId, country)) as WatchProvidersResult | null; } catch (e) { console.error('Error fetching TV watch providers:', e); return null; }
  }
  try { const r = await apiFetch(`/api/v1/tv/${tvId}/watch/providers?country=${country}`); if (!r.ok) return null; const d = (await r.json()) as WatchProvidersResponse; return d.results?.[country] ?? null; } catch (e) { console.error('Error fetching TV watch providers:', e); return null; }
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  original_language?: string;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  original_language?: string;
  origin_country?: string[];
}

export type Anime = TVShow;
export type Cartoon = TVShow;

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface GenreTag {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  status?: string;
  tagline?: string;
  genres?: GenreTag[];
  homepage?: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
}

export interface TVDetails extends TVShow {
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  genres?: GenreTag[];
  homepage?: string;
  seasons?: Array<{
    season_number: number;
    name: string;
    poster_path: string | null;
    episode_count: number;
  }>;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
  order?: number;
}

export async function getNewReleases(page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getNowPlaying(page)) as Movie[];
    } catch (e) {
      console.error('Error fetching new releases:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=movies&category=on_air&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
}

export async function getTrendingMovies(page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTrendingMovies(page)) as Movie[];
    } catch (e) {
      console.error('Error fetching trending movies:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=movies&category=trending&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTopRatedMovies(page)) as Movie[];
    } catch (e) {
      console.error('Error fetching top rated movies:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=movies&category=top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getPopularMovies(page)) as Movie[];
    } catch (e) {
      console.error('Error fetching popular movies:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=movies&category=international&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

export async function getPopularTVShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getPopularTV(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching TV shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=popular&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

/**
 * Fetch trending TV shows
 */
export async function getTrendingTVShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTrendingTV(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching trending TV shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=trending&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    return [];
  }
}

export async function getTopRatedShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTopRatedTV(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching top rated shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching top rated shows:', error);
    return [];
  }
}

export async function getUpcomingShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getUpcomingTV(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching upcoming shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=upcoming&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching upcoming shows:', error);
    return [];
  }
}

export async function getAiringTodayShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVAiringToday(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching airing today shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=airing_today&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching airing today shows:', error);
    return [];
  }
}

export async function getAiringNowShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVOnTheAir(page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching on the air shows:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=on_air&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching on the air shows:', error);
    return [];
  }
}

export async function getUpcomingMovies(page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getUpcomingMovies(page)) as Movie[];
    } catch (e) {
      console.error('Error fetching upcoming movies:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=movies&category=upcoming&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}

/**
 * Get full image URL for TMDB images
 */
export function getImageUrl(path: string, size: 'w500' | 'w780' | 'original' = 'original'): string {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails | null> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getMovieDetails(movieId)) as MovieDetails | null;
    } catch (e) {
      console.error('Error fetching movie details:', e);
      return null;
    }
  }
  try {
    const response = await apiFetch(`/api/v1/movie/${movieId}`);
    if (response.status === 404) return null;
    if (!response.ok) return null;
    return (await response.json()) as MovieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function getTVShowDetails(tvId: number): Promise<TVDetails | null> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVDetails(tvId)) as TVDetails | null;
    } catch (e) {
      console.error('Error fetching TV show details:', e);
      return null;
    }
  }
  try {
    const response = await apiFetch(`/api/v1/tv/${tvId}`);
    if (response.status === 404) return null;
    if (!response.ok) return null;
    return (await response.json()) as TVDetails;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
}

export async function getMovieCredits(movieId: number): Promise<CastMember[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getMovieCredits(movieId)) as CastMember[];
    } catch (e) {
      console.error('Error fetching movie credits:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/movie/${movieId}/credits`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.cast) ? (data.cast as CastMember[]) : [];
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
}

export async function getTVCredits(tvId: number): Promise<CastMember[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVCredits(tvId)) as CastMember[];
    } catch (e) {
      console.error('Error fetching TV credits:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/tv/${tvId}/credits`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.cast) ? (data.cast as CastMember[]) : [];
  } catch (error) {
    console.error('Error fetching TV credits:', error);
    return [];
  }
}

export async function getMovieTrailers(movieId: number): Promise<Trailer[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getMovieVideos(movieId)) as Trailer[];
    } catch (e) {
      console.error('Error fetching movie trailers:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/trailers?type=movie&id=${movieId}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error('Error fetching movie trailers:', error);
    return [];
  }
}

export async function getTVTrailers(tvId: number): Promise<Trailer[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVVideos(tvId)) as Trailer[];
    } catch (e) {
      console.error('Error fetching TV trailers:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/trailers?type=tv&id=${tvId}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error('Error fetching TV trailers:', error);
    return [];
  }
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getMoviesByGenre(genreId, page)) as Movie[];
    } catch (e) {
      console.error('Error fetching movies by genre:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/genres?type=movies&genreId=${genreId}&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
}

export async function getTVShowsByGenre(genreId: number, page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      return (await s.getTVByGenre(genreId, page)) as TVShow[];
    } catch (e) {
      console.error('Error fetching TV shows by genre:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/genres?type=shows&genreId=${genreId}&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    return [];
  }
}

const animeServer = async (chart: string, page: number) => {
  const s = await import('./tmdb-server');
  return (await s.getAnime(chart, page)) as TVShow[];
};
export async function getPopularAnimeShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { return await animeServer('popular', page); } catch (e) { console.error('Error fetching anime:', e); return []; }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return []; return (await response.json()) ?? [];
  } catch (error) { console.error('Error fetching anime:', error); return []; }
}
export async function getTopRatedAnimeShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { return await animeServer('topRated', page); } catch (e) { console.error('Error fetching anime:', e); return []; }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return []; return (await response.json()) ?? [];
  } catch (error) { console.error('Error fetching anime:', error); return []; }
}
export async function getAiringNowAnimeShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { return await animeServer('airingNow', page); } catch (e) { console.error('Error fetching anime:', e); return []; }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_on_air&page=${page}`);
    if (!response.ok) return []; return (await response.json()) ?? [];
  } catch (error) { console.error('Error fetching anime:', error); return []; }
}
export async function getUpcomingAnimeShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { return await animeServer('upcoming', page); } catch (e) { console.error('Error fetching anime:', e); return []; }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_upcoming&page=${page}`);
    if (!response.ok) return []; return (await response.json()) ?? [];
  } catch (error) { console.error('Error fetching anime:', error); return []; }
}
export async function getClassicAnimeShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { return await animeServer('classics', page); } catch (e) { console.error('Error fetching anime:', e); return []; }
  }
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return []; return (await response.json()) ?? [];
  } catch (error) { console.error('Error fetching anime:', error); return []; }
}

const cartoonServer = async (chart: string, page: number) => {
  const s = await import('./tmdb-server');
  return (await s.getCartoon(chart, page)) as TVShow[];
};
export async function getPopularCartoonShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('popular', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getTopRatedCartoonShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('topRated', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getKidsFavoriteCartoons(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('kids', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getTrendingCartoons(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('popular', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getUpcomingCartoons(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('upcoming', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_upcoming&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getAiringNowCartoons(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('airingNow', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_on_air&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}
export async function getFamilyCartoonShows(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await cartoonServer('family', page); } catch (e) { console.error('Error fetching cartoons:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching cartoons:', e); return []; }
}

const kdramaServer = async (chart: string, page: number) => {
  const s = await import('./tmdb-server');
  return (await s.getKDrama(chart, page)) as TVShow[];
};
export async function getTopRatedKDramas(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await kdramaServer('topRated', page); } catch (e) { console.error('Error fetching K dramas:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=kdrama_top&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching K dramas:', e); return []; }
}
export async function getAiringNowKDramas(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await kdramaServer('airingNow', page); } catch (e) { console.error('Error fetching K dramas:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=kdrama_on_air&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching K dramas:', e); return []; }
}
export async function getUpcomingKDramas(page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') { try { return await kdramaServer('upcoming', page); } catch (e) { console.error('Error fetching K dramas:', e); return []; } }
  try { const r = await apiFetch(`/api/v1/data?type=shows&category=kdrama_upcoming&page=${page}`); if (!r.ok) return []; return (await r.json()) ?? []; } catch (e) { console.error('Error fetching K dramas:', e); return []; }
}

type SearchMediaType = 'movie' | 'tv';

interface TMDBSearchResult {
  id: number;
  media_type: SearchMediaType | string;
  title?: string;
  name?: string;
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  vote_average?: number;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
  original_language?: string;
  origin_country?: string[];
}

function normalizeString(value: string | undefined | null): string {
  return value ?? '';
}

function normalizeNumber(value: number | undefined | null): number {
  return Number.isFinite(value) ? Number(value) : 0;
}

function normalizeSearchItem(item: Record<string, unknown>): Movie | TVShow {
  const title = (item.title as string) || (item.name as string) || 'Untitled';
  const dateVal = (item.release_date as string) || (item.first_air_date as string);
  const year = dateVal && dateVal.length >= 4 ? parseInt(dateVal.slice(0, 4), 10) : undefined;
  return {
    id: item.id as number,
    title,
    name: title,
    overview: (item.overview as string) || '',
    poster_path: (item.poster_path as string) ?? '',
    backdrop_path: (item.backdrop_path as string) ?? '',
    release_date: year ? `${year}-01-01` : '',
    first_air_date: year ? `${year}-01-01` : '',
    vote_average: (item.vote_average as number) ?? 0,
    popularity: (item.popularity as number) ?? 0,
    genre_ids: (item.genre_ids as number[]) ?? [],
  } as Movie | TVShow;
}
export async function searchTitles(query: string, page: number = 1): Promise<(Movie | TVShow)[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];
  if (typeof window === 'undefined') {
    try {
      const s = await import('./tmdb-server');
      const results = await s.searchMulti(trimmedQuery, page);
      return (results as Record<string, unknown>[]).map(normalizeSearchItem);
    } catch (e) {
      console.error('Error searching titles:', e);
      return [];
    }
  }
  try {
    const response = await apiFetch(`/api/v1/search?q=${encodeURIComponent(trimmedQuery)}&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    const items = data.items ?? [];
    return items.map((item: { id: number; title: string; overview: string; posterPath: string | null; year?: number; voteAverage?: number; mediaType: string }) => ({
      id: item.id, title: item.title, name: item.title, overview: item.overview,
      poster_path: item.posterPath ?? '', backdrop_path: '',
      release_date: item.year ? `${item.year}-01-01` : '', first_air_date: item.year ? `${item.year}-01-01` : '',
      vote_average: item.voteAverage ?? 0, popularity: 0, genre_ids: [],
    })) as (Movie | TVShow)[];
  } catch (error) {
    console.error('Error searching titles:', error);
    return [];
  }
}

export async function getSimilarMovies(movieId: number, page: number = 1): Promise<Movie[]> {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return (await s.getMovieSimilar(movieId, page)) as Movie[]; } catch (e) { console.error('Error fetching similar movies:', e); return []; }
  }
  try { const r = await apiFetch(`/api/v1/movie/${movieId}/similar?page=${page}`); if (!r.ok) return []; const d = await r.json(); return Array.isArray(d.results) ? d.results : []; } catch (e) { console.error('Error fetching similar movies:', e); return []; }
}
export async function getSimilarTVShows(tvId: number, page: number = 1): Promise<TVShow[]> {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return (await s.getTVSimilar(tvId, page)) as TVShow[]; } catch (e) { console.error('Error fetching similar TV shows:', e); return []; }
  }
  try { const r = await apiFetch(`/api/v1/tv/${tvId}/similar?page=${page}`); if (!r.ok) return []; const d = await r.json(); return Array.isArray(d.results) ? d.results : []; } catch (e) { console.error('Error fetching similar TV shows:', e); return []; }
}
export async function getCollectionDetails(collectionId: number) {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return await s.getCollection(collectionId); } catch (e) { console.error('Error fetching collection details:', e); return null; }
  }
  try { const r = await apiFetch(`/api/v1/collection/${collectionId}`); if (!r.ok) return null; return await r.json(); } catch (e) { console.error('Error fetching collection details:', e); return null; }
}
export async function getSeasonDetails(tvId: number, seasonNumber: number) {
  if (typeof window === 'undefined') {
    try { const s = await import('./tmdb-server'); return await s.getSeason(tvId, seasonNumber); } catch (e) { console.error('Error fetching season details:', e); return null; }
  }
  try { const r = await apiFetch(`/api/v1/tv/${tvId}/season/${seasonNumber}`); if (!r.ok) return null; return await r.json(); } catch (e) { console.error('Error fetching season details:', e); return null; }
}