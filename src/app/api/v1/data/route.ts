import { 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getTopRatedShows, 
  getUpcomingShows,
  getTopRatedAnimeShows,
  getUpcomingAnimeShows,
  getTopRatedCartoonShows,
  getTrendingCartoons,
  getPopularMovies,
  getTopRatedKDramas,
  getUpcomingKDramas
} from '@/lib/api/tmdb-client';

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
      } else if (category === 'international') {
        data = await getPopularMovies(page);
      }
    } else if (type === 'shows') {
      if (category === 'top_rated') {
        data = await getTopRatedShows(page);
      } else if (category === 'upcoming') {
        data = await getUpcomingShows(page);
      } else if (category === 'anime') {
        if (page === 1) {
          data = await getTopRatedAnimeShows(page);
        } else {
          data = await getUpcomingAnimeShows(page);
        }
      } else if (category === 'cartoon') {
        if (page === 1) {
          data = await getTopRatedCartoonShows(page);
        } else {
          data = await getTrendingCartoons(page);
        }
      } else if (category === 'kdrama') {
        if (page === 1) {
          data = await getTopRatedKDramas(page);
        } else {
          data = await getUpcomingKDramas(page);
        }
      }
    }

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
