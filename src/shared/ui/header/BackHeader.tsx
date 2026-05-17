import { LeftIcon } from "@/assets";
import { cn } from "@/shared/utils/cn";

interface BackHeaderProps {
  onBack?: () => void;
}

const BackHeader = ({ onBack }: BackHeaderProps) => {
  return (
    <header
      className={cn(
        "bg-snapdeck-000 border-snapdeck-300",
        "z-(--z-header)",
        "flex h-[4.7rem] w-full items-center border-b px-[1rem]",
      )}
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="flex items-center justify-center"
      >
        <LeftIcon className="text-snapdeck-500 size-24" />
      </button>
    </header>
  );
};

export default BackHeader;
