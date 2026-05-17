import type { ContentChatTurn } from "@/features/content/types/chat";

export const isAutoExpandableTurn = (turn: ContentChatTurn) =>
  turn.assistantStatus === "complete" && Boolean(turn.assistantMessage);
