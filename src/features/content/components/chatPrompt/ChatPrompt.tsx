import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";

import { DropdownIcon } from "@/assets";
import useChatPromptModeMenu from "@/features/content/hooks/useChatPromptModeMenu";
import { cn } from "@/shared/utils/cn";

import ChatPromptModeDropdown from "./ChatPromptModeDropdown";
import ChatPromptSendButton from "./ChatPromptSendButton";
import {
  CHAT_PROMPT_MODE_OPTIONS,
  CHAT_PROMPT_PLACEHOLDER,
} from "./constants/chatPrompt";
import type { ChatPromptMode } from "./types/chatPrompt";

type ChatPromptProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> & {
  initialMode?: ChatPromptMode;
  initialValue?: string;
  value?: string;
  mode?: ChatPromptMode;
  onValueChange?: (value: string) => void;
  onModeChange?: (mode: ChatPromptMode) => void;
  placeholder?: string;
  onSubmit?: (payload: { value: string; mode: ChatPromptMode }) => void;
};

const ChatPrompt = ({
  className,
  initialMode = "agent",
  initialValue = "",
  value: valueProp,
  mode: modeProp,
  onValueChange,
  onModeChange,
  placeholder = CHAT_PROMPT_PLACEHOLDER,
  onSubmit,
  ...props
}: ChatPromptProps) => {
  const [internalValue, setInternalValue] = useState(initialValue);
  const [internalMode, setInternalMode] = useState<ChatPromptMode>(initialMode);
  const [isFocused, setIsFocused] = useState(false);
  const { containerRef, isOpen, closeMenu, toggleMenu } =
    useChatPromptModeMenu();

  const value = valueProp ?? internalValue;
  const mode = modeProp ?? internalMode;

  const setValue = (next: string) => {
    onValueChange?.(next);
    if (valueProp === undefined) {
      setInternalValue(next);
    }
  };

  const setMode = (next: ChatPromptMode) => {
    onModeChange?.(next);
    if (modeProp === undefined) {
      setInternalMode(next);
    }
  };

  const hasValue = value.trim().length > 0;
  const isBottomRowActive = hasValue || isFocused;
  const modeLabel =
    CHAT_PROMPT_MODE_OPTIONS.find((option) => option.value === mode)?.label ??
    "Agent";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValue) {
      return;
    }

    onSubmit?.({ value: value.trim(), mode });
  };

  const handleModeSelect = (nextMode: ChatPromptMode) => {
    setMode(nextMode);
    closeMenu();
  };

  return (
    <form
      className={cn(
        "border-snapdeck-300 bg-snapdeck-000 relative flex h-[10rem] w-full flex-col justify-between overflow-visible rounded-[1rem] border border-solid p-[1.6rem]",
        className,
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <textarea
          aria-label="채팅 프롬프트 입력창"
          className={cn(
            "typo-caption-m-11 h-full min-h-0 w-full resize-none bg-transparent outline-none",
            hasValue ? "text-snapdeck-900" : "text-snapdeck-300",
            !hasValue && isFocused && "placeholder:text-snapdeck-500",
            !hasValue && !isFocused && "placeholder:text-snapdeck-300",
          )}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <div className="relative z-[var(--z-dropdown)] flex h-[2.4rem] shrink-0 items-center justify-between">
        <div ref={containerRef} className="relative">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="프롬프트 모드 선택"
            className={cn(
              "typo-caption-m-11 inline-flex items-center gap-0 transition-colors",
              isBottomRowActive ? "text-snapdeck-400" : "text-snapdeck-300",
            )}
            onClick={toggleMenu}
          >
            <span>{modeLabel}</span>
            <DropdownIcon aria-hidden className="size-[1.6rem] shrink-0" />
          </button>
          {isOpen ? (
            <ChatPromptModeDropdown
              value={mode}
              className="absolute bottom-full left-0 mb-[0.4rem] shadow-elevation-2"
              onSelect={handleModeSelect}
            />
          ) : null}
        </div>

        <ChatPromptSendButton active={hasValue} />
      </div>
    </form>
  );
};

export default ChatPrompt;
