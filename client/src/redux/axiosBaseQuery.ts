import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosRequestConfig } from "axios";
import { authApi } from "./auth/authApi";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true
});

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: Record<string, unknown>;
      params?: Record<string, unknown>;
    },
    unknown,
    unknown
  > =>
  async (args, api) => {
    try {
      const token = localStorage.getItem("accessToken");
      const result = await axiosInstance({
        ...args,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      return { data: result.data };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.status === 401 &&
          localStorage.getItem("refreshToken")
        ) {
          try {
            const refreshToken = localStorage.getItem("refreshToken")!;
            const refreshResult = await api
              .dispatch(authApi.endpoints.refresh.initiate({ refreshToken }))
              .unwrap();
            if (
              "accessToken" in refreshResult &&
              "refreshToken" in refreshResult
            ) {
              api.dispatch({ type: "auth/setTokens", payload: refreshResult });

              const retryResult = await axiosInstance({
                ...args,
                headers: {
                  Authorization: `Bearer ${refreshResult.accessToken}`
                }
              });
              return { data: retryResult.data };
            } else {
              api.dispatch({ type: "auth/logout" });
              return { error: { status: 401, data: "Unauthorized" } };
            }
          } catch (_refreshError) {
            api.dispatch({ type: "auth/logout" });
            return { error: { status: 401, data: "Unauthorized" } };
          }
        }

        return {
          error: {
            status: err.response?.status ?? 500,
            data: err.response?.data ?? err.message
          }
        };
      }

      return { error: { status: 500, data: "Unknown error" } };
    }
  };
