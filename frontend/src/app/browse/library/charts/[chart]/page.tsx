import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chartFetchers, normalizeChartItems, getChartCategory } from '@/lib/utils/charts-mapping';
import { getChartNameFromSlug, chartSlugs } from '@/lib/utils/chart-slugs';
import ChartResultsContent from '../ChartResultsContent';
import Main from '@/components/common/Main';
import Header from '@/components/common/Header';

export const dynamic = 'force-dynamic';

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

  const results = await fetcher(1);
  const category = getChartCategory(chartName);
  const items = normalizeChartItems(Array.isArray(results) ? results : [], category);

  return (
    <div className="mt-20 px-6 py-16">
      <Main className="space-y-8">
        <div className="flex items-center gap-4">
          <Link
            href="/browse/library"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Back to Library
          </Link>
        </div>
        <Header className="space-y-2">
          <h1 className="text-4xl font-bold text-white">{chartName}</h1>
        </Header>
        <ChartResultsContent initialItems={items} slug={slug} />
      </Main>
    </div>
  );
}

export function generateStaticParams() {
  return chartSlugs.map((slug) => ({ chart: slug }));
}
