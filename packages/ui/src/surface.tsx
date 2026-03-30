import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from './utils';

export function Surface({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        'rounded-[2rem] border border-white/40 bg-white/60 p-6 shadow-[var(--ghumle-shadow-soft)] backdrop-blur',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
