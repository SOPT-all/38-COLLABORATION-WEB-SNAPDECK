import { cn } from "@/shared/utils/cn";

import type { ChatGuidelineChip, ContentChatTurn } from "../types/chatPrompt";

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

/** 홈 #3-5 생성 → 목차 진입 시 주입 예정 (명세 상태 A). 현재 화면 미구현으로 앱 기본값에는 사용하지 않음. */
export const HOME_ENTRY_CHAT_TURNS: ContentChatTurn[] = [
  {
    id: "home-entry-turn-state-a",
    userMessage:
      "Apple의 생태계 전략과 모바일 기술 분야의 경쟁 우위에 대한 보고서를 디자인해줘",
    assistantStatus: "complete",
    statusLabel: "프로젝트 분석 완료",
    assistantMessage:
      "Generated structure for 'Apple의 생태계 전략과 모바일 기술 경쟁 우위 분석' presentation. Total 5 slides.",
  },
];

export const chatGuidelineChipClassName = cn(
  "border-snapdeck-300 bg-snapdeck-000 text-snapdeck-400 typo-caption-r-10 shrink-0",
  "rounded-[0.8rem] border border-solid px-[1.2rem] py-[0.6rem]",
  "tracking-[0.01rem] whitespace-nowrap transition-colors",
  "hover:border-snapdeck-400 hover:text-snapdeck-500",
);
