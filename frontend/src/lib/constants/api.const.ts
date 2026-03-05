// Shared constants and configuration
// Base URL for API calls
// - Client: empty string (same-origin; rewrites proxy /api/v1/* to backend)
// - Server: use BACKEND_URL directly when it's a production URL (Vercel/etc);
//   otherwise fetch from app URL so rewrites proxy (local dev)
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';

  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (backend && !backend.includes('localhost')) {
    return backend.replace(/\/$/, '');
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof process.env.VERCEL_URL === 'string' && process.env.VERCEL_URL
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
