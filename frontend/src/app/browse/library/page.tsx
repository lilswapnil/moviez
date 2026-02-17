import { movieGenres, tvGenres, animeGenres, cartoonGenres } from '@/lib/constants/genres.const';
import ChartSection, { ChartWithPreview } from '@/components/sections/ChartSection';
import type { ChartPreviewItem } from '@/features/library/components/ChartPreviewRow';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import { chartSectionsConfig, chartFetchers } from '@/lib/utils/charts-mapping';
import Main from '@/components/common/Main';
import Header from '@/components/common/Header';
import Section from '@/components/common/Section';
import GenreSection from '@/components/sections/GenreSection';

export const dynamic = 'force-dynamic';

interface ChartSectionData {
  title: string;
  charts: ChartWithPreview[];
}

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

          const items = normalizedItems.slice(0, 12).reduce<ChartPreviewItem[]>((acc, item) => {
            const title = (() => {
              if ('title' in item && item.title) {
                return item.title;
              }

              if ('name' in item && item.name) {
                return item.name;
              }

              return undefined;
            })();

            if (!title) {
              return acc;
            }

            acc.push({
              id: item.id,
              title,
              poster_path: item.poster_path ?? null,
            });

            return acc;
          }, []);

          return { name: chartName, items };
        })
      );

      return { title, charts: chartData } as ChartSectionData;
    })
  );

  return (
    <div className="mt-4 px-12 py-16">
      <Main className="space-y-12">
        <Header className="mb-4">
          <h1 className="text-4xl font-bold text-white mb-2">Library</h1>
          <p className="text-gray-300">Browse movies, shows, anime, and cartoons by genre and by charts.</p>
        </Header>

        <Section className="grid gap-8 lg:grid-cols-2">
          {chartSections.map(({ title, charts }) => (
            <ChartSection key={title} title={title} charts={charts} />
          ))}
        </Section>

        <GenreSection
          title="Movie Genres"
          subtitle="Tap a genre to explore"
          genres={movieGenres}
          type="movies"
        />

        <GenreSection
          title="TV Genres"
          subtitle="Discover series by mood"
          genres={tvGenres}
          type="shows"
        />

        <GenreSection
          title="Anime Genres"
          subtitle="Find your favorite anime style"
          genres={animeGenres}
          type="animes"
        />

        <GenreSection
          title="Cartoon Genres"
          subtitle="Enjoy animated fun for all ages"
          genres={cartoonGenres}
          type="cartoons"
        />
      </Main>
    </div>
  );
}
