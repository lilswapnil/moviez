import type { NextConfig } from "next";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const tailwindEntry = require.resolve("tailwindcss");
const projectRoot = dirname(fileURLToPath(import.meta.url));

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
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: tailwindEntry,
    },
  },
};

export default nextConfig;
