import { queryOptions } from "@tanstack/react-query";

import { getDeckChats, getDeckSlides } from "@/features/content/api";

import { contentQueryKeys } from "./contentQueryKeys";

export const deckSlidesQueryOptions = (deckId: number) =>
  queryOptions({
    queryKey: contentQueryKeys.deckSlides(deckId),
    queryFn: () => getDeckSlides(deckId),
  });

export const deckChatsQueryOptions = (
  deckId: number,
  options: { enabled?: boolean } = {},
) =>
  queryOptions({
    queryKey: contentQueryKeys.deckChats(deckId),
    queryFn: () => getDeckChats(deckId),
    enabled: options.enabled,
  });
