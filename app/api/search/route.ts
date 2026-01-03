import { NextRequest, NextResponse } from 'next/server';
import { searchTitles } from '@/lib/tmdb';
import { normalizeChartItems } from '@/lib/charts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';
  const pageParam = searchParams.get('page') ?? '1';

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return NextResponse.json({ items: [] });
  }

  const page = Number(pageParam);
  if (!Number.isFinite(page) || page <= 0) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
  }

  try {
    const results = await searchTitles(trimmedQuery, page);
    const items = normalizeChartItems(results);
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
