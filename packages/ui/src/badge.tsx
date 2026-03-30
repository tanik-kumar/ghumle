import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from './utils';

export function Badge({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-[var(--ghumle-color-mist)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ghumle-color-ocean)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
