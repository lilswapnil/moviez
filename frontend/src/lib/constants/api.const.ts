// Shared constants and configuration
export const API_CONFIG = {
  apiKey: process.env.TMDB_API_KEY,
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
