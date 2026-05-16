import type { ComponentPropsWithoutRef } from "react";

import {
  PROMPT_TEXTAREA_EXAMPLE,
  PROMPT_TEXTAREA_EXAMPLE_PREFIX,
  PROMPT_TEXTAREA_HELPER,
} from "@/features/home/constants/promptTextarea";
import usePromptTextarea from "@/features/home/hooks/usePromptTextarea";
import { cn } from "@/shared/utils/cn";

type PromptTextareaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "onChange" | "onKeyDown" | "placeholder" | "value"
> & {
  value: string;
  handleChange: (value: string) => void;
  exampleText?: string;
  helperText?: string;
};

const PromptTextarea = ({
  className,
  value,
  handleChange,
  onBlur,
  onFocus,
  exampleText = PROMPT_TEXTAREA_EXAMPLE,
  helperText = PROMPT_TEXTAREA_HELPER,
  "aria-label": ariaLabel = "프롬프트 입력",
  ...props
}: PromptTextareaProps) => {
  const {
    isFocused,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaFocus,
    handleTextareaBlur,
  } = usePromptTextarea({
    value,
    handleChange,
    onBlur,
    onFocus,
    exampleText,
  });

  const textareaPlaceholder = isFocused
    ? exampleText
    : `${PROMPT_TEXTAREA_EXAMPLE_PREFIX}${exampleText}\n${helperText}`;

  return (
    <textarea
      aria-label={ariaLabel}
      className={cn(
        "bg-snapdeck-000 text-snapdeck-700 placeholder:text-snapdeck-400 typo-caption-m-10",
        "h-[10rem] w-[60rem] resize-none p-[1.4rem]",
        "outline-none",
        className,
      )}
      placeholder={textareaPlaceholder}
      value={value}
      onChange={handleTextareaChange}
      onBlur={handleTextareaBlur}
      onFocus={handleTextareaFocus}
      onKeyDown={handleTextareaKeyDown}
      {...props}
    />
  );
};

export default PromptTextarea;
