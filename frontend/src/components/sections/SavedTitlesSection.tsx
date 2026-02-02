'use client';

import Card from '@/components/common/Card';
import PosterCard from '@/components/common/PosterCard';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';

import { getTitleUrl } from '@/lib/utils/url';

import type { SavedTitle } from '@/lib/hooks/useSavedTitles';

interface SavedTitlesSectionProps {
  titles: SavedTitle[];
}

export default function SavedTitlesSection({ titles }: SavedTitlesSectionProps) {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll({
    itemWidth: 190,
    gap: 16,
    deps: [titles.length],
  });

  const buildTitleUrl = (title: SavedTitle) => {
    const type = title.type === 'movie' ? 'movies' : 'shows';
    return getTitleUrl(type, title.id);
  };

  // Return early with hooks already called
  if (!titles || titles.length === 0) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold text-white mb-6">My Saved Titles</h2>
        <Card variant="default" radius="xl" className="text-center py-12">
          <p className="text-gray-400 mb-2">No saved titles yet</p>
          <p className="text-gray-500 text-sm">Start saving your favorite titles to build your library</p>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-4">
      <SectionHeader
        title={`My Saved Titles (${titles.length})`}
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
        className="flex items-start justify-start gap-[3px] overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {titles.map((title) => {
          const resolvedTitle = title.title || title.name || 'Saved Title';
          const imageUrl = title.posterPath
            ? `https://image.tmdb.org/t/p/w500${title.posterPath}`
            : null;

          return (
            <PosterCard
              key={title.id}
              href={buildTitleUrl(title)}
              title={resolvedTitle}
              imageUrl={imageUrl}
              sizes="200px"
              frameRadius="lg"
              placeholder={
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-white/5">
                  📺
                </div>
              }
              overlayMeta={
                <>
                  {title.rating ? (
                    <>
                      <span>⭐ {title.rating.toFixed(1)}</span>
                      <span>•</span>
                    </>
                  ) : null}
                  <span>{title.type === 'movie' ? '🎬 Movie' : '📺 Show'}</span>
                  {title.releaseYear ? (
                    <>
                      <span>•</span>
                      <span>{title.releaseYear}</span>
                    </>
                  ) : null}
                </>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
