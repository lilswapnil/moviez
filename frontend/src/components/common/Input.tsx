import type { ComponentPropsWithoutRef } from 'react';

type InputVariant = 'default' | 'search';
type InputSize = 'sm' | 'md';
type InputShape = 'rounded' | 'pill';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  shape?: InputShape;
}

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white/10 placeholder:text-gray-500',
  search: 'bg-black/50 placeholder:text-white/60 focus:bg-black/60',
};

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-4 py-3',
};

const shapeClasses: Record<InputShape, string> = {
  rounded: 'rounded-lg',
  pill: 'rounded-full',
};

export default function Input({
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  className,
  ...props
}: InputProps) {
  const classes = [
    'w-full border border-white/20 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all',
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <input className={classes} {...props} />;
}
