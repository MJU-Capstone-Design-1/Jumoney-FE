import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/news/today',
        destination: 'https://jumoney-node.shop/api/news/today',
      },
      {
        source: '/api/stream/:path*',
        destination: 'https://jumoney-node.shop/api/stream/:path*',
      },
    ];
  },
};

export default nextConfig;
