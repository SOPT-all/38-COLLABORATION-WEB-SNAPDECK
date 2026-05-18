import { useMemo, useState } from "react";

import { CONTENT_DEFAULT_DECK_ID } from "@/features/content/constants/contentDeck";
import useContentDeckSlides from "@/features/content/hooks/useContentDeckSlides";
import { toSlidePreviews } from "@/features/content/utils";

type UseContentPageDeckParams = {
  deckId?: number;
};

const useContentPageDeck = ({
  deckId = CONTENT_DEFAULT_DECK_ID,
}: UseContentPageDeckParams = {}) => {
  const {
    slides,
    handleDelete,
    handleReorder,
    isPending,
    isError,
    errorMessage,
  } = useContentDeckSlides(deckId);

  const slidePreviews = useMemo(() => toSlidePreviews(slides), [slides]);
  const [deckTitleOverride, setDeckTitleOverride] = useState<string | null>(
    null,
  );
  const deckTitle = deckTitleOverride ?? slides[0]?.title ?? "";

  return {
    slides,
    slidePreviews,
    deckTitle,
    setDeckTitle: setDeckTitleOverride,
    handleSlideDelete: handleDelete,
    handleSlideReorder: handleReorder,
    isPending,
    isError,
    errorMessage,
  };
};

export default useContentPageDeck;
