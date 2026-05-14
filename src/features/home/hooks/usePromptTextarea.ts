import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  TextareaHTMLAttributes,
} from "react";
import { useState } from "react";

interface UsePromptTextareaProps {
  value: string;
  handleChange: (value: string) => void;
  onBlur?: TextareaHTMLAttributes<HTMLTextAreaElement>["onBlur"];
  onFocus?: TextareaHTMLAttributes<HTMLTextAreaElement>["onFocus"];
  exampleText: string;
}

const usePromptTextarea = ({
  value,
  handleChange,
  onBlur,
  onFocus,
  exampleText,
}: UsePromptTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(event.target.value);
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.defaultPrevented || event.key !== "Tab" || value.trim()) {
      return;
    }

    event.preventDefault();
    handleChange(exampleText);
  };

  const handleTextareaFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleTextareaBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return {
    isFocused,
    handleTextareaChange,
    handleTextareaKeyDown,
    handleTextareaFocus,
    handleTextareaBlur,
  };
};

export default usePromptTextarea;
