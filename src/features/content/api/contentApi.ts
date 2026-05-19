import type { SlideContentItem } from "@/features/content/types";
import { http } from "@/shared/api";

export const getDeckSlides = (deckId: number) => {
  return http.get<SlideContentItem[]>(`/api/v1/decks/${deckId}`);
};

export const postDeckSlide = async (deckId: number) => {
  return http.post<SlideContentItem[]>(`/api/v1/decks/${deckId}/slides`);
};
