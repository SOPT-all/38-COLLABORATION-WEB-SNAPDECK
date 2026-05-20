import { useCallback, useEffect, useMemo, useRef } from "react";

import { useDeckChatsQuery } from "@/features/content/queries";
import type { AssistantCompletion } from "@/features/content/types/chat";
import {
  mapDeckChatToInitialTurns,
  mapDeckChatToPendingCompletions,
} from "@/features/content/utils/mapDeckChatsFromApi";
import { isApiError } from "@/shared/api";

const DEFAULT_CHAT_ERROR_MESSAGE = "채팅을 불러오지 못했습니다.";

const getChatErrorMessage = (error: Error | null) => {
  if (isApiError(error)) {
    return error.message;
  }

  return DEFAULT_CHAT_ERROR_MESSAGE;
};

const useContentPageChats = (
  deckId: number,
  options: { enabled?: boolean } = {},
) => {
  const query = useDeckChatsQuery(deckId, { enabled: options.enabled });
  const nextCompletionIndexRef = useRef(0);

  const initialTurns = useMemo(
    () => mapDeckChatToInitialTurns(query.data ?? []),
    [query.data],
  );

  const pendingCompletions = useMemo(
    () => mapDeckChatToPendingCompletions(query.data ?? []),
    [query.data],
  );

  useEffect(() => {
    nextCompletionIndexRef.current = 0;
  }, [pendingCompletions]);

  const getAssistantCompletion = useCallback(():
    | AssistantCompletion
    | undefined => {
    const nextCompletion = pendingCompletions[nextCompletionIndexRef.current];

    if (!nextCompletion) {
      return undefined;
    }

    nextCompletionIndexRef.current += 1;
    return nextCompletion;
  }, [pendingCompletions]);

  return {
    errorMessage: getChatErrorMessage(query.error),
    getAssistantCompletion,
    initialTurns,
    isError: query.isError,
    isPending: query.isPending,
  };
};

export default useContentPageChats;
