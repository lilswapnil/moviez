import { getNewReleases, getUpcomingMovies, getTrendingMovies, getTopRatedMovies, getTopRatedShows, getUpcomingShows } from '@/lib/api/tmdb-client';
import FeaturedBanner from '@/components/media/FeaturedBanner';
import DataSection from '@/components/sections/DataSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const newReleases = await getNewReleases();
  const upcomingMovies = await getUpcomingMovies();
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const topRatedShows = await getTopRatedShows();
  const upcomingShows = await getUpcomingShows();

  return (
    <div>
      <main>
        <FeaturedBanner movies={newReleases} />
        <DataSection title="Trending Now" initialMovies={trendingMovies} type="movies" category="top_rated" />
        <DataSection title="Top Rated Movies" initialMovies={topRatedMovies} type="movies" category="top_rated" />
        <DataSection title="Top Rated Shows" initialShows={topRatedShows} type="shows" category="top_rated" />
        <DataSection title="Upcoming Movies" initialMovies={upcomingMovies} type="movies" category="upcoming" />
        <DataSection title="Upcoming Shows" initialShows={upcomingShows} type="shows" category="upcoming" />
      </main>
    </div>
  );
}
