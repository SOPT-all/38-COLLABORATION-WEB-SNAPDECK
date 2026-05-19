import { GUIDELINE_INSTANT_SEND_MOCK } from "@/features/content/mocks/chatAssistantMock";
import type { ContentChatTurn } from "@/features/content/types/chat";
import { createTurnId } from "@/features/content/utils/createTurnId";

import type { MockAssistantCompletion } from "./chatAssistantMock";

type RunGuidelineInstantSendMockParams = {
  appendTurn: (turn: ContentChatTurn) => void;
  scheduleMockAssistantCompletion: (
    turnId: string,
    response: MockAssistantCompletion,
  ) => void;
};

export const runGuidelineInstantSendMock = ({
  appendTurn,
  scheduleMockAssistantCompletion,
}: RunGuidelineInstantSendMockParams) => {
  const turnId = createTurnId();

  appendTurn({
    id: turnId,
    userMessage: GUIDELINE_INSTANT_SEND_MOCK.userMessage,
    assistantStatus: "loading",
  });

  scheduleMockAssistantCompletion(turnId, {
    statusLabel: GUIDELINE_INSTANT_SEND_MOCK.statusLabel,
    assistantMessage: GUIDELINE_INSTANT_SEND_MOCK.assistantMessage,
  });
};
