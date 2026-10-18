import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
