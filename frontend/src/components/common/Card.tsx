import type { ComponentPropsWithoutRef } from 'react';

type CardVariant = 'default' | 'elevated' | 'elevatedBlur' | 'elevatedHover';
type CardRadius = 'xl' | '2xl';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  variant?: CardVariant;
  radius?: CardRadius;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white/5 border border-white/10',
  elevated: 'bg-white/5 border border-white/10 shadow-lg shadow-black/30',
  elevatedBlur: 'bg-white/5 border border-white/10 shadow-lg shadow-black/50 backdrop-blur-sm',
  elevatedHover:
    'bg-white/5 border border-white/10 shadow-lg shadow-black/30 hover:border-red-500/60 hover:bg-red-500/5 transition-colors',
};

const radiusClasses: Record<CardRadius, string> = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
};

export default function Card({
  variant = 'default',
  radius = 'xl',
  className,
  ...props
}: CardProps) {
  const classes = [variantClasses[variant], radiusClasses[radius], className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...props} />;
}
