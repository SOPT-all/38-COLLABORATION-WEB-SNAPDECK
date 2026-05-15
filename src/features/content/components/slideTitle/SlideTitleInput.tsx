import { cn } from "@/shared/utils/cn";

interface ContentTitleInputProps {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
}

const SlideTitleInput = ({
  value,
  onChange,
  onBlur,
  className,
}: ContentTitleInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      className={cn(
        "border-snapdeck-300 bg-snapdeck-000 text-snapdeck-500 w-full rounded-md border px-[1rem] py-[0.85rem] text-[1.5rem] font-bold focus-visible:outline-none",
        className,
      )}
    />
  );
};

export default SlideTitleInput;
