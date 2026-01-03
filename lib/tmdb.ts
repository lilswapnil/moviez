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
  genre_ids: number[];
  original_language?: string;
  origin_country?: string[];
}

export interface Anime extends TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language?: string;
  origin_country?: string[];
}

export interface Cartoon extends TVShow {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language?: string;
  origin_country?: string[];
}

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

/**
 * Fetch newly released movies from TMDB
 */
export async function getNewReleases(page: number = 1): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
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

const MAX_TRAILER_FAILURES = 3;
let movieTrailerFailureCount = 0;
let tvTrailerFailureCount = 0;
let movieTrailerFetchDisabled = false;
let tvTrailerFetchDisabled = false;

/**
 * Fetch trailers for a movie
 */
export async function getMovieTrailers(movieId: number): Promise<Trailer[]> {
  if (movieTrailerFetchDisabled) {
    return [];
  }
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
      console.warn('No videos found in response for movie:', movieId);
      return [];
    }
    movieTrailerFailureCount = 0;
    movieTrailerFetchDisabled = false;
    const videos = (data.results as Trailer[]).filter((video) => video.site === 'YouTube');
    const teasers = videos.filter((video) => video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
    const otherVideos = videos.filter((video) => !(video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser')));
    return [...teasers, ...otherVideos];
  } catch (error) {
    movieTrailerFailureCount += 1;
    if (movieTrailerFailureCount >= MAX_TRAILER_FAILURES) {
      if (!movieTrailerFetchDisabled) {
        console.error('Error fetching movie trailers:', error);
        console.error('Movie trailer fetching disabled after 3 consecutive failures.');
      }
      movieTrailerFetchDisabled = true;
    } else {
      console.error('Error fetching movie trailers:', error);
    }
    return [];
  }
}

/**
 * Fetch trailers for a TV show
 */
export async function getTVTrailers(tvId: number): Promise<Trailer[]> {
  if (tvTrailerFetchDisabled) {
    return [];
  }
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
      console.warn('No videos found in response for TV show:', tvId);
      return [];
    }
    tvTrailerFailureCount = 0;
    tvTrailerFetchDisabled = false;
    const videos = (data.results as Trailer[]).filter((video) => video.site === 'YouTube');
    const teasers = videos.filter((video) => video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser'));
    const otherVideos = videos.filter((video) => !(video.type === 'Teaser' || video.name?.toLowerCase().includes('teaser')));
    return [...teasers, ...otherVideos];
  } catch (error) {
    tvTrailerFailureCount += 1;
    if (tvTrailerFailureCount >= MAX_TRAILER_FAILURES) {
      if (!tvTrailerFetchDisabled) {
        console.error('Error fetching TV trailers:', error);
        console.error('TV trailer fetching disabled after 3 consecutive failures.');
      }
      tvTrailerFetchDisabled = true;
    } else {
      console.error('Error fetching TV trailers:', error);
    }
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
