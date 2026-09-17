import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mapthemidterms.com" }],
        destination: "https://mapthemidterms.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
