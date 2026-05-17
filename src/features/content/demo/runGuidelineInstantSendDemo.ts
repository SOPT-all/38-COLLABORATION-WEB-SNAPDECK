import { GUIDELINE_INSTANT_SEND_DEMO } from "@/features/content/demo/chatAssistantMock";
import type { ContentChatTurn } from "@/features/content/types/chat";
import { createTurnId } from "@/features/content/utils/createTurnId";

import type { MockAssistantCompletion } from "./chatAssistantMock";

type RunGuidelineInstantSendDemoParams = {
  appendTurn: (turn: ContentChatTurn) => void;
  scheduleMockAssistantCompletion: (
    turnId: string,
    response: MockAssistantCompletion,
  ) => void;
};

export const runGuidelineInstantSendDemo = ({
  appendTurn,
  scheduleMockAssistantCompletion,
}: RunGuidelineInstantSendDemoParams) => {
  const turnId = createTurnId();

  appendTurn({
    id: turnId,
    userMessage: GUIDELINE_INSTANT_SEND_DEMO.userMessage,
    assistantStatus: "loading",
  });

  scheduleMockAssistantCompletion(turnId, {
    statusLabel: GUIDELINE_INSTANT_SEND_DEMO.statusLabel,
    assistantMessage: GUIDELINE_INSTANT_SEND_DEMO.assistantMessage,
  });
};
