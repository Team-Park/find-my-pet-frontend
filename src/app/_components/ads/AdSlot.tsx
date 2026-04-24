"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** AdSense 광고 단위 슬롯 ID (예: "1234567890"). 환경변수에 두고 주입 권장. */
  slot: string;
  /** `auto` | `fluid` | `rectangle` 등 AdSense format. 기본 auto. */
  format?: string;
  /** 반응형 여부 — `true` 이면 data-full-width-responsive="true" */
  responsive?: boolean;
  /** 카드 그리드에 녹이기 위한 최소 높이. */
  minHeight?: number;
  className?: string;
}

/**
 * 단일 AdSense 슬롯. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 미설정 시 placeholder 로 대체되므로
 * 개발/프리뷰 환경에서 레이아웃만 확인 가능.
 */
export default function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  minHeight = 180,
  className,
}: Props) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (!clientId) return;
    if (typeof window === "undefined") return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queue: unknown[] = ((window as any).adsbygoogle = (window as any).adsbygoogle || []);
      queue.push({});
    } catch {
      // AdSense script 미로딩 상황 무시
    }
  }, [clientId, slot]);

  if (!clientId) {
    return (
      <div
        className={`flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 ${className ?? ""}`}
        style={{ minHeight }}
      >
        광고 자리 (AdSense 연동 전)
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block", minHeight }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
