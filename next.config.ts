import type { NextConfig } from "next";

// Static export so the site can be served from GitHub Pages (devkapil.in).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
