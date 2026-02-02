import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PosterFrame from '@/components/common/PosterFrame';

type PosterFrameProps = ComponentPropsWithoutRef<typeof PosterFrame>;

interface PosterCardProps {
  href: string;
  title: string;
  imageUrl?: string | null;
  sizes: string;
  linkClassName?: string;
  overlayMeta?: ReactNode;
  placeholder?: ReactNode;
  imageAlt?: string;
  showOverlay?: boolean;
  frameVariant?: PosterFrameProps['variant'];
  frameRadius?: PosterFrameProps['radius'];
}

const defaultLinkClassName =
  'flex-shrink-0 w-[190px] cursor-pointer group transition-transform hover:scale-105 snap-start';

export default function PosterCard({
  href,
  title,
  imageUrl,
  sizes,
  linkClassName = defaultLinkClassName,
  overlayMeta,
  placeholder,
  imageAlt,
  showOverlay = true,
  frameVariant,
  frameRadius,
}: PosterCardProps) {
  const resolvedAlt = imageAlt ?? title;

  return (
    <Link href={href} className={linkClassName}>
      <PosterFrame variant={frameVariant} radius={frameRadius}>
        {imageUrl ? (
          <Image src={imageUrl} alt={resolvedAlt} fill className="object-cover" sizes={sizes} />
        ) : (
          placeholder ?? (
            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-700 to-gray-900 p-4">
              <p className="text-center font-semibold line-clamp-3 text-sm">{title}</p>
            </div>
          )
        )}
        {showOverlay ? (
          <div className="absolute right-0 bottom-0 w-full h-[275px] bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
            {overlayMeta ? (
              <div className="flex items-center gap-2 text-xs text-gray-300">{overlayMeta}</div>
            ) : null}
          </div>
        ) : null}
      </PosterFrame>
    </Link>
  );
}
