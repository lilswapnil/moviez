import { NextResponse } from 'next/server';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path') ?? 'trending/movie/week';

  // Basic path validation: allow alphanumeric, slashes, hyphens (e.g. movie/550, search/multi)
  if (!/^[a-zA-Z0-9/_-]+$/.test(path) || path.includes('..')) {
    return NextResponse.json({ status_message: 'Invalid path' }, { status: 400 });
  }

  const token = process.env.TMDB_BEARER_TOKEN;
  const apiKey = process.env.TMDB_API_KEY;

  if (!token && !apiKey) {
    return NextResponse.json(
      { status_message: 'TMDB_BEARER_TOKEN or TMDB_API_KEY not configured' },
      { status: 500 }
    );
  }

  // Build URL: forward all query params except 'path' to TMDB
  const tmdbParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== 'path') tmdbParams.set(key, value);
  });
  // If using API key (no Bearer token), add api_key
  if (!token && apiKey) {
    tmdbParams.set('api_key', apiKey);
  }

  const queryString = tmdbParams.toString();
  const url = `${TMDB_BASE}/${path}${queryString ? `?${queryString}` : ''}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
  };

  const r = await fetch(url, { headers, next: { revalidate: 3600 } });
  const data = await r.json();

  return NextResponse.json(data, { status: r.status });
}
