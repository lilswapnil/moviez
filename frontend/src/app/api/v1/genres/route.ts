import { getMoviesByGenre, getTVShowsByGenre } from '@/lib/api/tmdb-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const genreId = parseInt(searchParams.get('genreId') || '0');
  const page = parseInt(searchParams.get('page') || '1');

  try {
    let data;

    if (type === 'movies') {
      data = await getMoviesByGenre(genreId, page);
    } else if (type === 'shows') {
      data = await getTVShowsByGenre(genreId, page);
    }

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching genre data:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
