import { movieGenres, tvGenres, animeGenres, cartoonGenres, movieCharts, tvCharts, animeCharts, cartoonCharts } from '../../lib/category';
import Link from 'next/link';
import ChartSection, { ChartWithPreview } from '../components/ChartSection';
import type { ChartPreviewItem } from '../components/ChartPreviewRow';
import type { Movie, TVShow } from '../../lib/tmdb';
import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNewReleases,
  getPopularMovies,
  getTrendingTVShows,
  getTopRatedShows,
  getAiringTodayShows,
  getUpcomingShows,
  getPopularTVShows,
  getPopularAnimeShows,
  getTopRatedAnimeShows,
  getAiringNowAnimeShows,
  getUpcomingAnimeShows,
  getClassicAnimeShows,
  getPopularCartoonShows,
  getTopRatedCartoonShows,
  getKidsFavoriteCartoons,
  getTrendingCartoons,
  getFamilyCartoonShows,
} from '../../lib/tmdb';

interface ChartSectionData {
  title: string;
  charts: ChartWithPreview[];
}

const chartSectionsConfig = [
  { title: 'Movie Charts', charts: movieCharts },
  { title: 'TV Charts', charts: tvCharts },
  { title: 'Anime Charts', charts: animeCharts },
  { title: 'Cartoon Charts', charts: cartoonCharts },
];

type ChartFetcher = () => Promise<Movie[] | TVShow[]>;

const chartFetchers: Record<string, ChartFetcher> = {
  'Trending Movies': () => getTrendingMovies(),
  'Top Rated Movies': () => getTopRatedMovies(),
  'Upcoming Movies': () => getUpcomingMovies(),
  'Now Playing Movies': () => getNewReleases(),
  'Popular Movies': () => getPopularMovies(),
  'Trending TV Shows': () => getTrendingTVShows(),
  'Top Rated TV Shows': () => getTopRatedShows(),
  'Airing Today': () => getAiringTodayShows(),
  'On The Air': () => getUpcomingShows(),
  'Popular TV Shows': () => getPopularTVShows(),
  'Popular Anime': () => getPopularAnimeShows(),
  'Top Rated Anime': () => getTopRatedAnimeShows(),
  'Airing Now': () => getAiringNowAnimeShows(),
  'Upcoming Anime': () => getUpcomingAnimeShows(),
  'All Time Classics': () => getClassicAnimeShows(),
  'Popular Cartoons': () => getPopularCartoonShows(),
  'Top Rated Cartoons': () => getTopRatedCartoonShows(),
  'Kids Favorites': () => getKidsFavoriteCartoons(),
  'Trending Cartoons': () => getTrendingCartoons(),
  'Family Friendly': () => getFamilyCartoonShows(),
};

export default async function Library() {
  const chartSections: ChartSectionData[] = await Promise.all(
    chartSectionsConfig.map(async ({ title, charts }) => {
      const chartData = await Promise.all(
        charts.map(async (chartName) => {
          const fetcher = chartFetchers[chartName];
          if (!fetcher) {
            return { name: chartName, items: [] } as ChartWithPreview;
          }

          const results = await fetcher();
          const normalizedItems = (Array.isArray(results) ? results : []) as (Movie | TVShow)[];

          const items: ChartPreviewItem[] = normalizedItems
            .slice(0, 12)
            .map((item) => {
              const title = 'title' in item && item.title ? item.title : item.name;
              if (!title) {
                return null;
              }

              return {
                id: item.id,
                title,
                poster_path: item.poster_path ?? null,
              };
            })
            .filter((preview): preview is ChartPreviewItem => preview !== null);

          return { name: chartName, items };
        })
      );

      return { title, charts: chartData } as ChartSectionData;
    })
  );

  return (
    <div className="mt-4 px-12 py-16">
      <main className="max-w-6xl mx-auto space-y-12">
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-white mb-2">Library</h1>
          <p className="text-gray-300">Browse movies, shows, anime, and cartoons by genre and by charts.</p>
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          {chartSections.map(({ title, charts }) => (
            <ChartSection key={title} title={title} charts={charts} />
          ))}
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Movie Genres</h2>
            <span className="text-sm text-gray-400">Tap a genre to explore</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {movieGenres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/movies/${encodeURIComponent(genre)}`}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">TV Genres</h2>
            <span className="text-sm text-gray-400">Discover series by mood</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {tvGenres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/shows/${encodeURIComponent(genre)}`}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Anime Genres</h2>
            <span className="text-sm text-gray-400">Find your favorite anime style</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {animeGenres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/animes/${encodeURIComponent(genre)}`}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">Cartoon Genres</h2>
            <span className="text-sm text-gray-400">Enjoy animated fun for all ages</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {cartoonGenres.map((genre) => (
              <Link
                key={genre}
                href={`/genres/cartoons/${encodeURIComponent(genre)}`}
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
