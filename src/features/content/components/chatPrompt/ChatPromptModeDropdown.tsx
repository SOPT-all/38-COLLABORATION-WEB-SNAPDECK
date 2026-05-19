import type { ChatPromptMode } from "@/features/content/types/chat";
import { cn } from "@/shared/utils/cn";

import { CHAT_PROMPT_MODE_OPTIONS } from "./constants/chatPrompt";

type ChatPromptModeDropdownProps = {
  value: ChatPromptMode;
  handleOptionClick: (value: ChatPromptMode) => void;
  className?: string;
};

const ChatPromptModeDropdown = ({
  value,
  handleOptionClick,
  className,
}: ChatPromptModeDropdownProps) => {
  return (
    <div
      role="listbox"
      aria-label="프롬프트 모드 선택"
      className={cn(
        "shadow-elevation-2 border-snapdeck-300 bg-snapdeck-000 flex w-[11.7rem] shrink-0 flex-col overflow-hidden rounded-[0.6rem] border border-solid",
        className,
      )}
    >
      {CHAT_PROMPT_MODE_OPTIONS.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={cn(
              "flex h-[3.5rem] w-full shrink-0 flex-col items-start justify-center gap-0 overflow-hidden px-[1rem] py-0 text-left transition-colors",
              "hover:bg-snapdeck-100",
              option.value === "agent" && "hover:rounded-t-[0.6rem]",
              option.value === "ask" && "hover:rounded-b-[0.6rem]",
            )}
            onClick={() => handleOptionClick(option.value)}
          >
            <span
              className={cn(
                "typo-caption-m-11 block w-full shrink-0 leading-[1.2rem]",
                isSelected ? "text-snapdeck-500" : "text-snapdeck-400",
              )}
            >
              {option.label}
            </span>
            <span className="typo-caption-r-8 text-snapdeck-400 block w-full shrink-0 overflow-hidden leading-[1.5rem] tracking-[0.032rem] text-ellipsis whitespace-nowrap">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ChatPromptModeDropdown;
