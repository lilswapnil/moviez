import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  rightSlot?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  title,
  rightSlot,
  className = '',
  titleClassName = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`.trim()}>
      <h2 className={`text-2xl font-bold text-white ${titleClassName}`.trim()}>{title}</h2>
      {rightSlot ?? null}
    </div>
  );
}
