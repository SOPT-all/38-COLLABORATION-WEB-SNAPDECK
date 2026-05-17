import { ArrowUpIcon } from "@/assets";
import { cva } from "@/shared/utils/cn";

const sendButtonVariants = cva(
  "inline-flex size-[2.4rem] shrink-0 items-center justify-center overflow-hidden rounded-[0.5rem] transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      active: {
        true: "bg-sub-blue-1 text-snapdeck-000",
        false: "bg-snapdeck-400 text-snapdeck-000",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type ChatPromptSendButtonProps = {
  active: boolean;
};

const ChatPromptSendButton = ({ active }: ChatPromptSendButtonProps) => {
  return (
    <button
      type="submit"
      aria-label="프롬프트 전송"
      disabled={!active}
      className={sendButtonVariants({ active })}
    >
      <ArrowUpIcon aria-hidden className="size-[2.4rem]" />
    </button>
  );
};

export default ChatPromptSendButton;
