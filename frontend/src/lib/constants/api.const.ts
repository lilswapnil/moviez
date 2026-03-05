// Shared constants and configuration
// Base URL for API calls - always use same-origin so rewrites can proxy to backend
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';
  // Server: fetch from our own app; rewrites in next.config proxy /api/v1/* to backend
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof process.env.VERCEL_URL === 'string'
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');
  return appUrl;
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
