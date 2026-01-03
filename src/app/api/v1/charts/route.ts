import { NextRequest, NextResponse } from 'next/server';
import { chartFetchers, normalizeChartItems, getChartCategory } from '@/lib/utils/charts-mapping';
import { getChartNameFromSlug } from '@/lib/utils/chart-slugs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const pageParam = searchParams.get('page');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  const chartName = getChartNameFromSlug(slug);
  if (!chartName) {
    return NextResponse.json({ error: 'Unknown chart' }, { status: 404 });
  }

  const fetcher = chartFetchers[chartName];
  if (!fetcher) {
    return NextResponse.json({ error: 'Chart not supported' }, { status: 404 });
  }

  const page = pageParam ? Number(pageParam) : 1;
  if (!Number.isFinite(page) || page <= 0) {
    return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
  }

  try {
    const results = await fetcher(page);
    const category = getChartCategory(chartName);
    const normalized = normalizeChartItems(Array.isArray(results) ? results : [], category);
    return NextResponse.json({ items: normalized });
  } catch (error) {
    console.error(`Failed to fetch chart data for ${chartName}:`, error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
