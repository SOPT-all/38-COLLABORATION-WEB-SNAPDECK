import { CountdownIcon, CountupIcon } from "@/assets";
import useCounterControl from "@/features/home/hooks/useCounterControl";
import type { CounterValueProps as CounterControlProps } from "@/features/home/types/counter";
import { cn } from "@/shared/utils/cn";

import CounterButton from "./CounterButton";

const CounterControl = ({
  value,
  min = 1,
  max = 5,
  handleChange,
  className,
}: CounterControlProps) => {
  const {
    clampedValue,
    isMinValue,
    isMaxValue,
    handleDecreaseClick,
    handleIncreaseClick,
  } = useCounterControl({ value, min, max, handleChange });

  return (
    <div
      className={cn(
        "grid h-[2rem] w-[6.5rem] grid-cols-[1.6rem_1fr_1.6rem] items-center",
        "border-snapdeck-300 bg-snapdeck-000 rounded-[0.6rem] border-[0.1rem]",
        className,
      )}
      aria-label="슬라이드 수 조절"
      role="group"
    >
      <CounterButton
        label="슬라이드 수 줄이기"
        disabled={isMinValue}
        Icon={CountdownIcon}
        handleClick={handleDecreaseClick}
      />

      <output
        aria-live="polite"
        className="text-sub-blue-1 typo-caption-r-10 text-center"
      >
        {clampedValue}
      </output>

      <CounterButton
        label="슬라이드 수 늘리기"
        disabled={isMaxValue}
        Icon={CountupIcon}
        handleClick={handleIncreaseClick}
      />
    </div>
  );
};

export default CounterControl;
