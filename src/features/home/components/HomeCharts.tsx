'use client';

import { getImageUrl } from '@/lib/api/tmdb-client';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

interface DataItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  release_date?: string;
  first_air_date?: string;
}

interface DataProps {
  title: string;
  movies?: Movie[];
  shows?: TVShow[];
  onShowMore?: () => void;
  isLoading?: boolean;
}

export default function HomeCards({ title, movies = [], shows = [], onShowMore, isLoading = false }: DataProps) {
  const items: DataItem[] = [
    ...movies.map(m => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      backdrop_path: m.backdrop_path,
      poster_path: m.poster_path,
      vote_average: m.vote_average,
      genre_ids: m.genre_ids,
      release_date: m.release_date
    })),
    ...shows.map(s => ({
      id: s.id,
      title: s.name,
      overview: s.overview,
      backdrop_path: s.backdrop_path,
      poster_path: s.poster_path,
      vote_average: s.vote_average,
      genre_ids: s.genre_ids,
      first_air_date: s.first_air_date
    }))
  ];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const itemWidth = 206; 
      const itemsToScroll = Math.floor(containerWidth / itemWidth);
      const scrollAmount = itemsToScroll * itemWidth;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const itemWidth = 206; // 190px width + 16px gap
      const itemsToScroll = Math.floor(containerWidth / itemWidth);
      const scrollAmount = itemsToScroll * itemWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12 px-11">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${
              !canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {canScrollRight ? (
            <button 
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors ${
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : ''
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            onShowMore && (
              <button
                onClick={onShowMore}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
              >
                {isLoading ? 'Loading...' : 'Show More'}
              </button>
            )
          )}
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {items.map((item) => {
          const isMovie = 'release_date' in item;
          const titleType = isMovie ? 'movies' : 'shows';
          
          return (
            <Link
              key={item.id}
              href={`/title/${titleType}/${item.id}`}
              className="flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg">
                {item.poster_path ? (
                  <Image
                    src={getImageUrl(item.poster_path, 'w500')}
                    alt={item.title || ''}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4">
                    <p className="text-center font-semibold line-clamp-3 text-sm">
                      {item.title}
                    </p>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <span>⭐ {item.vote_average.toFixed(1)}</span>
                    <span>•</span>
                    <span>{new Date(item.release_date || item.first_air_date || '').getFullYear()}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
