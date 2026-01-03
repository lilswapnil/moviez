import { useState, useCallback } from 'react';

export interface SavedTitle {
  id: number;
  name?: string;
  title?: string;
  type: 'movie' | 'show';
  posterPath?: string;
}

export const useSavedTitles = () => {
  const [savedTitles, setSavedTitles] = useState<SavedTitle[]>([]);

  const loadSavedTitles = useCallback(() => {
    const saved = localStorage.getItem('savedTitles');
    if (saved) {
      setSavedTitles(JSON.parse(saved));
      return JSON.parse(saved);
    }
    return [];
  }, []);

  const saveTitle = useCallback((title: SavedTitle) => {
    const saved = localStorage.getItem('savedTitles');
    const titles: SavedTitle[] = saved ? JSON.parse(saved) : [];
    
    // Check if title already exists
    const exists = titles.some(t => t.id === title.id);
    if (!exists) {
      titles.push(title);
      localStorage.setItem('savedTitles', JSON.stringify(titles));
      setSavedTitles(titles);
      return true;
    }
    return false;
  }, []);

  const removeSavedTitle = useCallback((titleId: number) => {
    const saved = localStorage.getItem('savedTitles');
    if (saved) {
      const titles: SavedTitle[] = JSON.parse(saved).filter((t: SavedTitle) => t.id !== titleId);
      localStorage.setItem('savedTitles', JSON.stringify(titles));
      setSavedTitles(titles);
      return true;
    }
    return false;
  }, []);

  const isTitleSaved = useCallback((titleId: number) => {
    const saved = localStorage.getItem('savedTitles');
    if (saved) {
      const titles: SavedTitle[] = JSON.parse(saved);
      return titles.some(t => t.id === titleId);
    }
    return false;
  }, []);

  return {
    savedTitles,
    loadSavedTitles,
    saveTitle,
    removeSavedTitle,
    isTitleSaved,
  };
};
