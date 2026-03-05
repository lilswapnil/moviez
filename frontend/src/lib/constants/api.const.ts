// Shared constants and configuration
// Base URL for API calls:
// - Client: always '' (same-origin; /api/v1/* hits Next.js routes or rewrites to external backend)
// - Server: BACKEND_URL when set (external backend); else absolute origin so fetch() works
//   (Node.js fetch rejects relative URLs; we need https://host or http://localhost:3000)
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';

  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (backend && !backend.includes('localhost')) {
    return backend.replace(/\/$/, '');
  }

  // Same-origin: return absolute URL so server-side fetch works (Node has no implicit base)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    return appUrl.replace(/\/$/, '');
  }
  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
