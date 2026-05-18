import { useQuery } from "@tanstack/react-query";

import { deckChatsQueryOptions } from "./contentQueryOptions";

export const useDeckChatsQuery = (deckId: number) => {
  return useQuery(deckChatsQueryOptions(deckId));
};
