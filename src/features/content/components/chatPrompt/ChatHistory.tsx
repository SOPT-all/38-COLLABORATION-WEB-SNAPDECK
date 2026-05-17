import { useEffect, useRef } from "react";

import type { ContentChatTurn } from "@/features/content/types/chat";
import { cn } from "@/shared/utils/cn";
import { scrollbarHideYClassName } from "@/shared/utils/scrollbar";

import ChatHistoryTurn from "./ChatHistoryTurn";

type ChatHistoryProps = {
  turns: ContentChatTurn[];
  expandedTurnIds: Set<string>;
  handleTurnExpandedToggleClick: (turnId: string) => void;
};

const ChatHistory = ({
  turns,
  expandedTurnIds,
  handleTurnExpandedToggleClick,
}: ChatHistoryProps) => {
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [turns, expandedTurnIds]);

  if (!turns.length) {
    return null;
  }

  return (
    <section
      ref={scrollContainerRef}
      className={cn(
        scrollbarHideYClassName,
        "flex min-h-0 flex-1 flex-col gap-[1rem]",
      )}
    >
      {turns.map((turn) => (
        <ChatHistoryTurn
          key={turn.id}
          turn={turn}
          isExpanded={expandedTurnIds.has(turn.id)}
          handleTurnExpandedToggleClick={() =>
            handleTurnExpandedToggleClick(turn.id)
          }
        />
      ))}
    </section>
  );
};

export default ChatHistory;
