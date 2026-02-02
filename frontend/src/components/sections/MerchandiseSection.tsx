'use client';

import { getTitleUrl } from '@/lib/utils/url';
import PosterCard from '@/components/common/PosterCard';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';

interface MerchandiseItem {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage?: number;
}

interface MerchandiseSectionProps {
  items: MerchandiseItem[];
  title?: string;
}

export default function MerchandiseSection({ items, title = 'More from this Franchise' }: MerchandiseSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

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
    <div className="py-4">
      <SectionHeader
        title={title}
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
        {items.map((item) => {
          const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : '';
          const imageUrl = item.posterPath
            ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
            : null;

          return (
            <PosterCard
              key={item.id}
              href={getTitleUrl('movies', item.id)}
              title={item.title}
              imageUrl={imageUrl}
              sizes="200px"
              overlayMeta={
                <>
                  {item.voteAverage ? (
                    <>
                      <span>⭐ {item.voteAverage.toFixed(1)}</span>
                      <span>•</span>
                    </>
                  ) : null}
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
