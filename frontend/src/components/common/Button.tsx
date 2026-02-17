import Link, { type LinkProps } from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'ghostLight' | 'gradient' | 'text' | 'dot' | 'tile';
type ButtonSize = 'sm' | 'md' | 'lg' | 'hero' | 'icon' | 'dot';
type ButtonShape = 'rounded' | 'pill';

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
}

type ButtonProps = BaseProps & ComponentPropsWithoutRef<'button'> & { href?: undefined };
type LinkButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: LinkProps['href'];
  };

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-red-600 hover:bg-red-500 text-white disabled:bg-gray-600 disabled:hover:bg-gray-600 border border-white/10 shadow-xl shadow-black/40',
  secondary:
    'bg-white/10 hover:bg-white/20 text-white/90 disabled:bg-gray-600 disabled:hover:bg-gray-600 border border-white/20 backdrop-blur-md shadow-lg shadow-black/30',
  outline:
    'bg-white/10 hover:bg-white/20 text-white/90 disabled:bg-gray-600 disabled:hover:bg-gray-600 border border-white/20 backdrop-blur-md',
  ghost: 'bg-black/50 hover:bg-black/70 text-white disabled:bg-gray-600 disabled:hover:bg-gray-600',
  ghostLight: 'bg-white/10 hover:bg-white/20 text-white disabled:bg-gray-600 disabled:hover:bg-gray-600',
  gradient:
    'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-600 disabled:hover:from-gray-600 disabled:hover:to-gray-600 shadow-lg shadow-red-500/20',
  text: 'text-white/80 hover:text-white disabled:opacity-60',
  dot: 'bg-white/30 hover:bg-white/60 disabled:opacity-50',
  tile: 'bg-white/5 border border-white/10 text-white hover:border-red-500/60 hover:bg-red-500/10 disabled:bg-gray-600 disabled:hover:bg-gray-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-7 py-3 text-base',
  lg: 'px-9 py-3.5 text-base',
  hero: 'px-10 py-4 text-lg',
  icon: 'p-2',
  dot: 'h-2 w-2 p-0',
};

const shapeClasses: Record<ButtonShape, string> = {
  rounded: 'rounded-full',
  pill: 'rounded-full',
};

export default function Button(props: ButtonProps | LinkButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    shape = 'rounded',
  } = props;

  const classes = [
    'inline-flex items-center justify-center gap-[5px] font-semibold transition-colors disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props) {
    const { href, ...linkProps } = props as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
