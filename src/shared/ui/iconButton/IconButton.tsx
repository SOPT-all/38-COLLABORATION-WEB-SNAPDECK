import type { ComponentPropsWithoutRef } from "react";

import { type VariantProps, cn, cva } from "@/shared/utils/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center size-[2.4rem] bg-transparent transition-colors",
  {
    variants: {
      variant: {
        category:
          "rounded-[0.6rem] text-snapdeck-400 hover:bg-sub-blue-2 hover:text-snapdeck-000",
        delete:
          "rounded-sm text-snapdeck-500 hover:bg-sub-blue-2 hover:text-snapdeck-000",
        send: "rounded-[0.5rem] bg-sub-blue-1 text-snapdeck-000 disabled:bg-snapdeck-400",
      },
    },
  },
);

type ButtonElementProps = ComponentPropsWithoutRef<"button">;
type IconButtonVariantsTypes = NonNullable<
  VariantProps<typeof iconButtonVariants>["variant"]
>;

export interface IconButtonProps extends ButtonElementProps {
  variant: IconButtonVariantsTypes;
}

const IconButton = ({
  variant,
  className,
  children,
  type = "button",
  "aria-label": ariaLabel,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <button
      {...buttonProps}
      type={type}
      aria-label={ariaLabel}
      className={cn(iconButtonVariants({ variant }), className)}
    >
      {children}
    </button>
  );
};

export default IconButton;
