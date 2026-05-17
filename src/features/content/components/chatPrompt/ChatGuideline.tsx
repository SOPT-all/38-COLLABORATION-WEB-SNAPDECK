import { chatGuidelineChipClassName } from "./constants/chatGuideline";
import type { ChatGuidelineChip } from "./types/chatPrompt";

type ChatGuidelineProps = {
  guidelines: readonly ChatGuidelineChip[];
  handleGuidelineChipClick: (chip: ChatGuidelineChip) => void;
};

const ChatGuideline = ({
  guidelines,
  handleGuidelineChipClick,
}: ChatGuidelineProps) => {
  return (
    <div className="flex w-full flex-col gap-[1rem]">
      <p className="typo-caption-m-10 text-snapdeck-500 tracking-[-0.02rem]">
        Guideline
      </p>
      <div className="-mx-[0.1rem] overflow-x-auto px-[0.1rem] pb-[0.2rem]">
        <div className="flex w-max gap-[1rem]">
          {guidelines.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className={chatGuidelineChipClassName}
              onClick={() => handleGuidelineChipClick(chip)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatGuideline;
