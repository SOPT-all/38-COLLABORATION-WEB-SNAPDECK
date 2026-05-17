import { cn } from "@/shared/utils/cn";

import { chatGuidelineChipClassName } from "./constants/chatGuideline";

type ChatThemeButtonProps = {
  handleThemeSelectClick?: () => void;
};

const ChatThemeButton = ({ handleThemeSelectClick }: ChatThemeButtonProps) => {
  return (
    <button
      type="button"
      className={cn(chatGuidelineChipClassName, "w-full justify-center")}
      onClick={handleThemeSelectClick}
    >
      테마 선택
    </button>
  );
};

export default ChatThemeButton;
