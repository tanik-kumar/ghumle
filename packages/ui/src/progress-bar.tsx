import { cn } from './utils';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn('h-3 w-full rounded-full bg-slate-200', className)}>
      <div
        className="h-3 rounded-full bg-[var(--ghumle-color-surf)] transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
