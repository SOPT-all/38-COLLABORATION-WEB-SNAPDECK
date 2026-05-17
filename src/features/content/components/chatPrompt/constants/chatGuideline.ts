import type { ChatGuidelineChip } from "@/features/content/types/chat";

export const CHAT_GUIDELINE_ADD_PAGE_ID = "add-page-ai";

export const DEFAULT_CHAT_GUIDELINES: readonly ChatGuidelineChip[] = [
  {
    id: CHAT_GUIDELINE_ADD_PAGE_ID,
    label: "AI로 페이지 추가",
    behavior: "instant-send",
  },
  {
    id: "detail-first-outline",
    label: "첫 번째 목차의 내용을 더 자세히 작성해줘",
    behavior: "fill-input",
  },
  {
    id: "change-slide-style",
    label: "장표 다른 스타일로 바꿔줘",
    behavior: "fill-input",
  },
] as const;
