'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Select from '@/components/common/Select';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollControls from '@/components/common/ScrollControls';
import useHorizontalScroll from '@/lib/hooks/useHorizontalScroll';

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
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useHorizontalScroll({
    itemWidth: 300,
    gap: 40,
    itemsPerScroll: 4,
    deps: [episodes.length],
  });

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


  return (
    <div className="py-8">
      <SectionHeader
        title="Episodes"
        rightSlot={
          <div className="flex items-center gap-4">
            <div className="relative">
              <Select
                value={selectedSeason}
                onChange={(e) => {
                  setSelectedSeason(Number(e.target.value));
                }}
                variant="solid"
                size="sm"
                shape="rounded"
                className="appearance-none cursor-pointer pr-10"
              >
                {seasons.map((season, idx) => (
                  <option key={season.season_number} value={idx}>
                    {season.name}
                  </option>
                ))}
              </Select>
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
              <ScrollControls
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
              />
            )}
          </div>
        }
      />

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
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 text-gray-300 p-4">
                    <p className="text-center font-semibold line-clamp-3 text-xs">
                      {episode.name}
                    </p>
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

    </div>
  );
}
