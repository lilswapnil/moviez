import { 
  getNewReleases, 
  getUpcomingMovies,
  getTopRatedMovies, 
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
import FeaturedBanner from '@/components/media/FeaturedBanner';
import DataSection from '@/components/sections/DataSection';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)

export default async function Home() {
  const newReleases = await getNewReleases();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedShows = await getTopRatedShows();
  const upcomingShows = await getUpcomingShows();
  const onAirShows = await getAiringNowShows();
  const topAnime = await getTopRatedAnimeShows();
  const upcomingAnime = await getUpcomingAnimeShows();
  const onAirAnime = await getAiringNowAnimeShows();
  const topCartoons = await getTopRatedCartoonShows();
  const upcomingCartoons = await getUpcomingCartoons();
  const onAirCartoons = await getAiringNowCartoons();
  const topKDramas = await getTopRatedKDramas();
  const upcomingKDramas = await getUpcomingKDramas();
  const onAirKDramas = await getAiringNowKDramas();
  const internationalMovies = await getPopularMovies();

  return (
    <div>
      <main>
        <FeaturedBanner movies={newReleases} />
        <DataSection title="Top Rated Movies" initialMovies={topRatedMovies} type="movies" category="top" />
        <DataSection title="Upcoming Movies" initialMovies={upcomingMovies} type="movies" category="upcoming" />
        <DataSection title="Top Rated Shows" initialShows={topRatedShows} type="shows" category="top" />
        <DataSection title="Upcoming Shows" initialShows={upcomingShows} type="shows" category="upcoming" />
        <DataSection title="On Air Shows" initialShows={onAirShows} type="shows" category="on_air" />
        <DataSection title="Top Anime" initialShows={topAnime} type="shows" category="anime_top" />
        <DataSection title="Upcoming Anime" initialShows={upcomingAnime} type="shows" category="anime_upcoming" />
        <DataSection title="On Air Anime" initialShows={onAirAnime} type="shows" category="anime_on_air" />
        <DataSection title="Top Cartoons" initialShows={topCartoons} type="shows" category="cartoon_top" />
        <DataSection title="Upcoming Cartoons" initialShows={upcomingCartoons} type="shows" category="cartoon_upcoming" />
        <DataSection title="On Air Cartoons" initialShows={onAirCartoons} type="shows" category="cartoon_on_air" />
        <DataSection title="Top K Dramas" initialShows={topKDramas} type="shows" category="kdrama_top" />
        <DataSection title="Upcoming K Dramas" initialShows={upcomingKDramas} type="shows" category="kdrama_upcoming" />
        <DataSection title="On Air K Dramas" initialShows={onAirKDramas} type="shows" category="kdrama_on_air" />
        <DataSection title="Top International Movies" initialMovies={internationalMovies} type="movies" category="international" />
      </main>
    </div>
  );
}
