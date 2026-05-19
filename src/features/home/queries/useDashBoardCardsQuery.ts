import { useQuery } from "@tanstack/react-query";

import { getDashBoardCards } from "@/features/home/api/getDashBoardCards";

const DASH_BOARD_CARDS_QUERY_KEY = ["dashBoardCards"] as const;

export const useDashBoardCardsQuery = () => {
  return useQuery({
    queryKey: DASH_BOARD_CARDS_QUERY_KEY,
    queryFn: getDashBoardCards,
  });
};
