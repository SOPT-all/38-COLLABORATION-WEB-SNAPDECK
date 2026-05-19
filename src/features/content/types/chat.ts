export type ChatPromptMode = "agent" | "ask";

export type AssistantStatus = "loading" | "complete";

export type ContentChatTurn = {
  id: string;
  userMessage: string;
  assistantStatus?: AssistantStatus;
  statusLabel?: string;
  assistantMessage?: string;
};

export type GuidelineChipBehavior = "instant-send" | "fill-input";

export type ChatGuidelineChip = {
  id: string;
  label: string;
  behavior: GuidelineChipBehavior;
};
