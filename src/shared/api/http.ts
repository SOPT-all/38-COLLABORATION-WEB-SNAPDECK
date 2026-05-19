import type { AxiosRequestConfig, AxiosResponse } from "axios";

import type { BaseEmptyResponse, BaseResponse } from "@/shared/types/api";

import { createApiError } from "./apiError";
import { isBaseEmptySuccess, isBaseSuccess } from "./apiResponse";
import axiosInstance from "./axiosInstance";

type HttpRequestConfig<D = unknown> = AxiosRequestConfig<D>;
type ApiAxiosResponse<T> = AxiosResponse<BaseResponse<T>>;
type EmptyApiAxiosResponse = AxiosResponse<BaseEmptyResponse>;

const unwrapApiResponse = <T>(response: ApiAxiosResponse<T>): T => {
  const body = response.data;

  if (isBaseSuccess<T>(body)) {
    return body.data;
  }

  throw createApiError(body, {
    status: response.status,
    path: response.config.url,
  });
};

const unwrapEmptyApiResponse = (response: EmptyApiAxiosResponse): void => {
  if (response.status === 204) {
    return;
  }

  const body = response.data;

  if (isBaseEmptySuccess(body)) {
    return;
  }

  throw createApiError(body, {
    status: response.status,
    path: response.config.url,
  });
};

export const http = {
  get: async <T, D = unknown>(url: string, config?: HttpRequestConfig<D>) => {
    const response = await axiosInstance.get<
      BaseResponse<T>,
      ApiAxiosResponse<T>,
      D
    >(url, config);

    return unwrapApiResponse(response);
  },
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: HttpRequestConfig<D>,
  ) => {
    const response = await axiosInstance.post<
      BaseResponse<T>,
      ApiAxiosResponse<T>,
      D
    >(url, data, config);

    return unwrapApiResponse(response);
  },
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: HttpRequestConfig<D>,
  ) => {
    const response = await axiosInstance.put<
      BaseResponse<T>,
      ApiAxiosResponse<T>,
      D
    >(url, data, config);

    return unwrapApiResponse(response);
  },
  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: HttpRequestConfig<D>,
  ) => {
    const response = await axiosInstance.patch<
      BaseResponse<T>,
      ApiAxiosResponse<T>,
      D
    >(url, data, config);

    return unwrapApiResponse(response);
  },
  delete: async <D = unknown>(url: string, config?: HttpRequestConfig<D>) => {
    const response = await axiosInstance.delete<
      BaseEmptyResponse,
      EmptyApiAxiosResponse,
      D
    >(url, config);

    return unwrapEmptyApiResponse(response);
  },
};
