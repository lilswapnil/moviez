import type { ComponentPropsWithoutRef } from 'react';

type PosterVariant = 'default' | 'dark' | 'bordered' | 'plain';
type PosterRadius = 'none' | 'lg';

interface PosterFrameProps extends ComponentPropsWithoutRef<'div'> {
  variant?: PosterVariant;
  radius?: PosterRadius;
}

const variantClasses: Record<PosterVariant, string> = {
  default: 'bg-gray-800 shadow-lg',
  dark: 'bg-gray-900 shadow-lg',
  bordered: 'bg-white/5 border border-white/10',
  plain: 'bg-gray-800',
};

const radiusClasses: Record<PosterRadius, string> = {
  none: '',
  lg: 'rounded-lg',
};

export default function PosterFrame({
  variant = 'default',
  radius = 'none',
  className,
  ...props
}: PosterFrameProps) {
  const classes = [
    'relative aspect-[2/3] overflow-hidden',
    variantClasses[variant],
    radiusClasses[radius],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...props} />;
}
