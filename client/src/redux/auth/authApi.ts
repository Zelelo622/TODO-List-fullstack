import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import type { IAuthResponse, IUserMeResponse } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    register: builder.mutation<
      IAuthResponse,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        data: credentials
      })
    }),

    login: builder.mutation<
      IAuthResponse,
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        data: credentials
      })
    }),

    refresh: builder.mutation<IAuthResponse, { refreshToken: string }>({
      query: (body) => ({
        url: "auth/refresh",
        method: "POST",
        data: body
      })
    }),

    me: builder.query<IUserMeResponse, void>({
      query: () => ({
        url: "auth/me",
        method: "GET"
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useMeQuery
} = authApi;
