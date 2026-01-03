'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

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
      const itemWidth = 206;
      const itemsToScroll = Math.floor(containerWidth / itemWidth);
      const scrollAmount = itemsToScroll * itemWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4">
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
        {items.map((item) => {
          const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : '';

          return (
            <Link
              key={item.id}
              href={`/title/movies/${item.id}`}
              className="flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg">
                {item.posterPath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                    alt={item.title}
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
                    {item.voteAverage && (
                      <>
                        <span>⭐ {item.voteAverage.toFixed(1)}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{year}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
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
    </div>
  );
}
