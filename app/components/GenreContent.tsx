'use client';

import { useMemo, useState } from 'react';
import { Movie, TVShow, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

interface GenreContentProps {
  initialResults: (Movie | TVShow)[];
  type: 'movies' | 'shows' | 'animes' | 'cartoons';
  genreId: number;
}

type SortOption = 'popularity' | 'rating' | 'newest' | 'oldest';

export default function GenreContent({
  initialResults,
  type,
  genreId,
}: GenreContentProps) {
  const [results, setResults] = useState<(Movie | TVShow)[]>(initialResults);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('popularity');

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/genres?type=${type}&genreId=${genreId}&page=${page + 1}`
      );
      const newData = await response.json();

      if (newData && newData.length > 0) {
        setResults((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedResults = useMemo(() => {
    const items = [...results];

    const getDateValue = (item: Movie | TVShow) => {
      const dateValue = 'release_date' in item ? item.release_date : item.first_air_date;
      if (!dateValue) {
        return 0;
      }
      const timestamp = new Date(dateValue).getTime();
      return Number.isNaN(timestamp) ? 0 : timestamp;
    };

    switch (sortOption) {
      case 'rating':
        return items.sort((a, b) => b.vote_average - a.vote_average);
      case 'newest':
        return items.sort((a, b) => getDateValue(b) - getDateValue(a));
      case 'oldest':
        return items.sort((a, b) => getDateValue(a) - getDateValue(b));
      case 'popularity':
      default:
        return items.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    }
  }, [results, sortOption]);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end mb-6">
        <label htmlFor="genre-sort" className="text-sm text-white/70">
          Sort by
        </label>
        <select
          id="genre-sort"
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value as SortOption)}
          className="w-full max-w-xs rounded-full border border-white/15 bg-black/50 px-4 py-2 text-sm text-white focus:border-red-500/60 focus:outline-none"
        >
          <option value="popularity">Most Popular</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {sortedResults.map((item) => {
          const title = 'title' in item ? item.title : item.name;
          const date = 'release_date' in item ? item.release_date : item.first_air_date;
          return (
            <Link
              key={item.id}
              href={`/title/${type}/${item.id}`}
              className="group block transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg">
                {item.poster_path ? (
                  <Image
                    src={getImageUrl(item.poster_path, 'w500')}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 20vw, 16vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
                    No Image
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-sm mb-2 line-clamp-3">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-200">
                    <span className="flex items-center">
                      <span className="mr-1">⭐</span>
                      {item.vote_average.toFixed(1)}
                    </span>
                    <span>•</span>
                    <span>{new Date(date || '').getFullYear()}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </>
  );
}
