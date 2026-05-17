import type { ChatGuidelineChip } from "../types/chatPrompt";

export const CHAT_GUIDELINE_ADD_PAGE_ID = "add-page-ai";

export const AI_RESPONSE_MOCK_DELAY_MS = 1500;

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

export const GUIDELINE_INSTANT_SEND_DEMO = {
  userMessage: "섹션 6에 대한 콘텐츠를 생성해줘",
  statusLabel: "프로젝트 분석 완료",
  assistantMessage:
    "Apple의 생태계 전략 보고서에 6번째 섹션을 추가하고 상세 콘텐츠를 생성하겠습니다. 6번 슬라이드에는 향후 전망 및 결론을 담아 마무리하면 좋을 것 같네요. 바로 진행할까요?",
} as const;
