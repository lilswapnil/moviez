import type { NextConfig } from "next";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tailwindEntry = require.resolve("tailwindcss");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        tailwindcss: tailwindEntry,
      },
    },
  },
};

export default nextConfig;
