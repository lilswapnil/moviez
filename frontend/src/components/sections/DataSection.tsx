'use client';

import { useState } from 'react';
import type { Movie, TVShow } from '@/lib/api/tmdb-types';
import { fetchApi } from '@/lib/api/fetch-api';
import HomeCharts from '@/features/home/components/HomeCharts';

interface DataSectionProps {
  title: string;
  initialMovies?: Movie[];
  initialShows?: TVShow[];
  type: 'movies' | 'shows';
  category: 'top' | 'upcoming' | 'on_air' | 'international' | 'anime_top' | 'anime_upcoming' | 'anime_on_air' | 'cartoon_top' | 'cartoon_upcoming' | 'cartoon_on_air' | 'kdrama_top' | 'kdrama_upcoming' | 'kdrama_on_air';
}

export default function DataSection({
  title,
  initialMovies = [],
  initialShows = [],
  type,
  category,
}: DataSectionProps) {
  const isUpcomingCategory = category === 'upcoming' || category.endsWith('_upcoming');
  const filterByPoster = <T extends { poster_path?: string | null }>(items: T[]) =>
    isUpcomingCategory ? items.filter((item) => Boolean(item.poster_path)) : items;

  const [movies, setMovies] = useState<Movie[]>(filterByPoster<Movie>(initialMovies));
  const [shows, setShows] = useState<TVShow[]>(filterByPoster<TVShow>(initialShows));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetchApi(
        `/api/v1/data?type=${type}&category=${category}&page=${page + 1}`
      );
      const newData = await response.json();

      if (type === 'movies') {
        const nextItems = filterByPoster<Movie>(newData as Movie[]);
        setMovies((prev) => [...prev, ...nextItems]);
      } else {
        const nextItems = filterByPoster<TVShow>(newData as TVShow[]);
        setShows((prev) => [...prev, ...nextItems]);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeCharts
      title={title}
      movies={movies}
      shows={shows}
      onShowMore={handleShowMore}
      isLoading={isLoading}
    />
  );
}
