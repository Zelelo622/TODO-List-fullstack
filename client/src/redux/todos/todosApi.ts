import { createApi } from "@reduxjs/toolkit/query/react";
import type { ITodo } from "./types";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const todosApi = createApi({
  reducerPath: "todoApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => ({ url: "/todos", method: "GET" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo" as const, id })),
              { type: "Todo", id: "LIST" }
            ]
          : [{ type: "Todo", id: "LIST" }]
    }),
    addTodo: builder.mutation<ITodo, { title: string }>({
      query: (body) => ({ url: "/todos", method: "POST", data: body }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }]
    }),
    updateTodo: builder.mutation<
      ITodo,
      { id: number; title?: string; completed?: boolean }
    >({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        data: body
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Todo", id }]
    }),
    deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({ url: `/todos/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [{ type: "Todo", id }]
    })
  })
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todosApi;
