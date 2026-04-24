"use client";

import Script from "next/script";

/**
 * Kakao AdFit loader. 최초 1회만 삽입.
 *
 * - 스크립트는 `<ins class="kakao_ad_area">` 를 페이지 로드 시 자동 스캔해 광고를 채움.
 * - 개별 유닛 ID 는 {@link AdFitSlot} 에서 env var 로 주입.
 */
export default function AdFitScript() {
  // AdFit 은 유닛 ID 가 없어도 스크립트만 있으면 로드 자체는 가능. 다만 슬롯이 없으면 no-op 이라 굳이 막진 않음.
  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://t1.kakaocdn.net/kas/static/ba.min.js"
    />
  );
}
