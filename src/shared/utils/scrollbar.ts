import { cn } from "@/shared/utils/cn";

export const scrollbarHideClassName = "scrollbar-hide";

export const scrollbarHideXClassName = cn(
  scrollbarHideClassName,
  "overflow-x-auto",
);

export const scrollbarHideYClassName = cn(
  scrollbarHideClassName,
  "overflow-y-auto",
);
