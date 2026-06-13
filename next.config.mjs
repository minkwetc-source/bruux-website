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
      // Fiche marque : /defile/<slug> → page éditoriale (lit le slug côté client).
      // Placé après /defile/admin pour ne pas l'intercepter.
      { source: "/defile/:slug", destination: "/defile/marque.html" },
    ];
  },
};

export default nextConfig;
