import { type AxiosRequestConfig } from "axios";

import { type BaseResponse } from "@/shared/types/api";

import axiosInstance from "./axiosInstance";

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<BaseResponse<T>, T>(url, config),
  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.post<BaseResponse<T>, T>(url, data, config),
  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.put<BaseResponse<T>, T>(url, data, config),
  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.patch<BaseResponse<T>, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<BaseResponse<T>, T>(url, config),
};
