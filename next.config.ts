import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allow all paths
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;
