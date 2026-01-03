'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SavedTitle {
  id: number;
  title: string;
  name: string;
  type: 'movie' | 'show';
  posterPath?: string | null;
  rating?: number;
  releaseYear?: number;
}

interface SavedTitlesSectionProps {
  titles: SavedTitle[];
}

export default function SavedTitlesSection({ titles }: SavedTitlesSectionProps) {
  if (!titles || titles.length === 0) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold text-white mb-6">My Saved Titles</h2>
        <div className="text-center py-12 rounded-xl bg-white/5 border border-white/10">
          <p className="text-gray-400 mb-2">No saved titles yet</p>
          <p className="text-gray-500 text-sm">Start saving your favorite titles to build your library</p>
        </div>
      </section>
    );
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

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
      const itemWidth = 206;
      const itemsToScroll = Math.floor(containerWidth / itemWidth);
      const scrollAmount = itemsToScroll * itemWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getTitleUrl = (title: SavedTitle) => {
    const type = title.type === 'movie' ? 'movies' : 'shows';
    return `/title/${type}/${title.id}`;
  };

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">My Saved Titles ({titles.length})</h2>
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
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {titles.map((title) => (
          <Link
            key={title.id}
            href={getTitleUrl(title)}
            className="flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start"
          >
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg rounded-lg">
              {title.posterPath ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${title.posterPath}`}
                  alt={title.title || title.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-white/5">
                  📺
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                  {title.title || title.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300">
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
