import { cn } from "@/shared/utils/cn";

import { chatGuidelineChipClassName } from "./constants/chatGuideline";

type ChatThemeButtonProps = {
  onClick?: () => void;
};

const ChatThemeButton = ({ onClick }: ChatThemeButtonProps) => {
  return (
    <button
      type="button"
      className={cn(chatGuidelineChipClassName, "w-full justify-center")}
      onClick={onClick}
    >
      테마 선택
    </button>
  );
};

export default ChatThemeButton;
