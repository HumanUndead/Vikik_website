/**
 * @type {import('next').NextConfig}
 */
import nextPWA from "next-pwa";
import runtimeCache from "next-pwa/cache";
import { i18n } from "./next-i18next.config";

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching: runtimeCache,
});

const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vikikfashion.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.k-reineonline.com",
        pathname: "/**",
      },
    ],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA(nextConfig);
