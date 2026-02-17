// Shared custom hooks

import { useState, useCallback } from 'react';

/**
 * Pagination hook for managing page state and pagination logic
 */
export function usePagination(initialPage: number = 1) {
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const goToPage = useCallback((newPage: number) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return {
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    reset,
    hasMore,
    setHasMore,
    isLoading,
    setIsLoading,
  };
}
