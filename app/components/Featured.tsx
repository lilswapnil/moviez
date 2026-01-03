'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getImageUrl } from '@/lib/tmdb';
import type { Trailer, Movie, TVShow, Anime, Cartoon } from '@/lib/tmdb';

interface FeaturedItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  kind: 'movie' | 'tv' | 'anime' | 'cartoon';
}

interface FeaturedBannerProps {
  movies?: Movie[];
  shows?: TVShow[];
  anime?: Anime[];
  cartoon?: Cartoon[];
}

export default function FeaturedBanner({ movies = [], shows = [], anime = [], cartoon = [] }: FeaturedBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const trailerFailureCountsRef = useRef<Record<string, number>>({});
  const trailerCacheRef = useRef<Record<string, Trailer | null>>({});
  const MAX_TRAILER_FAILURES = 3;

  const allItems: FeaturedItem[] = useMemo(() => {
    const movieItems = movies.map((movie) => ({
      ...movie,
      kind: 'movie' as const,
      title: movie.title,
      release_date: movie.release_date,
    }));

    const showItems = shows.map((show) => ({
      ...show,
      kind: 'tv' as const,
      name: show.name,
      first_air_date: show.first_air_date,
    }));

    const animeItems = anime.map((show) => ({
      ...show,
      kind: 'anime' as const,
      name: show.name,
      first_air_date: show.first_air_date,
    }));

    const cartoonItems = cartoon.map((show) => ({
      ...show,
      kind: 'cartoon' as const,
      name: show.name,
      first_air_date: show.first_air_date,
    }));

    return [...movieItems, ...showItems, ...animeItems, ...cartoonItems].slice(0, 10);
  }, [anime, cartoon, movies, shows]);

  const safeIndex = useMemo(() => {
    if (allItems.length === 0) {
      return 0;
    }
    return Math.min(currentIndex, allItems.length - 1);
  }, [allItems.length, currentIndex]);

  const featuredItem = allItems[safeIndex];

  // Fetch trailer when item changes
  useEffect(() => {
    if (!featuredItem) return;
    const itemKey = `${featuredItem.kind}-${featuredItem.id}`;
    const failureCount = trailerFailureCountsRef.current[itemKey] ?? 0;

    if (failureCount >= MAX_TRAILER_FAILURES) {
      console.warn(`Skipping trailer fetch for ${itemKey} after repeated failures.`);
      setTrailer(null);
      setShowTrailer(false);
      setIsPlaying(false);
      return;
    }
    
    let cancelled = false;
    const setTrailerSafely = (value: Trailer | null) => {
      if (!cancelled) {
        setTrailer(value);
      }
    };

    const hasCache = Object.prototype.hasOwnProperty.call(trailerCacheRef.current, itemKey);
    if (hasCache) {
      const cachedTrailer = trailerCacheRef.current[itemKey];
      setTrailerSafely(cachedTrailer);
      setShowTrailer(false);
      setIsPlaying(false);
      return () => {
        cancelled = true;
      };
    }

    const fetchTrailer = async () => {
      setTrailerSafely(null);
      setShowTrailer(false);
      setIsPlaying(false);
      
      try {
        const response = await fetch(`/api/trailers?type=${featuredItem.kind}&id=${featuredItem.id}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Trailer request failed: ${response.status}`);
        }

        const data = await response.json();
        const trailers: Trailer[] = Array.isArray(data.results) ? data.results : [];

        if (trailers.length > 0) {
          trailerFailureCountsRef.current[itemKey] = 0;
          trailerCacheRef.current[itemKey] = trailers[0];
          setTrailerSafely(trailers[0]);
        } else {
          const updatedFailures = (trailerFailureCountsRef.current[itemKey] ?? 0) + 1;
          trailerFailureCountsRef.current[itemKey] = updatedFailures;
          if (updatedFailures >= MAX_TRAILER_FAILURES) {
            trailerCacheRef.current[itemKey] = null;
          }
          console.warn(`No trailers found for ${itemKey} (attempt ${updatedFailures}/${MAX_TRAILER_FAILURES}).`);
        }
      } catch (error) {
        const updatedFailures = (trailerFailureCountsRef.current[itemKey] ?? 0) + 1;
        trailerFailureCountsRef.current[itemKey] = updatedFailures;
        if (updatedFailures >= MAX_TRAILER_FAILURES) {
          trailerCacheRef.current[itemKey] = null;
          console.error(`Stopping trailer fetches for ${itemKey} after ${updatedFailures} failures.`, error);
        } else {
          console.error(`Error fetching trailer for ${itemKey} (attempt ${updatedFailures}/${MAX_TRAILER_FAILURES}):`, error);
        }
      }
    };
    
    fetchTrailer();
    return () => {
      cancelled = true;
    };
  }, [featuredItem?.id, featuredItem?.kind]);

  const goToNext = () => {
    if (allItems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % allItems.length);
  };

  const goToPrev = () => {
    if (allItems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!featuredItem) {
    return (
      <div className="relative min-h-screen mx-4 mb-8 rounded-sm overflow-hidden bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading featured content...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen mb-8 rounded-2xl overflow-hidden group">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${getImageUrl(featuredItem.backdrop_path)})` }}
      ></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 z-20 pb-24 px-12 max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-4">{featuredItem.title || featuredItem.name}</h1>
        <p className="text-xl text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {featuredItem.overview}
        </p>
        <div className="flex items-center gap-4 mb-6 text-gray-300">
          <span className="flex items-center gap-1">
            ⭐ {featuredItem.vote_average.toFixed(1)}
          </span>
          <span>•</span>
          <span>{new Date(featuredItem.release_date || featuredItem.first_air_date || '').getFullYear()}</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              setShowTrailer(true);
              setIsPlaying(true);
            }}
            disabled={!trailer}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            {showTrailer && isPlaying ? 'Pause' : 'Play Now'}
          </button>
          <button className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors">
            More Info
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {allItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === safeIndex 
                ? 'w-8 h-2 bg-red-600' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            } rounded-full`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {/* Trailer Modal */}
      {showTrailer && isPlaying && trailer && trailer.key && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => {
                setShowTrailer(false);
                setIsPlaying(false);
              }}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                key={trailer.key}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0`}
                title={trailer.name}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
