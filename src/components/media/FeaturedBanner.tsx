'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/api/tmdb-client';
import type { Trailer, Movie, TVShow, Anime, Cartoon } from '@/lib/api/tmdb-types';

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  if (copy.length <= 1) {
    return copy;
  }

  let currentSeed = seed;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    currentSeed = (currentSeed * 1664525 + 1013904223) >>> 0;
    const j = currentSeed % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function isLandscapeVideo(videoId: string): boolean {
  // YouTube Shorts have IDs with specific patterns, but for safety
  // we assume landscape by default. In practice, Teaser/Trailer types
  // are almost always landscape format videos.
  return true;
}

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
  kind: 'movie' | 'tv' | 'anime' | 'cartoon' | 'kdrama' | 'international';
}


interface FeaturedBannerProps {
  movies?: Movie[];
  shows?: TVShow[];
  anime?: Anime[];
  cartoon?: Cartoon[];
  kdrama?: TVShow[];
  international?: Movie[];
}

export default function FeaturedBanner({ movies = [], shows = [], anime = [], cartoon = [], kdrama = [], international = [] }: FeaturedBannerProps) {
  // Track which poster is hovered: 'prev', 'next', or null
  const [hoveredPoster, setHoveredPoster] = useState<null | 'prev' | 'next'>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const trailerFailureCountsRef = useRef<Record<string, number>>({});
  const trailerCacheRef = useRef<Record<string, Trailer | null>>({});
  const MAX_TRAILER_FAILURES = 3;

  const allItems: FeaturedItem[] = useMemo(() => {
    const movieSeed = hashString(`movie:${movies.map((movie) => movie.id).join('-')}`);
    const showSeed = hashString(`tv:${shows.map((show) => show.id).join('-')}`);
    const animeSeed = hashString(`anime:${anime.map((item) => item.id).join('-')}`);
    const cartoonSeed = hashString(`cartoon:${cartoon.map((item) => item.id).join('-')}`);
    const kdramaSeed = hashString(`kdrama:${kdrama.map((item) => item.id).join('-')}`);
    const internationalSeed = hashString(`international:${international.map((item) => item.id).join('-')}`);

    const movieItems = shuffleWithSeed(
      movies.map((movie) => ({
        ...movie,
        kind: 'movie' as const,
        title: movie.title,
        release_date: movie.release_date,
      })),
      movieSeed
    );

    const showItems = shuffleWithSeed(
      shows.map((show) => ({
        ...show,
        kind: 'tv' as const,
        name: show.name,
        first_air_date: show.first_air_date,
      })),
      showSeed
    );

    const animeItems = shuffleWithSeed(
      anime.map((show) => ({
        ...show,
        kind: 'anime' as const,
        name: show.name,
        first_air_date: show.first_air_date,
      })),
      animeSeed
    );

    const cartoonItems = shuffleWithSeed(
      cartoon.map((show) => ({
        ...show,
        kind: 'cartoon' as const,
        name: show.name,
        first_air_date: show.first_air_date,
      })),
      cartoonSeed
    );

    const kdramaItems = shuffleWithSeed(
      kdrama.map((show) => ({
        ...show,
        kind: 'kdrama' as const,
        name: show.name,
        first_air_date: show.first_air_date,
      })),
      kdramaSeed
    );

    const internationalItems = shuffleWithSeed(
      international.map((movie) => ({
        ...movie,
        kind: 'international' as const,
        title: movie.title,
        release_date: movie.release_date,
      })),
      internationalSeed
    );

    const buckets = [movieItems, showItems, animeItems, cartoonItems, kdramaItems, internationalItems];
    const interleaved: FeaturedItem[] = [];
    const combinedKey = buckets
      .flat()
      .map((item) => `${item.kind}-${item.id}`)
      .join('|');
    const startIndex = hashString(combinedKey) % (buckets.length || 1);
    let bucketIndex = startIndex;

    while (interleaved.length < 10 && buckets.some((bucket) => bucket.length > 0)) {
      const bucket = buckets[bucketIndex % buckets.length];
      if (bucket.length > 0) {
        interleaved.push(bucket.shift()!);
      }
      bucketIndex += 1;
    }

    return interleaved;
  }, [anime, cartoon, movies, shows, kdrama, international]);

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
        // Auto-play only if we found a valid trailer
        if (value && value.key) {
          setShowTrailer(true);
          setIsPlaying(true);
        }
      }
    };

    const hasCache = Object.prototype.hasOwnProperty.call(trailerCacheRef.current, itemKey);
    if (hasCache) {
      const cachedTrailer = trailerCacheRef.current[itemKey];
      setTrailerSafely(cachedTrailer);
      return () => {
        cancelled = true;
      };
    }

    const fetchTrailer = async () => {
      setTrailer(null);
      setShowTrailer(false);
      setIsPlaying(false);
      
      try {
        const response = await fetch(`/api/v1/trailers?type=${featuredItem.kind}&id=${featuredItem.id}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Trailer request failed: ${response.status}`);
        }

        const data = await response.json();
        const allVideos: Trailer[] = Array.isArray(data.results) ? data.results : [];
        // Filter to only official trailers/teasers with specific naming
        const validTrailers = allVideos.filter(
          (video) => 
            (video.type === 'Teaser' || video.type === 'Trailer') && 
            isLandscapeVideo(video.key) &&
            (video.name?.includes('Official Trailer') || video.name?.includes('Official Teaser Trailer'))
        );

        if (validTrailers.length > 0) {
          trailerFailureCountsRef.current[itemKey] = 0;
          trailerCacheRef.current[itemKey] = validTrailers[0];
          setTrailerSafely(validTrailers[0]);
        } else {
          // No valid trailers found, cache null to skip future fetches
          const updatedFailures = (trailerFailureCountsRef.current[itemKey] ?? 0) + 1;
          trailerFailureCountsRef.current[itemKey] = updatedFailures;
          if (updatedFailures >= MAX_TRAILER_FAILURES) {
            trailerCacheRef.current[itemKey] = null;
          }
          console.warn(`No valid trailers found for ${itemKey} (attempt ${updatedFailures}/${MAX_TRAILER_FAILURES}).`);
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
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={featuredItem.id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`absolute inset-0 w-full h-full ${hoveredPoster ? 'backdrop-blur-md' : ''}`}
          style={{ zIndex: 0 }}
        >
      {/* Backdrop Background (always visible as base) */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${getImageUrl(featuredItem.backdrop_path)})` }}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* YouTube Teaser Video (overlays backdrop when playing) */}
      {showTrailer && isPlaying && trailer && trailer.key && (
        <div className="absolute inset-0 z-5">
          <iframe
            key={trailer.key}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
            title={trailer.name}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      )}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"></div>
      
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
              if (showTrailer && isPlaying) {
                setShowTrailer(false);
                setIsPlaying(false);
              } else if (trailer) {
                setShowTrailer(true);
                setIsPlaying(true);
              }
            }}
            disabled={!trailer}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            {showTrailer && isPlaying ? 'Pause' : 'Play Now'}
          </button>
          <a
            href={`/title/${
              featuredItem.kind === 'movie' ? 'movies'
              : featuredItem.kind === 'tv' ? 'shows'
              : featuredItem.kind === 'anime' ? 'animes'
              : featuredItem.kind === 'cartoon' ? 'cartoons'
              : featuredItem.kind === 'kdrama' ? 'shows' // treat kdrama as shows
              : featuredItem.kind === 'international' ? 'movies' // treat international as movies
              : 'movies'
            }/${featuredItem.id}`}
            className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
            style={{ textDecoration: 'none' }}
          >
            More Info
          </a>
        </div>
      </div>


      {/* Poster Previews for Previous/Next */}
      {allItems.length > 1 && (
        <>
          {/* Previous Poster */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center group bg-black/10 hover:bg-black/30 rounded-lg p-1 transition-all shadow-lg"
            style={{ width: 72, pointerEvents: 'auto' }}
            aria-label="Previous title"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: hoveredPoster === 'prev' ? 1 : 0.5, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredPoster('prev')}
            onMouseLeave={() => setHoveredPoster(null)}
          >
            <img
              src={getImageUrl(allItems[(safeIndex - 1 + allItems.length) % allItems.length].poster_path, 'w500')}
              alt="Previous poster"
              className={`w-16 h-24 object-cover rounded-md border-2 border-white/30 group-hover:border-red-600 transition-all duration-300 ${hoveredPoster === 'prev' ? 'opacity-100' : 'opacity-60'}`}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            />
          </motion.button>

          {/* Next Poster */}
          <motion.button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center group bg-black/10 hover:bg-black/30 rounded-lg p-1 transition-all shadow-lg"
            style={{ width: 72, pointerEvents: 'auto' }}
            aria-label="Next title"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: hoveredPoster === 'next' ? 1 : 0.5, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredPoster('next')}
            onMouseLeave={() => setHoveredPoster(null)}
          >
            <img
              src={getImageUrl(allItems[(safeIndex + 1) % allItems.length].poster_path, 'w500')}
              alt="Next poster"
              className={`w-16 h-24 object-cover rounded-md border-2 border-white/30 group-hover:border-red-600 transition-all duration-300 ${hoveredPoster === 'next' ? 'opacity-100' : 'opacity-60'}`}
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            />
          </motion.button>
        </>
      )}

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
    </div>
  );
}
