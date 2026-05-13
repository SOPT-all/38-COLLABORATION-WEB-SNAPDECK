import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

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
          "border-snapdeck-500 bg-snapdeck-000 focus-within:border-[color:var(--color-sub-blue-2)]",
        active:
          "border-[color:var(--color-sub-blue-2)] bg-[color:color-mix(in_srgb,var(--color-sub-blue-2)_6%,var(--color-snapdeck-000))]",
        negative:
          "border-[color:var(--color-sub-red)] bg-[color:color-mix(in_srgb,var(--color-sub-red)_6%,var(--color-snapdeck-000))]",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

const inputVariants = cva(
  "min-w-0 w-full flex-1 border-0 bg-transparent p-0 text-snapdeck-500 outline-none typo-caption-m-11 placeholder:text-snapdeck-400 disabled:cursor-not-allowed disabled:text-snapdeck-400",
);

const helperSuccessText = "text-[color:var(--color-sub-green)]";
const helperErrorText = "text-[color:var(--color-sub-red)]";

const COPY = {
  web: {
    success: "유효한 URL",
    error: "유효한 URL을 입력하세요 (예: https://example.com/)",
  },
  notion: {
    success: "유효한 Notion URL",
    error:
      "유효한 Notion URL을 입력하세요 (예: https://your-workspace.notion.site/...)",
  },
} as const;

export type TextFieldNotionModalStatus = NonNullable<
  VariantProps<typeof shellVariants>["status"]
>;

export type TextFieldNotionModalChannel = keyof typeof COPY;

export type TextFieldNotionModalProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "size"
> & {
  /**
   * - **default**: 비어 있음 · CTA 비활성(회색)과 짝 — 중립 테두리, 하단 헬퍼 없음
   * - **active**: 유효한 URL — 파란 테두리, 하단 성공 문구(web/notion)
   * - **negative**: 형식 오류 또는 미입력 — 빨간 테두선, 하단 안내 문구(web/notion)
   */
  status?: TextFieldNotionModalStatus;
  /** 성공·오류 문구 분기: `web` | `notion` (기본 `notion`) */
  channel?: TextFieldNotionModalChannel;
  /** `channel` 기본 문구 대신 쓸 성공 헬퍼(선택) */
  successMessage?: ReactNode;
  /** `channel` 기본 문구 대신 쓸 오류 헬퍼(선택) */
  errorMessage?: ReactNode;
  containerClassName?: string;
};

export const TextFieldNotionModal = forwardRef<
  HTMLInputElement,
  TextFieldNotionModalProps
>(function TextFieldNotionModal(
  {
    className,
    containerClassName,
    status = "default",
    channel = "notion",
    disabled,
    successMessage: successMessageProp,
    errorMessage: errorMessageProp,
    id: idProp,
    "aria-describedby": ariaDescribedByProp,
    ...inputProps
  },
  ref,
) {
  const reactId = useId();
  const inputId = idProp ?? `url-field-${reactId}`;
  const helperId = `${inputId}-helper`;

  const copy = COPY[channel];

  const resolvedSuccess = successMessageProp ?? copy.success;
  const resolvedError = errorMessageProp ?? copy.error;

  const showSuccess = !disabled && status === "active";
  const showError = !disabled && status === "negative";

  const describedBy =
    [ariaDescribedByProp, showSuccess || showError ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const shellClass = disabled ? shellDisabled : shellVariants({ status });

  return (
    <div
      className={cn(
        "flex w-full max-w-[30rem] flex-col gap-[0.5rem]",
        containerClassName,
      )}
    >
      <div className={cn(shellClass)}>
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={showError || undefined}
          aria-describedby={describedBy}
          className={cn(inputVariants(), className)}
          {...inputProps}
        />
      </div>
      {showSuccess || showError ? (
        <p
          id={helperId}
          className={cn("flex items-center gap-[0.4rem] typo-caption-r-8")}
        >
          {showSuccess ? (
            <>
              <CheckIcon
                aria-hidden
                className="size-[1.2rem] shrink-0 text-[color:var(--color-sub-green)]"
              />
              <span className={helperSuccessText}>{resolvedSuccess}</span>
            </>
          ) : (
            <span className={helperErrorText}>{resolvedError}</span>
          )}
        </p>
      ) : null}
    </div>
  );
});

TextFieldNotionModal.displayName = "TextFieldNotionModal";

export {
  deriveTextFieldNotionModalStatus,
  isValidNotionUrl,
  isValidWebUrl,
} from "@/shared/libs/urlValidation";
export type { UrlModalChannel, UrlModalFieldStatus } from "@/shared/libs/urlValidation";
