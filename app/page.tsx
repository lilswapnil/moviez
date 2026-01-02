import { getNewReleases, getUpcomingMovies, getTrendingMovies, getTopRatedMovies, getTopRatedShows, getUpcomingShows } from '@/lib/tmdb';
import FeaturedBanner from './components/Featured';
import DataSection from './components/DataSection';

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
      <footer>
        <div className="text-center py-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Moviez. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
