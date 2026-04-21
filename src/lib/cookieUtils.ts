/**
 * 토큰 같은 인증 정보 저장용 쿠키 유틸.
 *
 * cms-react-project `/src/utils/cookieUtils.js` 패턴 포팅 (TS + SSR safe).
 *
 * 주의:
 * - HttpOnly 쿠키는 `document.cookie` 로 못 읽음. 프론트에서 직접 세팅하는 이상 현재는 비-HttpOnly.
 * - Secure/SameSite 는 HTTPS 운영에서 브라우저가 강제함. 운영 도메인(vercel / fmp.platformholder.site) 모두 HTTPS.
 */

export function setCookie(
  name: string,
  value: string,
  days: number = 7,
): void {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = `; ${document.cookie}`.split(`; ${name}=`);
  if (match.length !== 2) return null;
  const raw = match.pop()!.split(";").shift();
  return raw ? decodeURIComponent(raw) : null;
}

export function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// 쿠키 이름 상수 — 프로젝트 전역에서 재사용
export const COOKIE_ACCESS_TOKEN = "accessToken";
export const COOKIE_REFRESH_TOKEN = "refreshToken";

/**
 * LocalStorage 기반 토큰(`at`, `rt`) → Cookie 1회성 마이그레이션.
 *
 * 2026-04-21 Cookie 전환 이전 로그인 세션 유지 목적. 쿠키에 값이 있으면 no-op.
 * 과거 값이 `JSON.stringify` 로 래핑되어 있던 케이스 대비 따옴표 제거.
 */
export function migrateLegacyLocalStorageTokens(): void {
  if (typeof window === "undefined") return;
  if (getCookie(COOKIE_ACCESS_TOKEN)) return;

  try {
    const rawAt = window.localStorage.getItem("at");
    const rawRt = window.localStorage.getItem("rt");
    if (!rawAt || !rawRt) return;

    const unwrap = (v: string): string => v.replace(/^"+|"+$/g, "");
    setCookie(COOKIE_ACCESS_TOKEN, unwrap(rawAt));
    setCookie(COOKIE_REFRESH_TOKEN, unwrap(rawRt));
    window.localStorage.removeItem("at");
    window.localStorage.removeItem("rt");
  } catch {
    // 프라이빗 브라우징 등에서 LocalStorage 접근 실패 시 조용히 무시
  }
}
