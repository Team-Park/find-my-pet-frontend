import type { AnimalType, Breed } from "@/types/breed";

export type TimeStage =
  | "GOLDEN"
  | "EXTENDED"
  | "DECLINING"
  | "FADING"
  | "EXPIRED";

export interface RadiusBands {
  core: number; // meters
  likely: number;
  possible: number;
}

const CAT_FIXED: RadiusBands = { core: 150, likely: 500, possible: 1500 };
const CAT_POSSIBLE_MAX = 3000;
const OTHER_FIXED: RadiusBands = { core: 30, likely: 100, possible: 300 };
const DOG_CAPS = { minM: 100, maxM: 30_000 };

const PHASE1_HOURS = 72;
const PHASE2_DECAY = 0.15;
const FALLBACK_DOG_SPEED = 2.5;
const FALLBACK_DOG_FACTOR = 0.8;

export function elapsedHoursSince(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.max(0, diff / 3_600_000);
}

export function computeRadiusBands(params: {
  animalType: AnimalType;
  missingTimeISO: string;
  breed?: Breed | null;
}): RadiusBands {
  const elapsedH = elapsedHoursSince(params.missingTimeISO);

  if (params.animalType === "CAT") {
    const daysOverWeek = Math.max(0, elapsedH / 24 - 7);
    const possible = Math.min(CAT_POSSIBLE_MAX, CAT_FIXED.possible + daysOverWeek * 300);
    return { ...CAT_FIXED, possible };
  }

  if (params.animalType === "OTHER") return { ...OTHER_FIXED };

  // DOG: 2-phase
  const speed = params.breed?.baseSpeedKmh ?? FALLBACK_DOG_SPEED;
  const factor = params.breed?.exploreFactor ?? FALLBACK_DOG_FACTOR;
  const phase1 = Math.min(elapsedH, PHASE1_HOURS) * speed * factor;
  const phase2 = Math.max(0, elapsedH - PHASE1_HOURS) * speed * factor * PHASE2_DECAY;
  const baseM = (phase1 + phase2) * 1000;
  const clamp = Math.max(DOG_CAPS.minM, Math.min(DOG_CAPS.maxM, baseM));
  return {
    core: clamp * 0.3,
    likely: clamp * 1.0,
    possible: Math.min(DOG_CAPS.maxM, clamp * 1.8),
  };
}

export function getTimeStage(missingTimeISO: string): TimeStage {
  const h = elapsedHoursSince(missingTimeISO);
  if (h < 24) return "GOLDEN";
  if (h < 72) return "EXTENDED";
  if (h < 168) return "DECLINING";
  if (h < 336) return "FADING";
  return "EXPIRED";
}

export function getPolygonOpacity(stage: TimeStage): number {
  return {
    GOLDEN: 0.5,
    EXTENDED: 0.35,
    DECLINING: 0.2,
    FADING: 0.12,
    EXPIRED: 0.06,
  }[stage];
}

export function chooseMapLevel(maxRadiusM: number): number {
  if (maxRadiusM < 500) return 3;
  if (maxRadiusM < 1500) return 4;
  if (maxRadiusM < 5000) return 6;
  if (maxRadiusM < 15_000) return 8;
  return 10;
}

export function formatElapsed(iso: string): string {
  const h = elapsedHoursSince(iso);
  if (h < 1) return `${Math.round(h * 60)}분 경과`;
  if (h < 24) return `${h.toFixed(1)}시간 경과`;
  const d = h / 24;
  if (d < 14) return `${d.toFixed(1)}일 경과`;
  return `${Math.floor(d)}일 경과`;
}

export const STAGE_LABEL: Record<TimeStage, string> = {
  GOLDEN: "골든타임 — 지도 반경부터 수색하세요",
  EXTENDED: "반경 수색 + 전단지 병행",
  DECLINING: "반경 의미가 낮아집니다. 보호소·공공DB 확인이 더 효과적",
  FADING: "지리적 반경 < 제보 · 보호소 · 공공DB 체크",
  EXPIRED: "지도 반경은 참고용. 다른 채널에 집중하세요",
};

export const STAGE_TONE: Record<TimeStage, string> = {
  GOLDEN: "bg-blue-50 border-blue-300 text-blue-900",
  EXTENDED: "bg-amber-50 border-amber-300 text-amber-900",
  DECLINING: "bg-orange-50 border-orange-300 text-orange-900",
  FADING: "bg-red-50 border-red-300 text-red-900",
  EXPIRED: "bg-gray-100 border-gray-300 text-gray-700",
};
