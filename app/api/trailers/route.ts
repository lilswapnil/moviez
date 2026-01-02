import { NextRequest, NextResponse } from 'next/server';
import { getMovieTrailers, getTVTrailers } from '@/lib/tmdb';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get('id');
  const type = searchParams.get('type');

  if (!idParam || !type) {
    return NextResponse.json({ error: 'Missing id or type parameter' }, { status: 400 });
  }

  const itemId = Number(idParam);
  if (Number.isNaN(itemId) || itemId <= 0) {
    return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });
  }

  try {
    const trailers = type === 'movie'
      ? await getMovieTrailers(itemId)
      : await getTVTrailers(itemId);

    return NextResponse.json({ results: trailers ?? [] });
  } catch (error) {
    console.error('Failed to fetch trailers:', error);
    return NextResponse.json({ error: 'Failed to fetch trailers' }, { status: 500 });
  }
}
