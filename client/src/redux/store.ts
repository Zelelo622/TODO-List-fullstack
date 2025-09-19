import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import todosReducer from "./todos/todosSlice";
import authReducer from "./auth/authSlice";
import { authApi } from "./auth/authApi";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todosReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
