const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

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
 * Fetch newly released movies from TMDB
 */
export async function getNewReleases(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours (daily refresh)
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top rated movies');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending TV shows');
    }

    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch top rated shows');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming shows');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch shows airing today');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching airing today shows:', error);
    return [];
  }
}

/**
 * Fetch upcoming movies
 */
export async function getUpcomingMovies(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    return (await response.json()) as MovieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export async function getTVShowDetails(tvId: number): Promise<TVDetails | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch TV show details: ${response.status}`);
    }

    return (await response.json()) as TVDetails;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
}

export async function getMovieCredits(movieId: number): Promise<CastMember[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie credits: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.cast) ? (data.cast as CastMember[]) : [];
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
}

export async function getTVCredits(tvId: number): Promise<CastMember[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}/credits?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch TV credits: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.cast) ? (data.cast as CastMember[]) : [];
  } catch (error) {
    console.error('Error fetching TV credits:', error);
    return [];
  }
}

const MAX_TRAILER_FAILURES = 3;
let movieTrailerFailureCount = 0;
let tvTrailerFailureCount = 0;
let movieTrailerFetchDisabled = false;
let tvTrailerFetchDisabled = false;

/**
 * Fetch trailers for a movie
 */
export async function getMovieTrailers(movieId: number): Promise<Trailer[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }
    
    const videos = (data.results as Trailer[]).filter((video) => video.site === 'YouTube');
    const teasers = videos.filter((video) => video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
    return teasers.length > 0 ? teasers : videos;
  } catch (error) {
    movieTrailerFailureCount += 1;
    if (movieTrailerFailureCount >= MAX_TRAILER_FAILURES) {
      movieTrailerFetchDisabled = true;
    }
    console.error('Error fetching movie trailers:', error);
    return [];
  }
}

/**
 * Fetch trailers for a TV show
 */
export async function getTVTrailers(tvId: number): Promise<Trailer[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}/videos?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }
    
    const videos = (data.results as Trailer[]).filter((video) => video.site === 'YouTube');
    const teasers = videos.filter((video) => video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
    return teasers.length > 0 ? teasers : videos;
  } catch (error) {
    tvTrailerFailureCount += 1;
    if (tvTrailerFailureCount >= MAX_TRAILER_FAILURES) {
      tvTrailerFetchDisabled = true;
    }
    console.error('Error fetching TV trailers:', error);
    return [];
  }
}

/**
 * Fetch movies by genre
 */
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies by genre');
    }
    
    const data = await response.json();
    return data.results;
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
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genreId}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows by genre');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    return [];
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

async function discoverAnimationShows(params: Record<string, string>): Promise<TVShow[]> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', TMDB_API_KEY ?? '');
    searchParams.set('language', 'en-US');
    searchParams.set('page', params.page ?? '1');
    searchParams.set('include_adult', 'false');
    searchParams.set('include_null_first_air_dates', 'false');

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    const response = await fetch(
      `${TMDB_BASE_URL}/discover/tv?${searchParams.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to discover animation shows');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error discovering animation shows:', error);
    return [];
  }
}

interface AnimationChartOptions {
  chart: 'popular' | 'topRated' | 'airingNow' | 'upcoming' | 'classics' | 'trending' | 'family' | 'kids';
  originalLanguage: string;
  includeKids?: boolean;
  page?: number;
}

async function getAnimationChart({ chart, originalLanguage, includeKids, page = 1 }: AnimationChartOptions): Promise<TVShow[]> {
  const baseParams: Record<string, string> = {
    sort_by: 'popularity.desc',
    'with_genres': includeKids ? '16,10762' : '16',
    page: page.toString(),
    'with_original_language': originalLanguage,
  };

  switch (chart) {
    case 'popular':
      baseParams.sort_by = 'popularity.desc';
      break;
    case 'topRated':
      baseParams.sort_by = 'vote_average.desc';
      baseParams['vote_count.gte'] = '200';
      break;
    case 'airingNow':
      baseParams.sort_by = 'popularity.desc';
      baseParams['air_date.lte'] = formatDate(new Date());
      baseParams['air_date.gte'] = formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
      break;
    case 'upcoming':
      baseParams.sort_by = 'popularity.desc';
      baseParams['first_air_date.gte'] = formatDate(new Date());
      break;
    case 'classics':
      baseParams.sort_by = 'vote_average.desc';
      baseParams['vote_count.gte'] = '500';
      const tenYearsAgo = new Date();
      tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
      baseParams['first_air_date.lte'] = formatDate(tenYearsAgo);
      break;
    case 'trending':
      baseParams.sort_by = 'popularity.desc';
      baseParams['first_air_date.gte'] = formatDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
      break;
    case 'family':
      baseParams.sort_by = 'vote_average.desc';
      baseParams['vote_count.gte'] = '100';
      break;
    case 'kids':
      baseParams.sort_by = 'popularity.desc';
      baseParams['vote_count.gte'] = '50';
      break;
  }

  return discoverAnimationShows(baseParams);
}

