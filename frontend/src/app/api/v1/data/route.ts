import { 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getNewReleases,
  getTopRatedShows, 
  getUpcomingShows,
  getAiringNowShows,
  getTopRatedAnimeShows,
  getUpcomingAnimeShows,
  getAiringNowAnimeShows,
  getTopRatedCartoonShows,
  getUpcomingCartoons,
  getAiringNowCartoons,
  getPopularMovies,
  getTopRatedKDramas,
  getUpcomingKDramas,
  getAiringNowKDramas
} from '@/lib/api/tmdb-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');

  try {
    let data;

    if (type === 'movies') {
      if (category === 'top') {
        data = await getTopRatedMovies(page);
      } else if (category === 'upcoming') {
        data = await getUpcomingMovies(page);
      } else if (category === 'on_air') {
        data = await getNewReleases(page);
      } else if (category === 'international') {
        data = await getPopularMovies(page);
      }
    } else if (type === 'shows') {
      if (category === 'top') {
        data = await getTopRatedShows(page);
      } else if (category === 'upcoming') {
        data = await getUpcomingShows(page);
      } else if (category === 'on_air') {
        data = await getAiringNowShows(page);
      } else if (category === 'anime_top') {
        data = await getTopRatedAnimeShows(page);
      } else if (category === 'anime_upcoming') {
        data = await getUpcomingAnimeShows(page);
      } else if (category === 'anime_on_air') {
        data = await getAiringNowAnimeShows(page);
      } else if (category === 'cartoon_top') {
        data = await getTopRatedCartoonShows(page);
      } else if (category === 'cartoon_upcoming') {
        data = await getUpcomingCartoons(page);
      } else if (category === 'cartoon_on_air') {
        data = await getAiringNowCartoons(page);
      } else if (category === 'kdrama_top') {
        data = await getTopRatedKDramas(page);
      } else if (category === 'kdrama_upcoming') {
        data = await getUpcomingKDramas(page);
      } else if (category === 'kdrama_on_air') {
        data = await getAiringNowKDramas(page);
      }
    }

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching data:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
