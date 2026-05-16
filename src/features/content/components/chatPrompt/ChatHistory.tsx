import ChatHistoryTurn from "./ChatHistoryTurn";
import type { ContentChatTurn } from "./types/chatPrompt";

type ChatHistoryProps = {
  turns: ContentChatTurn[];
  expandedTurnIds: Set<string>;
  onToggleTurnExpanded: (turnId: string) => void;
};

const ChatHistory = ({
  turns,
  expandedTurnIds,
  onToggleTurnExpanded,
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
          onToggleExpanded={() => onToggleTurnExpanded(turn.id)}
        />
      ))}
    </section>
  );
};

export default ChatHistory;
