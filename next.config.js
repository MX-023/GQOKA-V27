/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Images optimisées
  images: {
    domains: [
      "ohsxevjsenlijsuvbtri.supabase.co",
      "cdn.botpress.cloud",
      "openweathermap.org",
      "res.cloudinary.com"
    ],
    formats: ["image/avif", "image/webp"]
  },

  // Redirections automatiques si besoin
  async redirects() {
    return [
      { source: "/", destination: "/index", permanent: false }
    ];
  },

  // Sécurité + performances
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  output: "standalone"
};

module.exports = nextConfig;
