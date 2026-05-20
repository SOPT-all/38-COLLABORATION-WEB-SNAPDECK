import { useQuery } from "@tanstack/react-query";

import { deckChatsQueryOptions } from "./contentQueryOptions";

export const useDeckChatsQuery = (
  deckId: number,
  options: { enabled?: boolean } = {},
) => {
  return useQuery(deckChatsQueryOptions(deckId, options));
};
