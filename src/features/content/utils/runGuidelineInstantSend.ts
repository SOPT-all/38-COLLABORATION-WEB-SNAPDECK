import { GUIDELINE_INSTANT_SEND_RESPONSE } from "@/features/content/constants/chatAssistant";
import type {
  AssistantCompletion,
  ContentChatTurn,
} from "@/features/content/types/chat";
import { createTurnId } from "@/features/content/utils/createTurnId";

type RunGuidelineInstantSendParams = {
  appendTurn: (turn: ContentChatTurn) => void;
  scheduleAssistantCompletion: (
    turnId: string,
    response: AssistantCompletion,
  ) => void;
};

export const runGuidelineInstantSend = ({
  appendTurn,
  scheduleAssistantCompletion,
}: RunGuidelineInstantSendParams) => {
  const turnId = createTurnId();

  appendTurn({
    id: turnId,
    userMessage: GUIDELINE_INSTANT_SEND_RESPONSE.userMessage,
    assistantStatus: "loading",
  });

  scheduleAssistantCompletion(turnId, {
    statusLabel: GUIDELINE_INSTANT_SEND_RESPONSE.statusLabel,
    assistantMessage: GUIDELINE_INSTANT_SEND_RESPONSE.assistantMessage,
  });

  return turnId;
};
