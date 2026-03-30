import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ghumle/contracts', '@ghumle/design-tokens', '@ghumle/ui'],
};

export default nextConfig;
