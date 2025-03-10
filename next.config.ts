import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://server-production-2ee7.up.railway.app",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "swiftab-web.vercel.app",
        "server-production-2ee7.up.railway.app",
      ],
    },
  },
};

export default nextConfig;
