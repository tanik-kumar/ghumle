import type { HTMLAttributes } from 'react';

import { cn } from './utils';

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--ghumle-color-coral)]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2">
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold text-slate-950 md:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p> : null}
      </div>
    </div>
  );
}
