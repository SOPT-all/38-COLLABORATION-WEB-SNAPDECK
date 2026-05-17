import ChatHistoryTurn from "./ChatHistoryTurn";
import type { ContentChatTurn } from "./types/chatPrompt";

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
  if (!turns.length) {
    return null;
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-[1rem] overflow-y-auto">
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
