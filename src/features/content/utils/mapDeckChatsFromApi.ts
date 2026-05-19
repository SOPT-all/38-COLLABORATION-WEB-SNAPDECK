import type { ContentChatTurn } from "@/features/content/types/chat";
import type {
  ChatMessage,
  DeckChatMessageDto,
} from "@/features/content/types/chatMessage";

import { mapChatMessagesToTurns } from "./mapChatMessagesToTurns";

const DEFAULT_CHAT_AI_STATUS_LABEL = "프로젝트 분석 완료";
const DEFAULT_INITIAL_CHAT_MESSAGE_COUNT = 2;

export const mapDeckChatFromApi = (dto: DeckChatMessageDto): ChatMessage => ({
  id: String(dto.id),
  role: dto.role,
  message: dto.message,
  order: dto.order,
  ...(dto.role === "AI" && { statusLabel: DEFAULT_CHAT_AI_STATUS_LABEL }),
});

export const mapDeckChatToInitialTurns = (
  messages: DeckChatMessageDto[],
): ContentChatTurn[] => {
  const defaultMessages = messages.slice(0, DEFAULT_INITIAL_CHAT_MESSAGE_COUNT);

  if (defaultMessages.length === 0) {
    return [];
  }

  return mapChatMessagesToTurns(defaultMessages.map(mapDeckChatFromApi));
};
