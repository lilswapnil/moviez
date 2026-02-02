'use client';

import { getImageUrl } from '@/lib/api/tmdb-client';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import { getTitleUrl } from '@/lib/utils/url';
import PosterCard from '@/components/common/PosterCard';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';

interface SimilarTitlesProps {
  items: (Movie | TVShow)[];
  titleType: 'movies' | 'shows' | 'animes' | 'cartoons';
}

export default function SimilarTitles({ items, titleType }: SimilarTitlesProps) {
  const safeItems = Array.isArray(items) ? items : [];

  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll({
    itemWidth: 190,
    gap: 16,
    deps: [safeItems.length],
  });

  if (safeItems.length === 0) {
    return null;
  }

  const getItemTitle = (item: Movie | TVShow): string => {
    return 'title' in item ? item.title : item.name;
  };

  const getItemDate = (item: Movie | TVShow): string => {
    return 'release_date' in item ? item.release_date : item.first_air_date;
  };

  return (
    <div className="py-4">
      <SectionHeader
        title="Similar Titles"
        rightSlot={
          <ScrollControls
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
          />
        }
      />
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {safeItems.map((item) => {
          const title = getItemTitle(item);
          const date = getItemDate(item);
          const year = date ? new Date(date).getFullYear() : '';
          const imageUrl = item.poster_path ? getImageUrl(item.poster_path, 'w500') : null;

          return (
            <PosterCard
              key={item.id}
              href={getTitleUrl(titleType, item.id)}
              title={title}
              imageUrl={imageUrl}
              sizes="200px"
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
