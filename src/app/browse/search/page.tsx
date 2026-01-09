import Link from 'next/link';
import SearchResultsContent from './SearchResultsContent';
import { searchTitles } from '@/lib/api/tmdb-client';
import { normalizeChartItems, type ChartResultItem } from '@/lib/utils/charts-mapping';
import Main from '@/components/common/Main';
import Header from '@/components/common/Header';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const queryParam = params.q ?? '';
  const query = queryParam.trim();

  let initialItems: ChartResultItem[] = [];

  if (query) {
    const results = await searchTitles(query, 1);
    initialItems = normalizeChartItems(results, 'tv');
  }

  return (
    <div className="mt-20 px-6 py-16">
      <Main className="space-y-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
        <Header className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Search</h1>
          {query ? (
            <p className="text-gray-300">Results for &quot;{query}&quot;</p>
          ) : (
            <p className="text-gray-300">Start typing in the search bar to discover movies and shows.</p>
          )}
        </Header>
        {query ? (
          <SearchResultsContent initialItems={initialItems} query={query} />
        ) : null}
      </Main>
    </div>
  );
}
