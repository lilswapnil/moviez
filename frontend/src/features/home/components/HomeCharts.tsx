'use client';

import { getImageUrl } from '@/lib/api/tmdb-client';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import { getTitleUrl } from '@/lib/utils/url';
import { useState } from 'react';
import Button from '@/components/common/Button';
import PosterCard from '@/components/common/PosterCard';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';

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

  if (items.length < 6) return null;

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll({
    itemWidth: 190,
    gap: 16,
    deps: [items.length],
  });

  return (
    <div className="mb-12 px-11">
      <SectionHeader
        title={title}
        rightSlot={
          <ScrollControls
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            showRight={canScrollRight}
            rightFallback={
              onShowMore ? (
                <Button
                  onClick={onShowMore}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  shape="pill"
                  className="px-3 py-1"
                >
                  {isLoading ? 'Loading...' : 'Show More'}
                </Button>
              ) : null
            }
          />
        }
      />
      <div 
        ref={scrollContainerRef}
        className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:gap-2 md:pb-6"
      >
        {items.map((item) => {
          const isMovie = 'release_date' in item;
          const titleType = isMovie ? 'movies' : 'shows';
          const imageUrl = item.poster_path ? getImageUrl(item.poster_path, 'w500') : null;
          const year = new Date(item.release_date || item.first_air_date || '').getFullYear();

          return (
            <PosterCard
              key={item.id}
              href={getTitleUrl(titleType, item.id)}
              title={item.title}
              imageUrl={imageUrl}
              sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 190px"
              linkClassName="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start"
              overlayMeta={
                <>
                  <span>⭐ {item.vote_average.toFixed(1)}</span>
                  <span>•</span>
                  <span>{year}</span>
                </>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
