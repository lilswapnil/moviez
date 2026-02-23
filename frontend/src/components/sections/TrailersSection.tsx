'use client';

import { useEffect, useState } from 'react';
import type { Trailer } from '@/lib/api/tmdb-types';

interface TrailersSectionProps {
  trailerType: 'movie' | 'tv';
  itemId: number;
  initialTrailers?: Trailer[];
}

export default function TrailersSection({ trailerType, itemId, initialTrailers }: TrailersSectionProps) {
  const [trailers, setTrailers] = useState<Trailer[]>(initialTrailers ?? []);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [loading, setLoading] = useState(!initialTrailers);

  useEffect(() => {
    if (initialTrailers) return;

    const fetchTrailers = async () => {
      try {
        const response = await fetch(`/api/v1/trailers?type=${trailerType}&id=${itemId}`);
        if (!response.ok) throw new Error('Failed to fetch trailers');
        const data = await response.json();
        const videos = Array.isArray(data.results) ? data.results : [];
        setTrailers(videos);
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [trailerType, itemId, initialTrailers]);

  if (loading) {
    return (
      <div className="px-6 md:px-12 lg:px-16 py-8">
        <div className="h-8 w-32 bg-white/10 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-white/10 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!trailers || trailers.length === 0) return null;

  return (
    <>
      <div className="px-6 md:px-12 lg:px-16 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Trailers & Clips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trailers.map((trailer) => (
            <button
              key={trailer.id}
              onClick={() => setSelectedTrailer(trailer)}
              className="group relative aspect-video overflow-hidden rounded-lg bg-black border border-white/10 hover:border-white/30 transition-all hover:scale-105"
            >
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                alt={trailer.name}
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              {/* Trailer Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-sm font-medium line-clamp-1">{trailer.name}</p>
                <p className="text-white/60 text-xs">{trailer.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {selectedTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedTrailer(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedTrailer(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                key={selectedTrailer.key}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=1&rel=0`}
                title={selectedTrailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                frameBorder={0}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-white text-xl font-semibold">{selectedTrailer.name}</h3>
              <p className="text-white/60 text-sm mt-1">{selectedTrailer.type}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
