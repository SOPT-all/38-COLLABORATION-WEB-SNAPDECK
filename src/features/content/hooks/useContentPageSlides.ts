import { useMemo, useState } from "react";

import { SLIDE_CONTENT_EXAMPLES } from "@/features/content/constants";
import type {
  SlideContentItem,
  SlideReorderPayload,
} from "@/features/content/types";
import {
  normalizeSlideOrders,
  toSlidePreviews,
} from "@/features/content/utils";

type UseContentPageSlidesParams = {
  initialSlides?: SlideContentItem[];
};

const useContentPageSlides = ({
  initialSlides = SLIDE_CONTENT_EXAMPLES,
}: UseContentPageSlidesParams = {}) => {
  const [slides, setSlides] = useState(initialSlides);
  const [deckTitle, setDeckTitle] = useState(
    () => initialSlides[0]?.title ?? "",
  );

  const slidePreviews = useMemo(() => toSlidePreviews(slides), [slides]);

  const handleSlideDelete = (slideId: number) => {
    setSlides((currentSlides) =>
      normalizeSlideOrders(
        currentSlides.filter((slide) => slide.id !== slideId),
      ),
    );
  };

  const handleSlideReorder = ({ nextSlides }: SlideReorderPayload) => {
    setSlides(nextSlides);
  };

  return {
    slides,
    deckTitle,
    setDeckTitle,
    slidePreviews,
    handleSlideDelete,
    handleSlideReorder,
  };
};

export default useContentPageSlides;
