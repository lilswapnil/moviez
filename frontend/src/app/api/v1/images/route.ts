import { NextRequest, NextResponse } from 'next/server';
import { getMovieImages, getTVImages } from '@/lib/api/tmdb-client';

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
    // Support all types by mapping them to movie or tv
    const tmdbType = ['movie', 'international'].includes(type) ? 'movie' : 'tv';
    
    const images = tmdbType === 'movie'
      ? await getMovieImages(itemId)
      : await getTVImages(itemId);

    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return NextResponse.json({ error: 'Failed to fetch images', logos: [] }, { status: 500 });
  }
}
