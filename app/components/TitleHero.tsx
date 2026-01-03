'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getImageUrl, Trailer } from '@/lib/tmdb';

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

export default function TitleHero({ item, displayType, trailerType, children }: TitleHeroProps) {
  const router = useRouter();
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingTrailer, setIsFetchingTrailer] = useState(false);
  const [trailerError, setTrailerError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadTrailer = async () => {
      setIsFetchingTrailer(true);
      setTrailerError(false);
      try {
        const response = await fetch(`/api/trailers?type=${trailerType}&id=${item.id}`, {
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
  }, [item.id, trailerType]);

  const backgroundImage = useMemo(() => {
    const source = item.backdropPath ?? item.posterPath ?? '';
    return getImageUrl(source, 'original');
  }, [item.backdropPath, item.posterPath]);

  const runtimeLabel = useMemo(() => formatRuntime(item.runtimeMinutes), [item.runtimeMinutes]);
  const languageLabel = useMemo(() => formatLanguage(item.originalLanguage), [item.originalLanguage]);
  const hasGenres = Array.isArray(item.genres) && item.genres.length > 0;
  const ratingLabel = Number.isFinite(item.voteAverage) && item.voteAverage > 0 ? item.voteAverage.toFixed(1) : 'NR';

  const playButtonLabel = trailer
    ? 'Play Trailer'
    : isFetchingTrailer
    ? 'Loading Trailer...'
    : 'Trailer Unavailable';

  const saveLabel = isSaved ? 'Added to Library' : 'Add to Library';

  const handleSave = () => {
    try {
      // TODO: Wire this up to real persistence when available.
      setIsSaved(true);
      setSaveError(null);
    } catch (error) {
      console.error('Failed to save title:', error);
      setSaveError('Could not save this title right now.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-5" />

      <div className="relative z-10 px-6 pt-32 pb-24 md:px-12 lg:px-16">
        <div className="max-w-3xl">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
        >
          <span aria-hidden="true">&larr;</span>
          Back
        </button>

        {item.tagline ? (
          <p className="mt-8 text-lg text-white/70 italic">{item.tagline}</p>
        ) : null}

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
          {item.title}
        </h1>

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
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={!trailer}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            {playButtonLabel}
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span aria-hidden="true">♡</span>
            {saveLabel}
          </button>
        </div>
        </div>
      </div>

      {children ? <div className="relative z-10 px-6 md:px-12 lg:px-16 py-30">{children}</div> : null}
      {isModalOpen && trailer ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white transition-colors hover:text-gray-300"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                key={trailer.key}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                frameBorder={0}
              />
            </div>
          </div>
        </div>
      ) : null}

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
