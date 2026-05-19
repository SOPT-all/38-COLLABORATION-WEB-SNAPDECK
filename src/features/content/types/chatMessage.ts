export type ChatMessageRole = "USER" | "AI";

export type DeckChatMessageDto = {
  id: number;
  deckId: number;
  order: number;
  role: ChatMessageRole;
  message: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  message: string;
  order: number;
  statusLabel?: string;
};
