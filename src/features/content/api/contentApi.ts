import type {
  DeckChatMessageDto,
  SlideContentItem,
} from "@/features/content/types";
import { http } from "@/shared/api";

interface UpdateSlideOrderRequest {
  toOrder: number;
}

export const getDeckSlides = (deckId: number) => {
  return http.get<SlideContentItem[]>(`/api/v1/decks/${deckId}`);
};

export const getDeckChats = (deckId: number) => {
  return http.get<DeckChatMessageDto[]>(`/api/v1/decks/${deckId}/chats`);
};

export const updateSlideOrder = (
  slideId: number,
  data: UpdateSlideOrderRequest,
) => {
  return http.patch<SlideContentItem[], UpdateSlideOrderRequest>(
    `/api/v1/slides/${slideId}/order`,
    data,
  );
};

export const deleteSlide = (slideId: number) => {
  return http.delete(`/api/v1/slides/${slideId}`);
};

export const postDeckSlide = (deckId: number) => {
  return http.post<SlideContentItem[]>(`/api/v1/decks/${deckId}/slides`);
};
