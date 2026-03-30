import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from './utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--ghumle-color-coral)] text-white shadow-[var(--ghumle-shadow-soft)] hover:bg-[#ec6a56]',
  secondary:
    'bg-white/90 text-slate-900 ring-1 ring-slate-200 hover:bg-white',
  ghost: 'bg-transparent text-white/90 hover:bg-white/10',
};

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
