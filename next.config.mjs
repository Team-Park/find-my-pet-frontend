/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      // MinIO presigned GET URL — post 이미지 공개 게시판용 (1h expiry)
      { protocol: "https", hostname: "bucket.platformholder.site" },
      // 공공데이터 v2 유기동물 사진 (백엔드에서 http → https 강제 치환)
      { protocol: "https", hostname: "openapi.animal.go.kr" },
    ],
    domains: ["www.animal.go.kr", "cdn.platformholder.site"],
  },
};

export default nextConfig;
