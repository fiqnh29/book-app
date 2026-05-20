/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
      },
      {
        protocol: "http",
        hostname: "books.google.co.id",
      },
      {
        protocol: "https",
        hostname: "books.google.co.id",
      },
      {
        protocol: "http",
        hostname: "*.google.com",
      },
      {
        protocol: "https",
        hostname: "*.google.com",
      },
      {
        protocol: "http",
        hostname: "*.google.co.id",
      },
      {
        protocol: "https",
        hostname: "*.google.co.id",
      },
    ],
  },
  output: "standalone",
}

export default nextConfig
