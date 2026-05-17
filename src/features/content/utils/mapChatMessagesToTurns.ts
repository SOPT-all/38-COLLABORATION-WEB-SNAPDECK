import type { ContentChatTurn } from "@/features/content/components/chatPrompt/types/chatPrompt";
import type { ChatMessage } from "@/features/content/types/chatMessage";

const sortByOrder = (messages: ChatMessage[]) =>
  [...messages].sort((a, b) => a.order - b.order);

export const mapChatMessagesToTurns = (
  messages: ChatMessage[],
): ContentChatTurn[] => {
  const turns: ContentChatTurn[] = [];
  let currentTurn: ContentChatTurn | null = null;

  for (const chatMessage of sortByOrder(messages)) {
    if (chatMessage.role === "USER") {
      if (currentTurn) {
        turns.push(currentTurn);
      }

      currentTurn = {
        id: chatMessage.id,
        userMessage: chatMessage.message,
      };
      continue;
    }

    if (!currentTurn) {
      continue;
    }

    currentTurn = {
      ...currentTurn,
      assistantStatus: "complete",
      statusLabel: chatMessage.statusLabel,
      assistantMessage: chatMessage.message,
    };
  }

  if (currentTurn) {
    turns.push(currentTurn);
  }

  return turns;
};
