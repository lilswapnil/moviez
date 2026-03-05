// Shared constants and configuration
// Base URL for API calls:
// - Client: always '' (same-origin; /api/v1/* hits backend via Python serverless or rewrites)
// - Server: BACKEND_URL when set (external backend); else '' for same-origin (Vercel combined deploy)
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';

  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (backend && !backend.includes('localhost')) {
    return backend.replace(/\/$/, '');
  }

  // Same-origin: Vercel combined (Python handles /api/v1/*) or local dev (uvicorn backend)
  return '';
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
