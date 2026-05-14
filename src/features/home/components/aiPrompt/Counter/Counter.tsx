import type { CounterValueProps } from "@/features/home/types/counter";
import { cn } from "@/shared/utils/cn";

import CounterControl from "./CounterControl";
import CounterGuideBubble from "./CounterGuideBubble";

type CounterProps = CounterValueProps & {
  guideText?: string;
};

const Counter = ({
  value,
  handleChange,
  min,
  max,
  guideText = "슬라이드 수를 설정하세요",
  className,
}: CounterProps) => {
  return (
    <div className={cn("flex items-center gap-[0.6rem]", className)}>
      <CounterControl
        value={value}
        min={min}
        max={max}
        handleChange={handleChange}
      />
      <CounterGuideBubble>{guideText}</CounterGuideBubble>
    </div>
  );
};

export default Counter;
