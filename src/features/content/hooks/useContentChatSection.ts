import { useCallback, useState } from "react";

import { CHAT_SUBMIT_FALLBACK_RESPONSE } from "@/features/content/constants/chatAssistant";
import useAssistantResponseScheduler from "@/features/content/hooks/useAssistantResponseScheduler";
import useContentChatTurns from "@/features/content/hooks/useContentChatTurns";
import type {
  AssistantCompletion,
  ChatGuidelineChip,
  ChatPromptMode,
  ContentChatTurn,
} from "@/features/content/types/chat";
import { createTurnId } from "@/features/content/utils/createTurnId";
import { runGuidelineInstantSend } from "@/features/content/utils/runGuidelineInstantSend";

type UseContentChatSectionParams = {
  turns?: ContentChatTurn[];
  onTurnsChange?: (turns: ContentChatTurn[]) => void;
  initialTurns?: ContentChatTurn[];
  initialPromptValue?: string;
  initialPromptMode?: ChatPromptMode;
  onGuidelineClick?: (chip: ChatGuidelineChip) => void;
  onSubmit?: (payload: {
    value: string;
    mode: ChatPromptMode;
    turnId: string;
    action: "chat" | "add-slide";
  }) => void;
  getAssistantCompletion?: () => AssistantCompletion | undefined;
};

const useContentChatSection = ({
  turns: turnsProp,
  onTurnsChange,
  initialTurns = [],
  initialPromptValue = "",
  initialPromptMode = "agent",
  onGuidelineClick,
  onSubmit,
  getAssistantCompletion,
}: UseContentChatSectionParams) => {
  const {
    turns,
    appendTurn,
    updateTurnById,
    expandedTurnIds,
    handleTurnExpandedToggleClick,
  } = useContentChatTurns({
    turns: turnsProp,
    onTurnsChange,
    initialTurns,
  });

  const { scheduleAssistantCompletion } = useAssistantResponseScheduler({
    updateTurnById,
  });

  const [promptValue, setPromptValue] = useState(initialPromptValue);
  const [promptMode, setPromptMode] =
    useState<ChatPromptMode>(initialPromptMode);

  const handleGuidelineChipClick = useCallback(
    (chip: ChatGuidelineChip) => {
      onGuidelineClick?.(chip);

      if (chip.behavior === "fill-input") {
        setPromptValue(chip.label);
        return;
      }

      if (chip.behavior === "instant-send") {
        const turnId = runGuidelineInstantSend({
          appendTurn,
          scheduleAssistantCompletion,
        });

        onSubmit?.({
          value: chip.label,
          mode: "agent",
          turnId,
          action: "add-slide",
        });
      }
    },
    [appendTurn, onGuidelineClick, onSubmit, scheduleAssistantCompletion],
  );

  const handlePromptFormSubmit = useCallback(
    (payload: { value: string; mode: ChatPromptMode }) => {
      const turnId = createTurnId();

      appendTurn({
        id: turnId,
        userMessage: payload.value,
        assistantStatus: "loading",
      });
      scheduleAssistantCompletion(
        turnId,
        getAssistantCompletion?.() ?? CHAT_SUBMIT_FALLBACK_RESPONSE,
      );
      setPromptValue("");
      onSubmit?.({
        ...payload,
        turnId,
        action: "chat",
      });
    },
    [appendTurn, getAssistantCompletion, onSubmit, scheduleAssistantCompletion],
  );

  return {
    turns,
    expandedTurnIds,
    promptValue,
    promptMode,
    setPromptValue,
    setPromptMode,
    handleGuidelineChipClick,
    handleTurnExpandedToggleClick,
    handlePromptFormSubmit,
  };
};

export default useContentChatSection;
