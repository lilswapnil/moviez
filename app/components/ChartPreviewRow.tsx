'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/tmdb';

export type ChartPreviewItem = {
  id: number;
  title: string;
  poster_path: string | null;
};

interface ChartPreviewRowProps {
  name: string;
  items: ChartPreviewItem[];
}

export default function ChartPreviewRow({ name, items }: ChartPreviewRowProps) {
  const displayItems = items
    .filter((item): item is ChartPreviewItem => Boolean(item))
    .slice(0, 3);

  return (
    <div className="w-60 flex-shrink-0 rounded-xl bg-black/40 border border-white/5 px-4 py-4 hover:border-red-500/60 hover:bg-red-500/5 transition-colors">
      <span className="block text-white font-semibold mb-3">{name}</span>
      <div className="flex gap-2 min-h-[150px]">
        {displayItems.length > 0 ? (
          displayItems.map((item) => (
            <div key={item.id} className="w-16 flex-shrink-0">
              <div className="relative aspect-[2/3] overflow-hidden bg-white/5 border border-white/10">
                {item.poster_path ? (
                  <Image
                    src={getImageUrl(item.poster_path, 'w500')}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px] text-center leading-tight">
                    No Image
                  </div>
                )}
              </div>
              <p className="mt-1 text-[10px] text-gray-300 line-clamp-2 text-center">
                {item.title}
              </p>
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-500">No data</span>
        )}
      </div>
    </div>
  );
}
