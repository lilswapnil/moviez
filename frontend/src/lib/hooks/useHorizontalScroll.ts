'use client';

import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type UseHorizontalScrollOptions = {
  itemWidth: number;
  gap?: number;
  itemsPerScroll?: number;
  deps?: unknown[];
};

type UseHorizontalScrollResult = {
  scrollContainerRef: RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
};

export default function useHorizontalScroll({
  itemWidth,
  gap = 0,
  itemsPerScroll,
  deps = [],
}: UseHorizontalScrollOptions): UseHorizontalScrollResult {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    return undefined;
  }, deps);

  const scrollBy = (direction: 1 | -1) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const fullItemWidth = itemWidth + gap;
      const computedItems = Math.max(1, Math.floor(containerWidth / fullItemWidth));
      const itemsToScroll = itemsPerScroll ?? computedItems;
      const scrollAmount = itemsToScroll * fullItemWidth;
      scrollContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => scrollBy(-1);
  const scrollRight = () => scrollBy(1);

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  };
}
