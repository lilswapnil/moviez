import { getTopRatedMovies, getUpcomingMovies, getTopRatedShows, getUpcomingShows } from '@/lib/tmdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');

  try {
    let data;

    if (type === 'movies') {
      if (category === 'top_rated') {
        data = await getTopRatedMovies(page);
      } else if (category === 'upcoming') {
        data = await getUpcomingMovies(page);
      }
    } else if (type === 'shows') {
      if (category === 'top_rated') {
        data = await getTopRatedShows(page);
      } else if (category === 'upcoming') {
        data = await getUpcomingShows(page);
      }
    }

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
