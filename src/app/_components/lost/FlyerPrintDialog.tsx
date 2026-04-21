"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { formatDateToKorean, parseGratuityValue } from "@/lib/utils";

interface Props {
  postId: string;
  title: string;
  description: string;
  phoneNum: string;
  place: string;
  time: string;
  thumbnail?: string;
  gratuity: number;
  missingAnimalStatus: "SEARCHING" | "FOUND" | "SEEN";
  children: React.ReactNode; // trigger
}

export default function FlyerPrintDialog(props: Props) {
  const printRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${props.title} - 전단지`,
  });

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/lost/${props.postId}`
      : `/lost/${props.postId}`;

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>📱 전단지 QR 만들기</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500 mb-2">
          A4 한 장 전단지로 출력됩니다. QR 은 스마트폰 카메라로 스캔하면 바로 이 실종 게시글로 연결됩니다.
        </p>

        <div className="border rounded overflow-auto">
          <div ref={printRef}>
            <FlyerSheet {...props} shareUrl={shareUrl} />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigator.clipboard.writeText(shareUrl)}>
            링크 복사
          </Button>
          <Button onClick={() => handlePrint()}>🖨️ 인쇄 / PDF 저장</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 실제 인쇄 대상 레이아웃 — 배경 흰색 보장, A4 기준 */
const FlyerSheet = (props: Props & { shareUrl: string }) => (
  <div
    className="bg-white text-black p-8 mx-auto"
    style={{ width: "210mm", minHeight: "297mm", boxSizing: "border-box" }}
  >
    <h1 className="text-4xl font-bold text-center mb-4">🐾 가족을 찾습니다</h1>
    <h2 className="text-2xl font-semibold text-center mb-6">{props.title}</h2>

    {props.thumbnail && (
      <div className="flex justify-center mb-6">
        {/* 인쇄용이라 next/image 대신 일반 img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={props.thumbnail}
          alt={props.title}
          style={{ maxWidth: "300px", maxHeight: "300px", objectFit: "contain" }}
        />
      </div>
    )}

    <div className="grid grid-cols-2 gap-4 text-lg mb-6">
      <Row label="실종 장소">{props.place}</Row>
      <Row label="실종 시간">{formatDateToKorean(props.time)}</Row>
      <Row label="연락처">{props.phoneNum}</Row>
      <Row label="사례금">
        {props.gratuity > 0
          ? parseGratuityValue(props.gratuity, props.missingAnimalStatus)
          : "-"}
      </Row>
    </div>

    <div className="border-t pt-4 mb-6">
      <p className="text-base whitespace-pre-wrap leading-relaxed">
        {props.description}
      </p>
    </div>

    <div className="border-t pt-6 flex items-end justify-between">
      <div className="text-sm">
        <p className="font-semibold mb-1">📱 QR 코드를 스캔하세요</p>
        <p className="text-gray-600">
          사진과 상세 정보를 보고
          <br />
          오픈채팅 또는 전화로 제보할 수 있어요.
        </p>
        <p className="text-xs text-gray-400 mt-2 break-all">{props.shareUrl}</p>
      </div>
      <QRCodeSVG value={props.shareUrl} size={160} includeMargin />
    </div>

    <p className="text-center text-xs text-gray-400 mt-8">
      🐶 파인드마이펫 · findmypet
    </p>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-semibold">{children}</span>
  </div>
);
