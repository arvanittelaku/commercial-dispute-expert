import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/fees", destination: "/contact", permanent: true },
      { source: "/experts", destination: "/contact", permanent: true },
      { source: "/experts/:slug", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
