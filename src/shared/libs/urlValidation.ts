/** `TextFieldModal`의 `channel`과 동일 */
export type UrlModalChannel = "notion" | "web";

/** `TextFieldModal`의 `status`와 동일 */
export type UrlModalFieldStatus = "default" | "active" | "negative";

/**
 * `http:` / `https:` 스킴의 절대 URL인지 여부 (`URL` 파싱 기준).
 */
export function isValidWebUrl(trimmed: string): boolean {
  try {
    const u = new URL(trimmed);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Notion 공유/사이트 호스트(`notion.so`, `notion.site`)를 쓰는 https URL인지 여부.
 */
export function isValidNotionUrl(trimmed: string): boolean {
  if (!isValidWebUrl(trimmed)) return false;
  try {
    const host = new URL(trimmed).hostname.toLowerCase();
    return host.endsWith("notion.so") || host.endsWith("notion.site");
  } catch {
    return false;
  }
}

function isValidUrlForChannel(
  trimmed: string,
  channel: UrlModalChannel,
): boolean {
  return channel === "notion"
    ? isValidNotionUrl(trimmed)
    : isValidWebUrl(trimmed);
}

/**
 * 모달용 `TextFieldModal`: 빈 값 + blur 여부 + 채널별 URL 형식으로 `status`를 계산합니다.
 * (비어 있고 아직 blur 전 → `default`, blur 후 비움 → `negative`, 유효 URL → `active`, 그 외 → `negative`)
 */
export function deriveTextFieldModalStatus(
  value: string,
  blurred: boolean,
  channel: UrlModalChannel,
): UrlModalFieldStatus {
  const v = value.trim();
  if (v.length === 0) {
    return blurred ? "negative" : "default";
  }
  return isValidUrlForChannel(v, channel) ? "active" : "negative";
}
