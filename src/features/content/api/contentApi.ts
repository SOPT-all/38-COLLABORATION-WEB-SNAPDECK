import type { DeckChatMessageDto, SlideContentItem } from "@/features/content/types";
import { http } from "@/shared/api";

export const getDeckSlides = (deckId: number) => {
  return http.get<SlideContentItem[]>(`/api/v1/decks/${deckId}`);
};

export const getDeckChats = (deckId: number) => {
  return http.get<DeckChatMessageDto[]>(`/api/v1/decks/${deckId}/chats`);
};
