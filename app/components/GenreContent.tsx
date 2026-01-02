'use client';

import { useState, useEffect } from 'react';
import { Movie, TVShow, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';

interface GenreContentProps {
  initialResults: (Movie | TVShow)[];
  type: 'movies' | 'shows' | 'animes' | 'cartoons';
  genre: string;
  genreId: number;
}

export default function GenreContent({
  initialResults,
  type,
  genre,
  genreId,
}: GenreContentProps) {
  const [results, setResults] = useState<(Movie | TVShow)[]>(initialResults);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {results.map((item) => {
          const title = 'title' in item ? item.title : item.name;
          const date = 'release_date' in item ? item.release_date : item.first_air_date;
          return (
            <div
              key={item.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-2xl"
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
            </div>
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
