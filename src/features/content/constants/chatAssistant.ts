import type { AssistantCompletion } from "@/features/content/types/chat";

export const AI_RESPONSE_DELAY_MS = 1500;

export const GUIDELINE_INSTANT_SEND_RESPONSE = {
  userMessage: "섹션 6에 대한 콘텐츠를 생성해줘",
  statusLabel: "프로젝트 분석 완료",
  assistantMessage:
    "Apple의 생태계 전략 보고서에 6번째 섹션을 추가하고 상세 콘텐츠를 생성하겠습니다. 6번 슬라이드에는 향후 전망 및 결론을 담아 마무리하면 좋을 것 같네요. 바로 진행할까요?",
} as const;

export const CHAT_SUBMIT_FALLBACK_RESPONSE: AssistantCompletion = {
  statusLabel: "프로젝트 분석 완료",
  assistantMessage:
    "요청하신 내용을 바탕으로 프레젠테이션 구성을 검토했습니다. 필요한 내용을 정리해 슬라이드에 반영할 수 있습니다.",
};
