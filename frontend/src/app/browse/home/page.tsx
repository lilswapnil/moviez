import {
  getNewReleases,
  getTopRatedMovies,
  getTopRatedShows,
  getTopRatedAnimeShows,
  getTopRatedCartoonShows,
  getTopRatedKDramas,
  getPopularMovies,
} from '@/lib/api/tmdb-client';
import FeaturedBanner from '@/components/media/FeaturedBanner';
import DataSection from '@/components/sections/DataSection';
import LazyDataSection from '@/components/sections/LazyDataSection';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // Revalidate every 24 hours (86400 seconds)

export default async function Home() {
  // Only fetch above-the-fold: banner + first 2 sections (reduces from 16 to 8 API calls)
  const [newReleases, topRatedMovies, topRatedShows, topAnime, topCartoons, topKDramas, internationalMovies] =
    await Promise.all([
      getNewReleases(),
      getTopRatedMovies(),
      getTopRatedShows(),
      getTopRatedAnimeShows(),
      getTopRatedCartoonShows(),
      getTopRatedKDramas(),
      getPopularMovies(),
    ]);

  return (
    <div>
      <main>
        <FeaturedBanner
          movies={newReleases}
          shows={topRatedShows}
          anime={topAnime}
          cartoon={topCartoons}
          kdrama={topKDramas}
          international={internationalMovies}
        />
        <DataSection title="Top Rated Movies" initialMovies={topRatedMovies} type="movies" category="top" />
        <LazyDataSection title="Upcoming Movies" type="movies" category="upcoming" />
        <LazyDataSection title="Top Rated Shows" type="shows" category="top" />
        <LazyDataSection title="Upcoming Shows" type="shows" category="upcoming" />
        <LazyDataSection title="On Air Shows" type="shows" category="on_air" />
        <LazyDataSection title="Top Anime" type="shows" category="anime_top" />
        <LazyDataSection title="Upcoming Anime" type="shows" category="anime_upcoming" />
        <LazyDataSection title="On Air Anime" type="shows" category="anime_on_air" />
        <LazyDataSection title="Top Cartoons" type="shows" category="cartoon_top" />
        <LazyDataSection title="Upcoming Cartoons" type="shows" category="cartoon_upcoming" />
        <LazyDataSection title="On Air Cartoons" type="shows" category="cartoon_on_air" />
        <LazyDataSection title="Top K Dramas" type="shows" category="kdrama_top" />
        <LazyDataSection title="Upcoming K Dramas" type="shows" category="kdrama_upcoming" />
        <LazyDataSection title="On Air K Dramas" type="shows" category="kdrama_on_air" />
        <DataSection title="Top International Movies" initialMovies={internationalMovies} type="movies" category="international" />
      </main>
    </div>
  );
}
