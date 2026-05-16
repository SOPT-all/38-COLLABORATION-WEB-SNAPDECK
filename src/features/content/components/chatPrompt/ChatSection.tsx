import { useEffect, useRef, useState } from "react";

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

const createExpandedTurnIds = (turns: ContentChatTurn[]) =>
  new Set(
    turns
      .filter((turn) => turn.assistantStatus === "complete" && turn.assistantMessage)
      .map((turn) => turn.id),
  );

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
  const [expandedTurnIds, setExpandedTurnIds] = useState<Set<string>>(() =>
    createExpandedTurnIds(initialTurns),
  );
  const [promptValue, setPromptValue] = useState(initialPromptValue);
  const [promptMode, setPromptMode] =
    useState<ChatPromptMode>(initialPromptMode);
  const responseTimeoutsRef = useRef<number[]>([]);

  const turns = turnsProp ?? internalTurns;

  useEffect(() => {
    setExpandedTurnIds((prev) => {
      const next = new Set(prev);
      let changed = false;

      for (const turn of turns) {
        if (
          turn.assistantStatus === "complete" &&
          turn.assistantMessage &&
          !next.has(turn.id)
        ) {
          next.add(turn.id);
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [turns]);

  useEffect(() => {
    return () => {
      responseTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const setTurns = (getNext: (prev: ContentChatTurn[]) => ContentChatTurn[]) => {
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
      setExpandedTurnIds((prev) => new Set(prev).add(turnId));
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

  const handleGuidelineClick = (chip: ChatGuidelineChip) => {
    onGuidelineClick?.(chip);

    if (chip.behavior === "fill-input") {
      setPromptValue(chip.label);
      return;
    }

    appendUserTurnWithLoading(GUIDELINE_INSTANT_SEND_DEMO.userMessage);
  };

  const toggleTurnExpanded = (turnId: string) => {
    setExpandedTurnIds((prev) => {
      const next = new Set(prev);

      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }

      return next;
    });
  };

  const handlePromptSubmit = (payload: {
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
        "border-snapdeck-300 bg-snapdeck-000 flex h-full w-[35.3rem] shrink-0 flex-col border-t border-l border-solid",
        className,
      )}
    >
      <ChatHeader />

      <div className="flex min-h-0 flex-1 flex-col px-[2.6rem] py-[2.4rem]">
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-[2rem]",
            hasTurns ? "justify-between" : "justify-end",
          )}
        >
          <ChatHistory
            turns={turns}
            expandedTurnIds={expandedTurnIds}
            onToggleTurnExpanded={toggleTurnExpanded}
          />

          <section className="relative flex w-full shrink-0 flex-col gap-[1rem] overflow-visible">
            <ChatGuideline
              guidelines={guidelines}
              onGuidelineClick={handleGuidelineClick}
            />

            <ChatPrompt
              value={promptValue}
              mode={promptMode}
              onValueChange={setPromptValue}
              onModeChange={setPromptMode}
              onSubmit={handlePromptSubmit}
            />

            <ChatThemeButton onClick={onThemeSelect} />
          </section>
        </div>
      </div>
    </aside>
  );
};

export default ChatSection;
