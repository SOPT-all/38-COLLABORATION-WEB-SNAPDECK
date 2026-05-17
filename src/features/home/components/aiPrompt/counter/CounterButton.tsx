import type { ComponentType, SVGProps } from "react";

import { cn } from "@/shared/utils/cn";

type CounterButtonProps = {
  label: string;
  disabled: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  handleClick: () => void;
};

const CounterButton = ({
  label,
  disabled,
  Icon,
  handleClick,
}: CounterButtonProps) => {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      <Icon
        aria-hidden
        className={cn(
          "text-snapdeck-400 size-[1.6rem]",
          disabled
            ? "cursor-not-allowed"
            : "hover:text-sub-blue-1 cursor-pointer",
        )}
      />
    </button>
  );
};

export default CounterButton;
