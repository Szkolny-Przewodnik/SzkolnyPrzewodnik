/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.szkolnyprzewodnik.edu.pl",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
