import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Para GitHub Pages - descomente e ajuste se necessário
  // basePath: '/consumo-diesel',
};

export default nextConfig;
