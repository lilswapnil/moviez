'use client';

import { useEffect, useRef, useState } from 'react';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import DataSection from './DataSection';

interface LazyDataSectionProps {
  title: string;
  type: 'movies' | 'shows';
  category: 'top' | 'upcoming' | 'on_air' | 'international' | 'anime_top' | 'anime_upcoming' | 'anime_on_air' | 'cartoon_top' | 'cartoon_upcoming' | 'cartoon_on_air' | 'kdrama_top' | 'kdrama_upcoming' | 'kdrama_on_air';
}

export default function LazyDataSection({ title, type, category }: LazyDataSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{ movies?: Movie[]; shows?: TVShow[] } | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { rootMargin: '200px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasIntersected]);

  useEffect(() => {
    if (!hasIntersected) return;

    const controller = new AbortController();
    fetch(`/api/v1/data?type=${type}&category=${category}&page=1`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((items) => {
        if (type === 'movies') {
          setData({ movies: Array.isArray(items) ? items : [] });
        } else {
          setData({ shows: Array.isArray(items) ? items : [] });
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('LazyDataSection fetch error:', err);
      });

    return () => controller.abort();
  }, [hasIntersected, type, category]);

  // Placeholder until in viewport, or loading skeleton while fetching
  if (!hasIntersected || data === null) {
    return (
      <div ref={ref} className="mb-12 px-11 min-h-[140px]" aria-label={`Loading ${title}`}>
        <div className="h-6 w-48 rounded bg-gray-800 animate-pulse mb-4" />
        <div className="flex gap-2 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[190px] aspect-[2/3] rounded bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <DataSection
        title={title}
        initialMovies={data.movies ?? []}
        initialShows={data.shows ?? []}
        type={type}
        category={category}
      />
    </div>
  );
}
