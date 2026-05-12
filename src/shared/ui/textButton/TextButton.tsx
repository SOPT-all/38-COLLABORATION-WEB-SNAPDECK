import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { type VariantProps, cn, cva } from "@/shared/utils/cn";

const textButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center border border-transparent text-center whitespace-nowrap transition-colors duration-150 ease-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80",
  {
    variants: {
      variant: {
        primary:
          "bg-sub-blue-2 text-snapdeck-000 hover:bg-sub-blue-1 enabled:data-[state=active]:bg-sub-blue-1 disabled:bg-snapdeck-300 disabled:text-snapdeck-000",
        neutral:
          "border-snapdeck-300 bg-snapdeck-000 text-snapdeck-500 hover:bg-snapdeck-300 enabled:data-[state=active]:bg-snapdeck-300 disabled:border-snapdeck-300 disabled:bg-snapdeck-300 disabled:text-snapdeck-500",
        danger:
          "bg-snapdeck-400 text-snapdeck-000 hover:bg-sub-red enabled:data-[state=active]:bg-sub-red disabled:bg-snapdeck-300 disabled:text-snapdeck-000",
      },
      size: {
        xs: "h-24 min-w-[4.1rem] gap-[1rem] rounded-sm px-[1rem] typo-body-r-14",
        sm: "h-24 min-w-[6rem] gap-[0.7rem] rounded-sm px-12 typo-body-m-15",
        md: "h-[3.2rem] min-w-[8rem] gap-4 rounded-button px-8 typo-body-m-15",
        lg: "h-[4rem] min-w-[13rem] gap-8 rounded-button px-8 typo-body-m-15",
        xl: "h-[4.4rem] gap-8 rounded-sm px-[1rem] typo-body-r-14",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
);

const textButtonIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-current [&>svg]:size-full [&>svg]:shrink-0",
  {
    variants: {
      iconSize: {
        sm: "size-16",
        md: "size-20",
        lg: "size-24",
      },
    },
  },
);

type ButtonElementProps = ComponentPropsWithoutRef<"button">;
type TextButtonVariantTypes = NonNullable<
  VariantProps<typeof textButtonVariants>["variant"]
>;
type TextButtonSizeTypes = NonNullable<
  VariantProps<typeof textButtonVariants>["size"]
>;
type TextButtonStateTypes = "default" | "active";
type TextButtonIconSizeTypes = NonNullable<
  VariantProps<typeof textButtonIconVariants>["iconSize"]
>;

const DEFAULT_ICON_SIZE_BY_SIZE: Record<
  TextButtonSizeTypes,
  TextButtonIconSizeTypes
> = {
  xs: "sm",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
};

export interface TextButtonProps extends ButtonElementProps {
  variant: TextButtonVariantTypes;
  size?: TextButtonSizeTypes;
  state?: TextButtonStateTypes;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconSize?: TextButtonIconSizeTypes;
  iconClassName?: string;
}

const TextButton = ({
  variant,
  size,
  state = "default",
  fullWidth,
  leftIcon,
  rightIcon,
  iconSize,
  iconClassName,
  className,
  children,
  type = "button",
  "aria-pressed": ariaPressed,
  ...buttonProps
}: TextButtonProps) => {
  const resolvedSize = size ?? "sm";
  const resolvedIconSize = iconSize ?? DEFAULT_ICON_SIZE_BY_SIZE[resolvedSize];

  const iconSlotClassName = cn(
    textButtonIconVariants({ iconSize: resolvedIconSize }),
    iconClassName,
  );

  return (
    <button
      {...buttonProps}
      type={type}
      aria-pressed={ariaPressed}
      data-state={state}
      className={cn(
        textButtonVariants({
          variant,
          size: resolvedSize,
          fullWidth,
        }),
        className,
      )}
    >
      {leftIcon ? <span className={iconSlotClassName}>{leftIcon}</span> : null}
      {children}
      {rightIcon ? (
        <span className={iconSlotClassName}>{rightIcon}</span>
      ) : null}
    </button>
  );
};

export default TextButton;
