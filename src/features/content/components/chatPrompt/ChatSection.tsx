import { useEffect, useMemo, useRef, useState } from "react";

import {
  AI_RESPONSE_MOCK_DELAY_MS,
  DEFAULT_CHAT_GUIDELINES,
  GUIDELINE_INSTANT_SEND_DEMO,
} from "@/features/content/components/chatPrompt/constants/chatGuideline";
import type {
  ChatGuidelineChip,
  ChatPromptMode,
  ContentChatTurn,
} from "@/features/content/components/chatPrompt/types/chatPrompt";
import { cn } from "@/shared/utils/cn";

import ChatGuideline from "./ChatGuideline";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatPrompt from "./ChatPrompt";
import ChatThemeButton from "./ChatThemeButton";

const createTurnId = () =>
  globalThis.crypto?.randomUUID?.() ?? String(Date.now());

const isAutoExpandableTurn = (turn: ContentChatTurn) =>
  turn.assistantStatus === "complete" && Boolean(turn.assistantMessage);

type ChatSectionProps = {
  className?: string;
  turns?: ContentChatTurn[];
  onTurnsChange?: (turns: ContentChatTurn[]) => void;
  guidelines?: readonly ChatGuidelineChip[];
  initialTurns?: ContentChatTurn[];
  initialPromptValue?: string;
  initialPromptMode?: ChatPromptMode;
  onGuidelineClick?: (chip: ChatGuidelineChip) => void;
  onThemeSelect?: () => void;
  onSubmit?: (payload: {
    value: string;
    mode: ChatPromptMode;
    turnId: string;
  }) => void;
};

const ChatSection = ({
  className,
  turns: turnsProp,
  onTurnsChange,
  guidelines = DEFAULT_CHAT_GUIDELINES,
  initialTurns = [],
  initialPromptValue = "",
  initialPromptMode = "agent",
  onGuidelineClick,
  onThemeSelect,
  onSubmit,
}: ChatSectionProps) => {
  const [internalTurns, setInternalTurns] =
    useState<ContentChatTurn[]>(initialTurns);
  const [collapsedTurnIds, setCollapsedTurnIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [promptValue, setPromptValue] = useState(initialPromptValue);
  const [promptMode, setPromptMode] =
    useState<ChatPromptMode>(initialPromptMode);
  const responseTimeoutsRef = useRef<number[]>([]);

  const turns = turnsProp ?? internalTurns;

  const expandedTurnIds = useMemo(() => {
    const expanded = new Set<string>();

    for (const turn of turns) {
      if (isAutoExpandableTurn(turn) && !collapsedTurnIds.has(turn.id)) {
        expanded.add(turn.id);
      }
    }

    return expanded;
  }, [turns, collapsedTurnIds]);

  useEffect(() => {
    const timeouts = responseTimeoutsRef.current;

    return () => {
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const setTurns = (
    getNext: (prev: ContentChatTurn[]) => ContentChatTurn[],
  ) => {
    if (turnsProp !== undefined) {
      onTurnsChange?.(getNext(turnsProp));
      return;
    }

    setInternalTurns((prev) => {
      const next = getNext(prev);
      onTurnsChange?.(next);
      return next;
    });
  };

  const scheduleAssistantResponse = (
    turnId: string,
    response: { statusLabel: string; assistantMessage: string },
  ) => {
    const timeoutId = window.setTimeout(() => {
      setTurns((prev) =>
        prev.map((turn) =>
          turn.id === turnId
            ? {
                ...turn,
                assistantStatus: "complete",
                statusLabel: response.statusLabel,
                assistantMessage: response.assistantMessage,
              }
            : turn,
        ),
      );
    }, AI_RESPONSE_MOCK_DELAY_MS);

    responseTimeoutsRef.current.push(timeoutId);
  };

  const appendUserTurnWithLoading = (userMessage: string) => {
    const turnId = createTurnId();
    const nextTurn: ContentChatTurn = {
      id: turnId,
      userMessage,
      assistantStatus: "loading",
    };

    setTurns((prev) => [...prev, nextTurn]);
    scheduleAssistantResponse(turnId, {
      statusLabel: GUIDELINE_INSTANT_SEND_DEMO.statusLabel,
      assistantMessage: GUIDELINE_INSTANT_SEND_DEMO.assistantMessage,
    });

    return turnId;
  };

  const handleGuidelineChipClick = (chip: ChatGuidelineChip) => {
    onGuidelineClick?.(chip);

    if (chip.behavior === "fill-input") {
      setPromptValue(chip.label);
      return;
    }

    appendUserTurnWithLoading(GUIDELINE_INSTANT_SEND_DEMO.userMessage);
  };

  const handleTurnExpandedToggleClick = (turnId: string) => {
    setCollapsedTurnIds((prev) => {
      const next = new Set(prev);

      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }

      return next;
    });
  };

  const handlePromptFormSubmit = (payload: {
    value: string;
    mode: ChatPromptMode;
  }) => {
    const turnId = createTurnId();
    const nextTurn: ContentChatTurn = {
      id: turnId,
      userMessage: payload.value,
    };

    setTurns((prev) => [...prev, nextTurn]);
    setPromptValue("");
    onSubmit?.({ ...payload, turnId });
  };

  const hasTurns = turns.length > 0;

  return (
    <aside
      className={cn(
        "border-snapdeck-300 bg-snapdeck-000 flex h-full min-h-0 w-[35.3rem] shrink-0 flex-col overflow-hidden border-t border-l border-solid",
        className,
      )}
    >
      <ChatHeader />

      <div className="flex min-h-0 flex-1 flex-col px-[2.6rem] py-[2.4rem]">
        <div className="flex min-h-0 flex-1 flex-col gap-[2rem]">
          {hasTurns ? (
            <ChatHistory
              turns={turns}
              expandedTurnIds={expandedTurnIds}
              handleTurnExpandedToggleClick={handleTurnExpandedToggleClick}
            />
          ) : (
            <div className="min-h-0 flex-1" aria-hidden />
          )}

          <section className="relative flex w-full shrink-0 flex-col gap-[1rem] overflow-visible">
            <ChatGuideline
              guidelines={guidelines}
              handleGuidelineChipClick={handleGuidelineChipClick}
            />

            <ChatPrompt
              value={promptValue}
              mode={promptMode}
              onValueChange={setPromptValue}
              onModeChange={setPromptMode}
              onSubmit={handlePromptFormSubmit}
            />

            <ChatThemeButton handleThemeSelectClick={onThemeSelect} />
          </section>
        </div>
      </div>
    </aside>
  );
};

export default ChatSection;
