"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api/tmdb-client';
import type { CastMember } from '@/lib/api/tmdb-types';
import Button from '@/components/common/Button';

interface TitleCastSectionProps {
  cast: CastMember[];
  variant?: 'standalone' | 'overlay';
}

const MAX_CAST_ITEMS = 18;
const ITEMS_PER_PAGE = 6;

export default function TitleCastSection({ cast, variant = 'standalone' }: TitleCastSectionProps) {
  const safeCast = Array.isArray(cast) ? cast : [];
  const sorted = [...safeCast]
    .filter((member) => Boolean(member.name))
    .sort((a, b) => {
      const orderA = Number.isFinite(a.order) ? a.order! : Number.MAX_SAFE_INTEGER;
      const orderB = Number.isFinite(b.order) ? b.order! : Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    })
    .slice(0, MAX_CAST_ITEMS);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const safePage = useMemo(() => {
    return Math.min(currentPage, totalPages - 1);
  }, [currentPage, totalPages]);

  const startIndex = safePage * ITEMS_PER_PAGE;
  const visibleCast = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const containerClass =
    variant === 'overlay'
      ? 'rounded-2xl border border-white/10 bg-black/50 pb-6 pt-4 backdrop-blur-md shadow-xl'
      : 'py-2';

  const headingClass =
    variant === 'overlay'
      ? 'text-lg font-semibold text-white/90'
      : 'text-2xl font-semibold text-white';

  const controlsClass =
    variant === 'overlay'
      ? 'flex items-center justify-between gap-4 mb-4'
      : 'flex items-center justify-between gap-4 mb-8';

  const rowClass =
    variant === 'overlay'
      ? 'flex flex-nowrap justify-center gap-4'
      : 'flex flex-nowrap justify-center gap-8';

  const navButtonVariant = variant === 'overlay' ? 'ghostLight' : 'ghost';

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  const goToPrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (sorted.length === 0) {
    return null;
  }

  return (
    <section className={containerClass}>
      <div className={controlsClass}>
        <h2 className={headingClass}>Cast</h2>
        {totalPages > 1 ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={goToPrev}
              disabled={safePage === 0}
              variant={navButtonVariant}
              size="icon"
              shape="pill"
              aria-label="Previous cast page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              type="button"
              onClick={goToNext}
              disabled={safePage >= totalPages - 1}
              variant={navButtonVariant}
              size="icon"
              shape="pill"
              aria-label="Next cast page"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        ) : null}
      </div>

      <div className={rowClass} role="list">
        {visibleCast.map((member) => {
          const profilePath = member.profile_path ? getImageUrl(member.profile_path, 'w500') : null;
          return (
            <div
              key={member.id}
              className="flex w-40 flex-col items-center gap-3 text-center text-sm text-white/80"
              role="listitem"
            >
              <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/10 bg-white/5">
                {profilePath ? (
                  <Image
                    src={profilePath}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/60">
                    No Photo
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-white line-clamp-2">{member.name}</p>
                {member.character ? (
                  <p className="text-xs text-white/60 line-clamp-2">{member.character}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              type="button"
              onClick={() => goToPage(index)}
              variant="dot"
              size="dot"
              shape="pill"
              className={safePage === index ? 'bg-red-500 hover:bg-red-500' : undefined}
              aria-label={`Go to cast page ${index + 1}`}
            >
              <span className="sr-only">{`Go to cast page ${index + 1}`}</span>
            </Button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
