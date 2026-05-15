/** URL 가져오기(웹/노션) 플로우에서만 쓰는 채널 구분 */
export type UrlImportChannel = "notion" | "web";

/** URL 필드 UI용 status (`TextField`의 `default` | `success` | `error`와 동일) */
export type UrlFieldStatus = "default" | "success" | "error";

export const isValidWebUrl = (trimmed: string): boolean => {
  try {
    const u = new URL(trimmed);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const isValidNotionUrl = (trimmed: string): boolean => {
  if (!isValidWebUrl(trimmed)) return false;
  try {
    const host = new URL(trimmed).hostname.toLowerCase();
    return host.endsWith("notion.so") || host.endsWith("notion.site");
  } catch {
    return false;
  }
};

const isValidUrlForChannel = (
  trimmed: string,
  channel: UrlImportChannel,
): boolean =>
  channel === "notion" ? isValidNotionUrl(trimmed) : isValidWebUrl(trimmed);

/** 빈 값 + blur + 채널별 URL 형식 → 필드 `status` */
export const deriveUrlFieldStatus = (
  value: string,
  blurred: boolean,
  channel: UrlImportChannel,
): UrlFieldStatus => {
  const v = value.trim();
  if (v.length === 0) {
    return blurred ? "error" : "default";
  }
  return isValidUrlForChannel(v, channel) ? "success" : "error";
};
