import { useMemo } from "react";

import { useDeckChatsQuery } from "@/features/content/queries";
import { mapDeckChatToInitialTurns } from "@/features/content/utils/mapDeckChatsFromApi";
import { isApiError } from "@/shared/api";

const DEFAULT_CHAT_ERROR_MESSAGE = "채팅을 불러오지 못했습니다.";

const getChatErrorMessage = (error: Error | null) => {
  if (isApiError(error)) {
    return error.message;
  }

  return DEFAULT_CHAT_ERROR_MESSAGE;
};

const useContentPageChats = (deckId: number) => {
  const query = useDeckChatsQuery(deckId);

  const initialTurns = useMemo(
    () => mapDeckChatToInitialTurns(query.data ?? []),
    [query.data],
  );

  return {
    errorMessage: getChatErrorMessage(query.error),
    initialTurns,
    isError: query.isError,
    isPending: query.isPending,
  };
};

export default useContentPageChats;
