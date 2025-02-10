/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    domains: ["www.animal.go.kr", "d3vt348duxk7vk.cloudfront.net"],
  },
};

export default nextConfig;
