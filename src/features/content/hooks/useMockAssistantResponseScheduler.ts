import { useCallback, useEffect, useRef } from "react";

import {
  AI_RESPONSE_MOCK_DELAY_MS,
  type MockAssistantCompletion,
} from "@/features/content/demo/chatAssistantMock";
import type { ContentChatTurn } from "@/features/content/types/chat";

type UseMockAssistantResponseSchedulerParams = {
  updateTurnById: (
    turnId: string,
    patch: Pick<
      ContentChatTurn,
      "assistantStatus" | "statusLabel" | "assistantMessage"
    >,
  ) => void;
};

const useMockAssistantResponseScheduler = ({
  updateTurnById,
}: UseMockAssistantResponseSchedulerParams) => {
  const responseTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const timeouts = responseTimeoutsRef.current;

    return () => {
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const scheduleMockAssistantCompletion = useCallback(
    (turnId: string, response: MockAssistantCompletion) => {
      const timeoutId = window.setTimeout(() => {
        updateTurnById(turnId, {
          assistantStatus: "complete",
          statusLabel: response.statusLabel,
          assistantMessage: response.assistantMessage,
        });
      }, AI_RESPONSE_MOCK_DELAY_MS);

      responseTimeoutsRef.current.push(timeoutId);
    },
    [updateTurnById],
  );

  return { scheduleMockAssistantCompletion };
};

export default useMockAssistantResponseScheduler;
