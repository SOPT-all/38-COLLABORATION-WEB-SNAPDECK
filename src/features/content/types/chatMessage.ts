export type ChatMessageRole = "USER" | "AI";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  message: string;
  order: number;
  statusLabel?: string;
};

export type ChatMessagesResponse = {
  messages: ChatMessage[];
};
