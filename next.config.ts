import type { NextConfig } from "next";

const CDN_DOMAIN = process.env.NEXT_PUBLIC_MEDIA_CDN_DOMAIN;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: CDN_DOMAIN
      ? [{ protocol: "https", hostname: CDN_DOMAIN }]
      : [],
  },
};

export default nextConfig;
