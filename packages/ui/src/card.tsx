import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from './utils';

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-white/60 bg-white/90 p-6 shadow-[var(--ghumle-shadow-soft)] backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
