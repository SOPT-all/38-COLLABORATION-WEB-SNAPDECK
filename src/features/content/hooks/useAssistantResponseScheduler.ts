import { useCallback, useEffect, useRef } from "react";

import { AI_RESPONSE_DELAY_MS } from "@/features/content/constants/chatAssistant";
import type {
  AssistantCompletion,
  ContentChatTurn,
} from "@/features/content/types/chat";

type UseAssistantResponseSchedulerParams = {
  updateTurnById: (
    turnId: string,
    patch: Pick<
      ContentChatTurn,
      "assistantStatus" | "statusLabel" | "assistantMessage"
    >,
  ) => void;
};

const useAssistantResponseScheduler = ({
  updateTurnById,
}: UseAssistantResponseSchedulerParams) => {
  const responseTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const timeouts = responseTimeoutsRef.current;

    return () => {
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const scheduleAssistantCompletion = useCallback(
    (turnId: string, response: AssistantCompletion) => {
      const timeoutId = window.setTimeout(() => {
        updateTurnById(turnId, {
          assistantStatus: "complete",
          statusLabel: response.statusLabel,
          assistantMessage: response.assistantMessage,
        });
      }, AI_RESPONSE_DELAY_MS);

      responseTimeoutsRef.current.push(timeoutId);
    },
    [updateTurnById],
  );

  return { scheduleAssistantCompletion };
};

export default useAssistantResponseScheduler;
