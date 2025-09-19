import axios, { type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true
});

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : undefined
      });

      return { data: result.data };
    } catch (axiosError) {
      if (axios.isAxiosError(axiosError)) {
        return {
          error: {
            status: axiosError.response?.status,
            data: axiosError.response?.data || axiosError.message
          }
        };
      }
      return {
        error: {
          status: 500,
          data: "Unknown error"
        }
      };
    }
  };
