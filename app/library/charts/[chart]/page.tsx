import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chartFetchers } from '@/lib/charts';
import { getChartNameFromSlug, chartSlugs } from '@/lib/chartSlugs';
import type { Movie, TVShow } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';

type ChartResultsProps = {
  params: Promise<{
    chart: string;
  }>;
};

export default async function ChartResults({ params }: ChartResultsProps) {
  const { chart: slug } = await params;
  const chartName = getChartNameFromSlug(slug);

  if (!chartName) {
    notFound();
  }

  const fetcher = chartFetchers[chartName];

  if (!fetcher) {
    notFound();
  }

  const results = await fetcher();
  const normalizedItems = (Array.isArray(results) ? results : []) as (Movie | TVShow)[];

  const items = normalizedItems.slice(0, 24).map((item) => {
    const title = 'title' in item && item.title ? item.title : 'name' in item ? item.name : undefined;
    const dateValue = 'release_date' in item ? item.release_date : 'first_air_date' in item ? item.first_air_date : undefined;
    const year = dateValue ? new Date(dateValue).getFullYear() : undefined;
    const voteAverage = Number.isFinite(item.vote_average) ? item.vote_average : 0;

    return {
      id: item.id,
      title: title ?? 'Untitled',
      overview: item.overview,
      posterPath: item.poster_path ?? null,
      year,
      voteAverage,
    };
  });

  return (
    <div className="mt-20 px-6 py-16">
      <main className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Back to Library
          </Link>
        </div>
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-white">{chartName}</h1>
          <p className="text-gray-300">Full list of titles currently charting.</p>
        </header>
        {items.length === 0 ? (
          <p className="text-gray-400">No results available for this chart right now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {items.map(({ id, title, posterPath, year, voteAverage }) => (
              <div
                key={id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-900 shadow-lg">
                  {posterPath ? (
                    <Image
                      src={getImageUrl(posterPath, 'w500')}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 20vw, 16vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h2 className="text-white font-bold text-sm mb-2 line-clamp-3">{title}</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-200">
                      <span className="flex items-center">
                        <span className="mr-1">⭐</span>
                        {voteAverage.toFixed(1)}
                      </span>
                      {year ? (
                        <>
                          <span>•</span>
                          <span>{year}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return chartSlugs.map((slug) => ({ chart: slug }));
}
