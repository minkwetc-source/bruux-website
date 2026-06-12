/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // URLs propres pour les pages statiques de la billetterie (servies depuis /public).
  async rewrites() {
    return [
      { source: "/defile", destination: "/defile/index.html" },
      { source: "/defile/admin", destination: "/defile/admin.html" },
    ];
  },
};

export default nextConfig;
