import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "via.placeholder.com",
      "gsm-certification-system.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
