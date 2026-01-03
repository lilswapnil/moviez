'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface Episode {
  id: number;
  episode_number: number;
  name: string;
  still_path: string | null;
  overview: string;
  air_date: string;
  vote_average: number;
}

interface Season {
  season_number: number;
  name: string;
}

interface EpisodesSectionProps {
  seasons: Season[];
  tvId: number;
}

export default function EpisodesSection({ seasons, tvId }: EpisodesSectionProps) {
  if (!seasons || seasons.length === 0) {
    return null;
  }

  const [selectedSeason, setSelectedSeason] = useState(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const currentSeason = seasons[selectedSeason];

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/episodes?tvId=${tvId}&seasonNumber=${currentSeason.season_number}`);
        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedSeason, currentSeason.season_number, tvId]);

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
  }, [episodes]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 300;
      const gap = 40;
      const scrollAmount = 4 * (itemWidth + gap);
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemWidth = 300;
      const gap = 40;
      const scrollAmount = 4 * (itemWidth + gap);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Episodes</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => {
                setSelectedSeason(Number(e.target.value));
              }}
              className="appearance-none px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors cursor-pointer border border-gray-700 pr-10 text-sm"
            >
              {seasons.map((season, idx) => (
                <option key={season.season_number} value={idx}>
                  {season.name}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          {!loading && episodes.length > 0 && (
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
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        </div>
      ) : episodes.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No episodes available</div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-10 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex-shrink-0 w-[300px] cursor-pointer group transition-transform hover:scale-105 snap-start"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-800 shadow-lg rounded-lg">
                {episode.still_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                    alt={episode.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-500">
                    No Image
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-300 mb-1">
                        E{String(episode.episode_number).padStart(2, '0')}
                      </p>
                      <h3 className="text-sm font-semibold text-white line-clamp-2">
                        {episode.name}
                      </h3>
                    </div>
                    {episode.vote_average > 0 && (
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <span className="text-xs text-yellow-400">⭐</span>
                        <span className="text-xs text-gray-300">
                          {episode.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(episode.air_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-3">
                    {episode.overview || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
