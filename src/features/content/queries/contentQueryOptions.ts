import { queryOptions } from "@tanstack/react-query";

import { getDeckSlides } from "@/features/content/api";

import { contentQueryKeys } from "./contentQueryKeys";

export const deckSlidesQueryOptions = (deckId: number) =>
  queryOptions({
    queryKey: contentQueryKeys.deckSlides(deckId),
    queryFn: () => getDeckSlides(deckId),
  });
