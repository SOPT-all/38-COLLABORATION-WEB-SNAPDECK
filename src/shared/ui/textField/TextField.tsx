import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
  useId,
} from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { CheckIcon } from "@/assets";
import { cn } from "@/shared/utils/cn";

const shellDisabled = cn(
  "cursor-not-allowed border-snapdeck-300 bg-[color:color-mix(in_srgb,var(--color-snapdeck-300)_22%,var(--color-snapdeck-000))]",
);

const shellVariants = cva(
  "flex w-full min-w-0 items-center rounded-field border border-solid px-[1rem] py-[1rem] transition-[border-color,background-color]",
  {
    variants: {
      status: {
        default:
          "border-snapdeck-500 bg-snapdeck-000 focus-within:border-sub-blue-2",
        success:
          "border-sub-blue-2 bg-[color:color-mix(in_srgb,var(--color-sub-blue-2)_6%,var(--color-snapdeck-000))]",
        error:
          "border-sub-red bg-[color:color-mix(in_srgb,var(--color-sub-red)_6%,var(--color-snapdeck-000))]",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

const inputVariants = cva(
  "min-w-0 w-full flex-1 border-0 bg-transparent p-0 text-snapdeck-500 outline-none typo-caption-m-11 placeholder:text-snapdeck-400 read-only:cursor-default disabled:cursor-not-allowed disabled:text-snapdeck-400",
);

export type TextFieldStatus = NonNullable<
  VariantProps<typeof shellVariants>["status"]
>;

export type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "size"> & {
  status?: TextFieldStatus;
  helperText?: ReactNode;
  showCheckIcon?: boolean;
  containerClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerClassName,
      status = "default",
      helperText,
      showCheckIcon = true,
      disabled,
      readOnly,
      id: idProp,
      "aria-describedby": ariaDescribedByProp,
      ...inputProps
    },
    ref,
  ) => {
    const reactId = useId();
    const inputId = idProp ?? `text-field-${reactId}`;
    const helperId = `${inputId}-helper`;

    const hasHelper = Boolean(helperText);
    const showSuccessWithIcon =
      !disabled && status === "success" && hasHelper && showCheckIcon;
    const showSuccessTextOnly =
      !disabled && status === "success" && hasHelper && !showCheckIcon;
    const showErrorText = !disabled && status === "error" && hasHelper;
    const showHelperRow =
      showSuccessWithIcon || showSuccessTextOnly || showErrorText;

    const describedBy =
      [ariaDescribedByProp, showHelperRow ? helperId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    const shellClass = disabled ? shellDisabled : shellVariants({ status });

    return (
      <div
        className={cn("flex w-full flex-col gap-[0.5rem]", containerClassName)}
      >
        <div className={cn(shellClass)}>
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={status === "error" || undefined}
            aria-describedby={describedBy}
            className={cn(inputVariants(), className)}
            {...inputProps}
          />
        </div>
        {showHelperRow ? (
          <p
            id={helperId}
            className={cn("typo-caption-r-8 flex items-center gap-[0.4rem]")}
          >
            {showSuccessWithIcon ? (
              <>
                <CheckIcon
                  aria-hidden
                  className="text-sub-green size-[1.2rem] shrink-0"
                />
                <span className="text-sub-green">{helperText}</span>
              </>
            ) : null}
            {showSuccessTextOnly ? (
              <span className="text-sub-green">{helperText}</span>
            ) : null}
            {showErrorText ? (
              <span className="text-sub-red">{helperText}</span>
            ) : null}
          </p>
        ) : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";
