import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

import { type VariantProps, cn, cva } from "@/shared/utils/cn";

const iconButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center size-[2.4rem] bg-transparent transition-colors",
  {
    variants: {
      variant: {
        ghost: "hover:bg-sub-blue-2 hover:text-snapdeck-000",
        primary: "bg-sub-blue-1 text-snapdeck-000 disabled:bg-snapdeck-400",
      },
      tone: {
        weak: "text-snapdeck-400",
        neutral: "text-snapdeck-500",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-[0.5rem]",
        lg: "rounded-[0.6rem]",
      },
    },
  },
);

const iconSlotVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-current [&>svg]:size-full [&>svg]:shrink-0",
  {
    variants: {
      iconSize: {
        sm: "size-[1.2rem]",
        lg: "size-[2.4rem]",
      },
    },
  },
);

type ButtonElementProps = ComponentPropsWithRef<"button">;
type IconButtonVariantsTypes = NonNullable<
  VariantProps<typeof iconButtonVariants>["variant"]
>;

type IconButtonToneTypes = NonNullable<
  VariantProps<typeof iconButtonVariants>["tone"]
>;

type IconButtonRadiusTypes = NonNullable<
  VariantProps<typeof iconButtonVariants>["radius"]
>;

type IconButtonSizeTypes = NonNullable<
  VariantProps<typeof iconSlotVariants>["iconSize"]
>;

export interface IconButtonProps extends ButtonElementProps {
  variant: IconButtonVariantsTypes;
  tone?: IconButtonToneTypes;
  radius?: IconButtonRadiusTypes;
  iconSize?: IconButtonSizeTypes;
  children: ReactNode;
  "aria-label": string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant,
      tone,
      radius,
      iconSize,
      className,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...buttonProps}
        type={type}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, tone, radius }), className)}
      >
        <span className={cn(iconSlotVariants({ iconSize }))}>{children}</span>
      </button>
    );
  },
);

export default IconButton;
