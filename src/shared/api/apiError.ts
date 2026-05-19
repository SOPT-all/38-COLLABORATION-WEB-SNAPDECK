import axios from "axios";

import type { BaseFail } from "@/shared/types/api";

import { isBaseFail } from "./apiResponse";

interface ApiErrorOptions {
  status?: number;
  path?: string;
  cause?: unknown;
}

const DEFAULT_API_ERROR_MESSAGE = "API 요청 처리 중 오류가 발생했습니다.";

const getFallbackCode = (status?: number) => {
  if (!status) {
    return "NETWORK_ERROR";
  }

  return `HTTP_${status}`;
};

const getFallbackMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  return DEFAULT_API_ERROR_MESSAGE;
};

const getFallbackPath = (error: unknown, path?: string) => {
  if (path) {
    return path;
  }

  if (axios.isAxiosError(error)) {
    return error.config?.url ?? "";
  }

  return "";
};

const createFallbackBody = (
  error: unknown,
  options: ApiErrorOptions,
): BaseFail => {
  return {
    success: false,
    code: getFallbackCode(options.status),
    message: getFallbackMessage(error),
    timestamp: new Date().toISOString(),
    path: getFallbackPath(error, options.path),
  };
};

export class ApiError extends Error {
  code: string;
  status?: number;
  timestamp: string;
  path: string;
  body: BaseFail;

  constructor(body: BaseFail, options: ApiErrorOptions = {}) {
    super(body.message, { cause: options.cause });

    this.name = "ApiError";
    this.code = body.code;
    this.status = options.status;
    this.timestamp = body.timestamp;
    this.path = body.path;
    this.body = body;
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const createApiError = (
  error: unknown,
  options: ApiErrorOptions = {},
) => {
  if (isApiError(error)) {
    return error;
  }

  if (isBaseFail(error)) {
    return new ApiError(error, options);
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (isBaseFail(data)) {
      return new ApiError(data, {
        status,
        cause: error,
      });
    }

    return new ApiError(createFallbackBody(error, { status }), {
      status,
      cause: error,
    });
  }

  return new ApiError(createFallbackBody(error, options), options);
};
