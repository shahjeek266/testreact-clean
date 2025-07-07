import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // enables static export
  images: {
    unoptimized: true, // disables image optimization (required for static sites)
  },
};

export default nextConfig;
