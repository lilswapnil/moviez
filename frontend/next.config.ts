import type { NextConfig } from "next";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const tailwindEntry = require.resolve("tailwindcss");
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  async rewrites() {
    // On Vercel without a deployed backend: skip rewrites so Next.js API routes handle TMDB
    const backend = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    if (process.env.VERCEL && (!backend || backend.includes('localhost'))) {
      return [];
    }
    const dest = backend || 'http://localhost:8000';
    return [
      { source: '/api/v1/data', destination: `${dest}/api/v1/data` },
      { source: '/api/v1/search', destination: `${dest}/api/v1/search` },
      { source: '/api/v1/trailers', destination: `${dest}/api/v1/trailers` },
      { source: '/api/v1/charts', destination: `${dest}/api/v1/charts` },
      { source: '/api/v1/genres', destination: `${dest}/api/v1/genres` },
      { source: '/api/v1/episodes', destination: `${dest}/api/v1/episodes` },
      { source: '/api/v1/movie/:path*', destination: `${dest}/api/v1/movie/:path*` },
      { source: '/api/v1/tv/:path*', destination: `${dest}/api/v1/tv/:path*` },
      { source: '/api/v1/collection/:path*', destination: `${dest}/api/v1/collection/:path*` },
      { source: '/api/v1/auth/:path*', destination: `${dest}/api/v1/auth/:path*` },
      { source: '/api/v1/users/:path*', destination: `${dest}/api/v1/users/:path*` },
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
