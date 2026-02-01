// URL utility helpers for industry-standard, SEO-friendly, and maintainable route generation
// Usage: import { getTitleUrl, getGenreUrl, getAccountUrl, getSearchUrl, getChartUrl } from './url';

/**
 * Get URL for a title detail page
 * @param type - 'movies' | 'shows' | 'animes' | 'cartoons'
 * @param id - Title ID
 * @returns e.g. /title/movies/12345
 */
export function getTitleUrl(type: string, id: string | number): string {
  return `/title/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;
}

/**
 * Get URL for a genre page
 * @param type - 'movies' | 'shows' | 'animes' | 'cartoons'
 * @param genreId - Genre ID
 * @returns e.g. /browse/genres/movies/28
 */
export function getGenreUrl(type: string, genreId: string | number): string {
  return `/browse/genres/${encodeURIComponent(type)}/${encodeURIComponent(genreId)}`;
}

/**
 * Get URL for the account page
 * @returns /auth/account
 */
export function getAccountUrl(): string {
  return '/auth/account';
}

/**
 * Get URL for search page
 * @param query - Search query string
 * @returns e.g. /browse/search?q=batman
 */
export function getSearchUrl(query?: string): string {
  return query ? `/browse/search?q=${encodeURIComponent(query)}` : '/browse/search';
}

/**
 * Get URL for a chart page
 * @param chartSlug - Chart slug (e.g. 'top-movies')
 * @returns e.g. /browse/library/charts/top-movies
 */
export function getChartUrl(chartSlug: string): string {
  return `/browse/library/charts/${encodeURIComponent(chartSlug)}`;
}
