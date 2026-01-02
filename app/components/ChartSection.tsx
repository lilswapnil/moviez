'use client';

import { useMemo, useState } from 'react';
import ChartPreviewRow, { ChartPreviewItem } from './ChartPreviewRow';

export interface ChartWithPreview {
  name: string;
  items: ChartPreviewItem[];
}

interface ChartSectionProps {
  title: string;
  charts: ChartWithPreview[];
}

const CHARTS_PER_PAGE = 2;

export default function ChartSection({ title, charts }: ChartSectionProps) {
  const totalPages = Math.max(1, Math.ceil(charts.length / CHARTS_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(0);

  const safePage = useMemo(() => {
    const lastPageIndex = totalPages - 1;
    return Math.min(currentPage, lastPageIndex);
  }, [currentPage, totalPages]);

  const start = safePage * CHARTS_PER_PAGE;
  const visibleCharts = charts.slice(start, start + CHARTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 shadow-lg shadow-black/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <span className="text-sm text-gray-400">Top trends right now</span>
      </div>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {visibleCharts.length > 0 ? (
          visibleCharts.map(({ name, items }) => (
            <ChartPreviewRow key={name} name={name} items={items} />
          ))
        ) : (
          <span className="text-sm text-gray-500">No data available</span>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                safePage === index ? 'bg-red-500' : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
