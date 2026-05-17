import type { ChatPromptMode } from "@/features/content/types/chat";

export const CHAT_PROMPT_PLACEHOLDER = "원하는 내용을 입력하세요...";

export const CHAT_PROMPT_MODE_OPTIONS: {
  value: ChatPromptMode;
  label: string;
  description: string;
}[] = [
  {
    value: "agent",
    label: "Agent",
    description: "Help generate edit slides",
  },
  {
    value: "ask",
    label: "Ask",
    description: "Answer questions only",
  },
];
