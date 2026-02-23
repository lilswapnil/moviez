'use client';

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api/tmdb-client';
import type { Trailer } from '@/lib/api/tmdb-types';
import type { SavedTitle } from '@/lib/hooks/useSavedTitles';
import Button from '@/components/common/Button';
import Loading from '@/app/loading';

interface TitleHeroItem {
  id: number;
  title: string;
  overview: string;
  voteAverage: number;
  releaseYear?: number;
  runtimeMinutes?: number | null;
  genres?: string[];
  backdropPath?: string | null;
  posterPath?: string | null;
  tagline?: string | null;
  originalLanguage?: string | null;
}

interface TitleHeroProps {
  item: TitleHeroItem;
  displayType: string;
  trailerType: 'movie' | 'tv';
  logoPath?: string | null;
  initialTrailer?: Trailer | null;
  children?: ReactNode;
}

function formatRuntime(minutes?: number | null): string | null {
  if (!minutes || minutes <= 0) {
    return null;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours > 0) {
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
  }
  return `${remaining}m`;
}

function formatLanguage(code?: string | null): string | null {
  if (!code) {
    return null;
  }
  return code.length <= 3 ? code.toUpperCase() : code;
}

export default function TitleHero({ item, displayType, trailerType, logoPath: initialLogoPath, initialTrailer, children }: TitleHeroProps) {
  const router = useRouter();
  const [trailer, setTrailer] = useState<Trailer | null>(initialTrailer ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFetchingTrailer, setIsFetchingTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [logoPath, setLogoPath] = useState<string | null>(initialLogoPath ?? null);
  const [isFetchingLogo, setIsFetchingLogo] = useState(initialLogoPath === undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(initialLogoPath === null);
  const logoCacheRef = useRef<Record<string, string | null>>({});

  // Maximum loading timeout: force show content after 3 seconds
  useEffect(() => {
    if (isFetchingLogo || (logoPath && !isImageLoaded)) {
      const timeout = setTimeout(() => {
        console.warn('Loading timeout (5s) - showing content');
        setIsFetchingLogo(false);
        setIsImageLoaded(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isFetchingLogo, logoPath, isImageLoaded]);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    // Skip fetch if trailer was provided from server
    if (initialTrailer !== undefined) {
      return;
    }

    let cancelled = false;

    const loadTrailer = async () => {
      setIsFetchingTrailer(true);
      setTrailerError(false);
      try {
        const response = await fetch(`/api/v1/trailers?type=${trailerType}&id=${item.id}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Trailer request failed with status ${response.status}`);
        }

        const data = await response.json();
        const videos: Trailer[] = Array.isArray(data.results) ? data.results : [];
        if (!cancelled) {
          setTrailer(videos[0] ?? null);
        }
      } catch (error) {
        console.error('Failed to load trailer:', error);
        if (!cancelled) {
          setTrailer(null);
          setTrailerError(true);
        }
      } finally {
        if (!cancelled) {
          setIsFetchingTrailer(false);
        }
      }
    };

    loadTrailer();

    return () => {
      cancelled = true;
    };
  }, [item.id, trailerType, initialTrailer]);

  // Fetch logo when item changes (only if not provided by server)
  useEffect(() => {
    // Skip fetch if logo was provided from server
    if (initialLogoPath !== undefined) {
      return;
    }

    const cacheKey = `${trailerType}-${item.id}`;
    const cached = logoCacheRef.current[cacheKey];

    if (cached !== undefined) {
      setLogoPath(cached);
      setIsFetchingLogo(false);
      if (cached === null) {
        setIsImageLoaded(true);
      }
      return;
    }

    let cancelled = false;
    setLogoPath(null);
    setIsFetchingLogo(true);
    const fetchLogo = async () => {
      try {
        const response = await fetch(`/api/v1/images?type=${trailerType}&id=${item.id}`, {
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
          setIsFetchingLogo(false);
          if (result === null) {
            setIsImageLoaded(true);
          }
        }
      } catch (error) {
        console.error('Failed to load logo:', error);
        logoCacheRef.current[cacheKey] = null;
        if (!cancelled) {
          setLogoPath(null);
          setIsFetchingLogo(false);
          setIsImageLoaded(true);
        }
      }
    };
    fetchLogo();
    return () => {
      cancelled = true;
    };
  }, [item.id, trailerType, initialLogoPath]);

  const backgroundImage = useMemo(() => {
    const source = item.backdropPath ?? item.posterPath ?? '';
    return getImageUrl(source, 'original');
  }, [item.backdropPath, item.posterPath]);

  const runtimeLabel = useMemo(() => formatRuntime(item.runtimeMinutes), [item.runtimeMinutes]);
  const languageLabel = useMemo(() => formatLanguage(item.originalLanguage), [item.originalLanguage]);
  const hasGenres = Array.isArray(item.genres) && item.genres.length > 0;
  const ratingLabel = Number.isFinite(item.voteAverage) && item.voteAverage > 0 ? item.voteAverage.toFixed(1) : 'NR';

  const saveLabel = isSaved ? 'Added to Library' : 'Add to Library';

  // Load saved titles from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedTitles');
      const savedTitles: SavedTitle[] = saved ? JSON.parse(saved) : [];
      const isTitleSaved = savedTitles.some((title) => title.id === item.id);
      setIsSaved(isTitleSaved);
    } catch (error) {
      console.error('Failed to load saved titles:', error);
    }
  }, [item.id]);

  const handleSave = () => {
    try {
      const saved = localStorage.getItem('savedTitles');
      const savedTitles: SavedTitle[] = saved ? JSON.parse(saved) : [];
      
      if (!isSaved) {
        // Determine type and name based on what's available
        const titleType = displayType === 'Movie' ? 'movie' : 'show';
        const titleName = item.title;
        
        const newTitle: SavedTitle = {
          id: item.id,
          title: titleName,
          name: titleName,
          type: titleType,
          posterPath: item.posterPath ?? undefined,
          rating: item.voteAverage,
          releaseYear: item.releaseYear,
        };
        
        savedTitles.push(newTitle);
        localStorage.setItem('savedTitles', JSON.stringify(savedTitles));
        setIsSaved(true);
      } else {
        // Remove from saved
        const updatedTitles = savedTitles.filter((title) => title.id !== item.id);
        localStorage.setItem('savedTitles', JSON.stringify(updatedTitles));
        setIsSaved(false);
      }
      setSaveError(null);
    } catch (error) {
      console.error('Failed to save title:', error);
      setSaveError('Could not save this title right now.');
    }
  };

  // Show loading spinner while fetching logo path or waiting for image to load
  if (isFetchingLogo || (logoPath && !isImageLoaded)) {
    return (
        <Loading />
      // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      //   <div className="flex flex-col items-center gap-4">
      //     <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      //     <p className="text-white/60 text-lg">Loading...</p>
      //   </div>
      // </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* YouTube Trailer Video (overlays backdrop when playing) */}
      {isPlaying && trailer && trailer.key && (
        <div 
          className="absolute inset-0 z-5 cursor-pointer"
          onClick={() => setIsPlaying(false)}
          title="Click to stop trailer"
        >
          <iframe
            key={trailer.key}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&rel=0&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3`}
            title={trailer.name}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </div>
      )}
      
      <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-5 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />

      <div className={`relative z-10 px-6 pt-32 md:px-12 lg:px-16 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="max-w-3xl">
        <Button
          type="button"
          onClick={handleBack}
          variant="text"
          size="sm"
          className="flex gap-[5px] px-0 py-0 text-sm font-normal"
        >
          <span aria-hidden="true">&larr;</span>
          Back
        </Button>

        {item.tagline ? (
          <p className="mt-8 text-lg text-white/70 italic">{item.tagline}</p>
        ) : null}

        {logoPath ? (
          <div className="relative w-full max-w-4xl h-auto mt-8">
            <Image
              src={getImageUrl(logoPath, 'original')}
              alt={item.title || 'Title Logo'}
              width={800}
              height={320}
              className="object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)]"
              style={{ maxHeight: '320px', width: 'auto', height: 'auto' }}
              priority
              draggable={false}
              onLoadingComplete={() => setIsImageLoaded(true)}
              onError={() => {
                console.error('Logo image failed to load');
                setLogoPath(null);
                setIsImageLoaded(true);
              }}
            />
          </div>
        ) : (
          <h1
            className="text-white font-extrabold tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          >
            {item.title}
          </h1>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-white/80">
          <span className="flex items-center gap-1">
            <span aria-hidden="true">⭐</span>
            {ratingLabel}
          </span>
          {item.releaseYear ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{item.releaseYear}</span>
            </>
          ) : null}
          {runtimeLabel ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{runtimeLabel}</span>
            </>
          ) : null}
          <>
            <span aria-hidden="true">•</span>
            <span>{displayType}</span>
          </>
          {languageLabel ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{languageLabel}</span>
            </>
          ) : null}
        </div>

        <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-2xl">
          {item.overview || 'No synopsis available for this title yet.'}
        </p>

        {hasGenres ? (
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/80">
            {item.genres!.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-4">
          {trailer ? (
            <Button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              size="lg"
              className="flex w-[120px] items-center justify-center gap-2"
            >
              {isPlaying ? (
                <>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <rect x="4.5" y="4" width="3" height="12" rx="1" />
                    <rect x="12.5" y="4" width="3" height="12" rx="1" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </>
              )}
            </Button>
          ) : null}

          <Button
            type="button"
            onClick={handleSave}
            variant="outline"
            size="lg"
            className={
              isSaved
                ? 'w-[150px] border border-red-500/50 bg-red-500/20 text-white hover:bg-red-500/30 flex gap-[5px]'
                : 'w-[150px] flex gap-[5px]'
            }
          >
            <span aria-hidden="true">{isSaved ? '♥' : '♡'}</span>
            {saveLabel}
          </Button>
        </div>
        </div>
      </div>

      {children ? <div className={`relative z-10 px-6 md:px-12 lg:px-16 pt-[50px] transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>{children}</div> : null}

      {trailerError && !trailer && !isFetchingTrailer ? (
        <div className="absolute bottom-10 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-4 py-3 text-center text-sm text-white/80">
          Trailer could not be loaded right now.
        </div>
      ) : null}

      {saveError ? (
        <div className="absolute bottom-10 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-4 py-3 text-center text-sm text-red-300">
          {saveError}
        </div>
      ) : null}
    </div>
  );
}
