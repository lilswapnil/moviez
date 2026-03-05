// Shared constants and configuration
// Base URL for API calls - browser uses same-origin; server uses backend (TMDB key stays in backend only)
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';
  return (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000'
  );
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
