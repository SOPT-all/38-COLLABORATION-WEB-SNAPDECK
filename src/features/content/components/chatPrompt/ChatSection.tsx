import { DEFAULT_CHAT_GUIDELINES } from "@/features/content/components/chatPrompt/constants/chatGuideline";
import useContentChatSection from "@/features/content/hooks/useContentChatSection";
import type {
  AssistantCompletion,
  ChatGuidelineChip,
  ChatPromptMode,
  ContentChatTurn,
} from "@/features/content/types/chat";
import { cn } from "@/shared/utils/cn";

import ChatGuideline from "./ChatGuideline";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatPrompt from "./ChatPrompt";
import ChatThemeButton from "./ChatThemeButton";

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
    action: "chat" | "add-slide";
  }) => void;
  getAssistantCompletion?: () => AssistantCompletion | undefined;
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
  getAssistantCompletion,
}: ChatSectionProps) => {
  const {
    turns,
    expandedTurnIds,
    promptValue,
    promptMode,
    setPromptValue,
    setPromptMode,
    handleGuidelineChipClick,
    handleTurnExpandedToggleClick,
    handlePromptFormSubmit,
  } = useContentChatSection({
    turns: turnsProp,
    onTurnsChange,
    initialTurns,
    initialPromptValue,
    initialPromptMode,
    onGuidelineClick,
    onSubmit,
    getAssistantCompletion,
  });

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
