import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type CounterGuideBubbleProps = {
  children: ReactNode;
  className?: string;
};

const CounterGuideBubble = ({
  children,
  className,
}: CounterGuideBubbleProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[1.8rem] min-w-[10.4rem] items-center justify-center",
        "border-sub-blue-2 bg-snapdeck-000 rounded-[0.4rem] border-[0.05rem]",
        "text-snapdeck-900 typo-caption-r-8 px-[1.2rem]",
        "before:absolute before:top-1/2 before:left-[-0.28rem] before:size-[0.5rem]",
        "before:-translate-y-1/2 before:rotate-45 before:border-b-[0.05rem] before:border-l-[0.05rem]",
        "before:border-sub-blue-2 before:bg-snapdeck-000",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CounterGuideBubble;
