import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "swiftab-web.vercel.app",
        "server-production-2ee7.up.railway.app",
        "2321-41-90-42-184.ngrok-free.app",
      ],
    },
  },
};

export default nextConfig;
