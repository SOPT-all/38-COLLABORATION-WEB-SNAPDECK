import { arrayMove } from "@dnd-kit/sortable";

import type { SlideContentItem } from "@/features/content/types";

export const sortSlidesByOrder = (
  slides: readonly SlideContentItem[],
): SlideContentItem[] => {
  return [...slides].sort((left, right) => left.order - right.order);
};

export const normalizeSlideOrders = (
  slides: readonly SlideContentItem[],
): SlideContentItem[] => {
  return slides.map((slide, index) => ({
    ...slide,
    order: index + 1,
  }));
};

export const reorderSlides = (
  slides: readonly SlideContentItem[],
  fromIndex: number,
  toIndex: number,
): SlideContentItem[] => {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= slides.length ||
    toIndex >= slides.length
  ) {
    return normalizeSlideOrders(slides);
  }

  return normalizeSlideOrders(arrayMove([...slides], fromIndex, toIndex));
};
