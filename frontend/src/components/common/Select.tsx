import type { ComponentPropsWithoutRef } from 'react';

type SelectVariant = 'default' | 'solid';
type SelectSize = 'sm' | 'md';
type SelectShape = 'rounded' | 'pill';

interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  variant?: SelectVariant;
  size?: SelectSize;
  shape?: SelectShape;
}

const variantClasses: Record<SelectVariant, string> = {
  default: 'bg-black/50 border-white/15 text-white',
  solid: 'bg-black/50 border-gray-700 text-white hover:bg-black/70',
};

const sizeClasses: Record<SelectSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-4 py-3',
};

const shapeClasses: Record<SelectShape, string> = {
  rounded: 'rounded-lg',
  pill: 'rounded-full',
};

export default function Select({
  variant = 'default',
  size = 'sm',
  shape = 'rounded',
  className,
  ...props
}: SelectProps) {
  const classes = [
    'border focus:outline-none focus:border-red-500/60 transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <select className={classes} {...props} />;
}
