// Shared constants and configuration
// Base URL for API calls:
// - Client: always '' (same-origin; /api/v1/* hits Next.js routes or rewrites to external backend)
// - Server: BACKEND_URL when set (external backend); else absolute origin so fetch() works
//   (Node.js fetch rejects relative URLs; we need https://host or http://localhost:3000)

/** Sync version - use only when async is not available (e.g. in non-RSC context). */
export function getApiBase(): string {
  if (typeof window !== 'undefined') return '';

  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (backend && !backend.includes('localhost')) {
    return backend.replace(/\/$/, '');
  }

  // Same-origin: return absolute URL so server-side fetch works
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.VERCEL_BRANCH_URL) return `https://${process.env.VERCEL_BRANCH_URL}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) return appUrl.replace(/\/$/, '');
  return `http://localhost:${process.env.PORT || '3000'}`;
}

/** Async version - prefers request headers (most reliable on Vercel). Use in RSC/API context. */
export async function getApiBaseAsync(): Promise<string> {
  if (typeof window !== 'undefined') return '';

  const backend =
    process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (backend && !backend.includes('localhost')) {
    return backend.replace(/\/$/, '');
  }

  // Use request host when available (Vercel sets x-forwarded-*)
  try {
    const { headers } = await import('next/headers');
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    if (host) return `${proto}://${host}`;
  } catch {
    // headers() can throw outside request context
  }

  return getApiBase();
}

export const API_CONFIG = {
  imageBaseUrl: 'https://image.tmdb.org/t/p',
} as const;

export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
} as const;
