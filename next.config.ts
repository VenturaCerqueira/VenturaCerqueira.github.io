import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // gera /en/index.html e /es/index.html (funciona em qualquer hospedagem estática)
  images: { unoptimized: true },
};

export default nextConfig;
