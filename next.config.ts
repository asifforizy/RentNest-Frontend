import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rent-nest-beta.vercel.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;