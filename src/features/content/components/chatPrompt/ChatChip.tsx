import type { ComponentPropsWithoutRef } from "react";

import { type VariantProps, cn, cva } from "@/shared/utils/cn";

const chatChipVariants = cva(
  [
    "border-snapdeck-300 bg-snapdeck-000 text-snapdeck-400 typo-caption-r-10 shrink-0",
    "rounded-[0.8rem] border border-solid px-[1.2rem] py-[0.6rem]",
    "tracking-[0.01rem] whitespace-nowrap transition-colors",
    "hover:border-snapdeck-400 hover:text-snapdeck-500",
  ],
  {
    variants: {
      fullWidth: {
        true: "w-full justify-center",
        false: "",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
);

type ChatChipProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof chatChipVariants>;

const ChatChip = ({
  className,
  fullWidth,
  children,
  type = "button",
  ...props
}: ChatChipProps) => {
  return (
    <button
      type={type}
      className={cn(chatChipVariants({ fullWidth }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ChatChip;
