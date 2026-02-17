import type { ReactNode } from 'react';
import Button from '@/components/common/Button';

interface ScrollControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  showRight?: boolean;
  rightFallback?: ReactNode;
}

export default function ScrollControls({
  onScrollLeft,
  onScrollRight,
  canScrollLeft,
  canScrollRight,
  showRight = true,
  rightFallback,
}: ScrollControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        variant="ghost"
        size="icon"
        shape="pill"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      {showRight ? (
        <Button
          onClick={onScrollRight}
          disabled={!canScrollRight}
          variant="ghost"
          size="icon"
          shape="pill"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      ) : (
        rightFallback ?? null
      )}
    </div>
  );
}
