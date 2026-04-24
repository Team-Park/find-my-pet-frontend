"use client";

import Script from "next/script";

/**
 * Google AdSense loader. 최초 1회만 삽입.
 *
 * - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (예: `ca-pub-XXXXXXXXXXXXXXXX`) 미설정 시 no-op.
 * - 실제 광고 렌더는 {@link AdSlot} 컴포넌트가 담당.
 */
export default function AdSenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId) return null;
  return (
    <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
    />
  );
}
