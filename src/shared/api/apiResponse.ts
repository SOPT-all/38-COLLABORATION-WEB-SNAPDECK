import type {
  BaseEmptySuccess,
  BaseFail,
  BaseSuccess,
} from "@/shared/types/api";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const isBaseSuccess = <T = unknown>(
  value: unknown,
): value is BaseSuccess<T> => {
  return (
    isRecord(value) &&
    value.success === true &&
    typeof value.code === "string" &&
    typeof value.message === "string" &&
    "data" in value
  );
};

export const isBaseEmptySuccess = (
  value: unknown,
): value is BaseEmptySuccess => {
  return (
    isRecord(value) &&
    value.success === true &&
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
};

export const isBaseFail = (value: unknown): value is BaseFail => {
  return (
    isRecord(value) &&
    value.success === false &&
    typeof value.code === "string" &&
    typeof value.message === "string" &&
    typeof value.timestamp === "string" &&
    typeof value.path === "string"
  );
};
