import type { ChatMessage } from "@/features/content/types/chatMessage";
import { mapChatMessagesToTurns } from "@/features/content/utils/mapChatMessagesToTurns";

export const HOME_ENTRY_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "home-entry-user",
    role: "USER",
    order: 1,
    message:
      "Apple의 생태계 전략과 모바일 기술 분야의 경쟁 우위에 대한 보고서를 디자인해줘",
  },
  {
    id: "home-entry-ai",
    role: "AI",
    order: 2,
    statusLabel: "프로젝트 분석 완료",
    message:
      "Generated structure for 'Apple의 생태계 전략과 모바일 기술 경쟁 우위 분석' presentation. Total 5 slides.",
  },
];

export const STATE_B_CHAT_MESSAGES: ChatMessage[] = [
  ...HOME_ENTRY_CHAT_MESSAGES,
  {
    id: "state-b-user",
    role: "USER",
    order: 3,
    message: "섹션 6에 대한 콘텐츠를 생성해줘",
  },
  {
    id: "state-b-ai",
    role: "AI",
    order: 4,
    statusLabel: "프로젝트 분석 완료",
    message:
      "Apple의 생태계 전략 보고서에 6번째 섹션을 추가하고 상세 콘텐츠를 생성하겠습니다. 6번 슬라이드에는 향후 전망 및 결론을 담아 마무리하면 좋을 것 같네요. 바로 진행할까요?",
  },
];

export const HOME_ENTRY_CHAT_TURNS = mapChatMessagesToTurns(
  HOME_ENTRY_CHAT_MESSAGES,
);

export const STATE_B_CHAT_TURNS = mapChatMessagesToTurns(STATE_B_CHAT_MESSAGES);
