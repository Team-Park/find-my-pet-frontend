/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      // MinIO presigned GET URL — post 이미지 공개 게시판용 (1h expiry)
      { protocol: "https", hostname: "bucket.platformholder.site" },
    ],
    domains: ["www.animal.go.kr", "cdn.platformholder.site"],
  },
};

export default nextConfig;
