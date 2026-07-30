import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All artwork is bundled in /public. This prevents Vinext from attempting
  // server-side image optimization in local Windows development.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
