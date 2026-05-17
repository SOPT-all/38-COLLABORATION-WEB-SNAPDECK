import type { ComponentPropsWithRef } from "react";

import { CategoryIcon } from "@/assets";
import IconButton from "@/shared/ui/iconButton/IconButton";
import { cn } from "@/shared/utils/cn";

interface SlideContentDragHandleProps extends Omit<
  ComponentPropsWithRef<"button">,
  "children"
> {
  order: number;
  isDragging?: boolean;
}

const SlideContentDragHandle = ({
  ref,
  order,
  isDragging = false,
  className,
  ...buttonProps
}: SlideContentDragHandleProps) => {
  return (
    <IconButton
      ref={ref}
      {...buttonProps}
      variant="ghost"
      tone="weak"
      radius="lg"
      iconSize="lg"
      aria-label={`${order}번 슬라이드 순서 ${isDragging ? "변경 중" : "변경"}`}
      className={cn(
        isDragging
          ? "cursor-grabbing"
          : "cursor-grab touch-none active:cursor-grabbing",
        className,
      )}
    >
      <CategoryIcon />
    </IconButton>
  );
};

export default SlideContentDragHandle;
