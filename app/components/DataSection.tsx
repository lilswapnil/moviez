'use client';

import { useState } from 'react';
import { Movie, TVShow } from '@/lib/tmdb';
import HomeCards from './HomeCards';

interface DataSectionProps {
  title: string;
  initialMovies?: Movie[];
  initialShows?: TVShow[];
  type: 'movies' | 'shows';
  category: 'top_rated' | 'upcoming';
}

export default function DataSection({
  title,
  initialMovies = [],
  initialShows = [],
  type,
  category,
}: DataSectionProps) {
  const [movies, setMovies] = useState(initialMovies);
  const [shows, setShows] = useState(initialShows);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/data?type=${type}&category=${category}&page=${page + 1}`
      );
      const newData = await response.json();

      if (type === 'movies') {
        setMovies((prev) => [...prev, ...newData]);
      } else {
        setShows((prev) => [...prev, ...newData]);
      }

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeCards
      title={title}
      movies={movies}
      shows={shows}
      onShowMore={handleShowMore}
      isLoading={isLoading}
    />
  );
}
