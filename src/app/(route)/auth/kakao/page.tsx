"use server"

import Auth from "@/app/_components/auth/Auth";

export default async function KakaoAuth({ searchParams }: { searchParams: { accessToken: string, refreshToken: string } }) {
  const AccessToken = JSON.stringify(searchParams.accessToken);
  const RefreshToken = JSON.stringify(searchParams.refreshToken);
  

  return (
    <Auth accessToken={AccessToken} refreshToken={RefreshToken} />
  )
}