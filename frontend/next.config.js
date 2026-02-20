const projectRoot = __dirname;
let tailwindEntry = null;
try {
  tailwindEntry = require.resolve("tailwindcss");
} catch (error) {
  // Ignore if tailwindcss is not installed in production runtime.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backend = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    if (process.env.VERCEL && (!backend || backend.includes("localhost"))) {
      return [];
    }
    const dest = backend || "http://localhost:8000";
    return [
      { source: "/api/v1/data", destination: `${dest}/api/v1/data` },
      { source: "/api/v1/search", destination: `${dest}/api/v1/search` },
      { source: "/api/v1/trailers", destination: `${dest}/api/v1/trailers` },
      { source: "/api/v1/charts", destination: `${dest}/api/v1/charts` },
      { source: "/api/v1/genres", destination: `${dest}/api/v1/genres` },
      { source: "/api/v1/episodes", destination: `${dest}/api/v1/episodes` },
      { source: "/api/v1/movie/:path*", destination: `${dest}/api/v1/movie/:path*` },
      { source: "/api/v1/tv/:path*", destination: `${dest}/api/v1/tv/:path*` },
      { source: "/api/v1/collection/:path*", destination: `${dest}/api/v1/collection/:path*` },
      { source: "/api/v1/auth/:path*", destination: `${dest}/api/v1/auth/:path*` },
      { source: "/api/v1/users/:path*", destination: `${dest}/api/v1/users/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  turbopack: {
    root: projectRoot,
    resolveAlias: tailwindEntry
      ? {
          tailwindcss: tailwindEntry,
        }
      : {},
  },
};

module.exports = nextConfig;
