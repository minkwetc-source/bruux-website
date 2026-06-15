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
  // Security headers. Pas de CSP ici volontairement — risque de casser
  // GSAP/Framer Motion (styles/scripts inline) sans tests dédiés.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
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
