import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "tw-animate-css": path.resolve(__dirname, "node_modules/tw-animate-css/dist/tw-animate.css"),
      "shadcn/tailwind.css": path.resolve(__dirname, "node_modules/shadcn/dist/tailwind.css"),
    },
  },
};

export default nextConfig;
