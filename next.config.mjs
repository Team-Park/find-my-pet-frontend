/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    domains: ["www.animal.go.kr", "cdn.platformholder.site"],
  },
};

export default nextConfig;
