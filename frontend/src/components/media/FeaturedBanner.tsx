'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/api/tmdb-client';
import Button from '@/components/common/Button';
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
  const [logoPath, setLogoPath] = useState<string | null>(null);
  const trailerFailureCountsRef = useRef<Record<string, number>>({});
  const trailerCacheRef = useRef<Record<string, Trailer | null>>({});
  const logoCacheRef = useRef<Record<string, string | null>>({});
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

  // Fetch trailer when item changes (use cache to avoid repeated fetches and EMFILE)
  useEffect(() => {
    if (!featuredItem) return;
    const cacheKey = `${featuredItem.kind}-${featuredItem.id}`;
    const cached = trailerCacheRef.current[cacheKey];

    if (cached !== undefined) {
      setTrailer(cached);
      setShowTrailer(false);
      setIsPlaying(false);
      return;
    }

    let cancelled = false;
    setTrailer(null);
    setShowTrailer(false);
    setIsPlaying(false);
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`/api/v1/trailers?type=${featuredItem.kind}&id=${featuredItem.id}`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`Trailer request failed with status ${response.status}`);
        }
        const data = await response.json();
        const videos: Trailer[] = Array.isArray(data.results) ? data.results : [];
        const result = videos[0] ?? null;
        trailerCacheRef.current[cacheKey] = result;
        if (!cancelled) {
          setTrailer(result);
        }
      } catch (error) {
        console.error('Failed to load trailer:', error);
        trailerCacheRef.current[cacheKey] = null;
        if (!cancelled) {
          setTrailer(null);
        }
      }
    };
    fetchTrailer();
    return () => {
      cancelled = true;
    };
  }, [featuredItem, featuredItem?.id, featuredItem?.kind]);

  // Fetch logo when item changes (use cache to avoid repeated fetches)
  useEffect(() => {
    if (!featuredItem) return;
    const cacheKey = `${featuredItem.kind}-${featuredItem.id}`;
    const cached = logoCacheRef.current[cacheKey];

    if (cached !== undefined) {
      setLogoPath(cached);
      return;
    }

    let cancelled = false;
    setLogoPath(null);
    const fetchLogo = async () => {
      try {
        const response = await fetch(`/api/v1/images?type=${featuredItem.kind}&id=${featuredItem.id}`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`Images request failed with status ${response.status}`);
        }
        const data = await response.json();
        const logos = Array.isArray(data.logos) ? data.logos : [];
        // Find an English logo if available
        const enLogo = logos.find((logo: any) => logo.iso_639_1 === 'en' || logo.iso_639_1 === null);
        const result = enLogo?.file_path || (logos[0]?.file_path ?? null);
        logoCacheRef.current[cacheKey] = result;
        if (!cancelled) {
          setLogoPath(result);
        }
      } catch (error) {
        console.error('Failed to load logo:', error);
        logoCacheRef.current[cacheKey] = null;
        if (!cancelled) {
          setLogoPath(null);
        }
      }
    };
    fetchLogo();
    return () => {
      cancelled = true;
    };
  }, [featuredItem, featuredItem?.id, featuredItem?.kind]);

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

  // Auto-slide logic
  useEffect(() => {
    if (allItems.length <= 1) return;
    if (showTrailer && isPlaying) return; // Pause auto-slide when trailer is playing
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allItems.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [allItems.length, showTrailer, isPlaying]);

  if (!featuredItem) {
    return (
      <div className="relative min-h-screen mx-4 mb-8 rounded-sm overflow-hidden bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading featured content...</p>
      </div>
    );
  }

  // Compute the next two items' posters for preview
  // Compute the next item's poster for preview
  const nextIndex = allItems.length > 1 ? (safeIndex + 1) % allItems.length : 0;
  const nextItem = allItems[nextIndex];

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
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&rel=0&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
            title={trailer.name}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      )}
      
      {/* Dark overlay for text readability */}
      <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}></div>

      {/* Top-left Theater-Style Title */}
      <div className={`absolute top-24 left-12 z-20 max-w-4xl pointer-events-none transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        {logoPath ? (
          <div className="relative w-full max-w-4xl h-auto">
            <Image
              src={getImageUrl(logoPath, 'original')}
              alt={featuredItem.title || featuredItem.name || 'Title Logo'}
              width={800}
              height={320}
              className="object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]"
              style={{ maxHeight: '320px', width: 'auto', height: 'auto' }}
              priority
              draggable={false}
            />
          </div>
        ) : (
          <h1
            className="
              text-white
              font-extrabold
              tracking-tight
              leading-none
              drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-9xl
            "
          >
            {featuredItem.title || featuredItem.name}
          </h1>
        )}
      </div>

      {/* Poster previews for next 2 items at the right bottom edge of the banner, hidden when trailer is playing */}
      {!(showTrailer && isPlaying) && nextItem && nextItem.poster_path && (
        <div
          className="fixed md:absolute right-8 bottom-8 z-30"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            key={nextItem.id}
            className="relative w-32 aspect-[2/3] overflow-hidden bg-gray-800 shadow-lg rounded-lg border-2 border-white/40 transition-transform duration-300 hover:scale-105"
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentIndex(nextIndex)}
            title={nextItem.title || nextItem.name || 'Next'}
          >
            <Image
              src={getImageUrl(nextItem.poster_path, 'w500')}
              alt={nextItem.title || nextItem.name || 'Next Poster'}
              fill
              className="object-cover"
              sizes="200px"
              draggable={false}
              priority={false}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`absolute bottom-0 left-0 z-20 pb-24 px-12 max-w-2xl`}>
        <p className={`text-xl text-gray-300 mb-4 leading-relaxed line-clamp-3 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {featuredItem.overview}
        </p>
        <div className={`flex items-center gap-4 mb-6 text-gray-300 transition-opacity duration-500 ${showTrailer && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <span className="flex items-center gap-1">
            ⭐ {featuredItem.vote_average.toFixed(1)}
          </span>
          <span>•</span>
          <span>{new Date(featuredItem.release_date || featuredItem.first_air_date || '').getFullYear()}</span>
        </div>
        <div className="flex gap-4 transition-opacity duration-500">
          <Button
            onClick={goToPrev}
            aria-label="Previous"
            variant="secondary"
            size="sm"
            className="px-3 py-2"
            disabled={allItems.length <= 1}
          >
            {/* Left arrow */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><polygon points="13,4 7,10 13,16" /></svg>
          </Button>
          {trailer ? (
            <Button
              onClick={() => {
                if (showTrailer && isPlaying) {
                  setShowTrailer(false);
                  setIsPlaying(false);
                } else {
                  setShowTrailer(true);
                  setIsPlaying(true);
                }
              }}
              variant="primary"
              size="hero"
              className="flex min-w-0 w-20 items-center justify-center px-4"
            >
              {showTrailer && isPlaying ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <rect x="4.5" y="4" width="3" height="12" rx="1" />
                    <rect x="12.5" y="4" width="3" height="12" rx="1" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <polygon points="6,4 16,10 6,16" />
                  </svg>
                  Play
                </>
              )}
            </Button>
          ) : null}
          <Button
            href={`/title/${
              featuredItem.kind === 'movie' ? 'movies'
              : featuredItem.kind === 'tv' ? 'shows'
              : featuredItem.kind === 'anime' ? 'animes'
              : featuredItem.kind === 'cartoon' ? 'cartoons'
              : featuredItem.kind === 'kdrama' ? 'shows' // treat kdrama as shows
              : featuredItem.kind === 'international' ? 'movies' // treat international as movies
              : 'movies'
            }/${featuredItem.id}`}
            variant="secondary"
            size="hero"
            className="backdrop-blur-sm !flex flex-col items-center justify-center"
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
} 
