import { useQuery } from "@tanstack/react-query";

import { deckSlidesQueryOptions } from "./contentQueryOptions";

export const useDeckSlidesQuery = (deckId: number) => {
  return useQuery(deckSlidesQueryOptions(deckId));
};
