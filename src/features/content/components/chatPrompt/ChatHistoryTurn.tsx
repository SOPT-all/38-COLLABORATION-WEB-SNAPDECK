import { DownIcon } from "@/assets";
import type { ContentChatTurn } from "@/features/content/types/chat";
import { cn } from "@/shared/utils/cn";

import ChatAssistantLoading from "./ChatAssistantLoading";

type ChatHistoryTurnProps = {
  turn: ContentChatTurn;
  isExpanded: boolean;
  handleTurnExpandedToggleClick: () => void;
};

const ChatHistoryTurn = ({
  turn,
  isExpanded,
  handleTurnExpandedToggleClick,
}: ChatHistoryTurnProps) => {
  const isAssistantLoading = turn.assistantStatus === "loading";
  const hasStatus = Boolean(turn.statusLabel);
  const hasAssistant = Boolean(turn.assistantMessage);
  const showAssistantSection = isAssistantLoading || hasStatus || hasAssistant;

  return (
    <div className="flex flex-col gap-[1rem]">
      <div
        className={cn(
          "border-sub-blue-2 bg-snapdeck-000 flex w-full max-w-[30rem] items-center",
          "rounded-[1rem] border border-solid p-[1rem]",
        )}
      >
        <p className="typo-caption-m-11 text-snapdeck-700 leading-[1.2rem] whitespace-pre-wrap">
          {turn.userMessage}
        </p>
      </div>

      {showAssistantSection ? (
        <div className="flex w-full max-w-[30.1rem] flex-col gap-[1.2rem]">
          {isAssistantLoading ? <ChatAssistantLoading /> : null}

          {!isAssistantLoading && hasStatus ? (
            <button
              type="button"
              aria-expanded={isExpanded}
              className="text-snapdeck-400 inline-flex h-[1.6rem] items-center gap-[0.2rem]"
              onClick={handleTurnExpandedToggleClick}
            >
              <span className="typo-caption-r-10 tracking-[0.01rem]">
                {turn.statusLabel}
              </span>
              <DownIcon
                aria-hidden
                className={cn(
                  "size-[1.6rem] shrink-0 transition-transform",
                  isExpanded && "rotate-180",
                )}
              />
            </button>
          ) : null}

          {!isAssistantLoading && isExpanded && hasAssistant ? (
            <p className="typo-caption-m-11 text-snapdeck-700 leading-[1.65] font-semibold tracking-[0.011rem]">
              {turn.assistantMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ChatHistoryTurn;
