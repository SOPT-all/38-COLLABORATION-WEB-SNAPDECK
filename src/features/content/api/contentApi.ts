import type { SlideContentItem } from "@/features/content/types";
import { http } from "@/shared/api";

interface UpdateSlideOrderRequest {
  toOrder: number;
}

export const getDeckSlides = (deckId: number) => {
  return http.get<SlideContentItem[]>(`/api/v1/decks/${deckId}`);
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
