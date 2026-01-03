import { 
  getNewReleases, 
  getUpcomingMovies, 
  getTrendingMovies, 
  getTopRatedMovies, 
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
import FeaturedBanner from '@/components/media/FeaturedBanner';
import DataSection from '@/components/sections/DataSection';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)

export default async function Home() {
  const newReleases = await getNewReleases();
  const upcomingMovies = await getUpcomingMovies();
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const topRatedShows = await getTopRatedShows();
  const upcomingShows = await getUpcomingShows();
  const topAnime = await getTopRatedAnimeShows();
  const upcomingAnime = await getUpcomingAnimeShows();
  const topCartoons = await getTopRatedCartoonShows();
  const trendingCartoons = await getTrendingCartoons();
  const internationalMovies = await getPopularMovies();
  const topKDramas = await getTopRatedKDramas();
  const upcomingKDramas = await getUpcomingKDramas();

  return (
    <div>
      <main>
        <FeaturedBanner movies={newReleases} />
        <DataSection title="Trending Now" initialMovies={trendingMovies} type="movies" category="top_rated" />
        <DataSection title="Top Rated Movies" initialMovies={topRatedMovies} type="movies" category="top_rated" />
        <DataSection title="Top Rated Shows" initialShows={topRatedShows} type="shows" category="top_rated" />
        <DataSection title="Upcoming Movies" initialMovies={upcomingMovies} type="movies" category="upcoming" />
        <DataSection title="Upcoming Shows" initialShows={upcomingShows} type="shows" category="upcoming" />
        <DataSection title="Top Anime" initialShows={topAnime} type="shows" category="anime" />
        <DataSection title="Upcoming Anime" initialShows={upcomingAnime} type="shows" category="anime" />
        <DataSection title="Top Cartoons" initialShows={topCartoons} type="shows" category="cartoon" />
        <DataSection title="Trending Cartoons" initialShows={trendingCartoons} type="shows" category="cartoon" />
        <DataSection title="Popular International Movies" initialMovies={internationalMovies} type="movies" category="international" />
        <DataSection title="Top K Dramas" initialShows={topKDramas} type="shows" category="kdrama" />
        <DataSection title="Upcoming K Dramas" initialShows={upcomingKDramas} type="shows" category="kdrama" />
      </main>
    </div>
  );
}
