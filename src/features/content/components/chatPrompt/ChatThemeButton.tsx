import ChatChip from "./ChatChip";

type ChatThemeButtonProps = {
  handleThemeSelectClick?: () => void;
};

const ChatThemeButton = ({ handleThemeSelectClick }: ChatThemeButtonProps) => {
  return (
    <ChatChip fullWidth onClick={handleThemeSelectClick}>
      테마 선택
    </ChatChip>
  );
};

export default ChatThemeButton;
