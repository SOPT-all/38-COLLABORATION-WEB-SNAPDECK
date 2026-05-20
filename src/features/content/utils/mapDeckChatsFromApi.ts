import type {
  AssistantCompletion,
  ContentChatTurn,
} from "@/features/content/types/chat";
import type {
  ChatMessage,
  DeckChatMessageDto,
} from "@/features/content/types/chatMessage";

import { mapChatMessagesToTurns } from "./mapChatMessagesToTurns";

const DEFAULT_CHAT_AI_STATUS_LABEL = "프로젝트 분석 완료";
const DEFAULT_INITIAL_CHAT_MESSAGE_COUNT = 2;
const sortDeckChatsByOrder = (messages: DeckChatMessageDto[]) =>
  [...messages].sort((a, b) => a.order - b.order);

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
  const initialMessages = sortDeckChatsByOrder(messages).slice(
    0,
    DEFAULT_INITIAL_CHAT_MESSAGE_COUNT,
  );

  if (initialMessages.length === 0) {
    return [];
  }

  return mapChatMessagesToTurns(initialMessages.map(mapDeckChatFromApi));
};

export const mapDeckChatToPendingCompletions = (
  messages: DeckChatMessageDto[],
): AssistantCompletion[] => {
  const pendingMessages = sortDeckChatsByOrder(messages).slice(
    DEFAULT_INITIAL_CHAT_MESSAGE_COUNT,
  );

  return mapChatMessagesToTurns(pendingMessages.map(mapDeckChatFromApi))
    .filter(
      (
        turn,
      ): turn is ContentChatTurn & {
        assistantMessage: string;
      } => Boolean(turn.assistantMessage),
    )
    .map((turn) => ({
      statusLabel: turn.statusLabel ?? DEFAULT_CHAT_AI_STATUS_LABEL,
      assistantMessage: turn.assistantMessage,
    }));
};
