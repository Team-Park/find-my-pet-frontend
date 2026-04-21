"use server"

import Auth from "@/app/_components/auth/Auth";

export default async function KakaoAuth({
  searchParams,
}: {
  searchParams: { accessToken?: string; refreshToken?: string };
}) {
  // 쿠키로 저장하므로 JSON.stringify 로 감쌀 필요 없음 (따옴표 중복 방지).
  const accessToken = searchParams.accessToken ?? "";
  const refreshToken = searchParams.refreshToken ?? "";

  return <Auth accessToken={accessToken} refreshToken={refreshToken} />;
}
