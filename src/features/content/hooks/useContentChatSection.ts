import { useCallback, useState } from "react";

import { runGuidelineInstantSendDemo } from "@/features/content/demo/runGuidelineInstantSendDemo";
import useContentChatTurns from "@/features/content/hooks/useContentChatTurns";
import useMockAssistantResponseScheduler from "@/features/content/hooks/useMockAssistantResponseScheduler";
import type {
  ChatGuidelineChip,
  ChatPromptMode,
  ContentChatTurn,
} from "@/features/content/types/chat";
import { createTurnId } from "@/features/content/utils/createTurnId";

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
  }) => void;
};

const useContentChatSection = ({
  turns: turnsProp,
  onTurnsChange,
  initialTurns = [],
  initialPromptValue = "",
  initialPromptMode = "agent",
  onGuidelineClick,
  onSubmit,
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

  const { scheduleMockAssistantCompletion } = useMockAssistantResponseScheduler(
    {
      updateTurnById,
    },
  );

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

      runGuidelineInstantSendDemo({
        appendTurn,
        scheduleMockAssistantCompletion,
      });
    },
    [appendTurn, onGuidelineClick, scheduleMockAssistantCompletion],
  );

  const handlePromptFormSubmit = useCallback(
    (payload: { value: string; mode: ChatPromptMode }) => {
      const turnId = createTurnId();

      appendTurn({
        id: turnId,
        userMessage: payload.value,
      });
      setPromptValue("");
      onSubmit?.({ ...payload, turnId });
    },
    [appendTurn, onSubmit],
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
