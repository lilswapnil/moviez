import type { NextConfig } from "next";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const tailwindEntry = require.resolve("tailwindcss");
const projectRoot = dirname(fileURLToPath(import.meta.url));

const getBackendUrl = () =>
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const nextConfig: NextConfig = {
  async rewrites() {
    const backend = getBackendUrl();
    return [
      { source: '/api/v1/data', destination: `${backend}/api/v1/data` },
      { source: '/api/v1/search', destination: `${backend}/api/v1/search` },
      { source: '/api/v1/trailers', destination: `${backend}/api/v1/trailers` },
      { source: '/api/v1/charts', destination: `${backend}/api/v1/charts` },
      { source: '/api/v1/genres', destination: `${backend}/api/v1/genres` },
      { source: '/api/v1/episodes', destination: `${backend}/api/v1/episodes` },
      { source: '/api/v1/movie/:path*', destination: `${backend}/api/v1/movie/:path*` },
      { source: '/api/v1/tv/:path*', destination: `${backend}/api/v1/tv/:path*` },
      { source: '/api/v1/collection/:path*', destination: `${backend}/api/v1/collection/:path*` },
      { source: '/api/v1/auth/:path*', destination: `${backend}/api/v1/auth/:path*` },
      { source: '/api/v1/users/:path*', destination: `${backend}/api/v1/users/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindEntry,
    },
  },
};

export default nextConfig;
