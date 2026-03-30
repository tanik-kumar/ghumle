export const colors = {
  ink: '#08131d',
  ocean: '#0d3b66',
  surf: '#1c7ed6',
  mist: '#d9ecff',
  sand: '#f7edd8',
  coral: '#f97360',
  pine: '#2d6a4f',
  gold: '#c18d2f',
  cloud: '#f8fafc',
  slate: '#6b7280',
} as const;

export const gradients = {
  hero: 'linear-gradient(135deg, rgba(8,19,29,0.96), rgba(13,59,102,0.88) 55%, rgba(28,126,214,0.72))',
  warmSurface: 'linear-gradient(180deg, rgba(247,237,216,0.72), rgba(255,255,255,0.94))',
  coolSurface: 'linear-gradient(180deg, rgba(217,236,255,0.68), rgba(255,255,255,0.96))',
};

export const shadows = {
  soft: '0 20px 45px rgba(8, 19, 29, 0.12)',
  elevated: '0 28px 70px rgba(8, 19, 29, 0.18)',
};

export const radius = {
  sm: '0.75rem',
  md: '1.125rem',
  lg: '1.5rem',
  xl: '2rem',
  pill: '999px',
};

export const fonts = {
  display: '"Sora", "Avenir Next", sans-serif',
  body: '"Manrope", "Avenir Next", sans-serif',
};

export const cssVariables = {
  '--ghumle-color-ink': colors.ink,
  '--ghumle-color-ocean': colors.ocean,
  '--ghumle-color-surf': colors.surf,
  '--ghumle-color-mist': colors.mist,
  '--ghumle-color-sand': colors.sand,
  '--ghumle-color-coral': colors.coral,
  '--ghumle-color-pine': colors.pine,
  '--ghumle-color-gold': colors.gold,
  '--ghumle-shadow-soft': shadows.soft,
  '--ghumle-shadow-elevated': shadows.elevated,
  '--ghumle-radius-lg': radius.lg,
};
