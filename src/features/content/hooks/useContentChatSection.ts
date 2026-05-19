import { useCallback, useState } from "react";

import useContentChatTurns from "@/features/content/hooks/useContentChatTurns";
import useMockAssistantResponseScheduler from "@/features/content/hooks/useMockAssistantResponseScheduler";
import { runGuidelineInstantSendMock } from "@/features/content/mocks/runGuidelineInstantSendMock";
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
    action: "chat" | "add-slide";
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

      if (chip.behavior === "instant-send") {
        const turnId = runGuidelineInstantSendMock({
          appendTurn,
          scheduleMockAssistantCompletion,
        });

        onSubmit?.({
          value: chip.label,
          mode: "agent",
          turnId,
          action: "add-slide",
        });
      }
    },
    [appendTurn, onGuidelineClick, onSubmit, scheduleMockAssistantCompletion],
  );

  const handlePromptFormSubmit = useCallback(
    (payload: { value: string; mode: ChatPromptMode }) => {
      const turnId = createTurnId();

      appendTurn({
        id: turnId,
        userMessage: payload.value,
      });
      setPromptValue("");
      onSubmit?.({
        ...payload,
        turnId,
        action: "chat",
      });
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
