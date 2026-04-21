"use client";

import {
  STAGE_LABEL,
  STAGE_TONE,
  formatElapsed,
  getTimeStage,
} from "@/lib/searchRadius";

export default function TimePhaseBanner({ missingTime }: { missingTime: string }) {
  const stage = getTimeStage(missingTime);
  const elapsed = formatElapsed(missingTime);

  return (
    <div
      className={`border-l-4 px-4 py-3 rounded-r-md text-sm ${STAGE_TONE[stage]}`}
    >
      <div className="font-bold">{elapsed}</div>
      <div>{STAGE_LABEL[stage]}</div>
    </div>
  );
}
