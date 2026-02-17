// Shared constants and configuration
// Base URL for API calls - use empty string when same-origin (browser), full URL on server
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
