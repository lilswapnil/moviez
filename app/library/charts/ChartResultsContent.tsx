'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import type { ChartResultItem } from '@/lib/charts';

interface ChartResultsContentProps {
  initialItems: ChartResultItem[];
  slug: string;
}

export default function ChartResultsContent({ initialItems, slug }: ChartResultsContentProps) {
  const [items, setItems] = useState<ChartResultItem[]>(initialItems);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/charts?slug=${encodeURIComponent(slug)}&page=${page + 1}`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const newItems: ChartResultItem[] = Array.isArray(data.items) ? data.items : [];

      if (newItems.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more chart results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return <p className="text-gray-400">No results available for this chart right now.</p>;
  }

  return (
    <>
      <p className="text-gray-300">Showing {items.length} results</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {items.map(({ id, title, posterPath, year, voteAverage, mediaType }) => {
          const pathSegment = mediaType === 'movie' ? 'movies' : mediaType === 'tv' ? 'shows' : mediaType === 'anime' ? 'animes' : 'cartoons';
          const href = `/title/${pathSegment}/${id}`;

          return (
            <Link
              key={id}
              href={href}
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
            </Link>
          );
        })}
      </div>
      {hasMore ? (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      ) : null}
    </>
  );
}