export async function getPopularAnimeShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'popular', originalLanguage: 'ja', page });
}

export async function getTopRatedAnimeShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'topRated', originalLanguage: 'ja', page });
}

export async function getAiringNowAnimeShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'airingNow', originalLanguage: 'ja', page });
}

export async function getUpcomingAnimeShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'upcoming', originalLanguage: 'ja', page });
}

export async function getClassicAnimeShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'classics', originalLanguage: 'ja', page });
}

export async function getPopularCartoonShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'popular', originalLanguage: 'en', includeKids: true, page });
}

export async function getTopRatedCartoonShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'topRated', originalLanguage: 'en', includeKids: true, page });
}

export async function getKidsFavoriteCartoons(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'kids', originalLanguage: 'en', includeKids: true, page });
}

export async function getTrendingCartoons(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'trending', originalLanguage: 'en', includeKids: true, page });
}

export async function getFamilyCartoonShows(page: number = 1): Promise<TVShow[]> {
  return getAnimationChart({ chart: 'family', originalLanguage: 'en', includeKids: true, page });
}

async function getKDramaChart({ chart, page = 1 }: { chart: 'topRated' | 'upcoming'; page?: number }): Promise<TVShow[]> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('api_key', TMDB_API_KEY ?? '');
    searchParams.set('language', 'en-US');
    searchParams.set('page', page.toString());
    searchParams.set('include_adult', 'false');
    searchParams.set('include_null_first_air_dates', 'false');
    searchParams.set('with_genres', '18'); // Drama genre ID
    searchParams.set('with_origin_country', 'KR'); // South Korea
    searchParams.set('sort_by', chart === 'topRated' ? 'vote_average.desc' : 'first_air_date.desc');

    if (chart === 'topRated') {
      searchParams.set('vote_count.gte', '100');
    } else if (chart === 'upcoming') {
      const today = formatDate(new Date());
      searchParams.set('first_air_date.gte', today);
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/discover/tv?${searchParams.toString()}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to discover K dramas');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error discovering K dramas:', error);
    return [];
  }
}

export async function getTopRatedKDramas(page: number = 1): Promise<TVShow[]> {
  return getKDramaChart({ chart: 'topRated', page });
}

export async function getUpcomingKDramas(page: number = 1): Promise<TVShow[]> {
  return getKDramaChart({ chart: 'upcoming', page });
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
  if (!trimmedQuery) {
    return [];
  }

  try {
    const url = new URL(`${TMDB_BASE_URL}/search/multi`);
    url.searchParams.set('api_key', TMDB_API_KEY ?? '');
    url.searchParams.set('query', trimmedQuery);
    url.searchParams.set('language', 'en-US');
    url.searchParams.set('page', page.toString());
    url.searchParams.set('include_adult', 'false');

    const response = await fetch(url.toString(), { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to search titles: ${response.status}`);
    }

    const data = await response.json();
    const results: TMDBSearchResult[] = Array.isArray(data.results) ? data.results : [];

    return results
      .filter((item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.id)
      .map((item) => {
        if (item.media_type === 'movie') {
          const movie: Movie = {
            id: item.id,
            title: normalizeString(item.title || item.name || 'Untitled'),
            overview: normalizeString(item.overview),
            backdrop_path: normalizeString(item.backdrop_path),
            poster_path: normalizeString(item.poster_path),
            release_date: normalizeString(item.release_date),
            vote_average: normalizeNumber(item.vote_average),
            popularity: 0,
            genre_ids: item.genre_ids ?? [],
            original_language: item.original_language,
          };
          return movie;
        }

        const tvShow: TVShow = {
          id: item.id,
          name: normalizeString(item.name || item.title || 'Untitled'),
          overview: normalizeString(item.overview),
          backdrop_path: normalizeString(item.backdrop_path),
          poster_path: normalizeString(item.poster_path),
          first_air_date: normalizeString(item.first_air_date),
          vote_average: normalizeNumber(item.vote_average),
          popularity: 0,
          genre_ids: item.genre_ids ?? [],
          original_language: item.original_language,
          origin_country: item.origin_country ?? [],
        };
        return tvShow;
      });
  } catch (error) {
    console.error('Error searching titles:', error);
    return [];
  }
}
export async function getSimilarMovies(movieId: number, page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch similar movies: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.results) ? (data.results as Movie[]) : [];
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
}

export async function getSimilarTVShows(tvId: number, page: number = 1): Promise<TVShow[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch similar TV shows: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.results) ? (data.results as TVShow[]) : [];
  } catch (error) {
    console.error('Error fetching similar TV shows:', error);
    return [];
  }
}

export async function getCollectionDetails(collectionId: number) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/collection/${collectionId}?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch collection details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collection details:', error);
    return null;
  }
}

export async function getSeasonDetails(tvId: number, seasonNumber: number) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch season details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching season details:', error);
    return null;
  }
}