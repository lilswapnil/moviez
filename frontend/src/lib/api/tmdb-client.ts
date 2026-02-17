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

/**
 * Fetch watch providers for a movie
 */
export async function getMovieWatchProviders(movieId: number, country: string = 'US'): Promise<WatchProvidersResult | null> {
  try {
    const response = await apiFetch(`/api/v1/movie/${movieId}/watch/providers?country=${country}`);
    if (!response.ok) return null;
    const data = (await response.json()) as WatchProvidersResponse;
    return data.results?.[country] ?? null;
  } catch (error) {
    console.error('Error fetching movie watch providers:', error);
    return null;
  }
}

/**
 * Fetch watch providers for a TV show
 */
export async function getTVWatchProviders(tvId: number, country: string = 'US'): Promise<WatchProvidersResult | null> {
  try {
    const response = await apiFetch(`/api/v1/tv/${tvId}/watch/providers?country=${country}`);
    if (!response.ok) return null;
    const data = (await response.json()) as WatchProvidersResponse;
    return data.results?.[country] ?? null;
  } catch (error) {
    console.error('Error fetching TV watch providers:', error);
    return null;
  }
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

/**
 * Fetch newly released movies (via backend proxy)
 */
export async function getNewReleases(page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch trending movies
 */
export async function getTrendingMovies(page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch top-rated movies
 */
export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch popular movies
 */
export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch popular TV shows
 */
export async function getPopularTVShows(page: number = 1): Promise<TVShow[]> {
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

/**
 * Fetch top-rated TV shows
 */
export async function getTopRatedShows(page: number = 1): Promise<TVShow[]> {
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

/**
 * Fetch upcoming TV shows
 */
export async function getUpcomingShows(page: number = 1): Promise<TVShow[]> {
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

/**
 * Fetch shows airing today
 */
export async function getAiringTodayShows(page: number = 1): Promise<TVShow[]> {
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

/**
 * Fetch shows currently on the air
 */
export async function getAiringNowShows(page: number = 1): Promise<TVShow[]> {
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

/**
 * Fetch upcoming movies
 */
export async function getUpcomingMovies(page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch trailers for a movie
 */
export async function getMovieTrailers(movieId: number): Promise<Trailer[]> {
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

/**
 * Fetch trailers for a TV show
 */
export async function getTVTrailers(tvId: number): Promise<Trailer[]> {
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

/**
 * Fetch movies by genre
 */
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
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

/**
 * Fetch TV shows by genre
 */
export async function getTVShowsByGenre(genreId: number, page: number = 1): Promise<TVShow[]> {
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

export async function getPopularAnimeShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function getTopRatedAnimeShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function getAiringNowAnimeShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_on_air&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function getUpcomingAnimeShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_upcoming&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function getClassicAnimeShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=anime_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching anime:', error);
    return [];
  }
}

export async function getPopularCartoonShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getTopRatedCartoonShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getKidsFavoriteCartoons(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getTrendingCartoons(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getUpcomingCartoons(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_upcoming&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getAiringNowCartoons(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_on_air&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getFamilyCartoonShows(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=cartoon_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    return [];
  }
}

export async function getTopRatedKDramas(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=kdrama_top&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching K dramas:', error);
    return [];
  }
}

export async function getAiringNowKDramas(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=kdrama_on_air&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching K dramas:', error);
    return [];
  }
}

export async function getUpcomingKDramas(page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/data?type=shows&category=kdrama_upcoming&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching K dramas:', error);
    return [];
  }
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

export async function searchTitles(query: string, page: number = 1): Promise<(Movie | TVShow)[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  try {
    const response = await apiFetch(`/api/v1/search?q=${encodeURIComponent(trimmedQuery)}&page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    const items = data.items ?? [];
    return items.map((item: { id: number; title: string; overview: string; posterPath: string | null; year?: number; voteAverage?: number; mediaType: string }) => ({
      id: item.id,
      title: item.title,
      name: item.title,
      overview: item.overview,
      poster_path: item.posterPath,
      backdrop_path: '',
      release_date: item.year ? `${item.year}-01-01` : '',
      first_air_date: item.year ? `${item.year}-01-01` : '',
      vote_average: item.voteAverage ?? 0,
      popularity: 0,
      genre_ids: [],
      media_type: item.mediaType,
    }));
  } catch (error) {
    console.error('Error searching titles:', error);
    return [];
  }
}

export async function getSimilarMovies(movieId: number, page: number = 1): Promise<Movie[]> {
  try {
    const response = await apiFetch(`/api/v1/movie/${movieId}/similar?page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.results) ? (data.results as Movie[]) : [];
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}

export async function getSimilarTVShows(tvId: number, page: number = 1): Promise<TVShow[]> {
  try {
    const response = await apiFetch(`/api/v1/tv/${tvId}/similar?page=${page}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data.results) ? (data.results as TVShow[]) : [];
  } catch (error) {
    console.error('Error fetching similar TV shows:', error);
    return [];
  }
}

export async function getCollectionDetails(collectionId: number) {
  try {
    const response = await apiFetch(`/api/v1/collection/${collectionId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching collection details:', error);
    return null;
  }
}

export async function getSeasonDetails(tvId: number, seasonNumber: number) {
  try {
    const response = await apiFetch(`/api/v1/tv/${tvId}/season/${seasonNumber}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching season details:', error);
    return null;
  }
}